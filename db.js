'use strict';

var Sequelize = require('sequelize');
var sequelize = new Sequelize(undefined, undefined, undefined, {
    'dialect': 'sqlite',
    'storage': __dirname + '/data/food-api.sqlite'
});
var db = {};

db.ingredient = sequelize.import(__dirname + '/models/ingredient.js');
db.measurement = sequelize.import(__dirname + '/models/measurement.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.ingredient.belongsTo(db.measurement, {foreignKey: 'measurement_id'});

module.exports = db;