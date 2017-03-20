/**
 * Created by lkc-dev on 3/7/17.
 */

(function () {
    'use strict';

    angular.module('cephas.userApprovalModule').service('userSvc', function ($rootScope, $http, $q, WEB_URLS) {

        this.approvalCall = function (userID, decision, comment, success, error) {
            console.log(userID + "  " + decision + "  " + comment);

            var encodedString = 'userID=' + encodeURIComponent(userID) + '&decision=' + encodeURIComponent(decision)
                + '&comment=' + encodeURIComponent(comment);

            $http({
                method: 'POST',
                url: WEB_URLS.approvalServiceURL,
                //url : 'http://localhost:8080/fhscServices/rest/fhsc/login',
                data: encodedString,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).then(function successCallback(response) {
                console.log(response);
                success(true);
            }, function errorCallback(response) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.

                //console.log(response);

                console.log("User Update failed  .........! ");
                error(false);
            });
        }

    });
})();