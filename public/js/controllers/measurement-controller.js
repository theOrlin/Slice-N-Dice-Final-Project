(function() {
    'use strict';

    var MeasurementController = function(measurementService) {
        var vm = this;
        vm.measurement = {};

        vm.submit = function() {
            measurementService.addMeasurement(vm.measurement);
        };

    };

    MeasurementController.$inject = ['measurementService'];
    angular.module('foodApp.controllers')
        .controller('MeasurementController', MeasurementController);
})();