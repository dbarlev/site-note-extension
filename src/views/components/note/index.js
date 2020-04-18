const Moveable = require('moveable').default;
const Utils = require("../../../utils/utils");
const Iframe = require("../../../common/iframe/iframe");
const Footer = require("../../html/footer/footer");

module.exports = class Note {

    constructor(notesService, data) {
        this.notesService = notesService;
        this.iframeInstance;
        this.noteElement;
        this.frameContent;
        this.id = `siteNote-${Utils.uuidv4()}`;
        this.className = 'siteNote';
        this.data = data ? data : null;
        this.noteServiceInstance;
        this.noteParams = {
            id: this.id,
            width: 350,
            height: 250,
            position: {
                left: 10,
                top: 10
            },
            colorName: "orange",
            text: ""
        }
        this.init();
    }

    init() {
        this.data && this.resetParams();
        this.create();
        this.addStyle();
        this.setPosition();
        this.adjust();
    }

    resetParams() {
        this.noteParams.id = this.data.id;
        this.id = this.data.id;
        this.noteParams.text = this.data && this.data.text || this.noteParams.text;
        this.noteParams.colorName = this.data && this.data.colorName || this.noteParams.colorName;
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
        this.frameContent = this.iframeInstance.iframeDocument;
        this.constructContent();
        Utils.setNoteColors(this.frameContent, this.id, this.noteParams.colorName);
    }

    constructContent() {
        const { footerIcons, saveText, chooseColor } = Footer;
        let html = `
            <div class="note-container">
                <div class="note-content">
                    <p class="textarea" contenteditable="true" placeholder="Start typing here..." >${this.noteParams.text}</p>
                </div>
                <div class="footer">
                    ${footerIcons.html}
                    ${saveText.html}
                    ${chooseColor.html}
                </div>
            </div>
        `;

        this.iframeInstance.addHtml(html);
        this.bindEvents();
    }

    bindEvents() {
        const { footerIcons, saveText, chooseColor } = Footer;

        footerIcons.onChangeColor(this.frameContent);
        footerIcons.onResize(this.frameContent, this.id);
        footerIcons.onRemove(this.frameContent, this.id, () => {
            this.notesService.remove(this.id);
        });

        saveText.onClick(this.frameContent, (text) => {
            this.noteParams.text = text;
            this.notesService.saveOrEdit(this.noteParams);
        });

        chooseColor.onClick(this.frameContent, this.id, (color) => {
            this.noteParams.colorName = color;
            this.notesService.saveOrEdit(this.noteParams);
        });

        this.frameContent.querySelector(".textarea").addEventListener("input", () => {
            let saveElement = this.frameContent.querySelector(".save");
            saveElement.parentElement.classList.add("show");
            saveElement.classList.add("show");
        });
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
            className: `note-moveable ${this.id}`,
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
                this.notesService.saveOrEdit(this.noteParams);
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
                saveText.onClick(this.frameContent, () => {
                    this.notesService.saveOrEdit(this.noteParams);
                }, "resize");
            });
    }
}
