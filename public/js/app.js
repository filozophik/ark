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
    app.config(["RestangularProvider", function(RestangularProvider) {
        RestangularProvider.setBaseUrl('/api/v1');
    }]);

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
            .state('about', {
                url: '/',
                views: {
                    header: {
                        templateUrl: getView('shopping-header')
                    },
                    main: {
                        templateUrl: getView('about')
                    },
                    footer: {
                        templateUrl: getView('footer')
                    }
                }
            }).state('landing', {
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

        return {
            all: function () {
                console.log();
                return Restangular.one('category');
            }
        };
    }]);
})();
/**
 * Created by Benjamin on 4/27/2016.
 */
(function(){
    "use strict";

    angular.module("app.services").factory('products', ['Restangular', function(Restangular) {

        var all = function() {
            console.log();
            return Restangular.one('products');
        };

        var single = function(id) {
            return Restangular.one('products',id);
        };
        return {
            all: all,
            single: single
        };
    }]);
})();
(function(){
    "use strict";

    /**
     * Created by lofo on 11/04/16.
     */
    angular.module('app.controllers').controller('BrowseController',
        ['$scope', '$stateParams', '_', 'products', 'categories',

        function($scope, $stateParams, _, products, categories) {

        $scope.filters = [];
        categories.all().get().then(function(resolve) {
            $scope.categories = resolve;
            $scope.activeCategory = $scope.categories.M;
        },function(reject) {
            console.log(reject);
        });


        //Done Through REST
        products.all().getList().then(function(resolve) {
            $scope.products = resolve;
            $scope.results = $scope.products;
        }, function(reject) {
            console.log(reject);
        });

        //What We Manipulate During CI, will be all done through rest.
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
            var index = _.findIndex($scope.filters, function(o) { return o.type == obj.type;});
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
            $scope.results = _.filter($scope.products, obj);
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
        products.single($stateParams.id).get().then(function(resolve) {
            $scope.item = resolve;
        }, function(reject) {
            console.log(reject);
        });
    }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9wcm9kdWN0L1Byb2R1Y3RDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLE1BQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7V0FDQSxTQUFBLElBQUE7O0lBRUEsUUFBQSxPQUFBLGNBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGlCQUFBLGFBQUEsU0FBQSxjQUFBO0lBQ0EsUUFBQSxPQUFBLGVBQUE7SUFDQSxRQUFBLE9BQUEsZ0JBQUE7SUFDQSxRQUFBLE9BQUEsa0JBQUE7SUFDQSxRQUFBLE9BQUEsY0FBQTtJQUNBLElBQUEsK0JBQUEsU0FBQSxxQkFBQTtRQUNBLG9CQUFBLFdBQUE7Ozs7Ozs7QUNwQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsaURBQUEsU0FBQSxnQkFBQSxxQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxnQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsU0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFVBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFFBQUE7Z0JBQ0EsSUFBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsWUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxZQUFBLFFBQUE7Ozs7Ozs7OztBQ3ZFQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZ0JBQUEsUUFBQSxjQUFBLENBQUEsZUFBQSxVQUFBLGFBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUEsWUFBQTtnQkFDQSxRQUFBO2dCQUNBLE9BQUEsWUFBQSxJQUFBOzs7Ozs7OztBQ1JBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLFlBQUEsQ0FBQSxlQUFBLFNBQUEsYUFBQTs7UUFFQSxJQUFBLE1BQUEsV0FBQTtZQUNBLFFBQUE7WUFDQSxPQUFBLFlBQUEsSUFBQTs7O1FBR0EsSUFBQSxTQUFBLFNBQUEsSUFBQTtZQUNBLE9BQUEsWUFBQSxJQUFBLFdBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUE7WUFDQSxRQUFBOzs7O0FDbEJBLENBQUEsVUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBO1FBQ0EsQ0FBQSxVQUFBLGdCQUFBLEtBQUEsWUFBQTs7UUFFQSxTQUFBLFFBQUEsY0FBQSxHQUFBLFVBQUEsWUFBQTs7UUFFQSxPQUFBLFVBQUE7UUFDQSxXQUFBLE1BQUEsTUFBQSxLQUFBLFNBQUEsU0FBQTtZQUNBLE9BQUEsYUFBQTtZQUNBLE9BQUEsaUJBQUEsT0FBQSxXQUFBO1VBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOzs7OztRQUtBLFNBQUEsTUFBQSxVQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxXQUFBO1lBQ0EsT0FBQSxVQUFBLE9BQUE7V0FDQSxTQUFBLFFBQUE7WUFDQSxRQUFBLElBQUE7Ozs7UUFJQSxPQUFBLGVBQUEsU0FBQSxPQUFBO1lBQ0EsT0FBQSxRQUFBLE9BQUEsTUFBQTtZQUNBLFFBQUEsSUFBQSxPQUFBO1lBQ0EsTUFBQSxPQUFBOzs7UUFHQSxPQUFBLFlBQUEsU0FBQSxNQUFBLE9BQUE7O1lBRUEsSUFBQSxNQUFBO2dCQUNBLE1BQUE7Z0JBQ0EsT0FBQTs7WUFFQSxJQUFBLFFBQUEsRUFBQSxVQUFBLE9BQUEsU0FBQSxTQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxJQUFBOztZQUVBLEdBQUEsU0FBQSxDQUFBLEdBQUE7O2dCQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxRQUFBLENBQUEsSUFBQSxLQUFBLElBQUE7Z0JBQ0EsT0FBQSxRQUFBLEtBQUE7Z0JBQ0EsUUFBQSxJQUFBLE9BQUE7O21CQUVBO2dCQUNBLE9BQUEsUUFBQSxPQUFBLE1BQUEsRUFBQTtnQkFDQSxNQUFBLE9BQUE7Ozs7UUFJQSxTQUFBLE1BQUEsT0FBQTtZQUNBLElBQUEsTUFBQTtZQUNBLE1BQUEsUUFBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxNQUFBLFFBQUEsTUFBQTs7WUFFQSxPQUFBLFVBQUEsRUFBQSxPQUFBLE9BQUEsVUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDekRBLENBQUEsV0FBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHFCQUFBLENBQUEsVUFBQSxZQUFBLGdCQUFBLFVBQUEsUUFBQSxVQUFBLGNBQUE7O1FBRUEsT0FBQSxVQUFBOztZQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7Ozs7O1FBS0EsU0FBQSxPQUFBLGFBQUEsSUFBQSxNQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxPQUFBO1dBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOzs7O0FBSUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuICAgICAgICBbXG4gICAgICAgICAgICAnYXBwLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdhcHAuZmlsdGVycycsXG4gICAgICAgICAgICAnYXBwLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdhcHAuZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnYXBwLnJvdXRlcycsXG4gICAgICAgICAgICAnYXBwLmNvbmZpZydcbiAgICAgICAgXSkuY29uc3RhbnQoJ18nLF8pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5tYXRlcmlhbGl6ZScsJ3VpLnJvdXRlcicsICdzbGljaycsICdyZXN0YW5ndWxhcicsJ25nQ2FydCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XG4gICAgYXBwLmNvbmZpZyhmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKSB7XG4gICAgICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuc2V0QmFzZVVybCgnL2FwaS92MScpO1xuICAgIH0pO1xuXG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKXtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykuY29uZmlnKCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyICkge1xyXG5cclxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKCB2aWV3TmFtZSApe1xyXG4gICAgICAgICAgICByZXR1cm4gJy92aWV3cy9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgdmlld05hbWUgKyAnLmh0bWwnO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcclxuXHJcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcclxuICAgICAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhYm91dCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGF0ZSgnbGFuZGluZycsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy8nLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdsYW5kaW5nJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXRlKCdicm93c2UnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvYnJvd3NlL3tlbmRwb2ludH0nLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdicm93c2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhdGUoJ3Byb2R1Y3QnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdC86aWQnLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdwcm9kdWN0JylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXRlKCdjYXJ0Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsOicvY2FydCcsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDpnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY2FydCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0VmlldygnZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkoKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDEwLzA1LzE2LlxyXG4gKi9cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnY2F0ZWdvcmllcycsIFsnUmVzdGFuZ3VsYXInLCBmdW5jdGlvbiAoUmVzdGFuZ3VsYXIpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgnY2F0ZWdvcnknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XSk7XHJcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDQvMjcvMjAxNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdwcm9kdWN0cycsIFsnUmVzdGFuZ3VsYXInLCBmdW5jdGlvbihSZXN0YW5ndWxhcikge1xuXG4gICAgICAgIHZhciBhbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIub25lKCdwcm9kdWN0cycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzaW5nbGUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgncHJvZHVjdHMnLGlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsbDogYWxsLFxuICAgICAgICAgICAgc2luZ2xlOiBzaW5nbGVcbiAgICAgICAgfTtcbiAgICB9XSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdCcm93c2VDb250cm9sbGVyJyxcclxuICAgICAgICBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnXycsICdwcm9kdWN0cycsICdjYXRlZ29yaWVzJyxcclxuXHJcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIF8sIHByb2R1Y3RzLCBjYXRlZ29yaWVzKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5maWx0ZXJzID0gW107XHJcbiAgICAgICAgY2F0ZWdvcmllcy5hbGwoKS5nZXQoKS50aGVuKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNhdGVnb3JpZXMgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICAkc2NvcGUuYWN0aXZlQ2F0ZWdvcnkgPSAkc2NvcGUuY2F0ZWdvcmllcy5NO1xyXG4gICAgICAgIH0sZnVuY3Rpb24ocmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG5cclxuICAgICAgICAvL0RvbmUgVGhyb3VnaCBSRVNUXHJcbiAgICAgICAgcHJvZHVjdHMuYWxsKCkuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUucHJvZHVjdHMgPSByZXNvbHZlO1xyXG4gICAgICAgICAgICAkc2NvcGUucmVzdWx0cyA9ICRzY29wZS5wcm9kdWN0cztcclxuICAgICAgICB9LCBmdW5jdGlvbihyZWplY3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy9XaGF0IFdlIE1hbmlwdWxhdGUgRHVyaW5nIENJLCB3aWxsIGJlIGFsbCBkb25lIHRocm91Z2ggcmVzdC5cclxuICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZmlsdGVycyk7XHJcbiAgICAgICAgICAgIGRyYWZ0KCRzY29wZS5maWx0ZXJzKTtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAkc2NvcGUuYWRkRmlsdGVyID0gZnVuY3Rpb24odHlwZSwgdmFsdWUpIHtcclxuICAgICAgICAgICAgLy8gRmlsdGVyIG9iamVjdCB0byBpbmNsdWRlXHJcbiAgICAgICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxyXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHZhciBpbmRleCA9IF8uZmluZEluZGV4KCRzY29wZS5maWx0ZXJzLCBmdW5jdGlvbihvKSB7IHJldHVybiBvLnR5cGUgPT0gb2JqLnR5cGU7fSk7XHJcbiAgICAgICAgICAgIC8vIElmIHRoZSBmaWx0ZXIgd2FzIG5vdCBpbmNsdWRlZCBhdCBhbGxcclxuICAgICAgICAgICAgaWYoaW5kZXggPT0gLTEpIHtcclxuICAgICAgICAgICAgICAgIC8vIFVwZGF0ZSB0aGUgUmVzdWx0cyBBY2NvcmRpbmdseVxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBfLmZpbHRlcigkc2NvcGUucmVzdWx0cyxbb2JqLnR5cGUsb2JqLnZhbHVlXSk7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5wdXNoKG9iaik7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZmlsdGVycyk7XHJcbiAgICAgICAgICAgIC8vIEZpbHRlciBjYXRlZ29yeSB3YXMgaW5jbHVkZWRcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXJzLnNwbGljZShpbmRleCwxLG9iaik7XHJcbiAgICAgICAgICAgICAgICBkcmFmdCgkc2NvcGUuZmlsdGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmdW5jdGlvbiBkcmFmdChhcnJheSkge1xyXG4gICAgICAgICAgICB2YXIgb2JqID0ge307XHJcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcclxuICAgICAgICAgICAgICAgIG9ialtlbnRyeS50eXBlXSA9IGVudHJ5LnZhbHVlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBfLmZpbHRlcigkc2NvcGUucHJvZHVjdHMsIG9iaik7XHJcbiAgICAgICAgfVxyXG4gICAgfV0pO1xyXG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDQvMjYvMjAxNi5cclxuICovXHJcbihmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUHJvZHVjdENvbnRyb2xsZXInLCBbJyRzY29wZScsICdwcm9kdWN0cycsICckc3RhdGVQYXJhbXMnLCBmdW5jdGlvbiAoJHNjb3BlLCBwcm9kdWN0cywgJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgICAgLy9Eb25lIFRocm91Z2ggUkVTVFxyXG4gICAgICAgICRzY29wZS5yZWxhdGVkID0gW1xyXG4gICAgICAgICAgICAvKiBUb3BzICovXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWZyaWNhbiBTdHlsZSBTaG9ydCBTa2lydCBUb3Agdy8gU2hvZXN0cmluZyBTaG91bGRlcnMnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOC5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOS5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnT3BlbiBNb3RpZiBCZWFjaCBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogOC4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMaWdodCBCbHVlIEJlYWNoIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2JlYWNoJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsdWUnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA2LmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA3LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBZnJpY2FuIE5lY2tzdHJpbmcgVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnc2tpcnQnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmxhY2snXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMaWdodCBTaG9lbGFjZSBTaWxrIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ3JlZCddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDYuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDcuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcHJvZHVjdHMuc2luZ2xlKCRzdGF0ZVBhcmFtcy5pZCkuZ2V0KCkudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pdGVtID0gcmVzb2x2ZTtcclxuICAgICAgICB9LCBmdW5jdGlvbihyZWplY3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1dKTtcclxufSkoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
