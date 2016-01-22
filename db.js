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
db.token = sequelize.import(__dirname + '/models/token.js');
db.ingredientMeals = sequelize.import(__dirname + '/models/ingr_meal.js');
db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.measurement.hasOne(db.ingredient, { foreignKey: 'measurement_id' });
db.ingredient.belongsTo(db.measurement, { foreignKey: 'measurement_id' });

db.ingredient.belongsToMany(db.meal, { through: db.ingredientMeals});
db.meal.belongsToMany(db.ingredient, { through: db.ingredientMeals});

//db.meal.hasMany(db.ingredientMeals);
//db.ingredient.hasOne(db.ingredientMeals);

//db.ingredientMeals.belongsTo(db.meal);
//db.ingredientMeals.belongsTo(db.ingredient);

db.meal.belongsTo(db.meal, { foreignKey: 'user_id' });
db.user.hasMany(db.meal, { foreignKey: 'user_id' });

module.exports = db;