'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ingredient', {
        name: {
            type: DataTypes.STRING
        },
        calories: {
            type: DataTypes.FLOAT
        },
        fat: {
            type: DataTypes.FLOAT
        },
        carbs: {
            type: DataTypes.FLOAT
        },
        protein: {
            type: DataTypes.FLOAT
        },
        portionSize: {
            type: DataTypes.FLOAT
        }
    });
};