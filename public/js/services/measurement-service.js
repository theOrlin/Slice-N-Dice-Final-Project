(function() {
    'use strict';

    var measurementService = function($http) {
        this.addMeasurement = function(measurement) {
            //console.log(measurement);
            return $http.post('/measurement', { name: measurement.name });
        };
    };

    measurementService.$inject = ['$http'];

    angular.module('foodApp').service('measurementService', measurementService);
})();