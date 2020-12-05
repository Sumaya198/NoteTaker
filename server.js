const express = require('express');
const path = require('path');
const fs = require('fs');
const PORT = process.env.PORT || 3035;

let noteApp = express();

noteApp.use(express.urlencoded({ extended: true}));
noteApp.use(express.json());
noteApp.use(express.static("./public"));

// noteApp.use('/public/assets/js/index', express.static(path.resolve(__dirname, 'public/assets/js/index')));

//routing the code to map the requests from simple handlers depending on the url
noteApp.get("/notes", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/public/notes.html"))
})

noteApp.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/public/index.html"))
})

noteApp.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "/public/index.html"))
})

noteApp.get("api/notes", (req,res) => {
   
})

noteApp.post("/api/notes", (req,res) => {
   
});

noteApp.delete("/api/notes/:id", (req, res) => {
   
})

noteApp.listen(PORT, function(){
    console.log("listenting " + PORT);
})






