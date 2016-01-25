'use strict';

var express = require('express');
var app = express();
var PORT = 3000;
var routes = require('./routes/routes.js');
var db = require('./db.js');
var bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use('/lib',express.static(__dirname + '/public/lib'));
app.use('/js',express.static(__dirname + '/public/js'));
app.use('/views',express.static(__dirname + '/public/views'));
app.use('/css',express.static(__dirname + '/public/css'));
app.use('/js/controllers/',express.static(__dirname + '/public/js/controllers/'));


routes(app, db);

//db.sequelize.sync({force: true}).then(function() {
db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '...');
    });
}, function(error) {
    console.log('Database synchronization failed.');
});


