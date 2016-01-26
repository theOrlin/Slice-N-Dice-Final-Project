(function() {
    'use strict';

    function LoginController(authService) {
        var vm = this;
        vm.user = {};

        vm.submit = function() {
            authService.login(vm.user);
        };
    }


    LoginController.$inject = ['authService'];

    angular.module('foodApp.controllers')
        .controller('LoginController', LoginController);
})();