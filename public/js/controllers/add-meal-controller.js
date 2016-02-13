(function() {
    'use strict';

    var AddMealController = function(mealsService, $location, $window, Notification) {
        var vm = this;
        vm.meal = {};
        vm.loading = false;

        vm.addMeal = function() {
            vm.loading = true;
            mealsService.addMeal(vm.meal)
                .then(function(meals) {
                    Notification.info('Added.');
                    $location.path('/meals');
                }, function(data) {
                    Notification.error(data.statusText);
                })
                .finally(function() {
                    vm.loading = false;
                });
        };

        vm.goBack = function() {
            $window.history.back();
        };
    };

    AddMealController.$inject = ['mealsService', '$location', '$window', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('AddMealController', AddMealController);
})();