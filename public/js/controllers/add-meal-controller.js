(function() {
    'use strict';

    var AddMealController = function(mealsService, $location, Notification) {
        var vm = this;
        vm.meal = {};

        vm.addMeal = function() {
            mealsService.addMeal(vm.meal)
                .then(function(meals) {
                    Notification.info('Added.');
                    $location.path('/meals');
                }, function(data) {
                    Notification.error(data.statusText);
                });
        };
    };

    AddMealController.$inject = ['mealsService', '$location', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('AddMealController', AddMealController);
})();