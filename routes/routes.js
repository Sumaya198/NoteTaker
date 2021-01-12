const path = require("path");
const fs = require("fs");

module.exports = function (app) {
  let notes;

  app.get("/api/notes", function (req, res) {
    return res.json(notes);
  });

  app.post("/api/notes", function (req, res) {
    readNotes;
    let newNotes = req.body;
    notes.push(newNotes);
    res.json(newNotes);
    notesId();
    fs.writeFileSync("./db/db.json", JSON.stringify(notes), function (err) {
      if (err) throw err;
    });
  });

  app.delete("/api/notes/:id", function (req, res) {
    let deleteID = req.params.id;
    let deletedNote = notes.splice(deleteID, 1);
    console.log("note deleted", deletedNote);
    notesId();
    fs.writeFileSync("./db/db.json", JSON.stringify(notes), function (err) {
      if (err) throw err;
    });
    res.json({ deletion: "note deleted successfully" });
  });

  const readNotes = fs.readFileSync("./db/db.json", "UTF-8");

  if (readNotes) {
    const previousNotes = JSON.parse(readNotes);
    notes = previousNotes;
  } else {
    notes = [];
  }

  function notesId() {
    for (i = 0; i < notes.length; i++) {
      notes[i].id = i;
    }
  }
};
