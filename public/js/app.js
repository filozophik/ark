/**
 * Created by lofo on 11/04/16.
 */
(function(){
    "use strict";

    var app = angular.module('app',
        [
            'app.controllers',
            'app.filters',
            'app.services',
            'app.directives',
            'app.routes',
            'app.config'
        ]);

    angular.module('app.routes', ['ui.router']);
    angular.module('app.controllers', ['ui.materialize','ui.router', 'restangular']);
    angular.module('app.filters', []);
    angular.module('app.services', []);
    angular.module('app.directives', []);
    angular.module('app.config', []);

})();
/**
 * Created by lofo on 11/04/16.
 */
(function(){
    "use strict";

    angular.module('app.routes').config( ["$stateProvider", "$urlRouterProvider", function($stateProvider, $urlRouterProvider ) {

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
                    },
                    footer: {
                        templateUrl: getView('footer')
                    }
                }
            }).state('browse', {
                url: '/browse',
                views: {
                    header: {
                        templateUrl: getView('shopping-header')
                    },
                    main: {
                        templateUrl: getView('browse')
                    }
                }
        });

    }] );
})();
/**
 * Created by lofo on 11/04/16.
 */

/*
(function(){
    "use strict";

    angular.module('app.config').config( function($mdThemingProvider) {
        // For more info, visit https://material.angularjs.org/#/Theming/01_introduction
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('red')
            .warnPalette('orange');
    });

})();*/

