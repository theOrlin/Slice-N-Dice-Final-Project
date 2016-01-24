(function() {
    'use strict';

    function config($routeProvider) {
        var CONTROLLER_VIEW_MODEL_NAME = 'vm';

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
            .otherwise({ redirectTo: '/' });
    }

    angular.module('foodApp.controllers', []);

    angular.module('foodApp', ['ngRoute', 'foodApp.controllers'])
        .config(['$routeProvider', config]);
})();
