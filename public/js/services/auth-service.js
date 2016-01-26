(function() {
    'use strict';

    var authService = function($http) {
        this.login = function(user) {
            return $http.post('/users/login', { email: user.email, password: user.password });
        };
    };

    authService.$inject = ['$http'];

    angular.module('foodApp').service('authService', authService);
})();