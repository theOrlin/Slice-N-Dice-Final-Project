(function() {
    'use strict';

    function RegisterController() {
        var vm = this;

        vm.register = function(user, registerForm) {
            if (registerForm.$invalid) {
                return;
            }
        };
    }

    angular.module('foodApp.controllers')
        .controller('RegisterController', [RegisterController]);
})();