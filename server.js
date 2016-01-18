'use strict';

var express = require('express');
var app = express();
var PORT = 3000;
var routes = require('./routes/routes.js');
var db = require('./db.js');
routes(app);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log('Express listening on port ' + PORT + '...');
    });
}, function(error) {
    console.log('Database synchronization failed.');
});


