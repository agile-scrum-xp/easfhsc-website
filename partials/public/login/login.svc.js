/**
 * Created by lkc-dev on 12/3/16.
 */

(function() {
    'use strict';

    /**
     * angular.module('cephas.loginModule').service('loginSvc', [ "$rootScope", "$scope","$http", " $window", "$localStorage", "AUTH_EVENTS", loginService]);
     * is not working, which means we can't mention service parameters within [] before the function.
     * Not sure about the reason ... though was not expecting this limiitation
     */

    // angular.module('cephas.loginModule').service('loginSvc', [ /*"$rootScope", "$scope","$http", " $window", "$localStorage", "AUTH_EVENTS", */loginService]);
    //
    //     function loginService($http, jwtHelper, WEB_URLS /*, $localStorage, AUTH_EVENTS*/) {
    //
    //     console.log("Login Service is called ....");
    //
    //
    //    this.loginCall = function(username, password, success, error) {
    //         console.log(username + "  " + password);
    //
    //        var encodedString = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);
    //
    //        $http({
    //            method : 'POST',
    //            //url : WEB_URLS.loginURL,
    //            url : 'http://localhost:8080/fhscServices/rest/fhsc/login',
    //            data : encodedString,
    //            headers : {
    //                'Content-Type' : 'application/x-www-form-urlencoded'
    //            }
    //        }).then(function successCallback(response) {
    //            // this callback will be called asynchronously
    //            // when the response is available
    //            console.log(response.data.token);
    //
    //            var bool = jwtHelper.isTokenExpired(response.data.token);
    //            var date = jwtHelper.getTokenExpirationDate(response.data.token);
    //            console.log(bool + "    " + date);
    //            var token = jwtHelper.decodeToken(response.data.token);
    //            console.log(token);
    //
    //        }, function errorCallback(response) {
    //            // called asynchronously if an error occurs
    //            // or server returns response with an error status.
    //            error(false);
    //        });
    //     }
    // };

    angular.module('cephas.loginModule').service('loginSvc', function ($http, $rootScope, jwtHelper, $window, $localStorage, sessionSvc, WEB_URLS /*, $localStorage, AUTH_EVENTS*/) {

        console.log("Login Service is called ....");


        this.loginCall = function(username, password, success, error) {
            console.log(username + "  " + password);

            var encodedString = 'username=' + encodeURIComponent(username) + '&password=' + encodeURIComponent(password);

            $http({
                method : 'POST',
                url : WEB_URLS.loginURL,
                //url : 'http://localhost:8080/fhscServices/rest/fhsc/login',
                data : encodedString,
                headers : {
                    'Content-Type' : 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                // this callback will be called asynchronously
                // when the response is available
                console.log(response.data.token);

                var bool = jwtHelper.isTokenExpired(response.data.token);
                var date = jwtHelper.getTokenExpirationDate(response.data.token);

                console.log(bool + "    " + date);
                var token = jwtHelper.decodeToken(response.data.token);
                console.log(token);

                // store username and token in local storage to keep user logged in
                // between page refreshes
                $localStorage.currentUser = {
                    user : username,
                    userRole : token.roles,
                    token : response.data.token
                };

                // not sure if we need to store information in the  $window.sessionStorage ...!
                // but this storage doesn't hurt
                $window.sessionStorage.setItem("currentUser", JSON.stringify({
                    user : username,
                    userRole : token.roles,
                    token : response.data.token
                }) );

                sessionSvc.create({
                    user : username,
                    userRole : token.roles
                });

                $rootScope.currentUser = {
                    user : username,
                    userRole : token.roles
                };

                // add jwt token to auth header for all requests made by the $http
                // service
                $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;

                /*
                 * calling success method passed as callback by login controller execute
                 * callback with true to indicate successful login
                 */
                success(true);

            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                //console.log(response);

                console.log("Authenitcation failed  .........! ");
                error(false);
            });
        }
    });
})();