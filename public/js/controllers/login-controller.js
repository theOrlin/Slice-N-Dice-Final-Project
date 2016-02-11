(function() {
    'use strict';

    function LoginController(authService, $location, $scope, Notification) {
        var vm = this;
        vm.user = {};

        vm.login = function() {
            authService.login(vm.user)
                .then(function(data, status, headers, config) {
                    localStorage.setItem('auth_token', data.headers('Auth'));
                    $scope.tvm.updateLoginStatus(true);
                    Notification.success('Logged in.');
                    $location.path('/meals');
                }, function(data) {
                    Notification.error(data.statusText);
                });
        };
    }


    LoginController.$inject = ['authService', '$location', '$scope', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('LoginController', LoginController);
})();