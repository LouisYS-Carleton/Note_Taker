const express = require("express")
const path = require("path")

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require('./Develop/routes/API')(app);
require('./Develop/routes/HTML')(app);



