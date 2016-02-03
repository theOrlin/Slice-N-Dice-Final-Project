(function() {
    'use strict';

    function IngredientController(ingredientsService, $routeParams, Notification) {
        var vm = this;
        vm.ingredientId = $routeParams.id;

        function init() {
            ingredientsService.getIngredientById(vm.ingredientId)
                .then(function(ingredient) {
                    vm.ingredient = ingredient.data;
                    vm.quantity = vm.ingredient.portionSize;
                }, function(data) {
                    Notification.error(data.statusText);
                });
        }

        init();
    }

    IngredientController.$inject = ['ingredientsService', '$routeParams', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('IngredientController', IngredientController);
})();