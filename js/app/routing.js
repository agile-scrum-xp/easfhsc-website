/**
 * Created by lkc-dev on 2/23/17.
 */

angular.module('fhscModule').config(['$sceDelegateProvider', function ($sceDelegateProvider) {
    $sceDelegateProvider.resourceUrlWhitelist(['self', 'http://localhost:8080/**', 'http://localhost:80/**']);

}
]);

angular.module('fhscModule').config(['$httpProvider', function ($httpProvider) {
    console.log("app config '$httpProvider' called");
    //Reset headers to avoid OPTIONS request (aka preflight)
    $httpProvider.defaults.headers.common = {};
    $httpProvider.defaults.headers.post = {};
    $httpProvider.defaults.headers.put = {};
    $httpProvider.defaults.headers.patch = {};
}]);

angular.module('fhscModule').config(
    ['$stateProvider', '$urlRouterProvider', 'USER_ROLES',
        function ($stateProvider, $urlRouterProvider, USER_ROLES) {

            console.log("router is called");

            // For any unmatched url, redirect to /
            $urlRouterProvider.otherwise("/");

            $stateProvider
                .state('home', {
                    url: '/',
                    templateUrl: 'partials/public/home/home.html',
                    controller: 'homeController',
                    data : {
                        authenticate: false,
                        authorizedRoles : [ USER_ROLES.all ]
                    }
                })
                .state('welcome', {
                    url: '/welcome/:scrollTo',
                    controller: 'aboutController',
                    templateUrl: 'partials/public/home/home.html',
                    data : {
                        authenticate: false,
                        authorizedRoles : [ USER_ROLES.all ]
                    }
                })
                .state('second', {
                    url: '/second/:scrollTo',
                    controller: 'contactController',
                    templateUrl: 'second.html',
                    data : {
                        authenticate: false,
                        authorizedRoles : [ USER_ROLES.all ]
                    }
                })
                .state('fileListing', {
                url : "/fileListing",
                templateUrl : "partials/protected/file-list/fileList.html",
                controller : 'fileListCtrl as vm',
                data : {
                    authenticate: true,
                    authorizedRoles : [ USER_ROLES.coordinator, USER_ROLES.investigator]
                }
            })
                .state('userListing', {
                url : "/userListing",
                templateUrl : "partials/protected/user-list/userList.html",
                controller : 'userListCtrl as vm',
                data : {
                    authenticate: true,
                    authorizedRoles : [ USER_ROLES.coordinator, USER_ROLES.investigator]
                }
            });
        }
    ]);



angular.module('fhscModule').run(function ($rootScope, $location, $anchorScroll, $stateParams, $timeout) {
    $rootScope.$on('$stateChangeSuccess', function (newRoute, oldRoute) {
        $timeout(function () {
            $location.hash($stateParams.scrollTo);
            $anchorScroll()
        }, 100)
    });
})

// create the controller and inject Angular's $scope
angular.module('fhscModule').controller('homeController', function ($scope) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
});

angular.module('fhscModule').controller('aboutController', function ($scope) {
    $scope.message = 'Look! I am an about page.';
});

angular.module('fhscModule').controller('contactController', function ($scope) {
    $scope.message = 'Contact us! JK. This is just a demo.';
});