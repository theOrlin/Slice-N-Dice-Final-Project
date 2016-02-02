(function() {
    'use strict';

    var MainController = function(authService) {
        var vm = this;

        authService.checkForLogin()
        .then(function(success){
            vm.globalUserIsAuthenticated = true;
        }, function(error){
            vm.globalUserIsAuthenticated = false;
        });

        //vm.globalUserIsAuthenticated = localStorage.getItem('auth_token') !== null;

        vm.updateLoginStatus = function(isLoggedIn) {
            if (typeof isLoggedIn === 'boolean') {
                vm.globalUserIsAuthenticated = isLoggedIn;
            }
        };
    };

    MainController.$inject = ['authService'];

    angular.module('foodApp')
        .controller('MainController', MainController);
})();