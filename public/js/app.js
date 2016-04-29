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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9wcm9kdWN0cy5zZXJ2aWNlLmpzIiwiYXBwL2Jyb3dzZS9Ccm93c2VDb250cm9sbGVyLmpzIiwiYXBwL3Byb2R1Y3QvUHJvZHVjdENvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBLENBQUEsVUFBQTtJQUNBOztJQUVBLElBQUEsTUFBQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtXQUNBLFNBQUEsSUFBQTs7SUFFQSxRQUFBLE9BQUEsY0FBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsaUJBQUEsYUFBQSxTQUFBLGNBQUE7SUFDQSxRQUFBLE9BQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxnQkFBQTtJQUNBLFFBQUEsT0FBQSxrQkFBQTtJQUNBLFFBQUEsT0FBQSxjQUFBOzs7Ozs7QUNsQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsaURBQUEsU0FBQSxnQkFBQSxxQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxnQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsV0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxVQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsV0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxRQUFBO2dCQUNBLElBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLFlBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsWUFBQSxRQUFBOzs7Ozs7Ozs7QUMxREEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGdCQUFBLFFBQUEsWUFBQSxVQUFBOztRQUVBLElBQUEsWUFBQTs7WUFFQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7O1lBR0E7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7OztZQUdBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7WUFHQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7OztZQUlBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOztjQUVBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7Ozs7O1FBT0EsT0FBQTtZQUNBLEtBQUEsV0FBQTtnQkFDQSxPQUFBOztZQUVBLEtBQUEsU0FBQSxJQUFBO2dCQUNBLFFBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUEsRUFBQSxLQUFBLFNBQUEsU0FBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLE1BQUE7Z0JBQ0EsT0FBQSxFQUFBLEtBQUEsU0FBQSxTQUFBLEdBQUEsQ0FBQSxPQUFBLEVBQUEsTUFBQTs7Ozs7QUNuSkEsQ0FBQSxVQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEsb0JBQUEsQ0FBQSxVQUFBLGdCQUFBLEtBQUEsWUFBQSxTQUFBLFFBQUEsY0FBQSxHQUFBLFVBQUE7O1FBRUEsT0FBQSxVQUFBOztRQUVBLFFBQUEsSUFBQSxhQUFBO1FBQ0EsT0FBQSxXQUFBLFNBQUE7OztRQUdBLE9BQUEsVUFBQSxPQUFBOztRQUVBLE9BQUEsZUFBQSxTQUFBLE9BQUE7WUFDQSxPQUFBLFFBQUEsT0FBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBLE9BQUE7WUFDQSxNQUFBLE9BQUE7OztRQUdBLE9BQUEsWUFBQSxTQUFBLE1BQUEsT0FBQTs7WUFFQSxJQUFBLE1BQUE7Z0JBQ0EsTUFBQTtnQkFDQSxPQUFBOztZQUVBLElBQUEsUUFBQSxFQUFBLFVBQUEsT0FBQSxTQUFBLFNBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLElBQUE7O1lBRUEsR0FBQSxTQUFBLENBQUEsR0FBQTs7Z0JBRUEsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFFBQUEsQ0FBQSxJQUFBLEtBQUEsSUFBQTtnQkFDQSxPQUFBLFFBQUEsS0FBQTtnQkFDQSxRQUFBLElBQUEsT0FBQTs7bUJBRUE7Z0JBQ0EsT0FBQSxRQUFBLE9BQUEsTUFBQSxFQUFBO2dCQUNBLE1BQUEsT0FBQTs7OztRQUlBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxNQUFBO1lBQ0EsTUFBQSxRQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE1BQUEsUUFBQSxNQUFBOztZQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxVQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUM1Q0EsQ0FBQSxXQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUEsQ0FBQSxVQUFBLFlBQUEsZ0JBQUEsVUFBQSxRQUFBLFVBQUEsY0FBQTs7O1FBR0EsT0FBQSxVQUFBOztZQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7Ozs7O1FBS0EsT0FBQSxPQUFBLFNBQUEsSUFBQSxhQUFBOzs7QUFHQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcclxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxyXG4gKi9cclxuKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXHJcbiAgICAgICAgW1xyXG4gICAgICAgICAgICAnYXBwLmNvbnRyb2xsZXJzJyxcclxuICAgICAgICAgICAgJ2FwcC5maWx0ZXJzJyxcclxuICAgICAgICAgICAgJ2FwcC5zZXJ2aWNlcycsXHJcbiAgICAgICAgICAgICdhcHAuZGlyZWN0aXZlcycsXHJcbiAgICAgICAgICAgICdhcHAucm91dGVzJyxcclxuICAgICAgICAgICAgJ2FwcC5jb25maWcnXHJcbiAgICAgICAgXSkuY29uc3RhbnQoJ18nLF8pO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJywgWyd1aS5yb3V0ZXInXSk7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5tYXRlcmlhbGl6ZScsJ3VpLnJvdXRlcicsICdzbGljaycsICdyZXN0YW5ndWxhcicsJ25nQ2FydCddKTtcclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnLCBbXSk7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcclxuXHJcbn0pKCk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICovXHJcbihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XHJcblxyXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24oIHZpZXdOYW1lICl7XHJcbiAgICAgICAgICAgIHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ2xhbmRpbmcnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGF0ZSgnYnJvd3NlJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2Jyb3dzZS97ZW5kcG9pbnR9JyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYnJvd3NlJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXRlKCdwcm9kdWN0Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3QvOmlkJyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncHJvZHVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGF0ZSgnY2FydCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDonL2NhcnQnLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NhcnQnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOmdldFZpZXcoJ2Zvb3RlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQmVuamFtaW4gb24gNC8yNy8yMDE2LlxyXG4gKi9cclxuKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdwcm9kdWN0cycsIGZ1bmN0aW9uKCl7XHJcblxyXG4gICAgICAgIHZhciBwcm9kdWN0cyA9ICBbXHJcbiAgICAgICAgICAgIC8qIERyZXNzZXMgKi9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDEsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonTGlnaHQgT3BlbiBEcmVzcyB3LyBTaWxrIEJvdHRvbScsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2RyZXNzJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnb3BlbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnZ3JlZW4nXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMC4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICdsaW1lXzEuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnbGltZV8yLmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDIsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonUm9zZSBGbG9yYWwgRHJlc3MnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdkcmVzcycsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2N1dCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsncmVkJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTguMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcclxuICAgICAgICAgICAgICAgICAgICAncm9zZV8xLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Jvc2VfMi5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiAzLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J1Nha3VyYSBKYXBhbmVzZSBTdHlsZSBEcmVzcycsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2RyZXNzJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnZnVsbCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnZ3JlZW4nXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAyMi4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICdzYWt1cmFfMS5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICdzYWt1cmFfMi5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGlkOiA0LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J1Ryb3BpY3MgU3R5bGUgRHJlc3Mgdy8gU2hvZXN0cmluZyBTaG91bGRlcnMnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdkcmVzcycsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2Z1bGwnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2dyZWVuJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcclxuICAgICAgICAgICAgICAgICAgICAndHJvcGljc18xLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ3Ryb3BpY3NfMi5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIC8qIFRvcHMgKi9cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgaWQ6IDUsXHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonV2VzdGVybiBTdHlsZSBQb25jaCBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsncGluayddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzQ5XzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzQ5XzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICBpZDogNixcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidBZnJpY2FuIFN0eWxlIFNob3J0IFNraXJ0IFRvcCB3LyBTaG9lc3RyaW5nIFNob3VsZGVycycsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNDlfMDguZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNDlfMDkuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIGlkOiA3LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J09wZW4gTW90aWYgQmVhY2ggVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2JsdWUnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiA4LjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSx7XHJcbiAgICAgICAgICAgICAgICBpZDogOCxcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidMaWdodCBCbHVlIEJlYWNoIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2JlYWNoJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNTBfMDYuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNTBfMDcuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LHtcclxuICAgICAgICAgICAgICAgIGlkOiA5LFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0FmcmljYW4gTmVja3N0cmluZyBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdza2lydCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnYmxhY2snXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xyXG4gICAgICAgICAgICAgICAgICAgICc1MV8wMy5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNC5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0se1xyXG4gICAgICAgICAgICAgICAgaWQ6IDEwLFxyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0xpZ2h0IFNob2VsYWNlIFNpbGsgVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ3JlZCddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA2LmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA3LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvKiBQYW50cyAqL1xyXG4gICAgICAgICAgICAvKiBTa2lydHMqL1xyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvZHVjdHM7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIG9uZTogZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGlkKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF8uZmluZChwcm9kdWN0cyxmdW5jdGlvbihvKSB7IHJldHVybiBvLmlkID09IGlkO30pKTtcclxuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbmQocHJvZHVjdHMsZnVuY3Rpb24obykge3JldHVybiBvLmlkID09IGlkO30pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH0pO1xyXG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdCcm93c2VDb250cm9sbGVyJywgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ18nLCAncHJvZHVjdHMnLCBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgXywgcHJvZHVjdHMpIHtcclxuXHJcbiAgICAgICAgJHNjb3BlLmZpbHRlcnMgPSBbXTtcclxuICAgICAgICAvL0RvbmUgVGhyb3VnaCBSRVNUXHJcbiAgICAgICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zLmVuZHBvaW50KTtcclxuICAgICAgICAkc2NvcGUucHJvZHVjdHMgPSBwcm9kdWN0cy5hbGwoKTtcclxuXHJcbiAgICAgICAgLy9XaGF0IFdlIE1hbmlwdWxhdGUgRHVyaW5nIENJLCB3aWxsIGJlIGFsbCBkb25lIHRocm91Z2ggcmVzdC5cclxuICAgICAgICAkc2NvcGUucmVzdWx0cyA9ICRzY29wZS5wcm9kdWN0cztcclxuXHJcbiAgICAgICAgJHNjb3BlLnJlbW92ZUZpbHRlciA9IGZ1bmN0aW9uKGluZGV4KSB7XHJcbiAgICAgICAgICAgICRzY29wZS5maWx0ZXJzLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmZpbHRlcnMpO1xyXG4gICAgICAgICAgICBkcmFmdCgkc2NvcGUuZmlsdGVycyk7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHNjb3BlLmFkZEZpbHRlciA9IGZ1bmN0aW9uKHR5cGUsIHZhbHVlKSB7XHJcbiAgICAgICAgICAgIC8vIEZpbHRlciBvYmplY3QgdG8gaW5jbHVkZVxyXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcclxuICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycywgZnVuY3Rpb24obykgeyByZXR1cm4gby50eXBlID09IG9iai50eXBlfSk7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBmaWx0ZXIgd2FzIG5vdCBpbmNsdWRlZCBhdCBhbGxcclxuICAgICAgICAgICAgaWYoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgUmVzdWx0cyBBY2NvcmRpbmdseVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBfLmZpbHRlcigkc2NvcGUucmVzdWx0cyxbb2JqLnR5cGUsb2JqLnZhbHVlXSk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZmlsdGVycyk7XHJcbiAgICAgICAgICAgIC8vIEZpbHRlciBjYXRlZ29yeSB3YXMgaW5jbHVkZWRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXJzLnNwbGljZShpbmRleCwxLG9iaik7XHJcbiAgICAgICAgICAgICAgICBkcmFmdCgkc2NvcGUuZmlsdGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkcmFmdChhcnJheSkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0ge307XHJcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcclxuICAgICAgICAgICAgICAgIG9ialtlbnRyeS50eXBlXSA9IGVudHJ5LnZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBfLmZpbHRlcigkc2NvcGUucHJvZHVjdHMsIG9iailcclxuICAgICAgICB9XHJcbiAgICB9XSk7XHJcbn0pKCk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgQmVuamFtaW4gb24gNC8yNi8yMDE2LlxyXG4gKi9cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdQcm9kdWN0Q29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3Byb2R1Y3RzJywgJyRzdGF0ZVBhcmFtcycsIGZ1bmN0aW9uICgkc2NvcGUsIHByb2R1Y3RzLCAkc3RhdGVQYXJhbXMpIHtcclxuXHJcbiAgICAgICAgLy9Eb25lIFRocm91Z2ggUkVTVFxyXG4gICAgICAgICRzY29wZS5yZWxhdGVkID0gW1xyXG4gICAgICAgICAgICAvKiBUb3BzICovXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWZyaWNhbiBTdHlsZSBTaG9ydCBTa2lydCBUb3Agdy8gU2hvZXN0cmluZyBTaG91bGRlcnMnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOC5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOS5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnT3BlbiBNb3RpZiBCZWFjaCBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogOC4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMaWdodCBCbHVlIEJlYWNoIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2JlYWNoJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsdWUnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA2LmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA3LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBZnJpY2FuIE5lY2tzdHJpbmcgVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnc2tpcnQnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmxhY2snXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMaWdodCBTaG9lbGFjZSBTaWxrIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ3JlZCddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDYuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDcuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF07XHJcbiAgICAgICAgJHNjb3BlLml0ZW0gPSBwcm9kdWN0cy5vbmUoJHN0YXRlUGFyYW1zLmlkKTtcclxuICAgIH1dKTtcclxufSkoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
