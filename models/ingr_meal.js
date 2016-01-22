'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ingredientMeals', {
        quantity: {
            type: DataTypes.FLOAT,
            allowNull: false,
            validate: {
                isFloat: true
            }
        }
    });
};