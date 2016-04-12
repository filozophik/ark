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
    angular.module('app.controllers', ['ngMaterial','ui.materialize','ui.router', 'restangular']);
    angular.module('app.filters', []);
    angular.module('app.services', []);
    angular.module('app.directives', []);
    angular.module('app.config', ['ngMaterial']);

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

    }] );
})();
/**
 * Created by lofo on 11/04/16.
 */
(function(){
    "use strict";

    angular.module('app.config').config( ["$mdThemingProvider", function($mdThemingProvider) {
        /* For more info, visit https://material.angularjs.org/#/Theming/01_introduction */
        $mdThemingProvider.theme('default')
            .primaryPalette('amber')
            .accentPalette('red')
            .warnPalette('orange');
    }]);

})();

(function(){
    "use strict";

    angular.module("app.services").factory('DialogService', ["$mdDialog", function( $mdDialog ){

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
    }]);
})();
(function(){
    "use strict";

    angular.module("app.services").factory('ToastService', ["$mdToast", function( $mdToast ){

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
    }]);
})();

(function(){
    "use strict";

    /**
     * Created by lofo on 11/04/16.
     */
    angular.module('app.controllers').controller('ProductController', ['$scope', function($scope) {
        $scope.products = [
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
            }
        ];
    }]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJjb25maWcvdGhlbWUuanMiLCJzZXJ2aWNlcy9kaWFsb2cuanMiLCJzZXJ2aWNlcy90b2FzdC5qcyIsImFwcC9icm93c2UvUHJvZHVjdENvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBLENBQUEsVUFBQTtJQUNBOztJQUVBLElBQUEsTUFBQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTs7O0lBR0EsUUFBQSxPQUFBLGNBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGFBQUEsaUJBQUEsYUFBQTtJQUNBLFFBQUEsT0FBQSxlQUFBO0lBQ0EsUUFBQSxPQUFBLGdCQUFBO0lBQ0EsUUFBQSxPQUFBLGtCQUFBO0lBQ0EsUUFBQSxPQUFBLGNBQUEsQ0FBQTs7Ozs7O0FDbEJBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxjQUFBLGlEQUFBLFNBQUEsZ0JBQUEscUJBQUE7O1FBRUEsSUFBQSxVQUFBLFVBQUEsVUFBQTtZQUNBLE9BQUEsZ0JBQUEsV0FBQSxNQUFBLFdBQUE7OztRQUdBLG1CQUFBLFVBQUE7O1FBRUE7YUFDQSxNQUFBLFdBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxVQUFBO1lBQ0EsS0FBQTtZQUNBLE9BQUE7Z0JBQ0EsTUFBQTtvQkFDQSxhQUFBLFFBQUE7O2dCQUVBLFFBQUE7b0JBQ0EsYUFBQSxRQUFBOzs7Ozs7Ozs7O0FDN0JBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxjQUFBLCtCQUFBLFNBQUEsb0JBQUE7O1FBRUEsbUJBQUEsTUFBQTthQUNBLGVBQUE7YUFDQSxjQUFBO2FBQ0EsWUFBQTs7Ozs7QUNYQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZ0JBQUEsUUFBQSwrQkFBQSxVQUFBLFdBQUE7O1FBRUEsT0FBQTtZQUNBLGNBQUEsVUFBQSxVQUFBLFNBQUE7O2dCQUVBLElBQUEsVUFBQTtvQkFDQSxhQUFBLG9CQUFBLFdBQUEsTUFBQSxXQUFBOzs7Z0JBR0EsS0FBQSxRQUFBO29CQUNBLFFBQUEsUUFBQSxPQUFBOzs7Z0JBR0EsT0FBQSxVQUFBLEtBQUE7OztZQUdBLE1BQUEsVUFBQTtnQkFDQSxPQUFBLFVBQUE7OztZQUdBLE9BQUEsU0FBQSxPQUFBLFFBQUE7Z0JBQ0EsVUFBQTtvQkFDQSxVQUFBO3lCQUNBLE1BQUE7eUJBQ0EsUUFBQTt5QkFDQSxHQUFBOzs7Ozs7QUM1QkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGdCQUFBLFFBQUEsNkJBQUEsVUFBQSxVQUFBOztRQUVBLElBQUEsUUFBQTtZQUNBLFdBQUE7WUFDQSxTQUFBOztRQUVBLE9BQUE7WUFDQSxNQUFBLFNBQUEsU0FBQTtnQkFDQSxPQUFBLFNBQUE7b0JBQ0EsU0FBQTt5QkFDQSxRQUFBO3lCQUNBLFNBQUE7eUJBQ0EsT0FBQTt5QkFDQSxVQUFBOzs7Ozs7O0FDaEJBLENBQUEsVUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHFCQUFBLENBQUEsVUFBQSxTQUFBLFFBQUE7UUFDQSxPQUFBLFdBQUE7WUFDQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7OztZQUdBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7O1lBR0E7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7WUFHQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7Ozs7O0tBS0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuICAgICAgICBbXG4gICAgICAgICAgICAnYXBwLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdhcHAuZmlsdGVycycsXG4gICAgICAgICAgICAnYXBwLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdhcHAuZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnYXBwLnJvdXRlcycsXG4gICAgICAgICAgICAnYXBwLmNvbmZpZydcbiAgICAgICAgXSk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ25nTWF0ZXJpYWwnLCd1aS5tYXRlcmlhbGl6ZScsJ3VpLnJvdXRlcicsICdyZXN0YW5ndWxhciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbJ25nTWF0ZXJpYWwnXSk7XG5cbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbiggdmlld05hbWUgKXtcbiAgICAgICAgICAgIHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2xhbmRpbmcnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhdGUoJ2Jyb3dzZScsIHtcbiAgICAgICAgICAgIHVybDogJy9icm93c2UnLFxuICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdicm93c2UnKVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9ICk7XG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICovXG4oZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJykuY29uZmlnKCBmdW5jdGlvbigkbWRUaGVtaW5nUHJvdmlkZXIpIHtcbiAgICAgICAgLyogRm9yIG1vcmUgaW5mbywgdmlzaXQgaHR0cHM6Ly9tYXRlcmlhbC5hbmd1bGFyanMub3JnLyMvVGhlbWluZy8wMV9pbnRyb2R1Y3Rpb24gKi9cbiAgICAgICAgJG1kVGhlbWluZ1Byb3ZpZGVyLnRoZW1lKCdkZWZhdWx0JylcbiAgICAgICAgICAgIC5wcmltYXJ5UGFsZXR0ZSgnYW1iZXInKVxuICAgICAgICAgICAgLmFjY2VudFBhbGV0dGUoJ3JlZCcpXG4gICAgICAgICAgICAud2FyblBhbGV0dGUoJ29yYW5nZScpO1xuICAgIH0pO1xuXG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdEaWFsb2dTZXJ2aWNlJywgZnVuY3Rpb24oICRtZERpYWxvZyApe1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBmcm9tVGVtcGxhdGU6IGZ1bmN0aW9uKCB0ZW1wbGF0ZSwgJHNjb3BlICkge1xuXG4gICAgICAgICAgICAgICAgdmFyIG9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnL3ZpZXdzL2RpYWxvZ3MvJyArIHRlbXBsYXRlICsgJy8nICsgdGVtcGxhdGUgKyAnLmh0bWwnXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIGlmICggJHNjb3BlICl7XG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuc2NvcGUgPSAkc2NvcGUuJG5ldygpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiAkbWREaWFsb2cuc2hvdyhvcHRpb25zKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGhpZGU6IGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRtZERpYWxvZy5oaWRlKCk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICBhbGVydDogZnVuY3Rpb24odGl0bGUsIGNvbnRlbnQpe1xuICAgICAgICAgICAgICAgICRtZERpYWxvZy5zaG93KFxuICAgICAgICAgICAgICAgICAgICAkbWREaWFsb2cuYWxlcnQoKVxuICAgICAgICAgICAgICAgICAgICAgICAgLnRpdGxlKHRpdGxlKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmNvbnRlbnQoY29udGVudClcbiAgICAgICAgICAgICAgICAgICAgICAgIC5vaygnT2snKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnVG9hc3RTZXJ2aWNlJywgZnVuY3Rpb24oICRtZFRvYXN0ICl7XG5cbiAgICAgICAgdmFyIGRlbGF5ID0gNjAwMCxcbiAgICAgICAgICAgIHBvc2l0aW9uID0gJ3RvcCByaWdodCcsXG4gICAgICAgICAgICBhY3Rpb24gPSAnT0snO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBzaG93OiBmdW5jdGlvbihjb250ZW50KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRtZFRvYXN0LnNob3coXG4gICAgICAgICAgICAgICAgICAgICRtZFRvYXN0LnNpbXBsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAuY29udGVudChjb250ZW50KVxuICAgICAgICAgICAgICAgICAgICAgICAgLnBvc2l0aW9uKHBvc2l0aW9uKVxuICAgICAgICAgICAgICAgICAgICAgICAgLmFjdGlvbihhY3Rpb24pXG4gICAgICAgICAgICAgICAgICAgICAgICAuaGlkZURlbGF5KGRlbGF5KVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gICAgICovXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1Byb2R1Y3RDb250cm9sbGVyJywgWyckc2NvcGUnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidMaWdodCBPcGVuIERyZXNzIHcvIFNpbGsgQm90dG9tJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2RyZXNzJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ29wZW4nLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnZ3JlZW4nXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTAuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICdsaW1lXzEuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWVfMi5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonUm9zZSBGbG9yYWwgRHJlc3MnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY3V0JyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ3JlZCddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxOC4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3Jvc2VfMS5naWYnLFxuICAgICAgICAgICAgICAgICAgICAncm9zZV8yLmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidTYWt1cmEgSmFwYW5lc2UgU3R5bGUgRHJlc3MnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnZnVsbCcsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydncmVlbiddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAyMi4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3Nha3VyYV8xLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICdzYWt1cmFfMi5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonVHJvcGljcyBTdHlsZSBEcmVzcyB3LyBTaG9lc3RyaW5nIFNob3VsZGVycycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdkcmVzcycsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdmdWxsJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2dyZWVuJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAndHJvcGljc18xLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICd0cm9waWNzXzIuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XSk7XG59KSgpOyJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
