(function() {
    'use strict';

    var mealsService = function($http) {
        this.getMeals = function() {
            return $http.get('/api/meals');
        };
    };

    mealsService.$inject = ['$http'];

    angular.module('foodApp').service('mealsService', mealsService);
})();