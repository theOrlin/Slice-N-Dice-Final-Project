(function() {
    'use strict';

    var EditIngredientController = function(measurementsService, ingredientsService, $location, $routeParams, $window, Notification) {
        var vm = this;
        vm.ingredientId = $routeParams.id;
        vm.ingredient = {};

        function init() {

            ingredientsService.getIngredientById(vm.ingredientId)
                .then(function(ingredient) {
                    vm.ingredient = ingredient.data;
                    vm.verifiedIngredientId = vm.ingredient.id;
                    return measurementsService.getMeasurements();
                }, function(data) {
                    Notification.error(data.statusText);
                })
                .then(function(measurements) {
                    vm.measurements = measurements.data;
                    for (var i = 0; i < measurements.data.length; i++) {
                        var measurement = measurements.data[i];
                        if (measurement.id === vm.ingredient.measurement_id) {
                            vm.selectedMeasurement = measurement;
                            break;
                        }
                    }
                }, function(data) {
                    Notification.error(data.statusText);
                });

            //measurementsService.getMeasurements()
            //    .then(function(measurements) {
            //        vm.measurements = measurements.data;
            //        for (var i = 0; i < measurements.data.length; i++) {
            //            var measurement = measurements.data[i];
            //            if (measurement.id === vm.ingredient.measurement_id) {
            //                vm.selectedMeasurement = measurement;
            //                break;
            //            }
            //        }
            //    }, function(data) {
            //        Notification.error(data.statusText);
            //    });
        }

        init();

        vm.saveIngredient = function() {
            var ingredientToSave = {
                name: vm.ingredient.name,
                calories: parseInt(vm.ingredient.calories),
                fat: parseFloat(vm.ingredient.fat),
                carbohydrates: parseFloat(vm.ingredient.carbohydrates),
                protein: parseFloat(vm.ingredient.protein),
                portionSize: parseFloat(vm.ingredient.portionSize),
                measurement_id: parseFloat(vm.selectedMeasurement.id)
            };

            ingredientsService.updateIngredient(vm.verifiedIngredientId, ingredientToSave)
                .then(function() {
                    Notification.info('Saved.');
                    $window.history.back();
                }, function(data) {
                    Notification.error(data.statusText);
                });
        };

        vm.goBack = function() {
            $window.history.back();
        };
    };

    EditIngredientController.$inject = ['measurementsService', 'ingredientsService', '$location', '$routeParams', '$window', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('EditIngredientController', EditIngredientController);
})();