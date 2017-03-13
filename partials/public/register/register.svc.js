/**
 * Created by lkc-dev on 12/3/16.
 */
(function() {
    'use strict';

    angular.module('cephas.registerModule').service('registerSvc', function ($http, $rootScope, jwtHelper, $window, $localStorage, sessionSvc, WEB_URLS /*, $localStorage, AUTH_EVENTS*/) {
        console.log("Register Service is called ....");

        this.registerCall = function(credentials, success, error) {

            console.log(credentials.title + "   " + credentials.firstName);

            $http({
                method : 'POST',
                url : WEB_URLS.registrationURL,
                //url : 'http://localhost:8080/fhscServices/rest/fhsc/register',
                data : angular.toJson(credentials),
                headers : {
                    'Content-Type' : 'application/json'//'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response);
                success(true);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                //console.log(response);

                console.log("Registration failed  .........! ");
                error(false);
            });
        }

    });

})();