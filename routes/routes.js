'use strict';

var _ = require('underscore');
//var bodyParser = require('body-parser');
module.exports = function(app, db) {
    app.get('/', function(req, res) {
        res.send('Welcome home!');
    });

    //Measurement

    app.post('/measurement', function(req, res) {
        var body = _.pick(req.body, 'name');

        db.measurement.create(body)
            .then(function(measurement) {
                res.json(measurement);
            }, function(error) {
                console.log(error);
                res.status(500).send('Unable to create measurement.');
            });
    });

    //Ingredient

    app.post('/ingredients', function(req, res) {
        var body = _.pick(req.body, 'name', 'calories', 'fat', 'carbs', 'protein', 'portionSize', 'measurement_id');

        db.ingredient.create(body)
            .then(function(ingredient) {
                res.json(ingredient);
            }, function(error) {
                res.status(500).send('Unable to create ingredient.');
            });
    });

    //Meal

    app.post('/meals', function(req, res) {
        var body = _.pick(req.body, 'name');

        db.meal.create(body)
            .then(function(meal) {
                res.json(meal);
            }, function(error) {
                res.status(500).send('Unable to create meal.');
            });
    });

    app.get('/meals', function(req, res) {
        //var return
    });

    app.get('/meals/:id', function(req, res) {
        var mealId = parseInt(req.params.id, 10);
        var mealName = '';

        db.meal.findById(mealId)
            .then(function(meal) {
                if (meal) {
                    mealName = meal.name;
                    return meal.getIngredients();
                }
                else {
                    res.status(404).send('No such meal.');
                }
            }, function(error) {
                res.status(500).send('Unable to retrieve meal with id ' + mealId + '.');
            })
            .then(function(mealIngredients) {
                var returnObject = {};
                returnObject.mealName = mealName;
                returnObject.ingredientsList = mealIngredients;
                res.json(returnObject);
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
            }, function(error) {
                res.status(500).send('Unable to retrieve meal with id ' + mealId + '.');
            })
            .then(function(ingredient) {
                res.json(ingredient);
            });
    });

    //User

    app.post('/users', function(req, res) {
        var body = _.pick(req.body, 'email', 'password');

        db.user.create(body)
            .then(function(user) {
                res.json(user);
            }, function(error) {
                res.status(400).json(error);
            });
    });
};