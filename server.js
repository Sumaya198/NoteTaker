const express = require("express");
const path = require("path");
const fs = require("fs");
const util = require("util");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 5000;

let app = express();

//Server set up and static files
//bodyParser.urlencoded({extended: false})
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const readFileAsynchrously = util.promisify(fs.readFile);
const writeFileAsynchronously = util.promisify(fs.writeFile);
let notes = [];

// // app.use('/public/assets/js/index', express.static(path.resolve(__dirname, 'public/assets/js/index')));





app.get("/api/notes", (req, res) => {
  
   readingTheDbFile().then((data) => {
    console.log("get request", data);
    res.json(JSON.parse(data));
  });
  
});


app.post("/api/notes", (req, res) => {
  
  readingTheDbFile();
  let id;
  let newNotes = req.body;
  notes.push(newNotes);
  console.log(JSON.stringify(notes), "pushed into db json file");

  fs.writeFile(
    path.join(__dirname, "/db/db.json"),
    JSON.stringify(notes),
    function (data) {
      return res.json(notes);
    }
  );
});

app.get("/api/notes/:id", (req, res) => {
    res.json(notes[req.params.id]);
});

app.delete("/api/notes/:id", function (req, res) {
    // const deleteNotes = notes.filter(note => note.id !== parseInt(req.params.id));
    // fs.writeFile(path.join(__dirname, "/db/db.json"), deleteNotes);
    // notes =  deleteNotes;
    // res.json(true);

});







// //routing the code to map the requests from simple handlers depending on the url
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });
  
  app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"));
  });
  
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "/public/index.html"));
  // });

  function readingTheDbFile() {
  
    return readFileAsynchrously(path.join(__dirname, "/db/db.json"), "utf8");
  }


app.listen(PORT, function () {
  console.log("Listening at port ", +PORT);
});
