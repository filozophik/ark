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
    angular.module('app.controllers', ['ui.materialize','ui.router', 'slick', 'restangular','ngCart']);
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
                        templateUrl: getView('shopping-header')
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
            }).state('cart', {
                url:'/cart',
                views: {
                    header: {
                        templateUrl:getView('shopping-header')
                    },
                    main: {
                        templateUrl: getView('cart')
                    },
                    footer: {
                        templateUrl:getView('footer')
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
                console.log(_.find(products,function(o) { return o.id == id;}));
                return _.find(products,function(o) {return o.id == id;});
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
/*
(function() {
    "use strict";

    /**
     * Created by lofo on 11/04/16.
     */
/*
    angular.module('app.controllers').controller('CartController', ['ngCart', function (ngCart) {
        ngCart.setTaxRate(7.5);
        ngCart.setShipping(2.99);
    }]);
})();
*/
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9wcm9kdWN0cy5zZXJ2aWNlLmpzIiwiYXBwL2Jyb3dzZS9Ccm93c2VDb250cm9sbGVyLmpzIiwiYXBwL3Byb2R1Y3QvUHJvZHVjdENvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBLENBQUEsVUFBQTtJQUNBOztJQUVBLElBQUEsTUFBQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtXQUNBLFNBQUEsSUFBQTs7SUFFQSxRQUFBLE9BQUEsY0FBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsaUJBQUEsYUFBQSxTQUFBLGNBQUE7SUFDQSxRQUFBLE9BQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxnQkFBQTtJQUNBLFFBQUEsT0FBQSxrQkFBQTtJQUNBLFFBQUEsT0FBQSxjQUFBOzs7Ozs7QUNsQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsaURBQUEsU0FBQSxnQkFBQSxxQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxnQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsV0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxVQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsV0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxRQUFBO2dCQUNBLElBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLFlBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsWUFBQSxRQUFBOzs7Ozs7Ozs7QUMxREEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGdCQUFBLFFBQUEsWUFBQSxVQUFBOztRQUVBLElBQUEsWUFBQTs7WUFFQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7O1lBR0E7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7OztZQUdBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7WUFHQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7OztZQUlBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7Ozs7O1FBT0EsT0FBQTtZQUNBLEtBQUEsV0FBQTtnQkFDQSxPQUFBOztZQUVBLEtBQUEsU0FBQSxJQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUEsRUFBQSxLQUFBLFNBQUEsU0FBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUE7Z0JBQ0EsT0FBQSxFQUFBLEtBQUEsU0FBQSxTQUFBLEdBQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQTs7Ozs7QUNuSkEsQ0FBQSxVQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEsb0JBQUEsQ0FBQSxVQUFBLGdCQUFBLEtBQUEsWUFBQSxTQUFBLFFBQUEsY0FBQSxHQUFBLFVBQUE7O1FBRUEsT0FBQSxVQUFBOztRQUVBLFFBQUEsSUFBQSxhQUFBO1FBQ0EsT0FBQSxXQUFBLFNBQUE7OztRQUdBLE9BQUEsVUFBQSxPQUFBOztRQUVBLE9BQUEsZUFBQSxTQUFBLE9BQUE7WUFDQSxPQUFBLFFBQUEsT0FBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBLE9BQUE7WUFDQSxNQUFBLE9BQUE7OztRQUdBLE9BQUEsWUFBQSxTQUFBLE1BQUEsT0FBQTs7WUFFQSxJQUFBLE1BQUE7Z0JBQ0EsTUFBQTtnQkFDQSxPQUFBOztZQUVBLElBQUEsUUFBQSxFQUFBLFVBQUEsT0FBQSxTQUFBLFNBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLElBQUE7O1lBRUEsR0FBQSxTQUFBLENBQUEsR0FBQTs7Z0JBRUEsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFFBQUEsQ0FBQSxJQUFBLEtBQUEsSUFBQTtnQkFDQSxPQUFBLFFBQUEsS0FBQTtnQkFDQSxRQUFBLElBQUEsT0FBQTs7bUJBRUE7Z0JBQ0EsT0FBQSxRQUFBLE9BQUEsTUFBQSxFQUFBO2dCQUNBLE1BQUEsT0FBQTs7OztRQUlBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxNQUFBO1lBQ0EsTUFBQSxRQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE1BQUEsUUFBQSxNQUFBOztZQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxVQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0EsQ0FBQSxXQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUEsQ0FBQSxVQUFBLFlBQUEsZ0JBQUEsVUFBQSxRQUFBLFVBQUEsY0FBQTs7O1FBR0EsT0FBQSxVQUFBOztZQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7Ozs7O1FBS0EsT0FBQSxPQUFBLFNBQUEsSUFBQSxhQUFBOzs7QUFHQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdhcHAuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2FwcC5maWx0ZXJzJyxcbiAgICAgICAgICAgICdhcHAuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2FwcC5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdhcHAucm91dGVzJyxcbiAgICAgICAgICAgICdhcHAuY29uZmlnJ1xuICAgICAgICBdKS5jb25zdGFudCgnXycsXyk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLm1hdGVyaWFsaXplJywndWkucm91dGVyJywgJ3NsaWNrJywgJ3Jlc3Rhbmd1bGFyJywnbmdDYXJ0J10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcblxufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycpLmNvbmZpZyggZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciApIHtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKCB2aWV3TmFtZSApe1xuICAgICAgICAgICAgcmV0dXJuICcvdmlld3MvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHZpZXdOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnbGFuZGluZycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGF0ZSgnYnJvd3NlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9icm93c2Uve2VuZHBvaW50fScsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Jyb3dzZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGF0ZSgncHJvZHVjdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdC86aWQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdwcm9kdWN0JylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDonL2NhcnQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NhcnQnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOmdldFZpZXcoJ2Zvb3RlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgQmVuamFtaW4gb24gNC8yNy8yMDE2LlxuICovXG4oZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYXBwLnNlcnZpY2VzXCIpLmZhY3RvcnkoJ3Byb2R1Y3RzJywgZnVuY3Rpb24oKXtcblxuICAgICAgICB2YXIgcHJvZHVjdHMgPSAgW1xuICAgICAgICAgICAgLyogRHJlc3NlcyAqL1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAxLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidMaWdodCBPcGVuIERyZXNzIHcvIFNpbGsgQm90dG9tJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2RyZXNzJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ29wZW4nLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnZ3JlZW4nXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTAuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICdsaW1lXzEuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWVfMi5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogMixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonUm9zZSBGbG9yYWwgRHJlc3MnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY3V0JyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ3JlZCddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxOC4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3Jvc2VfMS5naWYnLFxuICAgICAgICAgICAgICAgICAgICAncm9zZV8yLmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAzLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidTYWt1cmEgSmFwYW5lc2UgU3R5bGUgRHJlc3MnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnZnVsbCcsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydncmVlbiddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAyMi4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ3Nha3VyYV8xLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICdzYWt1cmFfMi5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogNCxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonVHJvcGljcyBTdHlsZSBEcmVzcyB3LyBTaG9lc3RyaW5nIFNob3VsZGVycycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdkcmVzcycsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdmdWxsJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2dyZWVuJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAndHJvcGljc18xLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICd0cm9waWNzXzIuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAvKiBUb3BzICovXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDUsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J1dlc3Rlcm4gU3R5bGUgUG9uY2ggVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydwaW5rJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAnNDlfMDMuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzQ5XzA0LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICBpZDogNixcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonQWZyaWNhbiBTdHlsZSBTaG9ydCBTa2lydCBUb3Agdy8gU2hvZXN0cmluZyBTaG91bGRlcnMnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2JsdWUnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOC5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNDlfMDkuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIGlkOiA3LFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidPcGVuIE1vdGlmIEJlYWNoIFRvcCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnYmx1ZSddLFxuICAgICAgICAgICAgICAgIHByaWNlOiA4LjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAnNTBfMDMuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA0LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICBpZDogOCxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonTGlnaHQgQmx1ZSBCZWFjaCBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2JlYWNoJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2JsdWUnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNi5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTBfMDcuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIGlkOiA5LFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidBZnJpY2FuIE5lY2tzdHJpbmcgVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdza2lydCcsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydibGFjayddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJzUxXzAzLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNC5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgaWQ6IDEwLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidMaWdodCBTaG9lbGFjZSBTaWxrIFRvcCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsncmVkJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAnNTFfMDYuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA3LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICAvKiBQYW50cyAqL1xuICAgICAgICAgICAgLyogU2tpcnRzKi9cbiAgICAgICAgXTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdHM7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgb25lOiBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhfLmZpbmQocHJvZHVjdHMsZnVuY3Rpb24obykgeyByZXR1cm4gby5pZCA9PSBpZDt9KSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmluZChwcm9kdWN0cyxmdW5jdGlvbihvKSB7cmV0dXJuIG8uaWQgPT0gaWQ7fSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICAgICAqL1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdCcm93c2VDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ18nLCAncHJvZHVjdHMnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgXywgcHJvZHVjdHMpIHtcblxuICAgICAgICAkc2NvcGUuZmlsdGVycyA9IFtdO1xuICAgICAgICAvL0RvbmUgVGhyb3VnaCBSRVNUXG4gICAgICAgIGNvbnNvbGUubG9nKCRzdGF0ZVBhcmFtcy5lbmRwb2ludCk7XG4gICAgICAgICRzY29wZS5wcm9kdWN0cyA9IHByb2R1Y3RzLmFsbCgpO1xuXG4gICAgICAgIC8vV2hhdCBXZSBNYW5pcHVsYXRlIER1cmluZyBDSSwgd2lsbCBiZSBhbGwgZG9uZSB0aHJvdWdoIHJlc3QuXG4gICAgICAgICRzY29wZS5yZXN1bHRzID0gJHNjb3BlLnByb2R1Y3RzO1xuXG4gICAgICAgICRzY29wZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG9iamVjdCB0byBpbmNsdWRlXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gXy5maW5kSW5kZXgoJHNjb3BlLmZpbHRlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8udHlwZSA9PSBvYmoudHlwZX0pO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGZpbHRlciB3YXMgbm90IGluY2x1ZGVkIGF0IGFsbFxuICAgICAgICAgICAgaWYoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIFJlc3VsdHMgQWNjb3JkaW5nbHlcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVzdWx0cyA9IF8uZmlsdGVyKCRzY29wZS5yZXN1bHRzLFtvYmoudHlwZSxvYmoudmFsdWVdKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICAgICAgLy8gRmlsdGVyIGNhdGVnb3J5IHdhcyBpbmNsdWRlZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5zcGxpY2UoaW5kZXgsMSxvYmopO1xuICAgICAgICAgICAgICAgIGRyYWZ0KCRzY29wZS5maWx0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBkcmFmdChhcnJheSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgICAgIG9ialtlbnRyeS50eXBlXSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUucmVzdWx0cyA9IF8uZmlsdGVyKCRzY29wZS5wcm9kdWN0cywgb2JqKVxuICAgICAgICB9XG4gICAgfV0pO1xufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgQmVuamFtaW4gb24gNC8yNi8yMDE2LlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gICAgICovXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1Byb2R1Y3RDb250cm9sbGVyJywgWyckc2NvcGUnLCAncHJvZHVjdHMnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24gKCRzY29wZSwgcHJvZHVjdHMsICRzdGF0ZVBhcmFtcykge1xuXG4gICAgICAgIC8vRG9uZSBUaHJvdWdoIFJFU1RcbiAgICAgICAgJHNjb3BlLnJlbGF0ZWQgPSBbXG4gICAgICAgICAgICAvKiBUb3BzICovXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBZnJpY2FuIFN0eWxlIFNob3J0IFNraXJ0IFRvcCB3LyBTaG9lc3RyaW5nIFNob3VsZGVycycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOC5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNDlfMDkuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ09wZW4gTW90aWYgQmVhY2ggVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsdWUnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogOC4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xuICAgICAgICAgICAgICAgICAgICAnNTBfMDMuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA0LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMaWdodCBCbHVlIEJlYWNoIFRvcCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNi5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTBfMDcuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0FmcmljYW4gTmVja3N0cmluZyBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ3NraXJ0JyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmxhY2snXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgJzUxXzAzLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNC5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTGlnaHQgU2hvZWxhY2UgU2lsayBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsncmVkJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNi5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTFfMDcuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdO1xuICAgICAgICAkc2NvcGUuaXRlbSA9IHByb2R1Y3RzLm9uZSgkc3RhdGVQYXJhbXMuaWQpO1xuICAgIH1dKTtcbn0pKCk7XG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
