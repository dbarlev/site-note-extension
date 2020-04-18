const storage = require("../../storage");

/*
    notes: {
        "SITE_URL": [
            {
                id: "",
                url: "",
                position:{
                    left,
                    top
                },
                text: "",
                template: ""
            }
        ]
    }
*/


class NotesService {

    constructor() {
        this.data = null;
        this.filteredNotes = [];
    }

    async getInstance() {
        if (!this.data) {
            try {
                this.data = await storage.GetFromStorage("notes");
            } catch (error) {
                this.data = {};
            }
            const filteredNotes = this.getSiteNotes();
            this.filteredNotes = filteredNotes || [];
        }
        return this;
    }

    saveOrEdit(data) {
        let notesByUrl = this.getSiteNotesByUrl();
        let notesByID = this.getSiteNotesByID(data.id, notesByUrl);

        if (notesByUrl && notesByID) {
            this.update(data, notesByID);
        }
        else {
            this.save(data, notesByUrl);
        }
    }

    save(data, notesByUrl) {
        let newNoteData = {
            url: location.href,
            ...data
        };

        if (notesByUrl) {
            this.data[location.href].push(newNoteData);
        }
        else {
            this.data[location.href] = [newNoteData];
        }

        storage.SetToStorage({ notes: this.data });
    }

    update(data, notesByID) {
        let newData = {
            url: location.href,
            ...data
        };
        this.data[location.href][notesByID.index] = newData;
        storage.SetToStorage({ notes: this.data });
    }

    remove(id) {
        let notesByUrl = this.getSiteNotesByUrl();
        let notesByID = this.getSiteNotesByID(id, notesByUrl);
        if (notesByUrl && notesByID) {
            this.data[location.href] = this.data[location.href].filter((note) => {
                return note.id !== id;
            });
        }
        storage.SetToStorage({ notes: this.data });
    }

    getSiteNotes() {
        return this.data && this.data[location.href];
    }

    getSiteNotesByUrl() {
        let urls = Object.keys(this.data);
        if (!urls.length)
            return;

        let notes = [];
        urls && urls.length && urls.forEach((url, index) => {
            if (url === location.href) {
                notes = this.data[url];
            }
        });
        return notes && notes.length ? notes : false;
    }

    getSiteNotesByID(id, notes) {
        let noteData = false;
        notes && notes.length && notes.forEach((note, index) => {
            if (note.id === id) {
                noteData = { note, index };
            }
        });
        return noteData || false;
    }


}

module.exports = new NotesService();