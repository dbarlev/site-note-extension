const storage = require("./storage");

/*
{
    notes: [
        {
            url: "",
            type: "drag|scale|resize",
            position:{
                clientX,
                clientY
            },
            text: "",
            template: ""
        }
    ]
}
*/


class NotesService {

    constructor() {
        const notesFromStorage = storage.GetFromStorage("notes");
        this.data = notesFromStorage ? notesFromStorage : [];
    }

    saveNoteByUrl(type, data) {
        let isExist = this.getNoteByUrl();
        if (isExist) {
            this.updateNote(isExist.index);
        }
        else {
            this.data.push({
                url: location.href,
                type,
                ...data
            })
            storage.SetToStorage({ notes: this.data });
        }
    }

    updateNote(index, data) {
        this.data[index] = data;
    }

    getNoteByUrl() {
        let notes = this.data && this.data.length && this.data.map((note, index) => {
            return note.url === location.href ? { note, index } : false;
        });
        return notes ? notes : false;
    }
}

module.exports = new NotesService();