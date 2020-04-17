const Note = require("./views/components/note");
const NotesService = require("./data/services/noteService");

chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {
    let noteServiceInstance = await NotesService.getInstance();
    if (request.isActive) {
        let notes = noteServiceInstance && noteServiceInstance.filteredNotes;
        notes.forEach((note) => {
            const isIdExist = document.getElementById(note.id);
            if (!isIdExist) {
                new Note(noteServiceInstance, note);
            }
        });
    }
    else if (request.addNote) {
        new Note(noteServiceInstance);
    }
});