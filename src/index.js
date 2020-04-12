const Note = require("./views/components/note");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.isActive) {

    }
    else if (request.addNote) {
        let note = new Note();
    }
});