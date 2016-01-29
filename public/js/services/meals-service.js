(function() {
    'use strict';

    var mealsService = function($http) {
        this.getMeals = function() {
            return $http.get('/api/meals');
        };

        this.addMeal = function(meal) {
            return $http.post('/api/meal', { name: meal.name });
        };

        this.getMeal = function(id) {
            return $http.get('api/meal/' + id);
        };

        this.addIngredient = function(mealId, ingredientId, ingredientQuantity) {
            return $http.put('/api/meals/' + mealId, {id: ingredientId, quantity: ingredientQuantity});
        };
    };

    mealsService.$inject = ['$http'];

    angular.module('foodApp').service('mealsService', mealsService);
})();