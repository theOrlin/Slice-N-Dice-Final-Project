(function() {
    'use strict';

    var ingredientsService = function($http) {
        this.getIngredients = function() {
            return $http.get('/api/ingredients');
        };

        this.addIngr = function(ingredient) {
            //console.log(ingredient);
            return $http.post('/api/ingredient', ingredient);
        };

        this.getIngredientByName = function(name) {
            return $http.get('/api/ingredients?find=' + name);
        };

        this.getIngredientById = function(id) {
            return $http.get('/api/ingredient/' + id);
        };

        this.updateIngredient = function(id, updatedIngredient) {
            return $http.put('/api/ingredient/' + id, updatedIngredient);
        }
    };

    ingredientsService.$inject = ['$http'];

    angular.module('foodApp').service('ingredientsService', ingredientsService);
})();