(function() {
    'use strict';

    function LogoutController(authService, $location, $scope) {
        var vm = this;

        vm.logout = function() {
            authService.logout()
                .success(function(data, status, headers, config) {
                    localStorage.removeItem('auth_token');
                    $scope.tvm.updateLoginStatus(false);
                })
                .error(function(error) {

                });
            $location.path('/');
        };

        vm.logout();
    }


    LogoutController.$inject = ['authService', '$location', '$scope'];

    angular.module('foodApp.controllers')
        .controller('LogoutController', LogoutController);
})();