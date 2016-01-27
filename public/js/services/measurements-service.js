(function() {
    'use strict';

    var measurementsService = function($http) {
        this.addMeasurement = function(measurement) {
            return $http.post('/api/measurement', { name: measurement.name });
        };

        this.getMeasurements = function() {
          return $http.get('/api/measurements');
        };
    };

    measurementsService.$inject = ['$http'];

    angular.module('foodApp').service('measurementsService', measurementsService);
})();