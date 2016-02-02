(function() {
    var EditIngredientController = function(measurementsService, ingredientsService, $location, $routeParams, $window) {
        var vm = this;
        vm.ingredientId = $routeParams.id;
        vm.ingredient = {};

        function init() {

            ingredientsService.getIngredientById(vm.ingredientId)
                .success(function(ingredient) {
                    vm.ingredient = ingredient;
                    vm.checkedIngredientId = ingredient.id;
                })
                .error(function(data, status, headers, config) {

                });

            measurementsService.getMeasurements()
                .success(function(measurements) {
                    vm.measurements = measurements;
                    for (var i = 0; i < measurements.length; i++) {
                        var measurement = measurements[i];
                        if (measurement.id === vm.ingredient.measurement_id) {
                            vm.selectedMeasurement = measurement;
                            break;
                        }
                    }
                })
                .error(function(data, status, headers, config) {
                    console.log(status);
                });
        }

        init();

        vm.saveIngredient = function() {
            var ingredientToSave = {
                name: vm.ingredient.name,
                calories: parseInt(vm.ingredient.calories),
                fat: parseInt(vm.ingredient.fat),
                carbohydrates: parseInt(vm.ingredient.carbohydrates),
                protein: parseInt(vm.ingredient.protein),
                portionSize: parseInt(vm.ingredient.portionSize),
                measurement_id: parseInt(vm.selectedMeasurement.id)
            };

            ingredientsService.updateIngredient(vm.checkedIngredientId, ingredientToSave)
                .then(function(ingredient) {
                    $window.history.back();
                }, function(error) {
                    console.log(error);
                });
        };

        vm.cancel = function() {
            $window.history.back();
        };
    };

    EditIngredientController.$inject = ['measurementsService', 'ingredientsService', '$location', '$routeParams', '$window'];

    angular.module('foodApp.controllers')
        .controller('EditIngredientController', EditIngredientController);
})();