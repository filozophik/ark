/**
 * Created by lofo on 11/04/16.
 */
(function(){
    "use strict";

    angular.module('app.config').config( function($mdThemingProvider) {
        /* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('red')
            .warnPalette('orange');
    });

})();
