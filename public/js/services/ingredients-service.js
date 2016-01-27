(function() {
    'use strict';

    var ingredientsService = function($http) {
        this.getIngredients = function() {
            return $http.get('/api/ingredients');
        };
    };

    ingredientsService.$inject = ['$http'];

    angular.module('foodApp').service('ingredientsService', ingredientsService);
})();