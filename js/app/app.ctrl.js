/**
 * Created by lkc-dev on 12/3/16.
 */

(function() {
    'use strict';

    angular.module('fhscModule').controller('fhscAppCtrl', ['$scope', '$rootScope', '$uibModal', '$window', '$localStorage', 'sessionSvc', 'AUTH_EVENTS', 'USER_REGISTRATION_EVENTS','FILE_UPLOAD_EVENTS', appMainController]);

    function appMainController($scope, $rootScope, $uibModal, $window, $localStorage, sessionSvc, AUTH_EVENTS, USER_REGISTRATION_EVENTS,FILE_UPLOAD_EVENTS) {

        $scope.currentUser = null;

        var isLogged = function() {
            if ($scope.currentUser) {
                return true;
            } else {
                /**
                 * we should not be reaching this stage
                 */
                if($localStorage.currentUser) {
                    return true;
                }
                return false;
            }
        }

        $scope.showLoginDialog = function() {
            console.log("$scope.showLoginDialog is called")
            $scope.modalShown = true;
            var modalInstance = $uibModal.open({
                animation : $scope.animationsEnabled,
                templateUrl : 'partials/public/login/login.html',
                controller : 'loginCtrl',
                //
                backdrop : 'static',
            });
        }

        $scope.showRegisterDialog = function() {
            console.log("$scope.showRegisterDialog is called")
            $scope.modalShown = true;
            var modalInstance = $uibModal.open({
                animation : $scope.animationsEnabled,
                /**
                 * no idea why 'partials/public/register/register.html',
                 * is not working
                 */
                templateUrl : 'partials/public/register2.html',
                controller : 'registerCtrl',
                //
                backdrop : 'static',
            });
        }

        $scope.showLogoutDialog = function() {
            $scope.modalShown = true;
            var modalInstance = $uibModal.open({
                animation : $scope.animationsEnabled,
                templateUrl : 'partials/public/logout/logout.html',
                controller : 'logoutCtrl',
                //
                backdrop : 'static',
            });
        }

        $scope.showFileUploadDialog = function() {
            $scope.modalShown = true;
            var modalInstance = $uibModal.open({
                animation : $scope.animationsEnabled,
                templateUrl : 'partials/protected/file-upload/fileUpload.html',
                controller : 'fileUploadCtrl',
                //
                backdrop : 'static',
            });
        }

         function showRegistrationSuccessDialog () {
            $scope.modalShown = true;
            var modalInstance = $uibModal.open({
                animation : $scope.animationsEnabled,
                templateUrl : 'partials/public/register/success.html',
                controller : 'registerCtrl',
                //
                backdrop : 'static',
            });
        }

         var showRegistrationFailureDialog = function() {
            $scope.modalShown = true;
            var modalInstance = $uibModal.open({
                animation : $scope.animationsEnabled,
                templateUrl : 'partials/public/register/failure.html',
                controller : 'registerCtrl',
                //
                backdrop : 'static',
            });
        }



        var setCurrentUser = function() {
            console.log(" **************************** Broadcast Loginnnnnn Success");
            $scope.currentUser = $rootScope.currentUser;
        }

        var logoutCurrentUser = function() {
            console.log(" **************************** Broadcast Logout Success");
             $scope.currentUser = null;
             sessionSvc.destroy();
        }

        var registrationSuccessful = function() {
            console.log(" **************************** Broadcast Registration Success");
            $scope.modalShown = true;
            var modalInstance = $uibModal.open({
                animation : $scope.animationsEnabled,
                templateUrl : 'partials/public/register/success.html',
                controller : 'registerCtrl',
                //
                backdrop : 'static',
            });
        }

        var registrationFailure = function() {
            console.log(" **************************** Broadcast Registration Failure");
            $scope.modalShown = true;
            var modalInstance = $uibModal.open({
                animation : $scope.animationsEnabled,
                templateUrl : 'partials/public/register/failure.html',
                controller : 'registerCtrl',
                //
                backdrop : 'static',
            });
        }

        var fileUploadSuccessful = function() {
            console.log(" **************************** Broadcast File Upload Success");
            $scope.modalShown = true;
            var modalInstance = $uibModal.open({
                animation : $scope.animationsEnabled,
                templateUrl : 'partials/protected/file-upload/fileUploadSuccess.html',
                controller : 'fileUploadCtrl',
                //
                backdrop : 'static',
            });
        }

        $rootScope.$on(AUTH_EVENTS.notAuthenticated, function(event) {
            console.log(" ****************************    AUTH_EVENTS.notAuthenticated Event Capture");
            $scope.showLoginDialog();
        });

        $rootScope.$on(AUTH_EVENTS.notAuthorized, function(event) {
            console.log(" ****************************    AUTH_EVENTS.notAuthorized Event Capture");
            //$scope.showAuthorizationFailiureDialog();
        });

        $rootScope.$on(AUTH_EVENTS.loginSuccess, setCurrentUser);
        $rootScope.$on(AUTH_EVENTS.logoutSuccess, logoutCurrentUser);

        $rootScope.$on(USER_REGISTRATION_EVENTS.registrationSuccessful, registrationSuccessful);
        $rootScope.$on(USER_REGISTRATION_EVENTS.registrationFailure, registrationFailure);

        $rootScope.$on(FILE_UPLOAD_EVENTS.fileUploadSuccess,fileUploadSuccessful );
    }

})();