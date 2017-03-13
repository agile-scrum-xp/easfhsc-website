/**
 * Created by lkc-dev on 3/3/17.
 */

(function () {
    'use strict';

    angular.module('cephas.fileUploadModule').service('fileUploadSvc', function ($http, $rootScope, jwtHelper, $window, $localStorage, sessionSvc, WEB_URLS) {

        console.log("File Upload Service is called ....");

        this.uploadFile = function(file,success, error) {
            var formData = new FormData();
            formData.append("name", file.name);
            formData.append("comment", file.comment);
            formData.append("content", file.content);
            formData.append("type", file.type);

            console.log("fileUploadSvc.uploadFile is called");
            $http({
                method : 'POST',
                url : WEB_URLS.fileUploadURL,
                data : formData,
                headers : {
                    'Content-Type' : undefined
                }
            }).then(function successCallback(response) {
                success(response);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                error(response);
            });

        }
    });
})();