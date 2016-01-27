(function() {
    'use strict';

    var MealsController = function(mealsService) {
        var vm = this;
        vm.meals = [];

        vm.getMeals = function() {
            mealsService.getMeals()
                .then(function(meals) {
                    vm.meals = meals;
                }, function(error) {
                    console.log(error);
                });
        };
    };

    MealsController.$inject = ['mealsService'];

    angular.module('foodApp.controllers')
        .controller('MealsController', MealsController);
})();