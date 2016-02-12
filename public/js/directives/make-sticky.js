(function() {
    'use strict';

    var makeSticky = function($window) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {
                var elementOffsetTop = element[0].offsetTop;

                angular.element($window).bind("scroll", function() {
                    var $el = angular.element(element[0]);

                    if ($window.pageYOffset > elementOffsetTop) {
                        $el.addClass('sticky');
                    }
                    else {
                        $el.removeClass('sticky');
                    }
                });
            }
        };
    };

    angular.module('foodApp').directive('makeSticky', ['$window', makeSticky]);
})();