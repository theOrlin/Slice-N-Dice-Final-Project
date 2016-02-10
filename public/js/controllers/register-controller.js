(function() {
    'use strict';

    function RegisterController(registerService, $location, $window, Notification) {
        var vm = this;
        vm.user = {};

        vm.register = function() {
            if (vm.user.email && (vm.user.password === vm.user.confirmPassword)) {
                registerService.registerUser(vm.user)
                .then(function(){
                    Notification.success('User registered.');
                    $location.path('/login');
                }, function(data){
                    Notification.error(data.statusText);
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