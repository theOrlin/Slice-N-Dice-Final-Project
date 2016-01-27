(function() {
    'use strict';

    var mealsService = function($http) {
        this.getMeals = function() {
            return $http.get('/api/meals');
        };

        this.addMeal = function(meal) {
            return $http.post('/api/meal', { name: meal.name });
        };
    };

    mealsService.$inject = ['$http'];

    angular.module('foodApp').service('mealsService', mealsService);
})();