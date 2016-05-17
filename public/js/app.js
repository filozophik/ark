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
 * Created by lofo on 10/05/16.
 */
(function() {
    "use strict";

    angular.module("app.services").factory('categories', ['Restangular', function (Restangular) {

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9wcm9kdWN0L1Byb2R1Y3RDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLE1BQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7V0FDQSxTQUFBLElBQUE7O0lBRUEsUUFBQSxPQUFBLGNBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGlCQUFBLGFBQUEsU0FBQSxjQUFBO0lBQ0EsUUFBQSxPQUFBLGVBQUE7SUFDQSxRQUFBLE9BQUEsZ0JBQUE7SUFDQSxRQUFBLE9BQUEsa0JBQUE7SUFDQSxRQUFBLE9BQUEsY0FBQTs7Ozs7O0FDbEJBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxjQUFBLGlEQUFBLFNBQUEsZ0JBQUEscUJBQUE7O1FBRUEsSUFBQSxVQUFBLFVBQUEsVUFBQTtZQUNBLE9BQUEsZ0JBQUEsV0FBQSxNQUFBLFdBQUE7OztRQUdBLG1CQUFBLFVBQUE7O1FBRUE7YUFDQSxNQUFBLFdBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsVUFBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFdBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsUUFBQTtnQkFDQSxJQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxZQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLFlBQUEsUUFBQTs7Ozs7Ozs7O0FDMURBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLGNBQUEsQ0FBQSxlQUFBLFVBQUEsYUFBQTs7Ozs7OztBQ0hBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLFlBQUEsVUFBQTs7UUFFQSxJQUFBLFlBQUE7O1lBRUE7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7OztZQUdBO2dCQUNBLElBQUE7Z0JBQ0EsWUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxPQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxXQUFBO29CQUNBO29CQUNBOzs7WUFHQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7O1lBR0E7Z0JBQ0EsSUFBQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxPQUFBO2dCQUNBLE9BQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFdBQUE7b0JBQ0E7b0JBQ0E7Ozs7WUFJQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Y0FFQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Y0FFQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Y0FFQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Y0FFQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Y0FFQTtnQkFDQSxJQUFBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsT0FBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsV0FBQTtvQkFDQTtvQkFDQTs7Ozs7OztRQU9BLE9BQUE7WUFDQSxLQUFBLFdBQUE7Z0JBQ0EsT0FBQTs7WUFFQSxLQUFBLFNBQUEsSUFBQTtnQkFDQSxRQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBLEVBQUEsS0FBQSxTQUFBLFNBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxNQUFBO2dCQUNBLE9BQUEsRUFBQSxLQUFBLFNBQUEsU0FBQSxHQUFBLENBQUEsT0FBQSxFQUFBLE1BQUE7Ozs7O0FDbkpBLENBQUEsVUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLG9CQUFBLENBQUEsVUFBQSxnQkFBQSxLQUFBLFlBQUEsU0FBQSxRQUFBLGNBQUEsR0FBQSxVQUFBOztRQUVBLE9BQUEsVUFBQTs7UUFFQSxRQUFBLElBQUEsYUFBQTtRQUNBLE9BQUEsV0FBQSxTQUFBOzs7UUFHQSxPQUFBLFVBQUEsT0FBQTs7UUFFQSxPQUFBLGVBQUEsU0FBQSxPQUFBO1lBQ0EsT0FBQSxRQUFBLE9BQUEsTUFBQTtZQUNBLFFBQUEsSUFBQSxPQUFBO1lBQ0EsTUFBQSxPQUFBOzs7UUFHQSxPQUFBLFlBQUEsU0FBQSxNQUFBLE9BQUE7O1lBRUEsSUFBQSxNQUFBO2dCQUNBLE1BQUE7Z0JBQ0EsT0FBQTs7WUFFQSxJQUFBLFFBQUEsRUFBQSxVQUFBLE9BQUEsU0FBQSxTQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxJQUFBOztZQUVBLEdBQUEsU0FBQSxDQUFBLEdBQUE7O2dCQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxRQUFBLENBQUEsSUFBQSxLQUFBLElBQUE7Z0JBQ0EsT0FBQSxRQUFBLEtBQUE7Z0JBQ0EsUUFBQSxJQUFBLE9BQUE7O21CQUVBO2dCQUNBLE9BQUEsUUFBQSxPQUFBLE1BQUEsRUFBQTtnQkFDQSxNQUFBLE9BQUE7Ozs7UUFJQSxTQUFBLE1BQUEsT0FBQTtZQUNBLElBQUEsTUFBQTtZQUNBLE1BQUEsUUFBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxNQUFBLFFBQUEsTUFBQTs7WUFFQSxPQUFBLFVBQUEsRUFBQSxPQUFBLE9BQUEsVUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDNUNBLENBQUEsV0FBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHFCQUFBLENBQUEsVUFBQSxZQUFBLGdCQUFBLFVBQUEsUUFBQSxVQUFBLGNBQUE7OztRQUdBLE9BQUEsVUFBQTs7WUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOzs7OztRQUtBLE9BQUEsT0FBQSxTQUFBLElBQUEsYUFBQTs7O0FBR0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuICAgICAgICBbXG4gICAgICAgICAgICAnYXBwLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdhcHAuZmlsdGVycycsXG4gICAgICAgICAgICAnYXBwLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdhcHAuZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnYXBwLnJvdXRlcycsXG4gICAgICAgICAgICAnYXBwLmNvbmZpZydcbiAgICAgICAgXSkuY29uc3RhbnQoJ18nLF8pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5tYXRlcmlhbGl6ZScsJ3VpLnJvdXRlcicsICdzbGljaycsICdyZXN0YW5ndWxhcicsJ25nQ2FydCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XG5cbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbiggdmlld05hbWUgKXtcbiAgICAgICAgICAgIHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2xhbmRpbmcnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhdGUoJ2Jyb3dzZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYnJvd3NlL3tlbmRwb2ludH0nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdicm93c2UnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhdGUoJ3Byb2R1Y3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3QvOmlkJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncHJvZHVjdCcpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGF0ZSgnY2FydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6Jy9jYXJ0JyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOmdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjYXJ0JylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDpnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTAvMDUvMTYuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYXBwLnNlcnZpY2VzXCIpLmZhY3RvcnkoJ2NhdGVnb3JpZXMnLCBbJ1Jlc3Rhbmd1bGFyJywgZnVuY3Rpb24gKFJlc3Rhbmd1bGFyKSB7XG5cbiAgICB9XSk7XG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI3LzIwMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgncHJvZHVjdHMnLCBmdW5jdGlvbigpe1xuXG4gICAgICAgIHZhciBwcm9kdWN0cyA9ICBbXG4gICAgICAgICAgICAvKiBEcmVzc2VzICovXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDEsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0xpZ2h0IE9wZW4gRHJlc3Mgdy8gU2lsayBCb3R0b20nLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAnZHJlc3MnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnb3BlbicsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydncmVlbiddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMC4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJ2xpbWVfMS5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnbGltZV8yLmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidSb3NlIEZsb3JhbCBEcmVzcycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdkcmVzcycsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjdXQnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsncmVkJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDE4LjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAncm9zZV8xLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICdyb3NlXzIuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgaWQ6IDMsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J1Nha3VyYSBKYXBhbmVzZSBTdHlsZSBEcmVzcycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICdkcmVzcycsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdmdWxsJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2dyZWVuJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDIyLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAnc2FrdXJhXzEuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Nha3VyYV8yLmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGlkOiA0LFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidUcm9waWNzIFN0eWxlIERyZXNzIHcvIFNob2VzdHJpbmcgU2hvdWxkZXJzJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ2RyZXNzJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2Z1bGwnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnZ3JlZW4nXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICd0cm9waWNzXzEuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJ3Ryb3BpY3NfMi5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIC8qIFRvcHMgKi9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBpZDogNSxcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjonV2VzdGVybiBTdHlsZSBQb25jaCBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ3BpbmsnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICc0OV8wMy5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNDlfMDQuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIGlkOiA2LFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidBZnJpY2FuIFN0eWxlIFNob3J0IFNraXJ0IFRvcCB3LyBTaG9lc3RyaW5nIFNob3VsZGVycycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnYmx1ZSddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJzQ5XzA4LmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOS5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgaWQ6IDcsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J09wZW4gTW90aWYgQmVhY2ggVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydibHVlJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDguMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MF8wMy5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTBfMDQuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0se1xuICAgICAgICAgICAgICAgIGlkOiA4LFxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOidMaWdodCBCbHVlIEJlYWNoIFRvcCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjonRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOlsnYmx1ZSddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlcyA6IFtcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA2LmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNy5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgaWQ6IDksXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0FmcmljYW4gTmVja3N0cmluZyBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ3NraXJ0JyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6J0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczpbJ2JsYWNrJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzIDogW1xuICAgICAgICAgICAgICAgICAgICAnNTFfMDMuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA0LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LHtcbiAgICAgICAgICAgICAgICBpZDogMTAsXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246J0xpZ2h0IFNob2VsYWNlIFNpbGsgVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOidGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6WydyZWQnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXMgOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNi5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTFfMDcuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIC8qIFBhbnRzICovXG4gICAgICAgICAgICAvKiBTa2lydHMqL1xuICAgICAgICBdO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbGw6IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9kdWN0cztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBvbmU6IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coaWQpO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKF8uZmluZChwcm9kdWN0cyxmdW5jdGlvbihvKSB7IHJldHVybiBvLmlkID09IGlkO30pKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gXy5maW5kKHByb2R1Y3RzLGZ1bmN0aW9uKG8pIHtyZXR1cm4gby5pZCA9PSBpZDt9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9KTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gICAgICovXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Jyb3dzZUNvbnRyb2xsZXInLCBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnXycsICdwcm9kdWN0cycsIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBfLCBwcm9kdWN0cykge1xuXG4gICAgICAgICRzY29wZS5maWx0ZXJzID0gW107XG4gICAgICAgIC8vRG9uZSBUaHJvdWdoIFJFU1RcbiAgICAgICAgY29uc29sZS5sb2coJHN0YXRlUGFyYW1zLmVuZHBvaW50KTtcbiAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gcHJvZHVjdHMuYWxsKCk7XG5cbiAgICAgICAgLy9XaGF0IFdlIE1hbmlwdWxhdGUgRHVyaW5nIENJLCB3aWxsIGJlIGFsbCBkb25lIHRocm91Z2ggcmVzdC5cbiAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSAkc2NvcGUucHJvZHVjdHM7XG5cbiAgICAgICAgJHNjb3BlLnJlbW92ZUZpbHRlciA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZmlsdGVycyk7XG4gICAgICAgICAgICBkcmFmdCgkc2NvcGUuZmlsdGVycyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmFkZEZpbHRlciA9IGZ1bmN0aW9uKHR5cGUsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgb2JqZWN0IHRvIGluY2x1ZGVcbiAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycywgZnVuY3Rpb24obykgeyByZXR1cm4gby50eXBlID09IG9iai50eXBlfSk7XG4gICAgICAgICAgICAvLyBJZiB0aGUgZmlsdGVyIHdhcyBub3QgaW5jbHVkZWQgYXQgYWxsXG4gICAgICAgICAgICBpZihpbmRleCA9PSAtMSkge1xuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgUmVzdWx0cyBBY2NvcmRpbmdseVxuICAgICAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnJlc3VsdHMsW29iai50eXBlLG9iai52YWx1ZV0pO1xuICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXJzLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZmlsdGVycyk7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgY2F0ZWdvcnkgd2FzIGluY2x1ZGVkXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXJzLnNwbGljZShpbmRleCwxLG9iaik7XG4gICAgICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWZ0KGFycmF5KSB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge307XG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgb2JqW2VudHJ5LnR5cGVdID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnByb2R1Y3RzLCBvYmopXG4gICAgICAgIH1cbiAgICB9XSk7XG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI2LzIwMTYuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAgICAgKi9cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUHJvZHVjdENvbnRyb2xsZXInLCBbJyRzY29wZScsICdwcm9kdWN0cycsICckc3RhdGVQYXJhbXMnLCBmdW5jdGlvbiAoJHNjb3BlLCBwcm9kdWN0cywgJHN0YXRlUGFyYW1zKSB7XG5cbiAgICAgICAgLy9Eb25lIFRocm91Z2ggUkVTVFxuICAgICAgICAkc2NvcGUucmVsYXRlZCA9IFtcbiAgICAgICAgICAgIC8qIFRvcHMgKi9cbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0FmcmljYW4gU3R5bGUgU2hvcnQgU2tpcnQgVG9wIHcvIFNob2VzdHJpbmcgU2hvdWxkZXJzJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsdWUnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgJzQ5XzA4LmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOS5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnT3BlbiBNb3RpZiBCZWFjaCBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2JlYWNoJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmx1ZSddLFxuICAgICAgICAgICAgICAgIHByaWNlOiA4LjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MF8wMy5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTBfMDQuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0xpZ2h0IEJsdWUgQmVhY2ggVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsdWUnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA2LmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNy5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWZyaWNhbiBOZWNrc3RyaW5nIFRvcCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnc2tpcnQnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibGFjayddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xuICAgICAgICAgICAgICAgICAgICAnNTFfMDMuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA0LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMaWdodCBTaG9lbGFjZSBTaWxrIFRvcCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczogWydyZWQnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA2LmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNy5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfVxuXG4gICAgICAgIF07XG4gICAgICAgICRzY29wZS5pdGVtID0gcHJvZHVjdHMub25lKCRzdGF0ZVBhcmFtcy5pZCk7XG4gICAgfV0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
