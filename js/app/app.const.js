/**
 * Created by lkc-dev on 12/3/16.
 */

(function () {

    'use strict';
    /*
     * Applications constants
     */
    angular.module('fhscModule').constant('AUTH_EVENTS', {
        loginInitiated : 'auth-login-initiated',
        loginSuccess : 'auth-login-success',
        loginFailed : 'auth-login-failed',
        logoutSuccess : 'auth-logout-success',
        sessionTimeout : 'auth-session-timeout',
        notAuthenticated : 'auth-not-authenticated',
        notAuthorized : 'auth-not-authorized'
    });

    angular.module('fhscModule').constant('USER_ROLES', {
        all : '*',
        investigator : 'INVESTIGATOR',
        coordinator : 'COORDINATOR'
    });



    angular.module('fhscModule').constant('USER_REGISTRATION_EVENTS', {
        registrationSuccessful: 'registration-successful',
        registrationFailure: 'registration-failed',
        recieved : 'applied-for-registration',
        pending : 'registration-pending',
        approved : 'registration-approved',
        declined : 'registration-declined'
    });

    angular.module('fhscModule').constant('FILE_UPLOAD_EVENTS', {
        fileUploadSuccess : 'file-upload-success'
    });

    /*
     * localhost
     * 52.76.25.3
     */
    angular.module('fhscModule').constant('WEB_URLS', {
        loginURL : 'http://localhost:8088/fhscServices/rest/fhsc/login',
        registrationURL : 'http://localhost:8088/fhscServices/rest/fhsc/user/register',

        singleApplicantURL : 'http://localhost:8088/fhscServices/rest/fhsc/user/',
        allApplicantsURL : 'http://localhost:8088/fhscServices/rest/fhsc/user/all',
        pendingApplicantsURL : 'http://localhost:8088/fhscServices/rest/fhsc/user/pending',
        rejectedApplicantsURL : 'http://localhost:8088/fhscServices/rest/fhsc/user/rejected',
        approvedApplicantsURL : 'http://localhost:8088/fhscServices/rest/fhsc/user/approved',

        fileUploadURL : 'http://localhost:8088/fhscServices/rest/fhsc/fileUpload/fileupload',

        allUserFilesListURL: 'http://localhost:8088/fhscServices/rest/fhsc/fileList/all',
        singleUserFilesListURL: 'http://localhost:8088/fhscServices/rest/fhsc/fileList/user'
    });

    /* Adding the auth interceptor here, to check every $http request*/
    angular.module('fhscModule').config(function ($httpProvider) {
        console.log("AuthInterceptor added");
        $httpProvider.interceptors.push([
            '$injector',
            function ($injector) {
                return $injector.get('AuthInterceptor');
            }
        ]);
    })

})();
