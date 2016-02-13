(function() {
    'use strict';

    var MainController = function(authService, ingredientsService, $location) {
        var vm = this;
        vm.loggedItem = null;

        authService.checkForLogin()
            .then(function(success) {
                vm.globalUserIsAuthenticated = true;
            }, function(error) {
                vm.globalUserIsAuthenticated = false;
            });

        vm.globalGetIngredientsByName = function(ingredientName) {
            return ingredientsService.getIngredientByName(ingredientName)
                .then(function(response) {
                    return response.data;
                });
        };

        vm.redirectToIngredient = function(ingredientId) {
            vm.loggedItem = null;
            $location.path('/ingredient/' + ingredientId);
        };

        vm.updateLoginStatus = function(isLoggedIn) {
            if (typeof isLoggedIn === 'boolean') {
                vm.globalUserIsAuthenticated = isLoggedIn;
            }
        };
    };

    MainController.$inject = ['authService', 'ingredientsService', '$location'];

    angular.module('foodApp')
        .controller('MainController', MainController);
})();