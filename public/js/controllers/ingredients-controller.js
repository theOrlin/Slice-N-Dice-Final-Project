(function() {
    'use strict';

    function IngredientsController(ingredientsService) {
        var vm = this;

        function init() {
            ingredientsService.getIngredients()
                .success(function(ingredients) {
                    vm.ingredients = ingredients;
                })
                .error(function(data, status, headers, config) {
                    console.log(status);
                });
        }

        init();
        vm.log = function() {
            console.log(vm.selectedIngredient);
        };
        //vm.getIngredientsByName = function(ingredientName) {
        //    ingredientsService.getIngredientByName(ingredientName)
        //    .then(function(response) {
        //        vm.ingredients = response;
        //    }, function(error){
        //
        //    });
        //};


    }

    IngredientsController.$inject = ['ingredientsService'];

    angular.module('foodApp.controllers')
        .controller('IngredientsController', IngredientsController);
})();