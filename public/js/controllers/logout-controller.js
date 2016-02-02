(function() {
    'use strict';

    function LogoutController(authService, $location) {
        var vm = this;

        vm.logout = function() {
            authService.logout()
                .success(function(data, status, headers, config) {
                    localStorage.removeItem('auth_token');
                })
                .error(function(error) {

                });
            $location.path('/');
        };

        vm.logout();
    }


    LogoutController.$inject = ['authService', '$location'];

    angular.module('foodApp.controllers')
        .controller('LogoutController', LogoutController);
})();