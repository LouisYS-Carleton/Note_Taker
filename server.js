// Dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');
const util = require('util');

// Variables
const readFileHTML = util.promisify(fs.readFile)
const writeFileHTML = util.promisify(fs.writeFile)

// Set up express
const app = express();
const PORT = 3000;

// Set up data parse (express)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(_dirname, "./public")));




