'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('ingredient', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 100]
            }
        },
        calories: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        fat: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        carbs: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        protein: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        portionSize: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    });
};