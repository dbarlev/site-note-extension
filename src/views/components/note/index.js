const Moveable = require('moveable').default;
const AppData = require("../../../data");

module.exports = class Note {

    constructor(element) {
        this.element = element;
        this.noteElement = null;
        this.id = "siteNote-noteContainer";
        this.init();
    }

    init() {
        this.create();
        this.addStyle();
        this.setPosition();
        this.inject();
        this.adjust();
    }

    setPosition() {

    }

    create() {
        this.noteElement = document.createElement("div");
        this.noteElement.id = this.id;
        this.noteElement.innerHTML = `<span>Danny The King</span>`;
    }

    addStyle() {
    }

    inject() {
        document.body.append(this.noteElement)
    }

    adjust() {
        const moveable = new Moveable(document.body, {
            target: document.getElementById(this.id),
            draggable: true,
            resizable: true,
            scalable: true,
        });
        this.drag(moveable);
        this.resize(moveable);
        this.scale(moveable);
    }

    drag(moveable) {
        moveable
            .on("dragStart", ({ target, clientX, clientY }) => {
            })
            .on("drag", ({ target, left, top }) => {
                if (target) {
                    target.style.left = `${left}px`;
                    target.style.top = `${top}px`;
                }
            })
            .on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
                AppData.saveNoteByUrl("drag", { position: { clientX, clientY } })
            });
    }

    resize(moveable) {
        moveable
            .on("resizeStart", () => { })
            .on("resize", ({ target, width, height, dist, delta, clientX, clientY }) => {
                if (target) {
                    delta[0] && (target.style.width = `${width}px`);
                    delta[1] && (target.style.height = `${height}px`);
                }
            })
            .on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
                console.log("onResizeEnd", target, isDrag);
            });
    }

    scale(moveable) {
        moveable
            .on("scaleStart", ({ target, clientX, clientY }) => { })
            .on("scale", ({
                target, scale, transform,
            }) => {
                if (target) {
                    target.style.transform = transform;
                }
            }).
            on("scaleEnd", ({ target, isDrag }) => {
                console.log("onScaleEnd", target, isDrag);
            });
    }
}
