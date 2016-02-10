(function() {
    'use strict';

    var MeasurementsController = function(measurementService, $window, Notification) {
        var vm = this;
        vm.measurement = {};

        vm.addMeasurement = function() {
            measurementService.addMeasurement(vm.measurement)
                .then(function() {
                    Notification.info('Added.');
                    $window.history.back();
                }, function(data) {
                    Notification.error(data.statusText);
                });
        };

        vm.goBack = function() {
            $window.history.back();
        };
    };

    MeasurementsController.$inject = ['measurementsService', '$window', 'Notification'];

    angular.module('foodApp.controllers')
        .controller('MeasurementsController', MeasurementsController);
})();