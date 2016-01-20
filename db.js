'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/food-api.sqlite'
});
var db = {};

db.ingredient = sequelize.import(__dirname + '/models/ingredient.js');
db.measurement = sequelize.import(__dirname + '/models/measurement.js');
db.meal = sequelize.import(__dirname + '/models/meal.js');
db.user = sequelize.import(__dirname + '/models/user.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.measurement.hasOne(db.ingredient, {foreignKey: 'measurement_id'});
db.ingredient.belongsTo(db.measurement, {foreignKey: 'measurement_id'});

db.ingredient.belongsToMany(db.meal, {through: 'Ingredient_Meal', foreignKey: 'ingredient_id'});
db.meal.belongsToMany(db.ingredient, {through: 'Ingredient_Meal', foreignKey: 'meal_id'});

db.meal.belongsTo(db.meal, {foreignKey: 'user_id'});
db.user.hasMany(db.meal, {foreignKey: 'user_id'});

module.exports = db;