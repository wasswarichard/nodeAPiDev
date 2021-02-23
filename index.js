const express = require('express');
const app = express();
const json = require('./utils/toJson');
// const constants = require('./utils/constants');
// const {RUNNING}  = require('./utils/constants')
const recipe = require('./routes/recipe/v1a');
const {authenticateEndpoint} = require('./middleware/auth')


// app.use(authenticateEndpoint);
app.use(require('body-parser').json({ limit: '100mb' }));
app.use("/", require("./routes"));
app.use("/recipe", require("./routes"));
const port = process.env.PORT || 3002;
const hostname = 'localhost';
app.listen(port, err => {
    if(err){
        return console.log("Error", err)
    }
    console.log(`Backend Server running on http://${hostname}:${port} ...`)
});