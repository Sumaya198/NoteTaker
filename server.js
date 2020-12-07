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
let id = 1;

// // app.use('/public/assets/js/index', express.static(path.resolve(__dirname, 'public/assets/js/index')));



function readingTheDbFile() {  
  return readFileAsynchrously(path.join(__dirname, "/db/db.json"), "utf8");
}

function writingTheDbFile() {
      return writeFileAsynchronously(path.join(__dirname, "/db/db.json"), "utf8");
    }


// Get request/ route. The aim is to read the db.json file and the return it
//url path we are going to, to ask for information
//take in information and give you back more information
app.get("/api/notes", (req, res) => {
  //to convert the notes from json to javascript object
   readingTheDbFile().then((data) => {
    notes = data;
    //console.log("get request", data);
    //will return object to the ui
    res.json(JSON.parse(data));
  });
  
});

//main aim is to take info in and send information back
//POST request/ route. The aim is to read the db.json file but
app.post("/api/notes", (req, res) => {

    let newNotes = req.body;
    newNotes.id = id;
    id++;
    //notes.push(newNotes)
   
  //function to read the json file
 readingTheDbFile().then((data) => {
    const savedNotes = JSON.parse(data); 
    //console.log("saved notes", savedNotes);
    //console.log("new notes", newNotes);
    savedNotes.push(newNotes);
    console.log("saved notes", savedNotes);
    //return savedN
 }).then (() => {
    //writingTheDbFile().then((data) => {
 
        
        //JSON.stringify(data)
    //     return res.json(notes);
    //   })
      fs.writeFile(
        path.join(__dirname, "/db/db.json"),
        JSON.stringify(savedNotes),
        
            //res.json services json data back to the client... you don't need to add headers and stringify it. 
           // it's simpler to do this in express
          res.json(savedNotes),
        
      )}
 )
      
     
 
  
 console.log(JSON.stringify(notes), "pushed into db json file");
 writingTheDbFile().then((data) => {
    JSON.stringify(data)
    console.log
//     return res.json(notes);
//   })
//   fs.writeFile(
//     path.join(__dirname, "/db/db.json"),
//     JSON.stringify(notes),
//     function (data) {
//         //res.json services json data back to the client... you don't need to add headers and stringify it. 
        //it's simpler to do this in express
     return res.json(notes);
    }
 )}
  );


app.delete("/api/notes/:id", function (req, res) {
  fs.readFile(path.join(__dirname, "/db/db.json"), "utf8");
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

app.listen(PORT, function () {
  console.log("Listening at port ", +PORT);
});
