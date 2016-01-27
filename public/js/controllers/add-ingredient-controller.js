(function() {
    'use strict';

    function AddIngredientController(measurementsService, ingredientsService, $location) {
        var vm = this;
        vm.ingredient = {};

        function init() {
            measurementsService.getMeasurements()
                .success(function(ingredients) {
                    vm.ingredients = ingredients;
                })
                .error(function(data, status, headers, config) {
                    console.log(status);
                });
        }

        init();

        vm.addIngredient = function() {
            var ingredientToAdd = {
                name: vm.ingredient.name,
                calories: parseInt(vm.ingredient.calories),
                fat: parseInt(vm.ingredient.fat),
                carbohydrates: parseInt(vm.ingredient.carbohydrates),
                protein: parseInt(vm.ingredient.protein),
                portionSize: parseInt(vm.ingredient.portionSize),
                measurement_id: parseInt(vm.ingredient.measurement_id.id)
            };
            ingredientsService.addIngr(ingredientToAdd)
            .then(function(ingredient) {
                $location.path('/getingredients');
            }, function(error) {
                console.log(error);
            });
        };
    }

    AddIngredientController.$inject = ['measurementsService', 'ingredientsService', '$location'];

    angular.module('foodApp.controllers')
        .controller('AddIngredientController', AddIngredientController);
})();