(function() {
    'use strict';

    var MealsController = function(mealsService) {
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
                .success(function(meals) {
                    vm.meals = meals;
                    vm.meals.forEach(function(meal) {
                        mealsService.calculateSums(meal);
                    });
                    vm.calculateTotals();
                })
                .error(function(error) {

                });
        }

        init();

        vm.calculateSums = function(meal) {
            mealsService.calculateSums(meal);
            vm.calculateTotals();
        };

        vm.addIngredient = function(mealId, ingredient, quantity) {
            mealsService.addIngredient(mealId, ingredient.id, quantity)
                .success(function(response) {
                    vm.selectedIngredient = null;
                    init();
                });
        };

        vm.deleteIngredientFromMeal = function(mealId, ingredientId) {
            mealsService.deleteIngredientFromMeal(mealId, ingredientId)
                .success(function() {
                    init();
                })
                .error(function(error) {

                });
        };

        vm.deleteMeal = function(mealId) {
            mealsService.deleteMeal(mealId)
            .success(function(){
                init();
            })
            .error(function(error){

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

    MealsController.$inject = ['mealsService'];

    angular.module('foodApp.controllers')
        .controller('MealsController', MealsController);
})();