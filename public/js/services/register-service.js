(function() {
    'use strict';

    var registerService = function($http) {
        this.registerUser = function(user) {
            return $http.post('/api/users/', { email: user.email, password: user.password })
        };
    };

    registerService.$inject = ['$http'];

    angular.module('foodApp').service('registerService', registerService);
})();