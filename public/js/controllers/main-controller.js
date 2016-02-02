(function() {
    'use strict';

    var MainController = function() {
        var vm = this;

        vm.globalUserIsAuthenticated = localStorage.getItem('auth_token') !== null;

        vm.updateLoginStatus = function(isLoggedIn) {
            vm.globalUserIsAuthenticated = isLoggedIn;
            console.log(vm.globalUserIsAuthenticated);
        };
    };

    MainController.$inject = [];

    angular.module('foodApp')
        .controller('MainController', MainController);
})();