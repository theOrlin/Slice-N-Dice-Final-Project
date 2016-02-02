(function() {
    'use strict';

    function LogoutController(authService, $location, $scope, Notification) {
        var vm = this;

        vm.logout = function() {
            authService.logout()
                .then(function(data) {
                    localStorage.removeItem('auth_token');
                    $scope.tvm.updateLoginStatus(false);
                    Notification.info('Logged out.');
                }, function(data) {
                    Notification.error(data.statusText);
                });

            $location.path('/');
        };

        vm.logout();
    }


    LogoutController.$inject = ['authService', '$location', '$scope', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('LogoutController', LogoutController);
})();