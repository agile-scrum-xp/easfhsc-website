/**
 * Created by lkc-dev on 3/3/17.
 */

(function() {
    'use strict';

    angular.module('cephas.fileUploadModule',[]).directive('customOnChange', function() {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var onChangeHandler = scope.$eval(attrs.customOnChange);
                element.bind('change', onChangeHandler);
            }
        };
    });
})();