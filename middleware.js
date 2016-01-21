var cryptojs = require('crypto-js');

module.exports = function(db) {
    return {
        requireAuthentication: function(req, res, next) {
            var token = req.get('Auth') || '';

            db.token.findOne({
                    where: {
                        tokenHash: cryptojs.SHA1(token).toString()
                    }
                })
                .then(function(tokenInstance) {
                    if (!tokenInstance) {
                        throw new Error();
                    }

                    req.token = tokenInstance;
                    return db.user.findByToken(token);
                })
                .then(function(user) {
                    req.user = user;
                    next();
                })
                .catch(function(error) {
                    res.status(401).send('Unknown user');
                });

            //db.user.findByToken(token)
            //.then(function(user){
            //    req.user = user;
            //    next();
            //}, function(error){
            //    res.status(401).send('Unknown user');
            //});
        }
    };
};