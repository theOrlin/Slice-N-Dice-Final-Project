'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('measurement', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                len: [1, 25]
            }
        }
    });
};