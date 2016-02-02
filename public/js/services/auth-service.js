(function() {
    'use strict';

    var authService = function($http) {
        this.login = function(user) {
            return $http.post('/api/users/login', { email: user.email, password: user.password });
        };

        this.logout = function() {
            return $http.delete('/api/users/login');
        };

        this.checkForLogin = function() {
            return $http.get('/api/users/check');
        };
    };

    authService.$inject = ['$http'];

    angular.module('foodApp').service('authService', authService);
})();