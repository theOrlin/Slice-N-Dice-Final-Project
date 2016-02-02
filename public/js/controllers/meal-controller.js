(function() {
    'use strict';

    var MealController = function(mealsService, $routeParams, ingredientsService, Notification) {
        var vm = this;
        vm.mealId = $routeParams.id;
        vm.selectedIngredient = null;

        function init() {
            mealsService.getMeal(vm.mealId)
                .then(function(meal) {
                    vm.originalMeal = meal.data;

                    mealsService.calculateSums(meal.data);
                }, function(data) {
                    Notification.error(data.statusText);
                });
        }

        init();

        vm.getIngredientsByName = function(ingredientName) {
            return ingredientsService.getIngredientByName(ingredientName)
                .then(function(response) {
                    return response.data;
                });
        };

        vm.onSelect = function($item, $model, $label) {
            vm.tempQuantity = $item.portionSize;
        };

        vm.log = function(str) {
            console.log(ingredient.id);
        };

        vm.addIngredient = function(ingredient, quantity) {
            mealsService.addIngredient(vm.mealId, ingredient.id, quantity)
                .then(function(response) {
                    vm.selectedIngredient = null;

                    Notification.info('Added.');
                    init();
                }, function(data, status, headers, config, statusText) {
                    Notification.error(statusText);
                });
        };

        vm.deleteIngredientFromMeal = function(ingredientId) {
            mealsService.deleteIngredientFromMeal(vm.mealId, ingredientId)
                .then(function() {
                    init();
                }, function(data) {
                    Notification.error(data.statusText);
                });
        };

        vm.calculateSums = function(meal) {
            mealsService.calculateSums(meal);
        };
    };

    MealController.$inject = ['mealsService', '$routeParams', 'ingredientsService', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('MealController', MealController);
})();