(function() {
    'use strict';

    function AddIngredientController(measurementsService, ingredientsService, $location, $window, Notification) {
        var vm = this;
        vm.ingredient = {};

        function init() {
            measurementsService.getMeasurements()
                .then(function(ingredients) {
                    vm.ingredients = ingredients.data;
                }, function(data) {
                    Notification.error(data.statusText);
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
                    Notification.info('Added.');
                    $window.history.back();
                }, function(data) {
                    Notification.error(data.statusText);
                });
        };
        vm.goToNewMeasurement = function() {
            $location.path( '/addmeasurement' );
        };

        vm.goBack = function() {
            $window.history.back();
        };
    }

    AddIngredientController.$inject = ['measurementsService', 'ingredientsService', '$location', '$window', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('AddIngredientController', AddIngredientController);
})();