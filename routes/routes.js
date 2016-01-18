'use strict';

var _ = require('underscore');
var bodyParser = require('body-parser');
module.exports = function(app, db) {
    app.get('/', function(req, res) {
        res.send('Welcome home!');
    });

    app.post('/measurement', function(req, res) {
        var body = _.pick(req.body, 'name');
        //console.log(req.body);
        db.measurement.create(body)
            .then(function(measurement) {
                res.json(measurement);
            }, function(error) {
                console.log(error);
                res.status(400).send();
            });
    });

    app.post('/ingredients', function(req, res) {
        var body = _.pick(req.body, 'name', 'calories', 'fat', 'carbs', 'protein', 'portionSize', 'measurement_id');

        db.ingredient.create(body)
            .then(function(ingredient) {
                res.json(ingredient);
            }, function(error) {
                res.status(500).send();
            });
    });
};