'use strict';

var bcrypt = require('bcryptjs');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('token', {
        token: {
            type: DataTypes.VIRTUAL,
            allowNull: false,
            validate: {
                len: [1]
            },
            set: function(value) {
                var hash = cryptojs.SHA1(value).toString();

                this.setDataValue('token', value);
                this.setDataValue('tokenHash', hash);
            }
        },
        tokenHash: DataTypes.STRING
    });
};