(function() {
    'use strict';

    var measurementService = function($http) {
        this.addMeasurement = function(measurement) {
            //console.log(measurement);
            return $http.post('/api/measurement', { name: measurement.name });
        };

        this.getMeasurements = function() {
          return $http.get('/api/measurement');
        };
    };

    measurementService.$inject = ['$http'];

    angular.module('foodApp').service('measurementService', measurementService);
})();