(function() {
    'use strict';

    function IngredientsController(ingredientsService, $http) {
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

        vm.getIngredientsByName = function(ingredientName) {
            //return $http.get('/api/ingredients?find=' + ingredientName);
            return ingredientsService.getIngredientByName(ingredientName)
            .then(function(response){
                return response.data;
            });
        };


    }

    IngredientsController.$inject = ['ingredientsService', '$http'];

    angular.module('foodApp.controllers')
        .controller('IngredientsController', IngredientsController);
})();