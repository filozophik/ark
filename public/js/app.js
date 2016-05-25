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

    angular.module('app.routes').config( ["$stateProvider", "$urlRouterProvider", "$locationProvider", function($stateProvider, $urlRouterProvider,$locationProvider ) {

        var getView = function( viewName ){
            return '/views/app/' + viewName + '/' + viewName + '.html';
        };

        $urlRouterProvider.otherwise('/');
        $stateProvider
            .state('about', {
                url: '/about',
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

        $locationProvider.hashPrefix('!');
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

                $scope.products = _.filter(resolve,['gender', gender]);
                $scope.results = $scope.products;
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
 * Created by Benjamin on 5/25/2016.
 */
(function() {
    "use strict";

    angular.module('app.controllers').controller('LandingController', ['$scope', 'products', function ($scope, products, $stateParams) {
        //Done Through REST
        products.single(0).getList('latest').then(function(resolve) {
            $scope.latest = resolve;
        },function(reject) {
            console.log(reject);
        });
        products.single(0).getList('clearance').then(function(resolve) {
            $scope.clearance = resolve;
        },function(reject) {
            console.log(reject);
        });


        $scope.breakpoints = [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }
        ];
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

        products.single($stateParams.id).get().then(function(resolve) {
            $scope.item = resolve;
        }, function(reject) {
            console.log(reject);
        });
        products.single($stateParams.id).getList('related').then(function(resolve) {
            $scope.related = resolve;
        },function(reject) {
            console.log(reject);
        });
    }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9sYW5kaW5nL0xhbmRpbmdDb250cm9sbGVyLmpzIiwiYXBwL3Byb2R1Y3QvUHJvZHVjdENvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBLENBQUEsVUFBQTtJQUNBOztJQUVBLElBQUEsTUFBQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtXQUNBLFNBQUEsSUFBQTs7SUFFQSxRQUFBLE9BQUEsY0FBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsaUJBQUEsYUFBQSxTQUFBLGNBQUE7SUFDQSxRQUFBLE9BQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxnQkFBQTtJQUNBLFFBQUEsT0FBQSxrQkFBQTtJQUNBLFFBQUEsT0FBQSxjQUFBO0lBQ0EsSUFBQSwrQkFBQSxTQUFBLHFCQUFBO1FBQ0Esb0JBQUEsV0FBQTs7Ozs7OztBQ3BCQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsY0FBQSxzRUFBQSxTQUFBLGdCQUFBLG1CQUFBLG9CQUFBOztRQUVBLElBQUEsVUFBQSxVQUFBLFVBQUE7WUFDQSxPQUFBLGdCQUFBLFdBQUEsTUFBQSxXQUFBOzs7UUFHQSxtQkFBQSxVQUFBO1FBQ0E7YUFDQSxNQUFBLFNBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsV0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxVQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsV0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxRQUFBO2dCQUNBLElBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLFlBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsWUFBQSxRQUFBOzs7OztRQUtBLGtCQUFBLFdBQUE7Ozs7OztBQzNFQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZ0JBQUEsUUFBQSxjQUFBLENBQUEsZUFBQSxVQUFBLGFBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUEsWUFBQTtnQkFDQSxRQUFBO2dCQUNBLE9BQUEsWUFBQSxJQUFBOzs7Ozs7OztBQ1JBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLFlBQUEsQ0FBQSxlQUFBLFNBQUEsYUFBQTs7UUFFQSxJQUFBLE1BQUEsV0FBQTtZQUNBLFFBQUE7WUFDQSxPQUFBLFlBQUEsSUFBQTs7O1FBR0EsSUFBQSxTQUFBLFNBQUEsSUFBQTtZQUNBLE9BQUEsWUFBQSxJQUFBLFdBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUE7WUFDQSxRQUFBOzs7O0FDbEJBLENBQUEsVUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBO1FBQ0EsQ0FBQSxVQUFBLGdCQUFBLEtBQUEsWUFBQTs7UUFFQSxTQUFBLFFBQUEsY0FBQSxHQUFBLFVBQUEsWUFBQTs7UUFFQSxPQUFBLFVBQUE7O1FBRUEsU0FBQSxXQUFBOztZQUVBLElBQUEsU0FBQSxhQUFBO1lBQ0EsV0FBQSxNQUFBLE1BQUEsS0FBQSxVQUFBLFNBQUE7Z0JBQ0EsT0FBQSxhQUFBO2dCQUNBLE9BQUEsZUFBQSxPQUFBLFdBQUEsYUFBQTtlQUNBLFVBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUE7Ozs7WUFJQSxTQUFBLE1BQUEsVUFBQSxLQUFBLFVBQUEsU0FBQTs7Z0JBRUEsT0FBQSxXQUFBLEVBQUEsT0FBQSxRQUFBLENBQUEsVUFBQTtnQkFDQSxPQUFBLFVBQUEsT0FBQTtlQUNBLFVBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUE7Ozs7O1FBS0EsT0FBQSxlQUFBLFNBQUEsT0FBQTtZQUNBLEdBQUEsT0FBQSxRQUFBLE9BQUEsUUFBQSxZQUFBO2dCQUNBLE9BQUEsVUFBQTttQkFDQTtnQkFDQSxPQUFBLFFBQUEsT0FBQSxNQUFBOzs7WUFHQSxNQUFBLE9BQUE7OztRQUdBLE9BQUEsWUFBQSxTQUFBLE1BQUEsT0FBQTtZQUNBLElBQUEsUUFBQSxFQUFBLFVBQUEsT0FBQSxRQUFBLENBQUEsS0FBQSxLQUFBLE1BQUE7WUFDQSxHQUFBLFNBQUEsQ0FBQSxHQUFBOztnQkFFQSxPQUFBLGFBQUE7Z0JBQ0E7bUJBQ0E7O2dCQUVBLElBQUEsTUFBQTtvQkFDQSxNQUFBO29CQUNBLE9BQUE7O2dCQUVBLFFBQUEsRUFBQSxVQUFBLE9BQUEsU0FBQSxTQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxJQUFBOztnQkFFQSxHQUFBLFNBQUEsQ0FBQSxHQUFBO29CQUNBLE9BQUEsYUFBQTs7Z0JBRUEsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFFBQUEsQ0FBQSxJQUFBLEtBQUEsSUFBQTtnQkFDQSxPQUFBLFFBQUEsS0FBQTtnQkFDQSxNQUFBLE9BQUE7Ozs7UUFJQSxTQUFBLE1BQUEsT0FBQTtZQUNBLElBQUEsTUFBQTtZQUNBLE1BQUEsUUFBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxNQUFBLFFBQUEsTUFBQTs7WUFFQSxPQUFBLFVBQUEsRUFBQSxPQUFBLE9BQUEsVUFBQTs7O1FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEVBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHFCQUFBLENBQUEsVUFBQSxZQUFBLFVBQUEsUUFBQSxVQUFBLGNBQUE7O1FBRUEsU0FBQSxPQUFBLEdBQUEsUUFBQSxVQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBO1VBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOztRQUVBLFNBQUEsT0FBQSxHQUFBLFFBQUEsYUFBQSxLQUFBLFNBQUEsU0FBQTtZQUNBLE9BQUEsWUFBQTtVQUNBLFNBQUEsUUFBQTtZQUNBLFFBQUEsSUFBQTs7OztRQUlBLE9BQUEsY0FBQTtZQUNBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtvQkFDQSxjQUFBO29CQUNBLGdCQUFBOztlQUVBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtvQkFDQSxjQUFBO29CQUNBLGdCQUFBOzs7Ozs7Ozs7QUM1QkEsQ0FBQSxXQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUEsQ0FBQSxVQUFBLFlBQUEsZ0JBQUEsVUFBQSxRQUFBLFVBQUEsY0FBQTs7O1FBR0EsU0FBQSxPQUFBLGFBQUEsSUFBQSxNQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxPQUFBO1dBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOztRQUVBLFNBQUEsT0FBQSxhQUFBLElBQUEsUUFBQSxXQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxVQUFBO1VBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOzs7O0FBSUEiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuICAgICAgICBbXG4gICAgICAgICAgICAnYXBwLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdhcHAuZmlsdGVycycsXG4gICAgICAgICAgICAnYXBwLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdhcHAuZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnYXBwLnJvdXRlcycsXG4gICAgICAgICAgICAnYXBwLmNvbmZpZydcbiAgICAgICAgXSkuY29uc3RhbnQoJ18nLF8pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5tYXRlcmlhbGl6ZScsJ3VpLnJvdXRlcicsICdzbGljaycsICdyZXN0YW5ndWxhcicsJ25nQ2FydCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XG4gICAgYXBwLmNvbmZpZyhmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKSB7XG4gICAgICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuc2V0QmFzZVVybCgnL2FwaS92MScpO1xuICAgIH0pO1xuXG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICovXG4oZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJykuY29uZmlnKCBmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyLCRsb2NhdGlvblByb3ZpZGVyICkge1xuXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24oIHZpZXdOYW1lICl7XG4gICAgICAgICAgICByZXR1cm4gJy92aWV3cy9hcHAvJyArIHZpZXdOYW1lICsgJy8nICsgdmlld05hbWUgKyAnLmh0bWwnO1xuICAgICAgICB9O1xuXG4gICAgICAgICR1cmxSb3V0ZXJQcm92aWRlci5vdGhlcndpc2UoJy8nKTtcbiAgICAgICAgJHN0YXRlUHJvdmlkZXJcbiAgICAgICAgICAgIC5zdGF0ZSgnYWJvdXQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2Fib3V0JyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYWJvdXQnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhdGUoJ2xhbmRpbmcnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhdGUoJ2Jyb3dzZScsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvYnJvd3NlL3tnZW5kZXJ9JyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYnJvd3NlJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdwcm9kdWN0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9wcm9kdWN0LzppZCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Byb2R1Y3QnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSkuc3RhdGUoJ2NhcnQnLCB7XG4gICAgICAgICAgICAgICAgdXJsOicvY2FydCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDpnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY2FydCcpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeCgnIScpO1xuICAgIH0pO1xufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMC8wNS8xNi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnY2F0ZWdvcmllcycsIFsnUmVzdGFuZ3VsYXInLCBmdW5jdGlvbiAoUmVzdGFuZ3VsYXIpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIub25lKCdjYXRlZ29yeScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDQvMjcvMjAxNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdwcm9kdWN0cycsIFsnUmVzdGFuZ3VsYXInLCBmdW5jdGlvbihSZXN0YW5ndWxhcikge1xuXG4gICAgICAgIHZhciBhbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIub25lKCdwcm9kdWN0cycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzaW5nbGUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgncHJvZHVjdHMnLGlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsbDogYWxsLFxuICAgICAgICAgICAgc2luZ2xlOiBzaW5nbGVcbiAgICAgICAgfTtcbiAgICB9XSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICAgICAqL1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdCcm93c2VDb250cm9sbGVyJyxcbiAgICAgICAgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ18nLCAncHJvZHVjdHMnLCAnY2F0ZWdvcmllcycsXG5cbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIF8sIHByb2R1Y3RzLCBjYXRlZ29yaWVzKSB7XG5cbiAgICAgICAgJHNjb3BlLmZpbHRlcnMgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIC8vR2V0IFRoZSBDYXRlZ29yaWVzXG4gICAgICAgICAgICB2YXIgZ2VuZGVyID0gJHN0YXRlUGFyYW1zLmdlbmRlcjtcbiAgICAgICAgICAgIGNhdGVnb3JpZXMuYWxsKCkuZ2V0KCkudGhlbihmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jYXRlZ29yaWVzID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuYWN0aXZlR2VuZGVyID0gJHNjb3BlLmNhdGVnb3JpZXNbJHN0YXRlUGFyYW1zLmdlbmRlcl07XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBHZXQgVGhlIFByb2R1Y3RzXG4gICAgICAgICAgICBwcm9kdWN0cy5hbGwoKS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbiAocmVzb2x2ZSkge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gXy5maWx0ZXIocmVzb2x2ZSxbJ2dlbmRlcicsIGdlbmRlcl0pO1xuICAgICAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gJHNjb3BlLnByb2R1Y3RzO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vV2hhdCBXZSBNYW5pcHVsYXRlIER1cmluZyBDSSwgd2lsbCBiZSBhbGwgZG9uZSB0aHJvdWdoIHJlc3QuXG4gICAgICAgICRzY29wZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgaWYoJHNjb3BlLmZpbHRlcnNbaW5kZXhdLnR5cGUgPT0gXCJjYXRlZ29yeVwiKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMgPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gXy5maW5kSW5kZXgoJHNjb3BlLmZpbHRlcnMse3R5cGU6dHlwZSx2YWx1ZTp2YWx1ZX0pO1xuICAgICAgICAgICAgaWYoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyKGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEZpbHRlciBvYmplY3QgdG8gaW5jbHVkZVxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycywgZnVuY3Rpb24obykgeyByZXR1cm4gby50eXBlID09IG9iai50eXBlO30pO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBmaWx0ZXIgd2FzIG5vdCBpbmNsdWRlZCBhdCBhbGxcbiAgICAgICAgICAgICAgICBpZihpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBfLmZpbHRlcigkc2NvcGUucmVzdWx0cyxbb2JqLnR5cGUsb2JqLnZhbHVlXSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMucHVzaChvYmopO1xuICAgICAgICAgICAgICAgIGRyYWZ0KCRzY29wZS5maWx0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBkcmFmdChhcnJheSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgICAgIG9ialtlbnRyeS50eXBlXSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUucmVzdWx0cyA9IF8uZmlsdGVyKCRzY29wZS5wcm9kdWN0cywgb2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGl2YXRlKCk7XG4gICAgfV0pO1xufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgQmVuamFtaW4gb24gNS8yNS8yMDE2LlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTGFuZGluZ0NvbnRyb2xsZXInLCBbJyRzY29wZScsICdwcm9kdWN0cycsIGZ1bmN0aW9uICgkc2NvcGUsIHByb2R1Y3RzLCAkc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgLy9Eb25lIFRocm91Z2ggUkVTVFxuICAgICAgICBwcm9kdWN0cy5zaW5nbGUoMCkuZ2V0TGlzdCgnbGF0ZXN0JykudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICAkc2NvcGUubGF0ZXN0ID0gcmVzb2x2ZTtcbiAgICAgICAgfSxmdW5jdGlvbihyZWplY3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9kdWN0cy5zaW5nbGUoMCkuZ2V0TGlzdCgnY2xlYXJhbmNlJykudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICAkc2NvcGUuY2xlYXJhbmNlID0gcmVzb2x2ZTtcbiAgICAgICAgfSxmdW5jdGlvbihyZWplY3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgJHNjb3BlLmJyZWFrcG9pbnRzID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDk5MixcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAzXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSwge1xuICAgICAgICAgICAgICAgIGJyZWFrcG9pbnQ6IDYwMCxcbiAgICAgICAgICAgICAgICBzZXR0aW5nczoge1xuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXG4gICAgICAgICAgICAgICAgICAgIHNsaWRlc1RvU2Nyb2xsOiAyXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICBdO1xuICAgIH1dKTtcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDQvMjYvMjAxNi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICAgICAqL1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdQcm9kdWN0Q29udHJvbGxlcicsIFsnJHNjb3BlJywgJ3Byb2R1Y3RzJywgJyRzdGF0ZVBhcmFtcycsIGZ1bmN0aW9uICgkc2NvcGUsIHByb2R1Y3RzLCAkc3RhdGVQYXJhbXMpIHtcbiAgICAgICAgLy9Eb25lIFRocm91Z2ggUkVTVFxuXG4gICAgICAgIHByb2R1Y3RzLnNpbmdsZSgkc3RhdGVQYXJhbXMuaWQpLmdldCgpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgICAgJHNjb3BlLml0ZW0gPSByZXNvbHZlO1xuICAgICAgICB9LCBmdW5jdGlvbihyZWplY3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgICBwcm9kdWN0cy5zaW5nbGUoJHN0YXRlUGFyYW1zLmlkKS5nZXRMaXN0KCdyZWxhdGVkJykudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICAkc2NvcGUucmVsYXRlZCA9IHJlc29sdmU7XG4gICAgICAgIH0sZnVuY3Rpb24ocmVqZWN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWplY3QpO1xuICAgICAgICB9KTtcbiAgICB9XSk7XG59KSgpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
