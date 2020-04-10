const Moveable = require('moveable').default;

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
        this.draggable();
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

    draggable() {
        const moveable = new Moveable(document.body, {
            target: document.getElementById(this.id),
            draggable: true,
            resizable: true,
            scalable: true,
            rotatable: true,
        });

        moveable.on("dragStart", ({ target, clientX, clientY }) => {
            console.log("onDragStart", target);
        }).on("drag", ({
            target, transform,
            left, top, right, bottom,
            beforeDelta, beforeDist, delta, dist,
            clientX, clientY,
        }) => {
            console.log("onDrag left, top", left, top);
            if (target) {
                target.style.left = `${left}px`;
                target.style.top = `${top}px`;
            }

            // console.log("onDrag translate", dist);
            // target!.style.transform = transform;
        }).on("dragEnd", ({ target, isDrag, clientX, clientY }) => {
            console.log("onDragEnd", target, isDrag);
        });

        /* resizable */
        moveable.on("resizeStart", ({ target, clientX, clientY }) => {
            console.log("onResizeStart", target);
        }).on("resize", ({ target, width, height, dist, delta, clientX, clientY }) => {
            console.log("onResize", target);
            if (target) {
                delta[0] && (target.style.width = `${width}px`);
                delta[1] && (target.style.height = `${height}px`);
            }

        }).on("resizeEnd", ({ target, isDrag, clientX, clientY }) => {
            console.log("onResizeEnd", target, isDrag);
        });

        /* scalable */
        moveable.on("scaleStart", ({ target, clientX, clientY }) => {
            console.log("onScaleStart", target);
        }).on("scale", ({
            target, scale, dist, delta, transform, clientX, clientY,
        }) => {
            console.log("onScale scale", scale);
            if (target) {
                target.style.transform = transform;
            }
        }).on("scaleEnd", ({ target, isDrag, clientX, clientY }) => {
            console.log("onScaleEnd", target, isDrag);
        });

        /* rotatable */
        moveable.on("rotateStart", ({ target, clientX, clientY }) => {
            console.log("onRotateStart", target);
        }).on("rotate", ({ target, beforeDelta, delta, dist, transform, clientX, clientY }) => {
            console.log("onRotate", dist);
            if (target) {
                target.style.transform = transform;
            }
        }).on("rotateEnd", ({ target, isDrag, clientX, clientY }) => {
            console.log("onRotateEnd", target, isDrag);
        });


    }
}