(function() {
    'use strict';

    var IngredientController = function() {
        function init() {
            measurementService.getMeasurements()
                .success(function(ingredients) {
                    vm.ingredients = ingredients.slice();
                })
                .error(function(data, status, headers, config) {
                    console.log(status);
                });
        }

        init();
    };

    IngredientController.$inject(['measurementService']);
    angular.module('foodApp.controllers')
        .controller('IngredientController', [IngredientController]);
})();