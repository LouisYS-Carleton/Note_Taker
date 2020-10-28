const express = require("express")
const path = require("path")

const app = express()
const PORT = 3000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

require('./Develop/routes/route_api')(app);
require('./Develop/routes/route_html')(app);

app.listen(PORT, () => {
    console.log('Application is listening on PORT ' + PORT)
})


