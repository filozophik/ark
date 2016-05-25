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
                url: '/browse/{gender}',
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

        function activate() {
            //Get The Categories
            var gender = $stateParams.gender;
            categories.all().get().then(function (resolve) {
                $scope.categories = resolve;
                $scope.activeGender = $scope.categories[$stateParams.gender];
            }, function (reject) {
                console.log(reject);
            });

            // Get The Products
            products.all().getList().then(function (resolve) {
                $scope.products = resolve;
                $scope.results = _.filter($scope.products,['gender', gender]);
            }, function (reject) {
                console.log(reject);
            });
        }

        //What We Manipulate During CI, will be all done through rest.
        $scope.removeFilter = function(index) {
            if($scope.filters[index].type == "category") {
                $scope.filters = [];
            } else {
                $scope.filters.splice(index,1);
                //console.log($scope.filters);
            }
            draft($scope.filters);
        };

        $scope.addFilter = function(type, value) {
            var index = _.findIndex($scope.filters,{type:type,value:value});
            if(index != -1) {
                //console.log(index);
                $scope.removeFilter(index);
                return;
            } else {
                // Filter object to include
                var obj = {
                    type: type,
                    value: value
                };
                index = _.findIndex($scope.filters, function(o) { return o.type == obj.type;});
                // If the filter was not included at all
                if(index != -1) {
                    $scope.removeFilter(index);
                }
                $scope.results = _.filter($scope.results,[obj.type,obj.value]);
                $scope.filters.push(obj);
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

        activate();
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9wcm9kdWN0L1Byb2R1Y3RDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLE1BQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7V0FDQSxTQUFBLElBQUE7O0lBRUEsUUFBQSxPQUFBLGNBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGlCQUFBLGFBQUEsU0FBQSxjQUFBO0lBQ0EsUUFBQSxPQUFBLGVBQUE7SUFDQSxRQUFBLE9BQUEsZ0JBQUE7SUFDQSxRQUFBLE9BQUEsa0JBQUE7SUFDQSxRQUFBLE9BQUEsY0FBQTtJQUNBLElBQUEsK0JBQUEsU0FBQSxxQkFBQTtRQUNBLG9CQUFBLFdBQUE7Ozs7Ozs7QUNwQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsaURBQUEsU0FBQSxnQkFBQSxxQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxnQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsU0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFVBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFFBQUE7Z0JBQ0EsSUFBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsWUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxZQUFBLFFBQUE7Ozs7Ozs7OztBQ3ZFQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZ0JBQUEsUUFBQSxjQUFBLENBQUEsZUFBQSxVQUFBLGFBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUEsWUFBQTtnQkFDQSxRQUFBO2dCQUNBLE9BQUEsWUFBQSxJQUFBOzs7Ozs7OztBQ1JBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLFlBQUEsQ0FBQSxlQUFBLFNBQUEsYUFBQTs7UUFFQSxJQUFBLE1BQUEsV0FBQTtZQUNBLFFBQUE7WUFDQSxPQUFBLFlBQUEsSUFBQTs7O1FBR0EsSUFBQSxTQUFBLFNBQUEsSUFBQTtZQUNBLE9BQUEsWUFBQSxJQUFBLFdBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUE7WUFDQSxRQUFBOzs7O0FDbEJBLENBQUEsVUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBO1FBQ0EsQ0FBQSxVQUFBLGdCQUFBLEtBQUEsWUFBQTs7UUFFQSxTQUFBLFFBQUEsY0FBQSxHQUFBLFVBQUEsWUFBQTs7UUFFQSxPQUFBLFVBQUE7O1FBRUEsU0FBQSxXQUFBOztZQUVBLElBQUEsU0FBQSxhQUFBO1lBQ0EsV0FBQSxNQUFBLE1BQUEsS0FBQSxVQUFBLFNBQUE7Z0JBQ0EsT0FBQSxhQUFBO2dCQUNBLE9BQUEsZUFBQSxPQUFBLFdBQUEsYUFBQTtlQUNBLFVBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUE7Ozs7WUFJQSxTQUFBLE1BQUEsVUFBQSxLQUFBLFVBQUEsU0FBQTtnQkFDQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFNBQUEsQ0FBQSxVQUFBO2VBQ0EsVUFBQSxRQUFBO2dCQUNBLFFBQUEsSUFBQTs7Ozs7UUFLQSxPQUFBLGVBQUEsU0FBQSxPQUFBO1lBQ0EsR0FBQSxPQUFBLFFBQUEsT0FBQSxRQUFBLFlBQUE7Z0JBQ0EsT0FBQSxVQUFBO21CQUNBO2dCQUNBLE9BQUEsUUFBQSxPQUFBLE1BQUE7OztZQUdBLE1BQUEsT0FBQTs7O1FBR0EsT0FBQSxZQUFBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxRQUFBLEVBQUEsVUFBQSxPQUFBLFFBQUEsQ0FBQSxLQUFBLEtBQUEsTUFBQTtZQUNBLEdBQUEsU0FBQSxDQUFBLEdBQUE7O2dCQUVBLE9BQUEsYUFBQTtnQkFDQTttQkFDQTs7Z0JBRUEsSUFBQSxNQUFBO29CQUNBLE1BQUE7b0JBQ0EsT0FBQTs7Z0JBRUEsUUFBQSxFQUFBLFVBQUEsT0FBQSxTQUFBLFNBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLElBQUE7O2dCQUVBLEdBQUEsU0FBQSxDQUFBLEdBQUE7b0JBQ0EsT0FBQSxhQUFBOztnQkFFQSxPQUFBLFVBQUEsRUFBQSxPQUFBLE9BQUEsUUFBQSxDQUFBLElBQUEsS0FBQSxJQUFBO2dCQUNBLE9BQUEsUUFBQSxLQUFBO2dCQUNBLE1BQUEsT0FBQTs7OztRQUlBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxNQUFBO1lBQ0EsTUFBQSxRQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE1BQUEsUUFBQSxNQUFBOztZQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxVQUFBOzs7UUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RUEsQ0FBQSxXQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUEsQ0FBQSxVQUFBLFlBQUEsZ0JBQUEsVUFBQSxRQUFBLFVBQUEsY0FBQTs7UUFFQSxPQUFBLFVBQUE7O1lBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7Ozs7UUFLQSxTQUFBLE9BQUEsYUFBQSxJQUFBLE1BQUEsS0FBQSxTQUFBLFNBQUE7WUFDQSxPQUFBLE9BQUE7V0FDQSxTQUFBLFFBQUE7WUFDQSxRQUFBLElBQUE7Ozs7QUFJQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdhcHAuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2FwcC5maWx0ZXJzJyxcbiAgICAgICAgICAgICdhcHAuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2FwcC5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdhcHAucm91dGVzJyxcbiAgICAgICAgICAgICdhcHAuY29uZmlnJ1xuICAgICAgICBdKS5jb25zdGFudCgnXycsXyk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLm1hdGVyaWFsaXplJywndWkucm91dGVyJywgJ3NsaWNrJywgJ3Jlc3Rhbmd1bGFyJywnbmdDYXJ0J10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpIHtcbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlci5zZXRCYXNlVXJsKCcvYXBpL3YxJyk7XG4gICAgfSk7XG5cbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbiggdmlld05hbWUgKXtcbiAgICAgICAgICAgIHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2Fib3V0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdhYm91dCcpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGF0ZSgnbGFuZGluZycsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGF0ZSgnYnJvd3NlJywge1xuICAgICAgICAgICAgICAgIHVybDogJy9icm93c2Uve2dlbmRlcn0nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdicm93c2UnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhdGUoJ3Byb2R1Y3QnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3QvOmlkJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncHJvZHVjdCcpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGF0ZSgnY2FydCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6Jy9jYXJ0JyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOmdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdjYXJ0JylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDpnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTAvMDUvMTYuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYXBwLnNlcnZpY2VzXCIpLmZhY3RvcnkoJ2NhdGVnb3JpZXMnLCBbJ1Jlc3Rhbmd1bGFyJywgZnVuY3Rpb24gKFJlc3Rhbmd1bGFyKSB7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsbDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgnY2F0ZWdvcnknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XSk7XG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI3LzIwMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgncHJvZHVjdHMnLCBbJ1Jlc3Rhbmd1bGFyJywgZnVuY3Rpb24oUmVzdGFuZ3VsYXIpIHtcblxuICAgICAgICB2YXIgYWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgncHJvZHVjdHMnKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc2luZ2xlID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5vbmUoJ3Byb2R1Y3RzJyxpZCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbGw6IGFsbCxcbiAgICAgICAgICAgIHNpbmdsZTogc2luZ2xlXG4gICAgICAgIH07XG4gICAgfV0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAgICAgKi9cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQnJvd3NlQ29udHJvbGxlcicsXG4gICAgICAgIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsICdfJywgJ3Byb2R1Y3RzJywgJ2NhdGVnb3JpZXMnLFxuXG4gICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBfLCBwcm9kdWN0cywgY2F0ZWdvcmllcykge1xuXG4gICAgICAgICRzY29wZS5maWx0ZXJzID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAvL0dldCBUaGUgQ2F0ZWdvcmllc1xuICAgICAgICAgICAgdmFyIGdlbmRlciA9ICRzdGF0ZVBhcmFtcy5nZW5kZXI7XG4gICAgICAgICAgICBjYXRlZ29yaWVzLmFsbCgpLmdldCgpLnRoZW4oZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2F0ZWdvcmllcyA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmFjdGl2ZUdlbmRlciA9ICRzY29wZS5jYXRlZ29yaWVzWyRzdGF0ZVBhcmFtcy5nZW5kZXJdO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gR2V0IFRoZSBQcm9kdWN0c1xuICAgICAgICAgICAgcHJvZHVjdHMuYWxsKCkuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUucHJvZHVjdHMgPSByZXNvbHZlO1xuICAgICAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnByb2R1Y3RzLFsnZ2VuZGVyJywgZ2VuZGVyXSk7XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy9XaGF0IFdlIE1hbmlwdWxhdGUgRHVyaW5nIENJLCB3aWxsIGJlIGFsbCBkb25lIHRocm91Z2ggcmVzdC5cbiAgICAgICAgJHNjb3BlLnJlbW92ZUZpbHRlciA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgICAgICAgICBpZigkc2NvcGUuZmlsdGVyc1tpbmRleF0udHlwZSA9PSBcImNhdGVnb3J5XCIpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycyA9IFtdO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5zcGxpY2UoaW5kZXgsMSk7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkc2NvcGUuZmlsdGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBkcmFmdCgkc2NvcGUuZmlsdGVycyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHNjb3BlLmFkZEZpbHRlciA9IGZ1bmN0aW9uKHR5cGUsIHZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycyx7dHlwZTp0eXBlLHZhbHVlOnZhbHVlfSk7XG4gICAgICAgICAgICBpZihpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coaW5kZXgpO1xuICAgICAgICAgICAgICAgICRzY29wZS5yZW1vdmVGaWx0ZXIoaW5kZXgpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIG9iamVjdCB0byBpbmNsdWRlXG4gICAgICAgICAgICAgICAgdmFyIG9iaiA9IHtcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpbmRleCA9IF8uZmluZEluZGV4KCRzY29wZS5maWx0ZXJzLCBmdW5jdGlvbihvKSB7IHJldHVybiBvLnR5cGUgPT0gb2JqLnR5cGU7fSk7XG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGZpbHRlciB3YXMgbm90IGluY2x1ZGVkIGF0IGFsbFxuICAgICAgICAgICAgICAgIGlmKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICRzY29wZS5yZW1vdmVGaWx0ZXIoaW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAkc2NvcGUucmVzdWx0cyA9IF8uZmlsdGVyKCRzY29wZS5yZXN1bHRzLFtvYmoudHlwZSxvYmoudmFsdWVdKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycy5wdXNoKG9iaik7XG4gICAgICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGZ1bmN0aW9uIGRyYWZ0KGFycmF5KSB7XG4gICAgICAgICAgICB2YXIgb2JqID0ge307XG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XG4gICAgICAgICAgICAgICAgb2JqW2VudHJ5LnR5cGVdID0gZW50cnkudmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnByb2R1Y3RzLCBvYmopO1xuICAgICAgICB9XG5cbiAgICAgICAgYWN0aXZhdGUoKTtcbiAgICB9XSk7XG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI2LzIwMTYuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAgICAgKi9cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUHJvZHVjdENvbnRyb2xsZXInLCBbJyRzY29wZScsICdwcm9kdWN0cycsICckc3RhdGVQYXJhbXMnLCBmdW5jdGlvbiAoJHNjb3BlLCBwcm9kdWN0cywgJHN0YXRlUGFyYW1zKSB7XG4gICAgICAgIC8vRG9uZSBUaHJvdWdoIFJFU1RcbiAgICAgICAgJHNjb3BlLnJlbGF0ZWQgPSBbXG4gICAgICAgICAgICAvKiBUb3BzICovXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBZnJpY2FuIFN0eWxlIFNob3J0IFNraXJ0IFRvcCB3LyBTaG9lc3RyaW5nIFNob3VsZGVycycsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOC5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNDlfMDkuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ09wZW4gTW90aWYgQmVhY2ggVG9wJyxcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsdWUnXSxcbiAgICAgICAgICAgICAgICBwcmljZTogOC4wMCxcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xuICAgICAgICAgICAgICAgICAgICAnNTBfMDMuZ2lmJyxcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA0LmdpZidcbiAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICB9LCB7XG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMaWdodCBCbHVlIEJlYWNoIFRvcCcsXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNi5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTBfMDcuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0FmcmljYW4gTmVja3N0cmluZyBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ3NraXJ0JyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmxhY2snXSxcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcbiAgICAgICAgICAgICAgICAgICAgJzUxXzAzLmdpZicsXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNC5naWYnXG4gICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTGlnaHQgU2hvZWxhY2UgU2lsayBUb3AnLFxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsncmVkJ10sXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNi5naWYnLFxuICAgICAgICAgICAgICAgICAgICAnNTFfMDcuZ2lmJ1xuICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgIH1cblxuICAgICAgICBdO1xuICAgICAgICBwcm9kdWN0cy5zaW5nbGUoJHN0YXRlUGFyYW1zLmlkKS5nZXQoKS50aGVuKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICAgICRzY29wZS5pdGVtID0gcmVzb2x2ZTtcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVqZWN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
