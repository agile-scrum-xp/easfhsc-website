/**
 * Created by lkc-dev on 3/3/17.
 */

(function () {
    'use strict';

    angular.module('cephas.fileListModule').service('fileListSvc', function ($http, $rootScope, $q, jwtHelper, $window, $localStorage, sessionSvc, WEB_URLS) {

        console.log("File List Service is called ....");

        this.getFilesList = function(filesListURL) {

            console.log("fileListSvc.getFilesList is called");
            var defer = $q.defer();
            $http({
                method : 'POST',
                url : filesListURL,
            }).then(function successCallback(response) {
                console.log("file list retrieval success")
                defer.resolve(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                console.log("file list retrieval error")
                defer.reject(response);
            });
            return defer.promise;
        }
    });
})();