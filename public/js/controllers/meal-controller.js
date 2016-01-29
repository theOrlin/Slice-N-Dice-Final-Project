(function() {
    'use strict';

    var MealController = function(mealsService, $routeParams, ingredientsService) {
        var vm = this;
        vm.mealId = $routeParams.id;
        vm.meal = {};
        vm.tempQuantity = 1;

        function init() {
            mealsService.getMeal(vm.mealId)
                .success(function(meal) {
                    vm.meal = meal;
                    console.log(meal);
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

        vm.addIngredient = function(ingredient) {

        };
    };

    MealController.$inject = ['mealsService', '$routeParams', 'ingredientsService'];

    angular.module('foodApp.controllers')
        .controller('MealController', MealController);
})();