/*(function(){
    "use strict";

    angular.module("app.services").factory('DialogService', function( $mdDialog ){

        return {
            fromTemplate: function( template, $scope ) {

                var options = {
                    templateUrl: '/views/dialogs/' + template + '/' + template + '.html'
                };

                if ( $scope ){
                    options.scope = $scope.$new();
                }

                return $mdDialog.show(options);
            },

            hide: function(){
                return $mdDialog.hide();
            },

            alert: function(title, content){
                $mdDialog.show(
                    $mdDialog.alert()
                        .title(title)
                        .content(content)
                        .ok('Ok')
                );
            }
        };
    });
})();*/
/*(function(){
    "use strict";

    angular.module("app.services").factory('ToastService', function( $mdToast ){

        var delay = 6000,
            position = 'top right',
            action = 'OK';

        return {
            show: function(content) {
                return $mdToast.show(
                    $mdToast.simple()
                        .content(content)
                        .position(position)
                        .action(action)
                        .hideDelay(delay)
                );
            }
        };
    });
})();
*/
(function(){
    "use strict";

    /**
     * Created by lofo on 11/04/16.
     */
    angular.module('app.controllers').controller('ProductController', ['$scope', function($scope) {
        $scope.products = [
            /* Dresses */
            {
                description:'Light Open Dress w/ Silk Bottom',
                category: 'dress',
                subcategory: 'open',
                gender:'F',
                colors:['green'],
                price: 10.00,
                pictures : [
                    'lime_1.gif',
                    'lime_2.gif'
                ]
            },
            {
                description:'Rose Floral Dress',
                category: 'dress',
                subcategory: 'cut',
                gender:'F',
                colors:['red'],
                price: 18.00,
                pictures : [
                    'rose_1.gif',
                    'rose_2.gif'
                ]
            },
            {
                description:'Sakura Japanese Style Dress',
                category: 'dress',
                subcategory: 'full',
                gender:'F',
                colors:['green'],
                price: 22.00,
                pictures : [
                    'sakura_1.gif',
                    'sakura_2.gif'
                ]
            },
            {
                description:'Tropics Style Dress w/ Shoestring Shoulders',
                category: 'dress',
                subcategory: 'full',
                gender:'F',
                colors:['green'],
                price: 13.00,
                pictures : [
                    'tropics_1.gif',
                    'tropics_2.gif'
                ]
            },
            /* Tops */
            {
                description:'Western Style Ponch Top',
                category: 'top',
                subcategory: 'cardigan',
                gender:'F',
                colors:['pink'],
                price: 13.00,
                pictures : [
                    '49_03.gif',
                    '49_04.gif'
                ]
            },{
                description:'African Style Short Skirt Top w/ Shoestring Shoulders',
                category: 'top',
                subcategory: 'cardigan',
                gender:'F',
                colors:['blue'],
                price: 13.00,
                pictures : [
                    '49_08.gif',
                    '49_09.gif'
                ]
            },{
                description:'Open Motif Beach Top',
                category: 'top',
                subcategory: 'beach',
                gender:'F',
                colors:['blue'],
                price: 8.00,
                pictures : [
                    '50_03.gif',
                    '50_04.gif'
                ]
            },{
                description:'Light Blue Beach Top',
                category: 'top',
                subcategory: 'beach',
                gender:'F',
                colors:['blue'],
                price: 13.00,
                pictures : [
                    '50_06.gif',
                    '50_07.gif'
                ]
            },{
                description:'African Neckstring Top',
                category: 'top',
                subcategory: 'skirt',
                gender:'F',
                colors:['black'],
                price: 13.00,
                pictures : [
                    '51_03.gif',
                    '51_04.gif'
                ]
            },{
                description:'Light Shoelace Silk Top',
                category: 'top',
                subcategory: 'cardigan',
                gender:'F',
                colors:['red'],
                price: 13.00,
                pictures : [
                    '51_06.gif',
                    '51_07.gif'
                ]
            }
            /* Pants */
            /* Skirts*/
        ];
    }]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJhcHAvYnJvd3NlL1Byb2R1Y3RDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLE1BQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7OztJQUdBLFFBQUEsT0FBQSxjQUFBLENBQUE7SUFDQSxRQUFBLE9BQUEsbUJBQUEsQ0FBQSxpQkFBQSxhQUFBO0lBQ0EsUUFBQSxPQUFBLGVBQUE7SUFDQSxRQUFBLE9BQUEsZ0JBQUE7SUFDQSxRQUFBLE9BQUEsa0JBQUE7SUFDQSxRQUFBLE9BQUEsY0FBQTs7Ozs7O0FDbEJBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxjQUFBLGlEQUFBLFNBQUEsZ0JBQUEscUJBQUE7O1FBRUEsSUFBQSxVQUFBLFVBQUEsVUFBQTtZQUNBLE9BQUEsZ0JBQUEsV0FBQSxNQUFBLFdBQUE7OztRQUdBLG1CQUFBLFVBQUE7O1FBRUE7YUFDQSxNQUFBLFdBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsVUFBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbkNBLENBQUEsVUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHFCQUFBLENBQUEsVUFBQSxTQUFBLFFBQUE7UUFDQSxPQUFBLFdBQUE7O1lBRUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7WUFHQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7OztZQUdBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7O1lBR0E7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7O1lBSUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Y0FFQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7O2NBRUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Y0FFQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7Ozs7Ozs7S0FPQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdhcHAuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2FwcC5maWx0ZXJzJyxcbiAgICAgICAgICAgICdhcHAuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2FwcC5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdhcHAucm91dGVzJyxcbiAgICAgICAgICAgICdhcHAuY29uZmlnJ1xuICAgICAgICBdKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFsndWkubWF0ZXJpYWxpemUnLCd1aS5yb3V0ZXInLCAncmVzdGFuZ3VsYXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJywgW10pO1xuXG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICovXG4oZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykuY29uZmlnKCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyICkge1xuXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24oIHZpZXdOYW1lICl7XG4gICAgICAgICAgICByZXR1cm4gJy92aWV3cy9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgdmlld05hbWUgKyAnLmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcblxuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdsYW5kaW5nJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2hlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdsYW5kaW5nJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdicm93c2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2Jyb3dzZScsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Jyb3dzZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfSApO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAgICAgKi9cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUHJvZHVjdENvbnRyb2xsZXInLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUucHJvZHVjdHMgPSBbXG4gICAgICAgICAgICAvKiBEcmVzc2VzICovXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0xpZ2h0IE9wZW4gRHJlc3Mgdy8gU2lsayBCb3R0b20nLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnb3BlbicsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydncmVlbiddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMC4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWVfMS5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnbGltZV8yLmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidSb3NlIEZsb3JhbCBEcmVzcycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdkcmVzcycsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjdXQnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsncmVkJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDE4LjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAncm9zZV8xLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICdyb3NlXzIuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J1Nha3VyYSBKYXBhbmVzZSBTdHlsZSBEcmVzcycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdkcmVzcycsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdmdWxsJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2dyZWVuJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDIyLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAnc2FrdXJhXzEuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Nha3VyYV8yLmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidUcm9waWNzIFN0eWxlIERyZXNzIHcvIFNob2VzdHJpbmcgU2hvdWxkZXJzJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2RyZXNzJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2Z1bGwnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnZ3JlZW4nXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICd0cm9waWNzXzEuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Ryb3BpY3NfMi5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIFRvcHMgKi9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonV2VzdGVybiBTdHlsZSBQb25jaCBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ3BpbmsnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICc0OV8wMy5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNDlfMDQuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidBZnJpY2FuIFN0eWxlIFNob3J0IFNraXJ0IFRvcCB3LyBTaG9lc3RyaW5nIFNob3VsZGVycycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnYmx1ZSddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJzQ5XzA4LmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOS5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J09wZW4gTW90aWYgQmVhY2ggVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydibHVlJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDguMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MF8wMy5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTBfMDQuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidMaWdodCBCbHVlIEJlYWNoIFRvcCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnYmx1ZSddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA2LmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNy5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0FmcmljYW4gTmVja3N0cmluZyBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ3NraXJ0JyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2JsYWNrJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAnNTFfMDMuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA0LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonTGlnaHQgU2hvZWxhY2UgU2lsayBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ3JlZCddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA2LmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNy5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLyogUGFudHMgKi9cbiAgICAgICAgICAgIC8qIFNraXJ0cyovXG4gICAgICAgIF07XG4gICAgfV0pO1xufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
