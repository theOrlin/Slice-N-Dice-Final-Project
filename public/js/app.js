(function() {
    'use strict';

    function config($routeProvider, $locationProvider) {
        var CONTROLLER_VIEW_MODEL_NAME = 'vm';

        $locationProvider.html5Mode(true);

        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: 'HomeController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/register', {
                templateUrl: 'views/register.html',
                controller: 'RegisterController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/login', {
                templateUrl: 'views/login.html',
                controller: 'LoginController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/getingredients', {
                templateUrl: 'views/ingredients.html',
                controller: 'IngredientsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/addmeasurement', {
                templateUrl: 'views/measurement.html',
                controller: 'MeasurementsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/addingredient', {
                templateUrl: 'views/add-ingredient.html',
                controller: 'AddIngredientController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .otherwise({ redirectTo: '/' });
    }

    angular.module('foodApp.controllers', []);

    angular.module('foodApp', ['ngRoute', 'foodApp.controllers'])
        .config(['$routeProvider', '$locationProvider', config]);
})();
