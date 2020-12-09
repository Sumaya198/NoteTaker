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

//in the get request set up the notes variable for the current note i.e notes = res.j
let notes = [];
let id = 0;


app.get("/api/notes", (req, res) => {
   readingTheDbFile().then((data) => {
     notes = JSON.parse(data)
    res.json(notes);
  });
});


app.post("/api/notes", (req, res) => {
  
  readingTheDbFile().then((array) => {
    //the function above is reading what is in the db.json file
    //I want to check the 
    
///make ids consistent 
    
    let newNotes = {
      id: id++,
      title: req.body.title,
      text: req.body.text,
    };
    //we want to loop over each object in the array
    // for (i = 0; i < array.length; i++){
    //   let firstId = array[i].id
    //   console.log("first Id", firstId)
    // }

    /// this code deletes existing data when server is reset
    
    notes.push(newNotes);
    console.log(JSON.stringify(notes), "pushed into db json file");
    fs.writeFile(
      path.join(__dirname, "/db/db.json"),
      JSON.stringify(notes),
      function (notes) {
        return res.json(notes);
      }
    );
  })
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
