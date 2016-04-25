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
        ]).constant('_',_);

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
(function(){
    "use strict";

    /**
     * Created by lofo on 11/04/16.
     */
    angular.module('app.controllers').controller('ProductController', ['$scope', '_', function($scope,_) {

        $scope.filters = []
        //Done Through REST
        $scope.products =  [
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

        //What We Manipulate During CI, will be all done through rest.
        $scope.results = $scope.products;

        $scope.addFilter = function(type, value) {
            var obj = {
                type: type,
                value: value
            };
            console.log(obj);
            console.log(_.filter($scope.results,[obj.type,obj.value]));
            if(_.findIndex($scope.filters,obj) == -1) {
                $scope.filters.push(obj);
                console.log($scope.filters);
            } else {
                console.log('This filter has already been applied.')
            }
        };
    }]);
})();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJhcHAvYnJvd3NlL1Byb2R1Y3RDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLE1BQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7V0FDQSxTQUFBLElBQUE7O0lBRUEsUUFBQSxPQUFBLGNBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGlCQUFBLGFBQUE7SUFDQSxRQUFBLE9BQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxnQkFBQTtJQUNBLFFBQUEsT0FBQSxrQkFBQTtJQUNBLFFBQUEsT0FBQSxjQUFBOzs7Ozs7QUNsQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsaURBQUEsU0FBQSxnQkFBQSxxQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxnQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsV0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxVQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7Ozs7Ozs7QUNuQ0EsQ0FBQSxVQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUEsQ0FBQSxVQUFBLEtBQUEsU0FBQSxPQUFBLEdBQUE7O1FBRUEsT0FBQSxVQUFBOztRQUVBLE9BQUEsWUFBQTs7WUFFQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7OztZQUdBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7O1lBR0E7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7WUFHQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7Ozs7WUFJQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7O2NBRUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Y0FFQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7O2NBRUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Ozs7Ozs7UUFRQSxPQUFBLFVBQUEsT0FBQTs7UUFFQSxPQUFBLFlBQUEsU0FBQSxNQUFBLE9BQUE7WUFDQSxJQUFBLE1BQUE7Z0JBQ0EsTUFBQTtnQkFDQSxPQUFBOztZQUVBLFFBQUEsSUFBQTtZQUNBLFFBQUEsSUFBQSxFQUFBLE9BQUEsT0FBQSxRQUFBLENBQUEsSUFBQSxLQUFBLElBQUE7WUFDQSxHQUFBLEVBQUEsVUFBQSxPQUFBLFFBQUEsUUFBQSxDQUFBLEdBQUE7Z0JBQ0EsT0FBQSxRQUFBLEtBQUE7Z0JBQ0EsUUFBQSxJQUFBLE9BQUE7bUJBQ0E7Z0JBQ0EsUUFBQSxJQUFBOzs7O0tBSUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICovXHJcbihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2FwcC5jb250cm9sbGVycycsXHJcbiAgICAgICAgICAgICdhcHAuZmlsdGVycycsXHJcbiAgICAgICAgICAgICdhcHAuc2VydmljZXMnLFxyXG4gICAgICAgICAgICAnYXBwLmRpcmVjdGl2ZXMnLFxyXG4gICAgICAgICAgICAnYXBwLnJvdXRlcycsXHJcbiAgICAgICAgICAgICdhcHAuY29uZmlnJ1xyXG4gICAgICAgIF0pLmNvbnN0YW50KCdfJyxfKTtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJ10pO1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFsndWkubWF0ZXJpYWxpemUnLCd1aS5yb3V0ZXInLCAncmVzdGFuZ3VsYXInXSk7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XHJcblxyXG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykuY29uZmlnKCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyICkge1xyXG5cclxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKCB2aWV3TmFtZSApe1xyXG4gICAgICAgICAgICByZXR1cm4gJy92aWV3cy9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgdmlld05hbWUgKyAnLmh0bWwnO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdsYW5kaW5nJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhdGUoJ2Jyb3dzZScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9icm93c2UnLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdicm93c2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICB9ICk7XHJcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1Byb2R1Y3RDb250cm9sbGVyJywgWyckc2NvcGUnLCAnXycsIGZ1bmN0aW9uKCRzY29wZSxfKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5maWx0ZXJzID0gW11cclxuICAgICAgICAvL0RvbmUgVGhyb3VnaCBSRVNUXHJcbiAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gIFtcclxuICAgICAgICAgICAgLyogRHJlc3NlcyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonTGlnaHQgT3BlbiBEcmVzcyB3LyBTaWxrIEJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2RyZXNzJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnb3BlbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnZ3JlZW4nXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMC4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICdsaW1lXzEuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGltZV8yLmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J1Jvc2UgRmxvcmFsIERyZXNzJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjdXQnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ3JlZCddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDE4LjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Jvc2VfMS5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICdyb3NlXzIuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonU2FrdXJhIEphcGFuZXNlIFN0eWxlIERyZXNzJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdmdWxsJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydncmVlbiddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDIyLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Nha3VyYV8xLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Nha3VyYV8yLmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J1Ryb3BpY3MgU3R5bGUgRHJlc3Mgdy8gU2hvZXN0cmluZyBTaG91bGRlcnMnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdkcmVzcycsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2Z1bGwnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2dyZWVuJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcclxuICAgICAgICAgICAgICAgICAgICAndHJvcGljc18xLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Ryb3BpY3NfMi5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qIFRvcHMgKi9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J1dlc3Rlcm4gU3R5bGUgUG9uY2ggVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ3BpbmsnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wMy5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wNC5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0FmcmljYW4gU3R5bGUgU2hvcnQgU2tpcnQgVG9wIHcvIFNob2VzdHJpbmcgU2hvdWxkZXJzJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2JsdWUnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOC5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOS5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J09wZW4gTW90aWYgQmVhY2ggVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2JsdWUnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiA4LjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonTGlnaHQgQmx1ZSBCZWFjaCBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnYmx1ZSddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA2LmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA3LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonQWZyaWNhbiBOZWNrc3RyaW5nIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ3NraXJ0JyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydibGFjayddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonTGlnaHQgU2hvZWxhY2UgU2lsayBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsncmVkJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDYuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDcuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIFBhbnRzICovXHJcbiAgICAgICAgICAgIC8qIFNraXJ0cyovXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgLy9XaGF0IFdlIE1hbmlwdWxhdGUgRHVyaW5nIENJLCB3aWxsIGJlIGFsbCBkb25lIHRocm91Z2ggcmVzdC5cclxuICAgICAgICAkc2NvcGUucmVzdWx0cyA9ICRzY29wZS5wcm9kdWN0cztcclxuXHJcbiAgICAgICAgJHNjb3BlLmFkZEZpbHRlciA9IGZ1bmN0aW9uKHR5cGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKG9iaik7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKF8uZmlsdGVyKCRzY29wZS5yZXN1bHRzLFtvYmoudHlwZSxvYmoudmFsdWVdKSk7XHJcbiAgICAgICAgICAgIGlmKF8uZmluZEluZGV4KCRzY29wZS5maWx0ZXJzLG9iaikgPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXJzLnB1c2gob2JqKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5maWx0ZXJzKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdUaGlzIGZpbHRlciBoYXMgYWxyZWFkeSBiZWVuIGFwcGxpZWQuJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XSk7XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
