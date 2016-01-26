(function() {
    'use strict';

    var authInterceptor = function() {
        return {
            request: function(config) {
                config.headers = config.headers || {};

                if (localStorage.auth_token) {
                    config.headers.Auth = localStorage.auth_token;
                }

                return config;
            }
        };
    };

    angular.module('foodApp').service('authInterceptor', authInterceptor);

    angular.module('foodApp').config(function($httpProvider) {
        $httpProvider.interceptors.push('authInterceptor');
    });
})();