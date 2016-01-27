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
    };

    ingredientsService.$inject = ['$http'];

    angular.module('foodApp').service('ingredientsService', ingredientsService);
})();