(function() {
    'use strict';

    function IngredientsController(ingredientsService) {
        var vm = this;

        function init() {
            ingredientsService.getIngredients()
            .success(function(ingredients) {
                vm.ingredients = ingredients.slice();
            })
            .error(function(data, status, headers, config) {
               console.log(status);
            });
        }

        init();
    }

    IngredientsController.$inject = ['ingredientsService'];

    angular.module('foodApp.controllers')
        .controller('IngredientsController', IngredientsController);
})();