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

        return {
            all: function() {
                console.log();
                return Restangular.one('products');
            },
            one: function(id) {
                console.log(id);
                console.log(_.find(products,function(o) { return o.id == id;}));
                return _.find(products,function(o) {return o.id == id;});
            }
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
        $scope.item = products.one($stateParams.id);
    }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9wcm9kdWN0L1Byb2R1Y3RDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLE1BQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7V0FDQSxTQUFBLElBQUE7O0lBRUEsUUFBQSxPQUFBLGNBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGlCQUFBLGFBQUEsU0FBQSxjQUFBO0lBQ0EsUUFBQSxPQUFBLGVBQUE7SUFDQSxRQUFBLE9BQUEsZ0JBQUE7SUFDQSxRQUFBLE9BQUEsa0JBQUE7SUFDQSxRQUFBLE9BQUEsY0FBQTtJQUNBLElBQUEsK0JBQUEsU0FBQSxxQkFBQTtRQUNBLG9CQUFBLFdBQUE7Ozs7Ozs7QUNwQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsaURBQUEsU0FBQSxnQkFBQSxxQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxnQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsU0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFVBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFFBQUE7Z0JBQ0EsSUFBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsWUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxZQUFBLFFBQUE7Ozs7Ozs7OztBQ3ZFQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZ0JBQUEsUUFBQSxjQUFBLENBQUEsZUFBQSxVQUFBLGFBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUEsWUFBQTtnQkFDQSxRQUFBO2dCQUNBLE9BQUEsWUFBQSxJQUFBOzs7Ozs7OztBQ1JBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLFlBQUEsQ0FBQSxlQUFBLFNBQUEsYUFBQTs7UUFFQSxPQUFBO1lBQ0EsS0FBQSxXQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsT0FBQSxZQUFBLElBQUE7O1lBRUEsS0FBQSxTQUFBLElBQUE7Z0JBQ0EsUUFBQSxJQUFBO2dCQUNBLFFBQUEsSUFBQSxFQUFBLEtBQUEsU0FBQSxTQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsTUFBQTtnQkFDQSxPQUFBLEVBQUEsS0FBQSxTQUFBLFNBQUEsR0FBQSxDQUFBLE9BQUEsRUFBQSxNQUFBOzs7OztBQ2hCQSxDQUFBLFVBQUE7SUFDQTs7Ozs7SUFLQSxRQUFBLE9BQUEsbUJBQUEsV0FBQTtRQUNBLENBQUEsVUFBQSxnQkFBQSxLQUFBLFlBQUE7O1FBRUEsU0FBQSxRQUFBLGNBQUEsR0FBQSxVQUFBLFlBQUE7O1FBRUEsT0FBQSxVQUFBO1FBQ0EsV0FBQSxNQUFBLE1BQUEsS0FBQSxTQUFBLFNBQUE7WUFDQSxPQUFBLGFBQUE7WUFDQSxPQUFBLGlCQUFBLE9BQUEsV0FBQTtVQUNBLFNBQUEsUUFBQTtZQUNBLFFBQUEsSUFBQTs7Ozs7UUFLQSxTQUFBLE1BQUEsVUFBQSxLQUFBLFNBQUEsU0FBQTtZQUNBLE9BQUEsV0FBQTtZQUNBLE9BQUEsVUFBQSxPQUFBO1dBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOzs7O1FBSUEsT0FBQSxlQUFBLFNBQUEsT0FBQTtZQUNBLE9BQUEsUUFBQSxPQUFBLE1BQUE7WUFDQSxRQUFBLElBQUEsT0FBQTtZQUNBLE1BQUEsT0FBQTs7O1FBR0EsT0FBQSxZQUFBLFNBQUEsTUFBQSxPQUFBOztZQUVBLElBQUEsTUFBQTtnQkFDQSxNQUFBO2dCQUNBLE9BQUE7O1lBRUEsSUFBQSxRQUFBLEVBQUEsVUFBQSxPQUFBLFNBQUEsU0FBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsSUFBQTs7WUFFQSxHQUFBLFNBQUEsQ0FBQSxHQUFBOztnQkFFQSxPQUFBLFVBQUEsRUFBQSxPQUFBLE9BQUEsUUFBQSxDQUFBLElBQUEsS0FBQSxJQUFBO2dCQUNBLE9BQUEsUUFBQSxLQUFBO2dCQUNBLFFBQUEsSUFBQSxPQUFBOzttQkFFQTtnQkFDQSxPQUFBLFFBQUEsT0FBQSxNQUFBLEVBQUE7Z0JBQ0EsTUFBQSxPQUFBOzs7O1FBSUEsU0FBQSxNQUFBLE9BQUE7WUFDQSxJQUFBLE1BQUE7WUFDQSxNQUFBLFFBQUEsU0FBQSxPQUFBO2dCQUNBLElBQUEsTUFBQSxRQUFBLE1BQUE7O1lBRUEsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFVBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3pEQSxDQUFBLFdBQUE7SUFDQTs7Ozs7SUFLQSxRQUFBLE9BQUEsbUJBQUEsV0FBQSxxQkFBQSxDQUFBLFVBQUEsWUFBQSxnQkFBQSxVQUFBLFFBQUEsVUFBQSxjQUFBOzs7UUFHQSxPQUFBLFVBQUE7O1lBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7Ozs7UUFLQSxPQUFBLE9BQUEsU0FBQSxJQUFBLGFBQUE7OztBQUdBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICovXG4oZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ2FwcC5jb250cm9sbGVycycsXG4gICAgICAgICAgICAnYXBwLmZpbHRlcnMnLFxuICAgICAgICAgICAgJ2FwcC5zZXJ2aWNlcycsXG4gICAgICAgICAgICAnYXBwLmRpcmVjdGl2ZXMnLFxuICAgICAgICAgICAgJ2FwcC5yb3V0ZXMnLFxuICAgICAgICAgICAgJ2FwcC5jb25maWcnXG4gICAgICAgIF0pLmNvbnN0YW50KCdfJyxfKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFsndWkubWF0ZXJpYWxpemUnLCd1aS5yb3V0ZXInLCAnc2xpY2snLCAncmVzdGFuZ3VsYXInLCduZ0NhcnQnXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5maWx0ZXJzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuc2VydmljZXMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5kaXJlY3RpdmVzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29uZmlnJywgW10pO1xuICAgIGFwcC5jb25maWcoZnVuY3Rpb24oUmVzdGFuZ3VsYXJQcm92aWRlcikge1xuICAgICAgICBSZXN0YW5ndWxhclByb3ZpZGVyLnNldEJhc2VVcmwoJy9hcGkvdjEnKTtcbiAgICB9KTtcblxufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycpLmNvbmZpZyggZnVuY3Rpb24oJHN0YXRlUHJvdmlkZXIsICR1cmxSb3V0ZXJQcm92aWRlciApIHtcblxuICAgICAgICB2YXIgZ2V0VmlldyA9IGZ1bmN0aW9uKCB2aWV3TmFtZSApe1xuICAgICAgICAgICAgcmV0dXJuICcvdmlld3MvYXBwLycgKyB2aWV3TmFtZSArICcvJyArIHZpZXdOYW1lICsgJy5odG1sJztcbiAgICAgICAgfTtcblxuICAgICAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvJyk7XG5cbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnYWJvdXQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Fib3V0JylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdsYW5kaW5nJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdsYW5kaW5nJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdicm93c2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2Jyb3dzZS97ZW5kcG9pbnR9JyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYnJvd3NlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdwcm9kdWN0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9wcm9kdWN0LzppZCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Byb2R1Y3QnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhdGUoJ2NhcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOicvY2FydCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDpnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY2FydCcpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSk7XG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDEwLzA1LzE2LlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdjYXRlZ29yaWVzJywgWydSZXN0YW5ndWxhcicsIGZ1bmN0aW9uIChSZXN0YW5ndWxhcikge1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbGw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5vbmUoJ2NhdGVnb3J5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfV0pO1xufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgQmVuamFtaW4gb24gNC8yNy8yMDE2LlxuICovXG4oZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYXBwLnNlcnZpY2VzXCIpLmZhY3RvcnkoJ3Byb2R1Y3RzJywgWydSZXN0YW5ndWxhcicsIGZ1bmN0aW9uKFJlc3Rhbmd1bGFyKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIub25lKCdwcm9kdWN0cycpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9uZTogZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhpZCk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXy5maW5kKHByb2R1Y3RzLGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8uaWQgPT0gaWQ7fSkpO1xuICAgICAgICAgICAgICAgIHJldHVybiBfLmZpbmQocHJvZHVjdHMsZnVuY3Rpb24obykge3JldHVybiBvLmlkID09IGlkO30pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gICAgICovXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Jyb3dzZUNvbnRyb2xsZXInLFxuICAgICAgICBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnXycsICdwcm9kdWN0cycsICdjYXRlZ29yaWVzJyxcblxuICAgICAgICBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgXywgcHJvZHVjdHMsIGNhdGVnb3JpZXMpIHtcblxuICAgICAgICAkc2NvcGUuZmlsdGVycyA9IFtdO1xuICAgICAgICBjYXRlZ29yaWVzLmFsbCgpLmdldCgpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgICAgJHNjb3BlLmNhdGVnb3JpZXMgPSByZXNvbHZlO1xuICAgICAgICAgICAgJHNjb3BlLmFjdGl2ZUNhdGVnb3J5ID0gJHNjb3BlLmNhdGVnb3JpZXMuTTtcbiAgICAgICAgfSxmdW5jdGlvbihyZWplY3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy9Eb25lIFRocm91Z2ggUkVTVFxuICAgICAgICBwcm9kdWN0cy5hbGwoKS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICAkc2NvcGUucHJvZHVjdHMgPSByZXNvbHZlO1xuICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSAkc2NvcGUucHJvZHVjdHM7XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlamVjdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9XaGF0IFdlIE1hbmlwdWxhdGUgRHVyaW5nIENJLCB3aWxsIGJlIGFsbCBkb25lIHRocm91Z2ggcmVzdC5cbiAgICAgICAgJHNjb3BlLnJlbW92ZUZpbHRlciA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygkc2NvcGUuZmlsdGVycyk7XG4gICAgICAgICAgICBkcmFmdCgkc2NvcGUuZmlsdGVycyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmFkZEZpbHRlciA9IGZ1bmN0aW9uKHR5cGUsIHZhbHVlKSB7XG4gICAgICAgICAgICAvLyBGaWx0ZXIgb2JqZWN0IHRvIGluY2x1ZGVcbiAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycywgZnVuY3Rpb24obykgeyByZXR1cm4gby50eXBlID09IG9iai50eXBlO30pO1xuICAgICAgICAgICAgLy8gSWYgdGhlIGZpbHRlciB3YXMgbm90IGluY2x1ZGVkIGF0IGFsbFxuICAgICAgICAgICAgaWYoaW5kZXggPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvLyBVcGRhdGUgdGhlIFJlc3VsdHMgQWNjb3JkaW5nbHlcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVzdWx0cyA9IF8uZmlsdGVyKCRzY29wZS5yZXN1bHRzLFtvYmoudHlwZSxvYmoudmFsdWVdKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICAgICAgLy8gRmlsdGVyIGNhdGVnb3J5IHdhcyBpbmNsdWRlZFxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5zcGxpY2UoaW5kZXgsMSxvYmopO1xuICAgICAgICAgICAgICAgIGRyYWZ0KCRzY29wZS5maWx0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBkcmFmdChhcnJheSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgICAgIG9ialtlbnRyeS50eXBlXSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUucmVzdWx0cyA9IF8uZmlsdGVyKCRzY29wZS5wcm9kdWN0cywgb2JqKTtcbiAgICAgICAgfVxuICAgIH1dKTtcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDQvMjYvMjAxNi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICAgICAqL1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdQcm9kdWN0Q29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3Byb2R1Y3RzJywgJyRzdGF0ZVBhcmFtcycsIGZ1bmN0aW9uICgkc2NvcGUsIHByb2R1Y3RzLCAkc3RhdGVQYXJhbXMpIHtcblxuICAgICAgICAvL0RvbmUgVGhyb3VnaCBSRVNUXG4gICAgICAgICRzY29wZS5yZWxhdGVkID0gW1xuICAgICAgICAgICAgLyogVG9wcyAqL1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWZyaWNhbiBTdHlsZSBTaG9ydCBTa2lydCBUb3Agdy8gU2hvZXN0cmluZyBTaG91bGRlcnMnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmx1ZSddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xuICAgICAgICAgICAgICAgICAgICAnNDlfMDguZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzQ5XzA5LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdPcGVuIE1vdGlmIEJlYWNoIFRvcCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDguMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgJzUwXzAzLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNC5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTGlnaHQgQmx1ZSBCZWFjaCBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2JlYWNoJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmx1ZSddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xuICAgICAgICAgICAgICAgICAgICAnNTBfMDYuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA3LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBZnJpY2FuIE5lY2tzdHJpbmcgVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdza2lydCcsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsYWNrJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MV8wMy5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTFfMDQuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0xpZ2h0IFNob2VsYWNlIFNpbGsgVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ3JlZCddLFxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xuICAgICAgICAgICAgICAgICAgICAnNTFfMDYuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA3LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9XG5cbiAgICAgICAgXTtcbiAgICAgICAgJHNjb3BlLml0ZW0gPSBwcm9kdWN0cy5vbmUoJHN0YXRlUGFyYW1zLmlkKTtcbiAgICB9XSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
