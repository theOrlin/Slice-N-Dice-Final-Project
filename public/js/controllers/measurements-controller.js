(function() {
    'use strict';

    var MeasurementsController = function(measurementService, $window, Notification) {
        var vm = this;
        vm.measurement = {};
        vm.loading = false;

        vm.addMeasurement = function() {
            vm.loading = true;
            measurementService.addMeasurement(vm.measurement)
                .then(function() {
                    Notification.info('Added.');
                    $window.history.back();
                }, function(data) {
                    Notification.error(data.statusText);
                })
                .finally(function() {
                    vm.loading = false;
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