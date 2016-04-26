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
    angular.module('app.controllers', ['ui.materialize','ui.router', 'slick', 'restangular']);
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
                url: '/browse/{endpoint}',
                views: {
                    header: {
                        templateUrl: getView('shopping-header')
                    },
                    main: {
                        templateUrl: getView('browse')
                    }
                }
            }).state('product', {
                url: '/product/:id',
                views: {
                    header: {
                        templateUrl: getView('shopping-header')
                    },
                    main: {
                        templateUrl: getView('product')
                    },
                    footer: {
                        templateUrl: getView('footer')
                    }
                }
            });
    }]);
})();
/**
 * Created by Benjamin on 4/27/2016.
 */
(function(){
    "use strict";

    angular.module("app.services").factory('products', function(){

        var products =  [
            /* Dresses */
            {
                id: 1,
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
                id: 2,
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
                id: 3,
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
                id: 4,
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
                id: 5,
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
                id: 6,
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
                id: 7,
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
                id: 8,
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
                id: 9,
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
                id: 10,
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

        return {
            all: function() {
                return products;
            },
            one: function(id) {
                console.log(id);
                console.log(_.find(products,function(o) { return o.id == id}));

                return _.find(products,function(o) {return o.id == id});
            }
        };
    });
})();
(function(){
    "use strict";

    /**
     * Created by lofo on 11/04/16.
     */
    angular.module('app.controllers').controller('BrowseController', ['$scope', '$stateParams', '_', 'products', function($scope, $stateParams, _, products) {

        $scope.filters = [];
        //Done Through REST
        console.log($stateParams.endpoint);
        $scope.products = products.all();

        //What We Manipulate During CI, will be all done through rest.
        $scope.results = $scope.products;

        $scope.removeFilter = function(index) {
            $scope.filters.splice(index,1);
            console.log($scope.filters);
            draft($scope.filters);
        };

        $scope.addFilter = function(type, value) {
            // Filter object to include
            var obj = {
                type: type,
                value: value
            };
            var index = _.findIndex($scope.filters, function(o) { return o.type == obj.type});
            // If the filter was not included at all
            if(index == -1) {
                // Update the Results Accordingly
                $scope.results = _.filter($scope.results,[obj.type,obj.value]);
                $scope.filters.push(obj);
                console.log($scope.filters);
            // Filter category was included
            } else {
                $scope.filters.splice(index,1,obj);
                draft($scope.filters);
            }
        };

        function draft(array) {
            var obj = {};
            array.forEach(function(entry) {
                obj[entry.type] = entry.value;
            });
            $scope.results = _.filter($scope.products, obj)
        }
    }]);
})();
/**
 * Created by Benjamin on 4/26/2016.
 */
(function() {
    "use strict";

    /**
     * Created by lofo on 11/04/16.
     */
    angular.module('app.controllers').controller('ProductController', ['$scope', 'products', '$stateParams', function ($scope, products, $stateParams) {

        //Done Through REST
        $scope.related = [
            /* Tops */
            {
                description: 'African Style Short Skirt Top w/ Shoestring Shoulders',
                category: 'top',
                subcategory: 'cardigan',
                gender: 'F',
                colors: ['blue'],
                price: 13.00,
                pictures: [
                    '49_08.gif',
                    '49_09.gif'
                ]
            }, {
                description: 'Open Motif Beach Top',
                category: 'top',
                subcategory: 'beach',
                gender: 'F',
                colors: ['blue'],
                price: 8.00,
                pictures: [
                    '50_03.gif',
                    '50_04.gif'
                ]
            }, {
                description: 'Light Blue Beach Top',
                category: 'top',
                subcategory: 'beach',
                gender: 'F',
                colors: ['blue'],
                price: 13.00,
                pictures: [
                    '50_06.gif',
                    '50_07.gif'
                ]
            }, {
                description: 'African Neckstring Top',
                category: 'top',
                subcategory: 'skirt',
                gender: 'F',
                colors: ['black'],
                price: 13.00,
                pictures: [
                    '51_03.gif',
                    '51_04.gif'
                ]
            }, {
                description: 'Light Shoelace Silk Top',
                category: 'top',
                subcategory: 'cardigan',
                gender: 'F',
                colors: ['red'],
                price: 13.00,
                pictures: [
                    '51_06.gif',
                    '51_07.gif'
                ]
            }

        ];
        $scope.item = products.one($stateParams.id);
    }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9wcm9kdWN0cy5zZXJ2aWNlLmpzIiwiYXBwL2Jyb3dzZS9Ccm93c2VDb250cm9sbGVyLmpzIiwiYXBwL3Byb2R1Y3QvUHJvZHVjdENvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBLENBQUEsVUFBQTtJQUNBOztJQUVBLElBQUEsTUFBQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtXQUNBLFNBQUEsSUFBQTs7SUFFQSxRQUFBLE9BQUEsY0FBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsaUJBQUEsYUFBQSxTQUFBO0lBQ0EsUUFBQSxPQUFBLGVBQUE7SUFDQSxRQUFBLE9BQUEsZ0JBQUE7SUFDQSxRQUFBLE9BQUEsa0JBQUE7SUFDQSxRQUFBLE9BQUEsY0FBQTs7Ozs7O0FDbEJBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxjQUFBLGlEQUFBLFNBQUEsZ0JBQUEscUJBQUE7O1FBRUEsSUFBQSxVQUFBLFVBQUEsVUFBQTtZQUNBLE9BQUEsZ0JBQUEsV0FBQSxNQUFBLFdBQUE7OztRQUdBLG1CQUFBLFVBQUE7O1FBRUE7YUFDQSxNQUFBLFdBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsVUFBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFdBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7Ozs7Ozs7OztBQzdDQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZ0JBQUEsUUFBQSxZQUFBLFVBQUE7O1FBRUEsSUFBQSxZQUFBOztZQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7WUFHQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7O1lBR0E7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7OztZQUdBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7O1lBSUE7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7O2NBRUE7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7O2NBRUE7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7O2NBRUE7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7O2NBRUE7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7O2NBRUE7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7Ozs7Ozs7UUFPQSxPQUFBO1lBQ0EsS0FBQSxXQUFBO2dCQUNBLE9BQUE7O1lBRUEsS0FBQSxTQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLFFBQUEsSUFBQSxFQUFBLEtBQUEsU0FBQSxTQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQTs7Z0JBRUEsT0FBQSxFQUFBLEtBQUEsU0FBQSxTQUFBLEdBQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQTs7Ozs7QUNwSkEsQ0FBQSxVQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEsb0JBQUEsQ0FBQSxVQUFBLGdCQUFBLEtBQUEsWUFBQSxTQUFBLFFBQUEsY0FBQSxHQUFBLFVBQUE7O1FBRUEsT0FBQSxVQUFBOztRQUVBLFFBQUEsSUFBQSxhQUFBO1FBQ0EsT0FBQSxXQUFBLFNBQUE7OztRQUdBLE9BQUEsVUFBQSxPQUFBOztRQUVBLE9BQUEsZUFBQSxTQUFBLE9BQUE7WUFDQSxPQUFBLFFBQUEsT0FBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBLE9BQUE7WUFDQSxNQUFBLE9BQUE7OztRQUdBLE9BQUEsWUFBQSxTQUFBLE1BQUEsT0FBQTs7WUFFQSxJQUFBLE1BQUE7Z0JBQ0EsTUFBQTtnQkFDQSxPQUFBOztZQUVBLElBQUEsUUFBQSxFQUFBLFVBQUEsT0FBQSxTQUFBLFNBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLElBQUE7O1lBRUEsR0FBQSxTQUFBLENBQUEsR0FBQTs7Z0JBRUEsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFFBQUEsQ0FBQSxJQUFBLEtBQUEsSUFBQTtnQkFDQSxPQUFBLFFBQUEsS0FBQTtnQkFDQSxRQUFBLElBQUEsT0FBQTs7bUJBRUE7Z0JBQ0EsT0FBQSxRQUFBLE9BQUEsTUFBQSxFQUFBO2dCQUNBLE1BQUEsT0FBQTs7OztRQUlBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxNQUFBO1lBQ0EsTUFBQSxRQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE1BQUEsUUFBQSxNQUFBOztZQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxVQUFBOzs7Ozs7O0FDNUNBLENBQUEsV0FBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHFCQUFBLENBQUEsVUFBQSxZQUFBLGdCQUFBLFVBQUEsUUFBQSxVQUFBLGNBQUE7OztRQUdBLE9BQUEsVUFBQTs7WUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOzs7OztRQUtBLE9BQUEsT0FBQSxTQUFBLElBQUEsYUFBQTs7O0FBR0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICovXHJcbihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxyXG4gICAgICAgIFtcclxuICAgICAgICAgICAgJ2FwcC5jb250cm9sbGVycycsXHJcbiAgICAgICAgICAgICdhcHAuZmlsdGVycycsXHJcbiAgICAgICAgICAgICdhcHAuc2VydmljZXMnLFxyXG4gICAgICAgICAgICAnYXBwLmRpcmVjdGl2ZXMnLFxyXG4gICAgICAgICAgICAnYXBwLnJvdXRlcycsXHJcbiAgICAgICAgICAgICdhcHAuY29uZmlnJ1xyXG4gICAgICAgIF0pLmNvbnN0YW50KCdfJyxfKTtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJ10pO1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFsndWkubWF0ZXJpYWxpemUnLCd1aS5yb3V0ZXInLCAnc2xpY2snLCAncmVzdGFuZ3VsYXInXSk7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XHJcblxyXG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykuY29uZmlnKCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyICkge1xyXG5cclxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKCB2aWV3TmFtZSApe1xyXG4gICAgICAgICAgICByZXR1cm4gJy92aWV3cy9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgdmlld05hbWUgKyAnLmh0bWwnO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdsYW5kaW5nJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhdGUoJ2Jyb3dzZScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9icm93c2Uve2VuZHBvaW50fScsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Jyb3dzZScpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGF0ZSgncHJvZHVjdCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9wcm9kdWN0LzppZCcsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Byb2R1Y3QnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkoKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI3LzIwMTYuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYXBwLnNlcnZpY2VzXCIpLmZhY3RvcnkoJ3Byb2R1Y3RzJywgZnVuY3Rpb24oKXtcclxuXHJcbiAgICAgICAgdmFyIHByb2R1Y3RzID0gIFtcclxuICAgICAgICAgICAgLyogRHJlc3NlcyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogMSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidMaWdodCBPcGVuIERyZXNzIHcvIFNpbGsgQm90dG9tJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdvcGVuJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydncmVlbiddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEwLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWVfMS5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICdsaW1lXzIuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogMixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidSb3NlIEZsb3JhbCBEcmVzcycsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2RyZXNzJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY3V0JyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydyZWQnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxOC4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICdyb3NlXzEuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAncm9zZV8yLmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDMsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonU2FrdXJhIEphcGFuZXNlIFN0eWxlIERyZXNzJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdmdWxsJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydncmVlbiddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDIyLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Nha3VyYV8xLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Nha3VyYV8yLmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDQsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonVHJvcGljcyBTdHlsZSBEcmVzcyB3LyBTaG9lc3RyaW5nIFNob3VsZGVycycsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2RyZXNzJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnZnVsbCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnZ3JlZW4nXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICd0cm9waWNzXzEuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAndHJvcGljc18yLmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgLyogVG9wcyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBpZDogNSxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidXZXN0ZXJuIFN0eWxlIFBvbmNoIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydwaW5rJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNDlfMDMuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNDlfMDQuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIGlkOiA2LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0FmcmljYW4gU3R5bGUgU2hvcnQgU2tpcnQgVG9wIHcvIFNob2VzdHJpbmcgU2hvdWxkZXJzJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2JsdWUnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOC5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOS5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgaWQ6IDcsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonT3BlbiBNb3RpZiBCZWFjaCBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnYmx1ZSddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDguMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNTBfMDMuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNTBfMDQuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIGlkOiA4LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0xpZ2h0IEJsdWUgQmVhY2ggVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2JsdWUnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNi5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNy5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgaWQ6IDksXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonQWZyaWNhbiBOZWNrc3RyaW5nIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ3NraXJ0JyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydibGFjayddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICBpZDogMTAsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonTGlnaHQgU2hvZWxhY2UgU2lsayBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsncmVkJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDYuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDcuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8qIFBhbnRzICovXHJcbiAgICAgICAgICAgIC8qIFNraXJ0cyovXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBwcm9kdWN0cztcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgb25lOiBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaWQpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXy5maW5kKHByb2R1Y3RzLGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8uaWQgPT0gaWR9KSk7XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmluZChwcm9kdWN0cyxmdW5jdGlvbihvKSB7cmV0dXJuIG8uaWQgPT0gaWR9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9KTtcclxufSkoKTsiLCIoZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQnJvd3NlQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsICdfJywgJ3Byb2R1Y3RzJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIF8sIHByb2R1Y3RzKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5maWx0ZXJzID0gW107XHJcbiAgICAgICAgLy9Eb25lIFRocm91Z2ggUkVTVFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcy5lbmRwb2ludCk7XHJcbiAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gcHJvZHVjdHMuYWxsKCk7XHJcblxyXG4gICAgICAgIC8vV2hhdCBXZSBNYW5pcHVsYXRlIER1cmluZyBDSSwgd2lsbCBiZSBhbGwgZG9uZSB0aHJvdWdoIHJlc3QuXHJcbiAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSAkc2NvcGUucHJvZHVjdHM7XHJcblxyXG4gICAgICAgICRzY29wZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbihpbmRleCkge1xyXG4gICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5zcGxpY2UoaW5kZXgsMSk7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5maWx0ZXJzKTtcclxuICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICAvLyBGaWx0ZXIgb2JqZWN0IHRvIGluY2x1ZGVcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHtcclxuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdmFyIGluZGV4ID0gXy5maW5kSW5kZXgoJHNjb3BlLmZpbHRlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8udHlwZSA9PSBvYmoudHlwZX0pO1xyXG4gICAgICAgICAgICAvLyBJZiB0aGUgZmlsdGVyIHdhcyBub3QgaW5jbHVkZWQgYXQgYWxsXHJcbiAgICAgICAgICAgIGlmKGluZGV4ID09IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIFJlc3VsdHMgQWNjb3JkaW5nbHlcclxuICAgICAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnJlc3VsdHMsW29iai50eXBlLG9iai52YWx1ZV0pO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMucHVzaChvYmopO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmZpbHRlcnMpO1xyXG4gICAgICAgICAgICAvLyBGaWx0ZXIgY2F0ZWdvcnkgd2FzIGluY2x1ZGVkXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5zcGxpY2UoaW5kZXgsMSxvYmopO1xyXG4gICAgICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhZnQoYXJyYXkpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBvYmpbZW50cnkudHlwZV0gPSBlbnRyeS52YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnByb2R1Y3RzLCBvYmopXHJcbiAgICAgICAgfVxyXG4gICAgfV0pO1xyXG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDQvMjYvMjAxNi5cclxuICovXHJcbihmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUHJvZHVjdENvbnRyb2xsZXInLCBbJyRzY29wZScsICdwcm9kdWN0cycsICckc3RhdGVQYXJhbXMnLCBmdW5jdGlvbiAoJHNjb3BlLCBwcm9kdWN0cywgJHN0YXRlUGFyYW1zKSB7XHJcblxyXG4gICAgICAgIC8vRG9uZSBUaHJvdWdoIFJFU1RcclxuICAgICAgICAkc2NvcGUucmVsYXRlZCA9IFtcclxuICAgICAgICAgICAgLyogVG9wcyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0FmcmljYW4gU3R5bGUgU2hvcnQgU2tpcnQgVG9wIHcvIFNob2VzdHJpbmcgU2hvdWxkZXJzJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmx1ZSddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNDlfMDguZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNDlfMDkuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ09wZW4gTW90aWYgQmVhY2ggVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmx1ZSddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDguMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wMy5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNC5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTGlnaHQgQmx1ZSBCZWFjaCBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNi5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNy5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWZyaWNhbiBOZWNrc3RyaW5nIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ3NraXJ0JyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsYWNrJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICc1MV8wMy5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNC5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTGlnaHQgU2hvZWxhY2UgU2lsayBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydyZWQnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA2LmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA3LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdO1xyXG4gICAgICAgICRzY29wZS5pdGVtID0gcHJvZHVjdHMub25lKCRzdGF0ZVBhcmFtcy5pZCk7XHJcbiAgICB9XSk7XHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
