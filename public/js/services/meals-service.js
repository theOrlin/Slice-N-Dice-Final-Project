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

        this.addIngredient = function(mealId, ingredientId) {
            return $http.post('/api/meals/' + mealId, {id: ingredientId});
        };
    };

    mealsService.$inject = ['$http'];

    angular.module('foodApp').service('mealsService', mealsService);
})();