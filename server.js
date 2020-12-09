const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const PORT = process.env.PORT || 5000;

let app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const readFileAsynchrously = util.promisify(fs.readFile);
//const writeFileAsynchrously = util.promisify(fs.readFile);
let notes = [];


app.get("/api/notes", (req, res) => {
   readingTheDbFile().then((data) => {
    res.json(JSON.parse(data));
  });
});


app.post("/api/notes", (req, res) => {
  readingTheDbFile()
  let newNotes = req.body;
  notes.push(newNotes);
  console.log(JSON.stringify(notes), "pushed into db json file");
  fs.writeFile(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(notes),
    function (notes) {
      return res.json(notes);
    }
  );
});


app.delete("/api/notes/:id", function (req, res) {
    const deleteNote = req.params.id;
    notes.splice(deleteNote, 1);
    fs.writeFileSync("./db/db.json", JSON.stringify(notes), function (err) {
        if (err) 
            throw err
        });
    res.json(true)
});

// //routing the code to map the requests from simple handlers depending on the url
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });

  function readingTheDbFile() {
    return readFileAsynchrously(path.join(__dirname, "/db/db.json"), "utf8");
  }
  // function writingTheDbFile() {
  //   return writeFileAsynchrously(path.join(__dirname, "/db/db.json"))
  // }

app.listen(PORT, function () {
  console.log("Listening at port ", +PORT);
});
