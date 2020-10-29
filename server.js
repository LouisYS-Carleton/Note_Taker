// Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');

// Set up express
const app = express();
const PORT = process.env.PORT || 3000;

// Set up data parse (express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "./Develop/public")));

// Variables
let allUserNotes = path.join(__dirname, "Develop", "db", "db.json");
let idNumber = 1

// Set routes (app.get)
    // default
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
})
    
    // notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
})

// Get routes (app.get)
app.get("/api/notes", function (req, res) {
    fs.readFile(allUserNotes, function(err, data){
        const currentUserNotes = previousUserNotes(err, data)
        res.json(currentUserNotes)
    })
})

// Set routes (app.post)
app.post("/api/notes", function (req, res) {
    let newUserNotes = req.body;
    fs.readFile(allUserNotes, function(err, data) {
        const currentUserNotes = previousUserNotes(err, data)
        addUserNote(newUserNotes, currentUserNotes)
        finalizeUserNote(currentUserNotes, res)
    })
})

app.delete('/api/notes/:id', function(req, res) { 
    const assignedID = parseInt(req.params.assignedID)
    fs.readFile(allUserNotes, (err, data) => {
        const currentUserNotes = previousUserNotes(err, data)
        deleteUserNote(assignedID, currentUserNotes);
        finalizeUserNote(currentUserNotes, res);
    })
})

// app.post used functions (finalizeUserNote, previousUserNotes, addUserNote, deleteUserNote)
function finalizeUserNote(allUserNotesList, res) {
    const allUserNotesJSON = JSON.stringify(allUserNotesList);
    fs.writeFile(allUserNotes, allUserNotesJSON, function(err){
      if (err) throw err;
      res.json(allUserNotesList);
    });
}

function previousUserNotes(err, data) {
    if (err) throw (err)
    return JSON.parse(data)
}

function addUserNote(newUserNotes, currentUserNotes) {
    newUserNotes.id = idNumber++
    currentUserNotes.push(newUserNotes)
}

function deleteUserNote(assignedID, currentUserNotes) {
    let noteIndex;
    currentUserNotes.forEach(function(note, index){
      if (note.assignedID === assignedID) {
        noteIndex = index;
      }
    });
    currentUserNotes.splice(noteIndex, 1);
  }

// Delete (app.delete)

// DELETE API notes route
// app.delete("./Develop/api/notes/:id", function (req, res) {
//     const { id } = req.params;
//     fs.readFile("./Develop/db/db.json", "utf8", (error, data) => {
//       if (error) throw error;
//       // Get the current notes in db.json.
//       let allUserNotes = JSON.parse(data);
//       // Filter the array not to include the id we want to delete.
//       allUserNotes = allUserNotes.filter((item) => item.id !== id);
//       // Update the db.json with new array in string format
//       fs.writeFile("./Develop/db/db.json", JSON.stringify(allUserNotes), (err) => {
//         if (err) throw err;
//         res.send("Note deleted.");
//       });
//     });
//   });

  

// app.delete("/api/notes/:id", function (req, res) {
//     const { id } = req.params;
//     fs.readFile("db/db.json", "utf8", (error, data) => {
//       if (error) throw error;
//       // Get the current notes in db.json.
//       let allUserNotes = JSON.parse(data);
//       // Filter the array not to include the id we want to delete.
//       allUserNotes = allUserNotes.filter((item) => item.id !== id);
//       // Update the db.json with new array in string format
//       fs.writeFile("db/db.json", JSON.stringify(allNotes), (err) => {
//         if (err) throw err;
//         res.send("Note deleted.");
//       });
//     });
//   });

app.listen(PORT, () => {
    console.log("App is listening on PORT " + PORT)
})