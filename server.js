// Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');
const util = require('util');

// Variables
const readFileHTML = util.promisify(fs.readFile)
const writeFileHTML = util.promisify(fs.writeFile)
let allUserNotes

// Set up express
const app = express();
const PORT = 3000;

// Set up data parse (express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(_dirname, "./public")));

// Set routes (app.get)
    // notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(_dirname, "./Develop/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    readFileHTML(path.join(_dirname, "./Develop/db/db.json"), "utf8")
    .then(data => {
        return res.json(JSON.parse(data))
    })
})

    // default
app.get("/", (req, res) => {
    res.sendFile(path.join(_dirname, "./Develop/public/index.html"))
})

// Set routes (app.post)
app.post("/api/notes", function (req, res) {
    let newUserNotes = req.body;
    readFileHTML(path.join(_dirname, "./db/db.json"), "utf8")
    .then((data) => {
        notes = JSON.parse(data);
        if (userNotes.id || userNotes.id === 0) {
            let currentUserNotes = allUserNotes[newUserNotes.id]
            currentUserNotes.title = newUserNotes.title
            currentUserNotes.text = newUserNotes.text
        } else {
            allUserNotes.push(newUserNotes)
        }
})









