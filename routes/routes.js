'use strict';

var _ = require('underscore');
var bcrypt = require('bcryptjs');
var path = require('path');
//var bodyParser = require('body-parser');


module.exports = function(app, db) {
    var middleware = require('../middleware.js')(db);

    //Measurement

    app.post('/measurement', middleware.requireAuthentication, function(req, res) {
        //app.post('/measurement', function(req, res) {
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

    app.get('/ingredients', function(req, res) {
        var searchQuery = req.query;
        var where = {};

        if (searchQuery.hasOwnProperty('find') && searchQuery.find.length > 0) {
            where.name = {
                $like: '%' + searchQuery.find + '%'
            };
        }

        db.ingredient.findAll({
                attributes: ['id', 'name', 'calories', 'fat', 'carbohydrates', 'protein', 'portionSize'],
                where: where,
                include: [{ model: db.measurement, attributes: ['id', 'name'] }]
            })
            .then(function(ingredients) {
                if (ingredients) {
                    res.json(ingredients);
                }
                else {
                    res.status(404).send('No ingredients found');
                }
            }, function(error) {
                res.status(500).send();
            });
    });

    app.post('/ingredients', middleware.requireAuthentication, function(req, res) {
        //app.post('/ingredients', function(req, res) {
        var body = _.pick(req.body, 'name', 'calories', 'fat', 'carbohydrates', 'protein', 'portionSize', 'measurement_id');

        db.ingredient.create(body)
            .then(function(ingredient) {
                res.json(ingredient);
            }, function(error) {
                res.status(500).send('Unable to create ingredient.');
            });
    });

    //Meal

    app.post('/meals', middleware.requireAuthentication, function(req, res) {
        var body = _.pick(req.body, 'name');

        db.meal.create(body)
            .then(function(meal) {
                req.user.addMeal(meal) //user comes from middleware
                    .then(function() {
                        return meal.reload();
                    })
                    .then(function(meal) {
                        res.json(meal.toJSON());
                    });
            }, function(error) {
                res.status(500).send('Unable to create meal.');
            });
    });

    app.get('/meals', middleware.requireAuthentication, function(req, res) {
        var meals = {};
        req.user.getMeals(
            {
                attributes: ['name'],
                include: [
                    {
                        model: db.ingredient,
                        attributes: ['name', 'calories', 'fat', 'carbohydrates', 'protein', 'portionSize'],
                        include: [
                            { model: db.measurement, attributes: ['name'] }
                        ]
                    }
                ]
            })
            .then(function(meals) {
                res.json(meals);
            });
    });

    app.get('/meals/:id', middleware.requireAuthentication, function(req, res) {
        var mealId = parseInt(req.params.id, 10);
        var mealName = '';
        req.user.getMeals(
            {
                where: {
                    'id': mealId
                }
            })
            //db.meal.findById(mealId)
            .then(function(meals) {
                if (meals.length > 0) {
                    //mealName = meal.name;
                    return meals[0].getIngredients();
                }
                else {
                    res.status(404).send('No such meal.');
                }
            }, function(error) {
                res.status(500).send('Unable to retrieve meal with id ' + mealId + '.');
            })
            .then(function(mealIngredients) {
                res.json(mealIngredients);
            });
    });

    app.put('/meals/:id', middleware.requireAuthentication, function(req, res) {
        var mealId = parseInt(req.params.id, 10);
        var body = _.pick(req.body, 'id', 'quantity');

        req.user.getMeals(
            {
                where: {
                    'id': mealId
                }
            })
            .then(function(meals) {
                if (meals.length > 0) {
                    db.ingredient.findById(body.id)
                        .then(function(ingredient) {
                            return meals[0].addIngredient(ingredient, { quantity: body.quantity });
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

    //app.delete('/meals/:id', function(req, res) {
    app.delete('/meals/:id', middleware.requireAuthentication, function(req, res) {
        var mealId = parseInt(req.params.id, 10);

        req.user.getMeals(
            {
                where: {
                    'id': mealId
                }
            })
            .then(function(meals) {
                if (meals.length > 0) {
                    meals[0].destroy(meals[0])
                        .then(function() {
                            res.status(204).send();
                        });
                }
                else {
                    res.status(404).send('User has no such meal.');
                }
            }, function(error) {
                res.status(500).send('Unable to retrieve meal with id ' + mealId + '.');
            });
    });

    app.delete('/meals/:id/:ingredientId', middleware.requireAuthentication, function(req, res) {
        var mealId = parseInt(req.params.id, 10);
        var ingredientId = parseInt(req.params.ingredientId, 10);

        req.user.getMeals(
            {
                where: {
                    'id': mealId
                }
            })
            .then(function(meals) {
                if (meals.length > 0) {
                    db.ingredientMeals.destroy({
                            where: {
                                mealId: mealId,
                                ingredientId: ingredientId
                            }
                        })
                        .then(function() {
                            res.status(204).send();
                        });
                }
                else {
                    res.status(404).send('User has no such meal.');
                }
            }, function(error) {
                res.status(500).send('Unable to retrieve meal with id ' + mealId + '.');
            });
    });

    //User

    app.post('/users', function(req, res) {
        var body = _.pick(req.body, 'email', 'password');

        db.user.create(body)
            .then(function(user) {
                res.json(user.toPublicJSON());
            }, function(error) {
                res.status(400).json(error);
            });
    });

    //User Login

    app.post('/users/login', function(req, res) {
        var body = _.pick(req.body, 'email', 'password');
        var userInstance;

        db.user.authenticate(body)
            .then(function(user) {
                var token = user.generateToken('authentication');
                userInstance = user;

                return db.token.create({
                    token: token
                });
                //if (token) {
                //    res.header('Auth', user.generateToken('authentication')).json(user.toPublicJSON());
                //}
                //else {
                //    res.status(401).send('Authentication failed.');
                //}
            })
            .then(function(tokenInstance) {
                res.header('Auth', tokenInstance.get('token')).json(userInstance.toPublicJSON());
                //res.json(tokenInstance.get('token'));
            })
            .catch(function(error) {
                res.status(401).send('Authentication failed.');
            });
    });

    //Logout

    app.delete('/users/login', middleware.requireAuthentication, function(req, res) {
        req.token.destroy()
            .then(function() {
                res.status(204).send();
            })
            .catch(function() {
                res.status(500).send();
            });
    });

    app.get('/*', function(req, res) {
        res.sendFile('index.html', {root: path.join(__dirname + '/../public/')});
    });

};