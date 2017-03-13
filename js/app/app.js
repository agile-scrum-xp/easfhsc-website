(function() {
    'use strict';

    /**
     * throwing exception Unknown provider: $stateProvider
     * if 'ui.bootstrap' is before 'ui.router'
     * in the dependency list
     */
    angular.module('fhscModule', ['ui.router', 'ui.bootstrap', 'angular-jwt', "ngStorage", 'ngResource',
        'multiStepForm', "ngTable", 'cephas.loginModule', 'cephas.logoutModule', 'cephas.registerModule', 'cephas.fileListModule', 'cephas.fileUploadModule',
        'cephas.userListModule', 'cephas.userApprovalModule','cephas.fileDetailsModule']);

})();