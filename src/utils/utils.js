const Colors = require("../common/colors");

class Utils {

    uuidv4() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    isNoteAlreadyExist() {
        return document.querySelector(".siteNote");
    }

    setNoteColors(frameDocument, id, color) {
        const mainWrapper = document.getElementById(id);
        const headerWrapper = mainWrapper.querySelector(".siteNote-header");

        mainWrapper.style.setProperty("background", Colors[color].main, "important");
        frameDocument.querySelector(".footer").style.setProperty("background", Colors[color].main, "important");
        headerWrapper.style.setProperty("background", Colors[color].heading, "important");
    }
}

module.exports = new Utils();