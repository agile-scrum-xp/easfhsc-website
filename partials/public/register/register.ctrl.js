/**
 * Created by lkc-dev on 12/3/16.
 */

(function() {
    'use strict';

    angular.module('cephas.registerModule').controller('registerCtrl', ['$scope', '$rootScope', '$uibModalInstance', 'USER_REGISTRATION_EVENTS', 'registerSvc', registerController]);

    function registerController($scope, $rootScope, $uibModalInstance, USER_REGISTRATION_EVENTS, registerSvc) {

        $scope.credentials = {};

        $scope.registerSvc = registerSvc;

        $scope.steps = [
            {
                templateUrl: 'partials/public/register/step1.html',
                hasForm: true,
                title: 'Personal'
            },
            {
                templateUrl: 'partials/public/register/step2.html',
                hasForm: true,
                title: 'Professional'
            },
            {
                templateUrl: 'partials/public/register/step3.html',
                hasForm: true,
                title: 'Location'
            },
            {
                templateUrl: 'partials/public/register/step4.html',
                title: 'Summary'
            }
        ];

        $scope.step = 1;

        $scope.nextStep = function() {
            $scope.step++;
        }

        $scope.prevStep = function() {
            $scope.step--;
        }

        $scope.credentials = {};

        $scope.titles = ['Select Title', 'Prof.', 'Dr.', 'Mr.', 'Miss', 'Mrs.', 'Ms.'];
        $scope.credentials.title = $scope.titles[0];

        $scope.close = function() {
            console.log(" ****************************  Register  Close Button Pressed");
            $uibModalInstance.close();
        }

        $scope.submit = function() {
            console.log(" ****************************  Register  Submit Button Pressed");
            var result = registerSvc.registerCall($scope.credentials, function(result) {
                // success function
                console.log("The result in the calling controler: " + result);
                $uibModalInstance.close();
                $rootScope.$broadcast(USER_REGISTRATION_EVENTS.registrationSuccessful);
            }, function(result) {
                /*
                 * Handle the Error here
                 */
                $rootScope.$broadcast(USER_REGISTRATION_EVENTS.registrationFailure);
                $scope.error = true;
                return;
            });
        }

    }

})();