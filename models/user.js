'use strict';

var bcrypt = require('bcryptjs');
var _ = require('underscore');

module.exports = function(sequelize, DataTypes) {
    return sequelize.define('user', {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        salt: {
            type: DataTypes.STRING
        },
        password_hash:{
            type: DataTypes.STRING
        },
        password: {
            type: DataTypes.VIRTUAL, //virtual type, not saved in DB
            allowNull: false,
            validate: {
                len: [7, 100]
            },
            set: function(value) { //value = password
                var salt = bcrypt.genSaltSync(10);
                var hashedPassword = bcrypt.hashSync(value, salt);

                this.setDataValue('password', value);
                this.setDataValue('salt', salt);
                this.setDataValue('password_hash', hashedPassword);
            }
        }
    }, {
        hooks: {
            beforeValidate: function(user, options) {
                if(typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },
        instanceMethods: {
            toPublicJSON: function() {
                var json = this.toJSON(); //instance
                return _.pick(json, 'id', 'email', 'password', 'createdAt', 'updatedAt');
            }
        }
    });
};