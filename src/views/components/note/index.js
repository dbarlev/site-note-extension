const Moveable = require('moveable').default;
const NotesService = require("../../../data/services/noteService");
const Utils = require("../../../utils/utils");
const Iframe = require("../../../common/iframe/iframe");

module.exports = class Note {

    constructor(element) {
        this.element = element;
        this.iframeInstance;
        this.noteElement = null;
        this.frameContent;
        this.id = `siteNote-${Utils.uuidv4()}`;
        this.className = 'siteNote';
        this.data;
        this.noteServiceInstance;
        this.noteParams = {
            width: 330,
            height: 215,
            position: {
                left: 10,
                top: 10
            }
        }
        this.init();
    }

    init() {
        (async () => {
            if (!Utils.isNoteAlreadyExist()) {
                this.noteServiceInstance = await NotesService.getInstance();
                this.data = this.noteServiceInstance.data && this.noteServiceInstance.data[0];
                this.resetParams();
            }
            this.create();
            this.addStyle();
            this.setPosition();
            this.adjust();
        })();
    }

    resetParams() {
        this.noteParams.width = this.data && this.data.width || this.noteParams.width;
        this.noteParams.height = this.data && this.data.height || this.noteParams.height;
        this.noteParams.position.top = this.data && this.data.position && this.data.position.top || this.noteParams.position.top;
        this.noteParams.position.left = this.data && this.data.position && this.data.position.left || this.noteParams.position.left;
    }

    setPosition() {
        this.iframeInstance.iframeContainer.style.left = this.noteParams.position.left + "px";
        this.iframeInstance.iframeContainer.style.top = this.noteParams.position.top + "px";
    }

    create() {
        this.iframeInstance = new Iframe(this.id, this.className);
        this.noteElement = this.iframeInstance.iframe;
        this.frameContent = this.noteElement.iframeDocument;
        // this.toggleEditMode();
        this.constructContent();
    }

    constructContent() {
        let data = this.data ? `<span>Danny${this.data.text}</span>` : `<span> Danny The King</span>`;
        let html = `
            <div class="note-content">
                <div class="note-textContent">
                    <p class="textarea" contenteditable="true" placeholder="Start typing here..." ></p>
                </div>
                <div class="note-sidebar">
                    <div class="iconContainer">
                        <i class="far fa-edit"></i>
                    </div>
                    <div class="iconContainer">
                        <i class="fas fa-paint-brush"></i>
                    </div>
                    <div class="iconContainer">
                        <i class="fas fa-arrows-alt"></i>
                    </div>
                </div>
            </div>
        `;

        this.iframeInstance.addHtml(html);
    }

    toggleEditMode() {
        this.iframeInstance.iframeContainer.addEventListener("click", () => {
            let moveableElement = document.querySelector(`#${this.id}`);
            let classNames = moveableElement.classList;
            if (classNames.contains("show")) {
                moveableElement.classList.remove("show");
            }
            else {
                moveableElement.classList.add("show");
            }
        })
    }

    addStyle() {
        this.iframeInstance.iframeContainer.style.height = this.noteParams.height + "px";
        this.iframeInstance.iframeContainer.style.width = this.noteParams.width + "px";
    }

    adjust() {
        const moveable = new Moveable(document.body, {
            className: this.id + " " + "show",
            target: document.getElementById(this.id),
            draggable: true,
            resizable: true
        });
        this.drag(moveable);
        this.resize(moveable);
    }

    drag(moveable) {
        moveable
            .on("drag", ({ target, left, top }) => {
                if (target) {
                    target.style.left = `${left}px`;
                    target.style.top = `${top}px`;
                    this.noteParams.position.left = left;
                    this.noteParams.position.top = top;
                }
            })
            .on("dragEnd", ({ target, left, top }) => {
                //NotesService.save("drag", this.noteParams);
            });
    }

    resize(moveable) {
        moveable
            .on("resize", ({ target, width, height, dist, delta, clientX, clientY }) => {
                if (target) {
                    delta[0] && (target.style.width = `${width}px`);
                    delta[1] && (target.style.height = `${height}px`);
                    this.noteParams.width = width;
                    this.noteParams.height = height;
                }
            })
            .on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
                //NotesService.save("resize", this.noteParams);
            });
    }
}
