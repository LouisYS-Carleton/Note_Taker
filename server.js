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
let beginningIDNum = 1

// Set routes (app.get)
    // default
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/index.html"))
})
    
    // notes
app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./Develop/public/notes.html"))
})

app.get("/api/notes", function (req, res) {
    fs.readFile(allUserNotes, function (err, data){
        const currentUserNotes = previousUserNotes(err, data)
        res.json(currentUserNotes)
    })
})




// Set routes (app.post)
// app.post("/api/notes", function (req, res) {
//     let newUserNotes = req.body;
//     readFileHTML(path.join(__dirname, "./Develop/db/db.json"), "utf8")
//     .then(function (data) {
//         allUserNotes = JSON.parse(data);
//         if (newUserNotes.id || newUserNotes.id === 0) {
//             let currentUserNotes = allUserNote[newUserNotes.id]
//             currentUserNotes.title = newUserNotes.title
//             currentUserNotes.text = newUserNotes.text
//         } else {
//             allUserNotes.push(newUserNotes)
//         }
//         writeFileHTML(path.join (__dirname, "./Develop/db/db.json"), JSON.stringify(allUserNotes))
//         .then(() => {
//             console.log('Successfully saved note.')
//         })
//     })
//     res.json(newUserNotes)
// })

// Delete (app.delete)
// app.delete("/api/notes/:id", function (req, res) {
//     let id = req.params.id;
//     readFileHTML(path.join(__dirname, "./Develop/db/db.json"), "utf8") 
//     .then(function (data) {
//         allUserNotes = JSON.parse(data)
//         allUserNotes.splice(id, 1)
//         writeFileHTML(path.join(__dirname, "./Develop/db/db.json"), JSON.stringify(allUserNotes))
//         .then(() => {
//             console.log('Successfully deleted note.')
//         })
//     })
//     res.json(id)
// })

// app.listen(PORT, () => {
//     console.log("App is listening on PORT " + PORT)
// })