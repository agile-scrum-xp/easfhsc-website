/**
 * Created by lkc-dev on 3/6/17.
 */


(function () {
    'use strict';
    /**
     * This interceptor will make sure that, after each $http request if the user
     * doesn't have access to something runs the according event, given the
     * response status codes from the server.
     */
    angular.module('fhscModule').factory('AuthInterceptor',
        ['$rootScope', '$q', '$localStorage','AUTH_EVENTS', function ($rootScope, $q, $localStorage, AUTH_EVENTS) {
            console.log("AuthInterceptor is called");

            return {
                request: function (config) {
                    console.log("AuthInterceptor request object called");
                    config.headers = config.headers || {};
                    if ($localStorage.currentUser) {
                        var data = $localStorage.currentUser;
                        console.log(data.token);
                        config.headers.Authorization = 'Bearer ' + data.token;
                    }
                    return config || $q.when(config);
                },
                responseError: function (response) {
                    console.log("AuthInterceptor responseError object is called");
                    $rootScope.$broadcast({
                        401: AUTH_EVENTS.notAuthenticated,
                        403: AUTH_EVENTS.notAuthorized,
                        419: AUTH_EVENTS.sessionTimeout,
                        440: AUTH_EVENTS.sessionTimeout
                    }[response.status], response);
                    return $q.reject(response);
                }
            };
        }]);
})();