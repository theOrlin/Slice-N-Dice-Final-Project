(function() {
    'use strict';

    var MealController = function(mealsService, $routeParams, ingredientsService) {
        var vm = this;
        vm.mealId = $routeParams.id;
        vm.selectedIngredient = null;

        function init() {
            mealsService.getMeal(vm.mealId)
                .success(function(meal) {
                    vm.originalMeal = meal;
                    vm.originalMeal.sums = {};
                    vm.calculateSums(vm.originalMeal);
                })
                .error(function(error) {

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
                .success(function(response) {
                    vm.selectedIngredient = null;
                    init();
                });
        };

        vm.deleteIngredientFromMeal = function(ingredientId) {
            mealsService.deleteIngredientFromMeal(vm.mealId, ingredientId)
                .success(function() {
                    init();
                })
                .error(function(error) {

                });
        };

        vm.calculateSums = function(meal) {
            mealsService.calculateSums(meal);
        };
    };

    MealController.$inject = ['mealsService', '$routeParams', 'ingredientsService'];

    angular.module('foodApp.controllers')
        .controller('MealController', MealController);
})();