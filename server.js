// set up dependencies
const express = require("express");
const path = require("path");
const fs = require('fs');
const util = require('util');

// set up express / port number
const app = express();
const PORT = 3000;

// set up data parse (express)