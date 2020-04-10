const Note = require("./views/components/note");

window.onload = () => {
    console.log(234234234234)
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request)
    if (request.isActive) {
        console.log(245345345345345345)
    }
    else if (request.addNote) {
        console.log(123123)
        let note = new Note();
        console.log(note)
    }
});