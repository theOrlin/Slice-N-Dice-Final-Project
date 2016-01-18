'use strict';

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('measurement', {
        name: {
            type: DataTypes.STRING
        }
    });
};