(function(){
    'use strict';

    var MealController = function(mealsService, $routeParams) {
        var mealId = $routeParams.id;

    };

    MealController.$inject = ['mealsService', '$routeParams'];

    angular.module('foodApp.controllers')
        .controller('MealController', MealController);
})();