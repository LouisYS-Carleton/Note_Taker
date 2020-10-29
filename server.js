// Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');


// Express
const app = express();
const PORT = process.env.PORT || 3000;


// Data parse (Express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./Develop/public")));


// Variables
let allUserNotes = path.join(__dirname, "Develop", "db", "db.json");
let idNumber = 1;


// Default HTML pages
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"));
});
    
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"));
});


// app.get (Read stored notes)
app.get("/api/notes", function (req, res) {
    fs.readFile(allUserNotes, (err, data) => {
        const currentUserNotes = previousUserNotes(err, data);
        res.json(currentUserNotes);
    });
});

function previousUserNotes(err, data) {
    if (err) throw (err);
    return JSON.parse(data);
};


// app.post (Post new notes)
app.post("/api/notes", function (req, res) {
    let newUserNotes = req.body;
    fs.readFile(allUserNotes, function(err, data) {
        const currentUserNotes = previousUserNotes(err, data);
        addUserNote(newUserNotes, currentUserNotes);
        finalizeUserNote(currentUserNotes, res);
    });
});

function addUserNote(newUserNotes, currentUserNotes) {
    newUserNotes.id = idNumber++
    currentUserNotes.push(newUserNotes);
};



// app.delete (Delete notes)
app.delete('/api/notes/:id', function(req, res) { 
    const assignedID = parseInt(req.params.assignedID);
    fs.readFile(allUserNotes, (err, data) => {
        const currentUserNotes = previousUserNotes(err, data);
        deleteUserNote(assignedID, currentUserNotes);
        finalizeUserNote(currentUserNotes, res);
    });
});

function deleteUserNote(assignedID, currentUserNotes) {
    let noteIndex;
    currentUserNotes.forEach((note, index) => {
      if (note.assignedID === assignedID) {
        noteIndex = index;
      };
    });
    currentUserNotes.splice(noteIndex, 1);
};



// Finalize user note
function finalizeUserNote(allUserNotesList, res) {
    const allUserNotesJSON = JSON.stringify(allUserNotesList);
    fs.writeFile(allUserNotes, allUserNotesJSON, function(err) {
      if (err) throw err;
      res.json(allUserNotesList);
    });
};


// App port listener
app.listen(PORT, () => {
    console.log("App is listening on PORT " + PORT);
});