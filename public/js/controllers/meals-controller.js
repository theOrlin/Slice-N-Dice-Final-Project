(function() {
    'use strict';

    var MealsController = function(mealsService) {
        var vm = this;
        vm.meals = [];

        function init() {
            mealsService.getMeals()
            .success(function(meals){
                vm.meals = meals;
            })
            .error(function(error){

            });
        }

        init();
    };

    MealsController.$inject = ['mealsService'];

    angular.module('foodApp.controllers')
        .controller('MealsController', MealsController);
})();