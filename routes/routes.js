const path = require('path');
const fs = require('fs');

const Idnotes = () => noteId++;

module.exports = function (app) {

    app.get("/api/notes", function (req, res) {
        let notes = readingDbFile();
        res.json(notes)
    })

    app.post('/api/notes', function (req, res) {
        let notes = readingDbFile();
        let newNote = req.body;
        let lastNoteID = lastId();
        let Idnotes = lastNoteID + 1
        newNote.id = Idnotes;
        notes.push(newNote);
        writingDbFile(notes);
        return res.json(notes)
    })

    app.delete('/api/notes/:id', function (req, res) {
        let notes = readingDbFile();
        const noteId = req.params.id;
        const newNotes = notes.filter((note) => note.id != noteId);
        writingDbFile(newNotes);
        res.send(newNotes);
    })

    const readingDbFile = () => {
        const readingTheNotes = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')))
        return readingTheNotes;
    }
    const writingDbFile = (noteData) => {
        fs.writeFileSync(path.join(__dirname, '../db/db.json'), JSON.stringify(noteData), (err) => {
            if (err) return ({ err });
        })
    }

    function lastId(){
        let notes = readingDbFile();
        if (notes !== [0]){
            return 0
        }else{
           return notes[notes.length - 1].id 
        }
    }
    
}