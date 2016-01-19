'use strict';

var _ = require('underscore');
//var bodyParser = require('body-parser');
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
                res.status(500).send('Unable to create measurement.');
            });
    });

    app.post('/ingredients', function(req, res) {
        var body = _.pick(req.body, 'name', 'calories', 'fat', 'carbs', 'protein', 'portionSize', 'measurement_id');

        db.ingredient.create(body)
            .then(function(ingredient) {
                res.json(ingredient);
            }, function(error) {
                res.status(500).send('Unable to create ingredient.');
            });
    });

    app.post('/meals', function(req, res) {
        var body = _.pick(req.body, 'name');

        db.meal.create(body)
        .then(function(meal) {
            res.json(meal);
        }, function(error) {
            res.status(500).send('Unable to create meal.');
        });
    });

    app.get('/meals/:id', function(req, res) {
        var mealId = parseInt(req.params.id, 10);
        db.meal.findById(mealId)
        .then(function(meal) {
            if (meal) {
                res.json(meal);
            }
            else {
                res.status(404).send('No such meal.');
            }
        }, function(error){
            res.status(500).send('Unable to retrieve meal with id ' + mealId  + '.');
        });
    });

    app.put('/meals/:id', function(req, res) {
        var mealId = parseInt(req.params.id, 10);
        var body = _.pick(req.body, 'id');
        db.meal.findById(mealId)
            .then(function(meal) {
                if (meal) {
                    db.ingredient.findById(body.id)
                    .then(function(ingredient) {
                        return meal.addIngredient(ingredient);
                    }, function(error) {
                        res.status(404).send('No such ingredient.');
                    });
                }
                else {
                    res.status(404).send('No such meal.');
                }
            }, function(error){
                res.status(500).send('Unable to retrieve meal with id ' + mealId  + '.');
            })
        .then(function(ingredient) {
            res.json(ingredient);
        });
    });
};