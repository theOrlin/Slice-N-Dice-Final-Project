(function() {
    'use strict';

    var AddMealController = function(mealsService, $location) {
        var vm = this;
        vm.meal = {};

        vm.addMeal = function() {
            mealsService.addMeal(vm.meal)
                .then(function(meals) {
                    $location.path('/getmeals');
                }, function(error) {
                    console.log(error);
                });
        };
    };

    AddMealController.$inject = ['mealsService', '$location'];

    angular.module('foodApp.controllers')
        .controller('AddMealController', AddMealController);
})();