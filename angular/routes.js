/**
 * Created by lofo on 11/04/16.
 */
(function(){
    "use strict";

    angular.module('app.routes').config( function($stateProvider, $urlRouterProvider ) {

        var getView = function( viewName ){
            return '/views/app/' + viewName + '/' + viewName + '.html';
        };

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('landing', {
                url: '/',
                views: {
                    header: {
                        templateUrl: getView('header')
                    },
                    main: {
                        templateUrl: getView('landing')
                    }
                }
            }).state('browse', {
            url: '/browse',
            views: {
                main: {
                    templateUrl: getView('browse')
                },
                footer: {
                    templateUrl: getView('footer')
                }
            }
        });

    } );
})();