const storage = require("../../storage");

/*
    [
        {
            url: "",
            type: "drag|scale|resize",
            position:{
                left,
                top
            },
            text: "",
            template: ""
        }
    ]
*/


class NotesService {

    constructor() {
        this.data = null;
    }

    async getInstance() {
        if (!this.data) {
            try {
                const notesFromStorage = await storage.GetFromStorage("notes");
                this.data = notesFromStorage ? notesFromStorage.notes : [];
            } catch (error) {
                this.data = [];
            }
            const filteredNotes = this.getSiteNotes();
            this.data = filteredNotes ? filteredNotes : this.data;
        }
        return this;
    }

    save(type, data) {
        let isExist = this.getSiteNotesAndIndex();

        if (isExist) {
            this.update(isExist.index, type, data);
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

    update(index, type, data) {
        this.data[index] = {
            url: location.href,
            type,
            ...data
        };
        storage.SetToStorage({ notes: this.data });
    }

    getSiteNotes() {
        return this.data && this.data.length && this.data.filter((note, index) => {
            return note.url === location.href;
        });
    }

    getSiteNotesAndIndex() {
        let notes = this.data && this.data.length && this.data.map((note, index) => {
            return note.url === location.href ? { note, index } : false;
        });
        return notes ? notes[0] : false;
    }
}

module.exports = new NotesService();