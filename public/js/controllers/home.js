(function() {
    'use strict';

    function HomeController() {
        var vm = this;
        debugger;
        console.log('Loaded home controller');
    }
    angular.module('foodApp.controllers')
        .controller('HomeController', [HomeController]);
})();