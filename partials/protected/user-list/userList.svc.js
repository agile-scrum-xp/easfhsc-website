/**
 * Created by lkc-dev on 3/3/17.
 */

(function() {
    'use strict';

    angular.module('cephas.userListModule').service('userListSvc', function ($rootScope, $http, $q, WEB_URLS) {

        console.log("User List Service is called ....");


        this.getUserList = function(currentUserListURL, success, error) {

            console.log("userListSvc.getUserList is called");
            var deferred = $q.defer();
            $http({
                method : 'POST',
                url : currentUserListURL
            }).then(function successCallback(response) {
                console.log("user list retrieval success")
                deferred.resolve(response);
            }, function errorCallback(response) {
                console.log("user list retrieval failure")
                deferred.reject(response);
            });

            return deferred.promise;
        }

        this.getUser = function(userID, success, error) {

            console.log("userListSvc.getUserList is called");
            var deferred = $q.defer();
            $http({
                method : 'GET',
                url : WEB_URLS.singleApplicantURL + userID,
                // data : encodedString,
                // headers : {
                // 'Content-Type' : 'application/x-www-form-urlencoded'
                // }
            }).then(function successCallback(response) {
                //console.log(JSON.stringify(response.data));
                deferred.resolve({
                    response: response
                });
                success(response.data);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                deferred.reject(response);
                error(false);
            });

            return deferred.promise;
        }
    });


})();