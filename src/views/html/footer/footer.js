const Colors = require("../../../common/colors");
const Utils = require("../../../utils/utils");

const footerIcons = `
    <div class="edit-icons">
        <span class="icon-container resize">
            <i class="fas fa-expand"></i>
            <span>RESIZE</span>
        </span>
        <span class="icon-container color">
            <i class="fas fa-paint-brush"></i>
            <span>COLOR</span>
        </span>
        <span class="icon-container remove">
            <i class="far fa-trash-alt"></i>
            <span>REMOVE</span>
        </span>
    </div>
`;

const chooseColor = `
    <div class="chooseColorContainer">
        <span class="chooseColor red" color="red" style='background: ${Colors.red.main};'></span>
        <span class="chooseColor green" color="green" style='background: ${Colors.green.main};'></span>
        <span class="chooseColor blue" color="blue" style='background: ${Colors.blue.main};'></span>
        <span class="chooseColor orange" color="orange" style='background: ${Colors.orange.main};'></span>
        <span class="chooseColor purple" color="purple" style='background: ${Colors.purple.main};'></span>
        <span class="chooseColor pink" color="pink" style='background: ${Colors.pink.main};'></span>
    </div>
`;

const saveText = `
    <div class="save">
        <i class="fas fa-check"></i>
        <span>SAVE</span>
    </div>
`;

const onChooseColor = (frameDocument, id, saveCallback) => {
    const colorPlateElement = frameDocument.querySelector(".chooseColorContainer");
    const colorElements = frameDocument.querySelectorAll(".chooseColor");
    const footerElement = frameDocument.querySelector(".footer");

    colorElements.forEach((el) => {
        el.addEventListener("click", (event) => {
            const element = event.target;
            const color = element.getAttribute("color");
            colorPlateElement.classList.remove("show");
            footerElement.classList.remove("show");
            Utils.setNoteColors(frameDocument, id, color);
            saveCallback(color);
        });
    });
}

const onChangeColor = (frameDocument) => {
    const saveElement = frameDocument.querySelector(".save");
    frameDocument.querySelector(".icon-container.color").addEventListener("click", () => {
        saveElement.parentElement.classList.add("show");
        const colorPlateElement = frameDocument.querySelector(".chooseColorContainer");
        colorPlateElement.classList.add("show");
    });
}

const onResize = (frameDocument, id) => {
    const saveElement = frameDocument.querySelector(".save");
    frameDocument.querySelector(".icon-container.resize").addEventListener("click", () => {
        saveElement.parentElement.classList.add("show");
        saveElement.classList.add("show");
        let moveableElement = document.querySelector(`.note-moveable.${id}`);
        let classNames = moveableElement.classList;
        if (classNames.contains("show")) {
            moveableElement.classList.remove("show");
        }
        else {
            moveableElement.classList.add("show");
        }
    })
}

const onSaveText = (frameDocument, saveCallback, saveType) => {
    const saveElement = frameDocument.querySelector(".save");
    frameDocument.querySelector(".save").addEventListener("click", () => {
        if (saveType === "text") {
            let text = frameDocument.querySelector(".textarea").innerText;
            text && text.trim() !== "" && saveCallback(text);
        }
        else {
            saveCallback();
        }
        saveElement.parentElement.classList.remove("show");
        saveElement.classList.remove("show");
    });
}

const onRemove = (frameDocument, id, saveCallback) => {
    const noteElement = document.getElementById(id);
    frameDocument.querySelector(".icon-container.remove").addEventListener("click", () => {
        noteElement.remove();
        saveCallback();
    });
}

module.exports = {
    footerIcons: {
        html: footerIcons.trim(),
        onChangeColor: (frameDocument) => onChangeColor.call(this, frameDocument),
        onResize: (frameDocument, id) => onResize.call(this, frameDocument, id),
        onRemove: (frameDocument, id, saveCallback) => onRemove.call(this, frameDocument, id, saveCallback)
    },
    saveText: {
        html: saveText.trim(),
        onClick: (frameDocument, saveCallback) => onSaveText.call(this, frameDocument, saveCallback)
    },
    chooseColor: {
        html: chooseColor.trim(),
        onClick: (frameDocument, id, saveCallback) => onChooseColor.call(this, frameDocument, id, saveCallback)
    }
};