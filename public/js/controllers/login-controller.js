(function() {
    'use strict';

    function LoginController(authService, $location) {
        var vm = this;
        vm.user = {};

        vm.submit = function() {
            authService.login(vm.user)
            .success(function(data, status, headers, config) {
                localStorage.setItem('auth_token', headers('Auth'));
                //console.log(headers('Auth'));
                $location.path('/');
            })
            .error(function(error) {

            });
        };
    }


    LoginController.$inject = ['authService', '$location'];

    angular.module('foodApp.controllers')
        .controller('LoginController', LoginController);
})();