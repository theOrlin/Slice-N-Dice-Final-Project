(function() {
    'use strict';

    var MeasurementsController = function(measurementService) {
        var vm = this;
        vm.measurement = {};

        vm.addMeasurement = function() {
            measurementService.addMeasurement(vm.measurement);
        };
    };

    MeasurementsController.$inject = ['measurementsService'];

    angular.module('foodApp.controllers')
        .controller('MeasurementsController', MeasurementsController);
})();