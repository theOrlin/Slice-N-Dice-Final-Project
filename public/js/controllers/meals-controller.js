(function() {
    'use strict';

    var MealsController = function(mealsService, Notification) {
        var vm = this;
        vm.meals = [];
        vm.totals = {
            calories: 0,
            fat: 0,
            carbohydrates: 0,
            protein: 0
        };

        function init() {
            mealsService.getMeals()
                .then(function(meals) {
                    vm.meals = meals.data;

                    vm.meals.forEach(function(meal) {
                        mealsService.calculateSums(meal);
                    });
                    vm.calculateTotals();
                }, function(data, status, headers, config, statusText) {
                    Notification.error(statusText);
                });

        }

        init();

        vm.calculateSums = function(meal) {
            mealsService.calculateSums(meal);
            vm.calculateTotals();
        };

        vm.addIngredient = function(mealId, ingredient, quantity) {
            mealsService.addIngredient(mealId, ingredient.id, quantity)
                .then(function(response) {
                    vm.selectedIngredient = null;

                    Notification.info('Added.');
                    init();
                }, function(data, status, headers, config, statusText) {
                    Notification.error(statusText);
                });
        };

        vm.deleteIngredientFromMeal = function(mealId, ingredientId) {
            mealsService.deleteIngredientFromMeal(mealId, ingredientId)
                .then(function() {
                    init();
                }, function(data, status, headers, config, statusText) {
                    Notification.error(statusText);
                });
        };

        vm.deleteMeal = function(mealId) {
            mealsService.deleteMeal(mealId)
                .then(function() {
                    Notification.info('Deleted.');
                    init();
                }, function(data) {
                    Notification.error(data.statusText);
                });
        };

        vm.calculateTotals = function() {
            vm.totals = {
                calories: 0,
                fat: 0,
                carbohydrates: 0,
                protein: 0
            };

            vm.meals.forEach(function(meal) {
                vm.totals.calories += meal.sums.calories;
                vm.totals.fat += meal.sums.fat;
                vm.totals.carbohydrates += meal.sums.carbohydrates;
                vm.totals.protein += meal.sums.protein;
            });
        };
    };

    MealsController.$inject = ['mealsService', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('MealsController', MealsController);
})();