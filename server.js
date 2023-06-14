const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
var cors = require('cors');

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    if ('OPTIONS' == req.method) {
       res.sendStatus(200);
     }
     else {
       next();
     }});
     app.use(cors());
// API file for interacting with MongoDB
const api = require('./api-server/config');

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// Parsers

app.use(bodyParser.urlencoded({limit: '50mb',  extended: false}));
app.use(bodyParser.json({limit: '16mb'}));
// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));
//app.use(express.static(path.join(__dirname, 'src')));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
    //res.sendFile(path.join(__dirname, 'src/index.html'));
    res.sendFile(path.join(__dirname, 'dist/index.html'));
});

//Set Port
const port = '3000';
// app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost:${port}`));