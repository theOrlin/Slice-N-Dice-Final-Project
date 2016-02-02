(function() {
    'use strict';

    var MainController = function() {
        var vm = this;

        vm.globalUserIsAuthenticated = localStorage.getItem('auth_token') !== null;

        vm.updateLoginStatus = function(isLoggedIn) {
            if (typeof isLoggedIn === 'boolean') {
                vm.globalUserIsAuthenticated = isLoggedIn;
            }
        };
    };

    MainController.$inject = [];

    angular.module('foodApp')
        .controller('MainController', MainController);
})();