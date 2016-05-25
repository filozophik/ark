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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9wcm9kdWN0L1Byb2R1Y3RDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLE1BQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7V0FDQSxTQUFBLElBQUE7O0lBRUEsUUFBQSxPQUFBLGNBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGlCQUFBLGFBQUEsU0FBQSxjQUFBO0lBQ0EsUUFBQSxPQUFBLGVBQUE7SUFDQSxRQUFBLE9BQUEsZ0JBQUE7SUFDQSxRQUFBLE9BQUEsa0JBQUE7SUFDQSxRQUFBLE9BQUEsY0FBQTtJQUNBLElBQUEsK0JBQUEsU0FBQSxxQkFBQTtRQUNBLG9CQUFBLFdBQUE7Ozs7Ozs7QUNwQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsaURBQUEsU0FBQSxnQkFBQSxxQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxnQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsU0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFVBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFFBQUE7Z0JBQ0EsSUFBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsWUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxZQUFBLFFBQUE7Ozs7Ozs7OztBQ3ZFQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZ0JBQUEsUUFBQSxjQUFBLENBQUEsZUFBQSxVQUFBLGFBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUEsWUFBQTtnQkFDQSxRQUFBO2dCQUNBLE9BQUEsWUFBQSxJQUFBOzs7Ozs7OztBQ1JBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLFlBQUEsQ0FBQSxlQUFBLFNBQUEsYUFBQTs7UUFFQSxJQUFBLE1BQUEsV0FBQTtZQUNBLFFBQUE7WUFDQSxPQUFBLFlBQUEsSUFBQTs7O1FBR0EsSUFBQSxTQUFBLFNBQUEsSUFBQTtZQUNBLE9BQUEsWUFBQSxJQUFBLFdBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUE7WUFDQSxRQUFBOzs7O0FDbEJBLENBQUEsVUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBO1FBQ0EsQ0FBQSxVQUFBLGdCQUFBLEtBQUEsWUFBQTs7UUFFQSxTQUFBLFFBQUEsY0FBQSxHQUFBLFVBQUEsWUFBQTs7UUFFQSxPQUFBLFVBQUE7O1FBRUEsU0FBQSxXQUFBOztZQUVBLElBQUEsU0FBQSxhQUFBO1lBQ0EsV0FBQSxNQUFBLE1BQUEsS0FBQSxVQUFBLFNBQUE7Z0JBQ0EsT0FBQSxhQUFBO2dCQUNBLE9BQUEsZUFBQSxPQUFBLFdBQUEsYUFBQTtlQUNBLFVBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUE7Ozs7WUFJQSxTQUFBLE1BQUEsVUFBQSxLQUFBLFVBQUEsU0FBQTtnQkFDQSxPQUFBLFdBQUE7Z0JBQ0EsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFNBQUEsQ0FBQSxVQUFBO2VBQ0EsVUFBQSxRQUFBO2dCQUNBLFFBQUEsSUFBQTs7Ozs7UUFLQSxPQUFBLGVBQUEsU0FBQSxPQUFBO1lBQ0EsR0FBQSxPQUFBLFFBQUEsT0FBQSxRQUFBLFlBQUE7Z0JBQ0EsT0FBQSxVQUFBO21CQUNBO2dCQUNBLE9BQUEsUUFBQSxPQUFBLE1BQUE7OztZQUdBLE1BQUEsT0FBQTs7O1FBR0EsT0FBQSxZQUFBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxRQUFBLEVBQUEsVUFBQSxPQUFBLFFBQUEsQ0FBQSxLQUFBLEtBQUEsTUFBQTtZQUNBLEdBQUEsU0FBQSxDQUFBLEdBQUE7O2dCQUVBLE9BQUEsYUFBQTtnQkFDQTttQkFDQTs7Z0JBRUEsSUFBQSxNQUFBO29CQUNBLE1BQUE7b0JBQ0EsT0FBQTs7Z0JBRUEsUUFBQSxFQUFBLFVBQUEsT0FBQSxTQUFBLFNBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLElBQUE7O2dCQUVBLEdBQUEsU0FBQSxDQUFBLEdBQUE7b0JBQ0EsT0FBQSxhQUFBOztnQkFFQSxPQUFBLFVBQUEsRUFBQSxPQUFBLE9BQUEsUUFBQSxDQUFBLElBQUEsS0FBQSxJQUFBO2dCQUNBLE9BQUEsUUFBQSxLQUFBO2dCQUNBLE1BQUEsT0FBQTs7OztRQUlBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxNQUFBO1lBQ0EsTUFBQSxRQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE1BQUEsUUFBQSxNQUFBOztZQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxVQUFBOzs7UUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN2RUEsQ0FBQSxXQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUEsQ0FBQSxVQUFBLFlBQUEsZ0JBQUEsVUFBQSxRQUFBLFVBQUEsY0FBQTs7UUFFQSxPQUFBLFVBQUE7O1lBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7Ozs7UUFLQSxTQUFBLE9BQUEsYUFBQSxJQUFBLE1BQUEsS0FBQSxTQUFBLFNBQUE7WUFDQSxPQUFBLE9BQUE7V0FDQSxTQUFBLFFBQUE7WUFDQSxRQUFBLElBQUE7Ozs7QUFJQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdhcHAuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2FwcC5maWx0ZXJzJyxcbiAgICAgICAgICAgICdhcHAuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2FwcC5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdhcHAucm91dGVzJyxcbiAgICAgICAgICAgICdhcHAuY29uZmlnJ1xuICAgICAgICBdKS5jb25zdGFudCgnXycsXyk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLm1hdGVyaWFsaXplJywndWkucm91dGVyJywgJ3NsaWNrJywgJ3Jlc3Rhbmd1bGFyJywnbmdDYXJ0J10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpIHtcbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlci5zZXRCYXNlVXJsKCcvYXBpL3YxJyk7XG4gICAgfSk7XG5cbn0pKCk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICovXHJcbihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XHJcblxyXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24oIHZpZXdOYW1lICl7XHJcbiAgICAgICAgICAgIHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ2Fib3V0Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Fib3V0JylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXRlKCdsYW5kaW5nJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhdGUoJ2Jyb3dzZScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9icm93c2Uve2dlbmRlcn0nLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdicm93c2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhdGUoJ3Byb2R1Y3QnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdC86aWQnLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdwcm9kdWN0JylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXRlKCdjYXJ0Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsOicvY2FydCcsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDpnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY2FydCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0VmlldygnZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkoKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDEwLzA1LzE2LlxyXG4gKi9cclxuKGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnY2F0ZWdvcmllcycsIFsnUmVzdGFuZ3VsYXInLCBmdW5jdGlvbiAoUmVzdGFuZ3VsYXIpIHtcclxuXHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgnY2F0ZWdvcnknKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICB9XSk7XHJcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDQvMjcvMjAxNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdwcm9kdWN0cycsIFsnUmVzdGFuZ3VsYXInLCBmdW5jdGlvbihSZXN0YW5ndWxhcikge1xuXG4gICAgICAgIHZhciBhbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIub25lKCdwcm9kdWN0cycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzaW5nbGUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgncHJvZHVjdHMnLGlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsbDogYWxsLFxuICAgICAgICAgICAgc2luZ2xlOiBzaW5nbGVcbiAgICAgICAgfTtcbiAgICB9XSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXHJcbiAgICAgKi9cclxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdCcm93c2VDb250cm9sbGVyJyxcclxuICAgICAgICBbJyRzY29wZScsICckc3RhdGVQYXJhbXMnLCAnXycsICdwcm9kdWN0cycsICdjYXRlZ29yaWVzJyxcclxuXHJcbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIF8sIHByb2R1Y3RzLCBjYXRlZ29yaWVzKSB7XHJcblxyXG4gICAgICAgICRzY29wZS5maWx0ZXJzID0gW107XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGFjdGl2YXRlKCkge1xyXG4gICAgICAgICAgICAvL0dldCBUaGUgQ2F0ZWdvcmllc1xyXG4gICAgICAgICAgICB2YXIgZ2VuZGVyID0gJHN0YXRlUGFyYW1zLmdlbmRlcjtcclxuICAgICAgICAgICAgY2F0ZWdvcmllcy5hbGwoKS5nZXQoKS50aGVuKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2F0ZWdvcmllcyA9IHJlc29sdmU7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuYWN0aXZlR2VuZGVyID0gJHNjb3BlLmNhdGVnb3JpZXNbJHN0YXRlUGFyYW1zLmdlbmRlcl07XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWplY3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgLy8gR2V0IFRoZSBQcm9kdWN0c1xyXG4gICAgICAgICAgICBwcm9kdWN0cy5hbGwoKS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbiAocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnByb2R1Y3RzLFsnZ2VuZGVyJywgZ2VuZGVyXSk7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWplY3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9XaGF0IFdlIE1hbmlwdWxhdGUgRHVyaW5nIENJLCB3aWxsIGJlIGFsbCBkb25lIHRocm91Z2ggcmVzdC5cclxuICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYoJHNjb3BlLmZpbHRlcnNbaW5kZXhdLnR5cGUgPT0gXCJjYXRlZ29yeVwiKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycyA9IFtdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkc2NvcGUuZmlsdGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycyx7dHlwZTp0eXBlLHZhbHVlOnZhbHVlfSk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5yZW1vdmVGaWx0ZXIoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIG9iamVjdCB0byBpbmNsdWRlXHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycywgZnVuY3Rpb24obykgeyByZXR1cm4gby50eXBlID09IG9iai50eXBlO30pO1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGZpbHRlciB3YXMgbm90IGluY2x1ZGVkIGF0IGFsbFxyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnJlc3VsdHMsW29iai50eXBlLG9iai52YWx1ZV0pO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMucHVzaChvYmopO1xyXG4gICAgICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhZnQoYXJyYXkpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBvYmpbZW50cnkudHlwZV0gPSBlbnRyeS52YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnByb2R1Y3RzLCBvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuICAgIH1dKTtcclxufSkoKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI2LzIwMTYuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1Byb2R1Y3RDb250cm9sbGVyJywgWyckc2NvcGUnLCAncHJvZHVjdHMnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24gKCRzY29wZSwgcHJvZHVjdHMsICRzdGF0ZVBhcmFtcykge1xyXG4gICAgICAgIC8vRG9uZSBUaHJvdWdoIFJFU1RcclxuICAgICAgICAkc2NvcGUucmVsYXRlZCA9IFtcclxuICAgICAgICAgICAgLyogVG9wcyAqL1xyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ0FmcmljYW4gU3R5bGUgU2hvcnQgU2tpcnQgVG9wIHcvIFNob2VzdHJpbmcgU2hvdWxkZXJzJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnY2FyZGlnYW4nLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmx1ZSddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNDlfMDguZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNDlfMDkuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9LCB7XHJcbiAgICAgICAgICAgICAgICBkZXNjcmlwdGlvbjogJ09wZW4gTW90aWYgQmVhY2ggVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnYmVhY2gnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmx1ZSddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDguMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wMy5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNC5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTGlnaHQgQmx1ZSBCZWFjaCBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNi5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc1MF8wNy5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWZyaWNhbiBOZWNrc3RyaW5nIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ3NraXJ0JyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsYWNrJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICc1MV8wMy5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc1MV8wNC5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnTGlnaHQgU2hvZWxhY2UgU2lsayBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydyZWQnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA2LmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA3LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICBdO1xyXG4gICAgICAgIHByb2R1Y3RzLnNpbmdsZSgkc3RhdGVQYXJhbXMuaWQpLmdldCgpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUuaXRlbSA9IHJlc29sdmU7XHJcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XSk7XHJcbn0pKCk7XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
