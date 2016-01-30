(function() {
    'use strict';

    var MealController = function(mealsService, $routeParams, ingredientsService) {
        var vm = this;
        vm.mealId = $routeParams.id;
        vm.calculatedMeal = {};
        vm.tempQuantity = 0;
        vm.selectedIngredient = null;
        vm.sums = {
            calories: 0,
            fat: 0,
            carbohydrates: 0,
            protein: 0
        };

        function init() {
            mealsService.getMeal(vm.mealId)
                .success(function(meal) {
                    vm.originalMeal = meal;
                    vm.calculatedMeal = mealsService.calculateValues(meal);
                    calculateSums();
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

        vm.recalculateValues = function(newQuantity, index) {
            newQuantity = parseInt(newQuantity);
            var originalIngredient = vm.originalMeal.ingredients[index];
            var ratio = newQuantity / originalIngredient.portionSize;

            vm.calculatedMeal.ingredients[index].quantity = newQuantity;
            vm.calculatedMeal.ingredients[index].calories = originalIngredient.calories * ratio;
            vm.calculatedMeal.ingredients[index].fat = originalIngredient.fat * ratio;
            vm.calculatedMeal.ingredients[index].carbohydrates = originalIngredient.carbohydrates * ratio;
            vm.calculatedMeal.ingredients[index].protein = originalIngredient.protein * ratio;

            calculateSums();
        };

        var calculateSums = function() {

            vm.sums.calories = 0;
            vm.sums.fat = 0;
            vm.sums.carbohydrates = 0;
            vm.sums.protein = 0;

            var ingredients = vm.calculatedMeal.ingredients;

            for (var i = 0; i < ingredients.length; i++) {
                var ingredient = ingredients[i];
                vm.sums.calories += ingredient.calories;
                vm.sums.fat += ingredient.fat;
                vm.sums.carbohydrates += ingredient.carbohydrates;
                vm.sums.protein += ingredient.protein;
            }
        };
    };

    MealController.$inject = ['mealsService', '$routeParams', 'ingredientsService'];

    angular.module('foodApp.controllers')
        .controller('MealController', MealController);
})();