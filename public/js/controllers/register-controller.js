(function() {
    'use strict';

    function RegisterController(registerService, $location, $window, Notification) {
        var vm = this;
        vm.user = {};
        vm.loading = false;
        vm.disabled = false;

        vm.register = function() {
            if (vm.user.email && (vm.user.password === vm.user.confirmPassword)) {
                vm.loading = true;
                registerService.registerUser(vm.user)
                    .then(function() {
                        Notification.success('User registered.');
                        $location.path('/login');
                    }, function(error) {
                        Notification.error(error.data);
                    })
                    .finally(function() {
                        vm.loading = false;
                    });
            }
            else {
                Notification.error("Form not filled out properly.");
            }
        };
    }

    RegisterController.$inject = ['registerService', '$location', '$window', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('RegisterController', RegisterController);
})();