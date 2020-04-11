const Moveable = require('moveable').default;
const NotesService = require("../../../data/services/noteService");

module.exports = class Note {

    constructor(element) {
        this.element = element;
        this.noteElement = null;
        this.id = "siteNote-noteContainer";
        this.data;
        this.noteServiceInstance;
        this.noteParams = {
            width: 300,
            height: 150,
            position: {
                left: 10,
                top: 10
            }
        }
        this.init();
    }

    init() {
        (async () => {
            this.noteServiceInstance = await NotesService.getInstance();
            this.data = this.noteServiceInstance.data && this.noteServiceInstance.data[0];
            this.resetParams();
            this.create();
            this.addStyle();
            this.setPosition();
            this.inject();
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
        this.noteElement.style.left = this.noteParams.position.left + "px";
        this.noteElement.style.top = this.noteParams.position.top + "px";
    }

    create() {
        this.noteElement = document.createElement("div");
        this.noteElement.id = this.id;
        this.toggleEditMode();
        this.noteElement.innerHTML = this.data ? `<span>Danny${this.data.text}</span>` : `<span>Danny The King</span>`;
    }

    toggleEditMode() {
        this.noteElement.addEventListener("click", () => {
            let moveableElement = document.querySelector(".danny");
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
        this.noteElement.style.height = this.noteParams.height + "px";
        this.noteElement.style.width = this.noteParams.width + "px";
    }

    inject() {
        document.body.append(this.noteElement)
    }

    adjust() {
        const moveable = new Moveable(document.body, {
            className: "danny show",
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
                NotesService.save("drag", this.noteParams);
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
                NotesService.save("resize", this.noteParams);
            });
    }
}
