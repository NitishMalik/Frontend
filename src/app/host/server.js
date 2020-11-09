const express = require('express');
const fs  = require('fs');
const path = require('path');
var server = express();
let envVars = JSON.parse(fs.readFileSync('config.json'));
Object.keys(envVars).forEach(key=>{
    envVars[key] = process.env[key];
});
fs.writeFileSync("config.json",JSON.stringify(envVars),function(err) {    
    if (err) throw err;
});
server.use(express.static(__dirname));
server.use((req, res, next) => {
    // send the index.html file for any route that doesn't get served by the express.static
    // this will allow the react app to use HTML5 routing (modifying the url of the page)
    res.sendFile(path.join(__dirname, 'index.html'));
});
server.listen(3000, () => console.log('listening on port 3000!'));