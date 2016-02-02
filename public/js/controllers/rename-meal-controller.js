(function() {
    'use strict';

    var RenameMealController = function(mealsService, $location, $routeParams, $window, Notification) {
        var vm = this;
        vm.meal = {};
        vm.mealId = $routeParams.id;

        function init() {
            mealsService.getMeal(vm.mealId)
                .then(function(meal) {
                    vm.verifiedMealId = meal.data.id;
                    vm.meal = meal.data;
                }, function(data, status, headers, config, statusText) {
                    Notification.error(statusText);
                });
        }

        init();

        vm.renameMeal = function() {
            mealsService.renameMeal(vm.verifiedMealId, vm.meal.name)
                .then(function(meal) {
                    Notification.info('Renamed.');
                    $window.history.back();
                }, function(data) {
                    Notification.error(data.statusText);
                });
        };

        vm.cancel = function() {
            $window.history.back();
        };
    };

    RenameMealController.$inject = ['mealsService', '$location', '$routeParams', '$window', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('RenameMealController', RenameMealController);
})();