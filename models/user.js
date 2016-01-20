'use strict';

var bcrypt = require('bcryptjs');
var _ = require('underscore');
var cryptojs = require('crypto-js');
var jwt = require('jsonwebtoken');

module.exports = function(sequelize, DataTypes) {
    var user = sequelize.define('user', {
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
        password_hash: {
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
                if (typeof user.email === 'string') {
                    user.email = user.email.toLowerCase();
                }
            }
        },
        instanceMethods: {
            toPublicJSON: function() {
                var json = this.toJSON(); //instance
                return _.pick(json, 'id', 'email', 'password', 'createdAt', 'updatedAt');
            },
            generateToken: function(type) {
                if (!_.isString(type)) {
                    return undefined;
                }
                else {
                    try {
                        var stringData = JSON.stringify({id: this.get('id'), type: type});
                        var encryptedData = cryptojs.AES.encrypt(stringData, '(&#@qwerty123').toString();
                        var token = jwt.sign({
                            token: encryptedData
                        }, '&#@#^ZasfQ'); //second argument is password

                        return token;
                    }
                    catch (error) {
                        return undefined;
                    }
                }
            }
        },
        classMethods: {
            authenticate: function(body) {
                return new Promise(function(resolve, reject) {
                    if (typeof body.email !== 'string' || typeof body.password !== 'string') {
                        return reject();
                    }
                    else {
                        user.findOne({
                                where: {
                                    email: body.email
                                }
                            })
                            .then(function(user) {
                                if (!user || !bcrypt.compareSync(body.password, user.get('password_hash'))) {
                                    return reject();
                                }

                                resolve(user);
                            }, function(error) {
                                return reject();
                            });
                    }
                });
            },
            findByToken: function(token) {
                return new Promise(function(resolve, reject) {
                    try {
                        var decodedJWT = jwt.verify(token, '&#@#^ZasfQ');
                        var bytes = cryptojs.AES.decrypt(decodedJWT.token, '(&#@qwerty123');
                        var tokenData = JSON.parse(bytes.toString(cryptojs.enc.Utf8));

                        user.findById(tokenData.id)
                        .then(function(user){
                            if(user){
                                resolve(user);
                            }
                            else {
                                reject();
                            }
                        }, function(error){
                            reject();
                        });
                    }
                    catch (error) {
                        reject();
                    }
                });
            }
        }
    });

    return user;
};