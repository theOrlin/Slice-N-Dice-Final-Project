(function() {
    'use strict';

    var MealController = function(mealsService, $routeParams, ingredientsService) {
        var vm = this;
        vm.mealId = $routeParams.id;
        vm.meal = {};
        vm.tempQuantity = 0;
        vm.selectedIngredient = null;

        function init() {
            mealsService.getMeal(vm.mealId)
                .success(function(meal) {
                    vm.meal = meal;
                    //console.log(meal);
                })
                .error(function(error) {

                });
        }

        init();

        vm.getIngredientsByName = function(ingredientName) {
            return ingredientsService.getIngredientByName(ingredientName)
                .then(function(response){
                    return response.data;
                });
        };

        vm.onSelect = function($item, $model, $label) {
            vm.tempQuantity = $item.portionSize;
        };

        vm.log = function(ingredient, quantity) {
            console.log(ingredient.id);
        };

        vm.addIngredient = function(ingredient, quantity) {
            mealsService.addIngredient(vm.mealId, ingredient.id, quantity)
            .success(function(response){
                vm.selectedIngredient = null;
                init();
            });
        };
    };

    MealController.$inject = ['mealsService', '$routeParams', 'ingredientsService'];

    angular.module('foodApp.controllers')
        .controller('MealController', MealController);
})();