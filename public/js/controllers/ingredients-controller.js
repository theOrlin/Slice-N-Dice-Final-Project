(function() {
    'use strict';

    function IngredientsController(ingredientsService, Notification) {
        var vm = this;

        function init() {
            ingredientsService.getIngredients()
                .then(function(ingredients) {
                    vm.ingredients = ingredients.data;
                }, function(data) {
                    Notification.error(data.statusText);
                });
        }

        init();

        vm.log = function() {
            console.log(vm.selectedIngredient);
        };

        vm.getIngredientsByName = function(ingredientName) {
            return ingredientsService.getIngredientByName(ingredientName)
                .then(function(response) {
                    return response.data;
                });
        };
    }

    IngredientsController.$inject = ['ingredientsService', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('IngredientsController', IngredientsController);
})();