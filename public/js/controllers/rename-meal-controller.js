(function() {
    'use strict';

    var RenameMealController = function(mealsService, $location, $routeParams, $window) {
        var vm = this;
        vm.meal = {};
        vm.mealId = $routeParams.id;

        function init() {
            mealsService.getMeal(vm.mealId)
                .success(function(meal) {
                    vm.verifiedMealId = meal.id;
                    vm.meal = meal;
                })
                .error(function(error) {

                });
        }

        init();

        vm.renameMeal = function() {
            mealsService.renameMeal(vm.verifiedMealId, vm.meal.name)
                .then(function(meal) {
                    $window.history.back();
                }, function(error) {
                    console.log(error);
                });
        };

        vm.cancel = function() {
            $window.history.back();
        };
    };

    RenameMealController.$inject = ['mealsService', '$location', '$routeParams', '$window'];

    angular.module('foodApp.controllers')
        .controller('RenameMealController', RenameMealController);
})();