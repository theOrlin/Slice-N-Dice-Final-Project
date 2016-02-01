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
            .when('/editingredient/:id', {
                templateUrl: 'views/edit-ingredient.html',
                controller: 'EditIngredientController',
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
            .when('/meals', {
                templateUrl: 'views/meals.html',
                controller: 'MealsController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/meal/:id', {
                templateUrl: 'views/meal.html',
                controller: 'MealController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/addmeal', {
                templateUrl: 'views/add-meal.html',
                controller: 'AddMealController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .when('/renamemeal/:id', {
                templateUrl: 'views/rename-meal.html',
                controller: 'RenameMealController',
                controllerAs: CONTROLLER_VIEW_MODEL_NAME
            })
            .otherwise({ redirectTo: '/' });
    }

    angular.module('foodApp.controllers', []);

    angular.module('foodApp', ['ngRoute', 'foodApp.controllers', 'ui.bootstrap'])
        .config(['$routeProvider', '$locationProvider', config]);
})();
