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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9wcm9kdWN0L1Byb2R1Y3RDb250cm9sbGVyLmpzIiwiYXBwL2xhbmRpbmcvTGFuZGluZ0NvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBLENBQUEsVUFBQTtJQUNBOztJQUVBLElBQUEsTUFBQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtXQUNBLFNBQUEsSUFBQTs7SUFFQSxRQUFBLE9BQUEsY0FBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsaUJBQUEsYUFBQSxTQUFBLGNBQUE7SUFDQSxRQUFBLE9BQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxnQkFBQTtJQUNBLFFBQUEsT0FBQSxrQkFBQTtJQUNBLFFBQUEsT0FBQSxjQUFBO0lBQ0EsSUFBQSwrQkFBQSxTQUFBLHFCQUFBO1FBQ0Esb0JBQUEsV0FBQTs7Ozs7OztBQ3BCQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsY0FBQSxpREFBQSxTQUFBLGdCQUFBLHFCQUFBOztRQUVBLElBQUEsVUFBQSxVQUFBLFVBQUE7WUFDQSxPQUFBLGdCQUFBLFdBQUEsTUFBQSxXQUFBOzs7UUFHQSxtQkFBQSxVQUFBOztRQUVBO2FBQ0EsTUFBQSxTQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFdBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsVUFBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFdBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsUUFBQTtnQkFDQSxJQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxZQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLFlBQUEsUUFBQTs7Ozs7Ozs7O0FDdkVBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLGNBQUEsQ0FBQSxlQUFBLFVBQUEsYUFBQTs7UUFFQSxPQUFBO1lBQ0EsS0FBQSxZQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsT0FBQSxZQUFBLElBQUE7Ozs7Ozs7O0FDUkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGdCQUFBLFFBQUEsWUFBQSxDQUFBLGVBQUEsU0FBQSxhQUFBOztRQUVBLElBQUEsTUFBQSxXQUFBO1lBQ0EsUUFBQTtZQUNBLE9BQUEsWUFBQSxJQUFBOzs7UUFHQSxJQUFBLFNBQUEsU0FBQSxJQUFBO1lBQ0EsT0FBQSxZQUFBLElBQUEsV0FBQTs7UUFFQSxPQUFBO1lBQ0EsS0FBQTtZQUNBLFFBQUE7Ozs7QUNsQkEsQ0FBQSxVQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUE7UUFDQSxDQUFBLFVBQUEsZ0JBQUEsS0FBQSxZQUFBOztRQUVBLFNBQUEsUUFBQSxjQUFBLEdBQUEsVUFBQSxZQUFBOztRQUVBLE9BQUEsVUFBQTs7UUFFQSxTQUFBLFdBQUE7O1lBRUEsSUFBQSxTQUFBLGFBQUE7WUFDQSxXQUFBLE1BQUEsTUFBQSxLQUFBLFVBQUEsU0FBQTtnQkFDQSxPQUFBLGFBQUE7Z0JBQ0EsT0FBQSxlQUFBLE9BQUEsV0FBQSxhQUFBO2VBQ0EsVUFBQSxRQUFBO2dCQUNBLFFBQUEsSUFBQTs7OztZQUlBLFNBQUEsTUFBQSxVQUFBLEtBQUEsVUFBQSxTQUFBOztnQkFFQSxPQUFBLFdBQUEsRUFBQSxPQUFBLFFBQUEsQ0FBQSxVQUFBO2dCQUNBLE9BQUEsVUFBQSxPQUFBO2VBQ0EsVUFBQSxRQUFBO2dCQUNBLFFBQUEsSUFBQTs7Ozs7UUFLQSxPQUFBLGVBQUEsU0FBQSxPQUFBO1lBQ0EsR0FBQSxPQUFBLFFBQUEsT0FBQSxRQUFBLFlBQUE7Z0JBQ0EsT0FBQSxVQUFBO21CQUNBO2dCQUNBLE9BQUEsUUFBQSxPQUFBLE1BQUE7OztZQUdBLE1BQUEsT0FBQTs7O1FBR0EsT0FBQSxZQUFBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxRQUFBLEVBQUEsVUFBQSxPQUFBLFFBQUEsQ0FBQSxLQUFBLEtBQUEsTUFBQTtZQUNBLEdBQUEsU0FBQSxDQUFBLEdBQUE7O2dCQUVBLE9BQUEsYUFBQTtnQkFDQTttQkFDQTs7Z0JBRUEsSUFBQSxNQUFBO29CQUNBLE1BQUE7b0JBQ0EsT0FBQTs7Z0JBRUEsUUFBQSxFQUFBLFVBQUEsT0FBQSxTQUFBLFNBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLElBQUE7O2dCQUVBLEdBQUEsU0FBQSxDQUFBLEdBQUE7b0JBQ0EsT0FBQSxhQUFBOztnQkFFQSxPQUFBLFVBQUEsRUFBQSxPQUFBLE9BQUEsUUFBQSxDQUFBLElBQUEsS0FBQSxJQUFBO2dCQUNBLE9BQUEsUUFBQSxLQUFBO2dCQUNBLE1BQUEsT0FBQTs7OztRQUlBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxNQUFBO1lBQ0EsTUFBQSxRQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE1BQUEsUUFBQSxNQUFBOztZQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxVQUFBOzs7UUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4RUEsQ0FBQSxXQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUEsQ0FBQSxVQUFBLFlBQUEsZ0JBQUEsVUFBQSxRQUFBLFVBQUEsY0FBQTs7O1FBR0EsU0FBQSxPQUFBLGFBQUEsSUFBQSxNQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxPQUFBO1dBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOztRQUVBLFNBQUEsT0FBQSxhQUFBLElBQUEsUUFBQSxXQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxVQUFBO1VBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOzs7Ozs7OztBQ2pCQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsV0FBQSxxQkFBQSxDQUFBLFVBQUEsWUFBQSxVQUFBLFFBQUEsVUFBQSxjQUFBOztRQUVBLFNBQUEsT0FBQSxHQUFBLFFBQUEsVUFBQSxLQUFBLFNBQUEsU0FBQTtZQUNBLE9BQUEsU0FBQTtVQUNBLFNBQUEsUUFBQTtZQUNBLFFBQUEsSUFBQTs7UUFFQSxTQUFBLE9BQUEsR0FBQSxRQUFBLGFBQUEsS0FBQSxTQUFBLFNBQUE7WUFDQSxPQUFBLFlBQUE7VUFDQSxTQUFBLFFBQUE7WUFDQSxRQUFBLElBQUE7Ozs7UUFJQSxPQUFBLGNBQUE7WUFDQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7b0JBQ0EsY0FBQTtvQkFDQSxnQkFBQTs7ZUFFQTtnQkFDQSxZQUFBO2dCQUNBLFVBQUE7b0JBQ0EsY0FBQTtvQkFDQSxnQkFBQTs7Ozs7S0FLQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdhcHAuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2FwcC5maWx0ZXJzJyxcbiAgICAgICAgICAgICdhcHAuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2FwcC5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdhcHAucm91dGVzJyxcbiAgICAgICAgICAgICdhcHAuY29uZmlnJ1xuICAgICAgICBdKS5jb25zdGFudCgnXycsXyk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLm1hdGVyaWFsaXplJywndWkucm91dGVyJywgJ3NsaWNrJywgJ3Jlc3Rhbmd1bGFyJywnbmdDYXJ0J10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpIHtcbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlci5zZXRCYXNlVXJsKCcvYXBpL3YxJyk7XG4gICAgfSk7XG5cbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbiggdmlld05hbWUgKXtcbiAgICAgICAgICAgIHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuXG4gICAgICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgICAgICAgICAuc3RhdGUoJ2Fib3V0Jywge1xuICAgICAgICAgICAgICAgIHVybDogJy9hYm91dCcsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Fib3V0JylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdsYW5kaW5nJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdsYW5kaW5nJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdicm93c2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2Jyb3dzZS97Z2VuZGVyfScsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Jyb3dzZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGF0ZSgncHJvZHVjdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdC86aWQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdwcm9kdWN0JylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDonL2NhcnQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NhcnQnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOmdldFZpZXcoJ2Zvb3RlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMC8wNS8xNi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnY2F0ZWdvcmllcycsIFsnUmVzdGFuZ3VsYXInLCBmdW5jdGlvbiAoUmVzdGFuZ3VsYXIpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIub25lKCdjYXRlZ29yeScpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH1dKTtcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDQvMjcvMjAxNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdwcm9kdWN0cycsIFsnUmVzdGFuZ3VsYXInLCBmdW5jdGlvbihSZXN0YW5ndWxhcikge1xuXG4gICAgICAgIHZhciBhbGwgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XG4gICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIub25lKCdwcm9kdWN0cycpO1xuICAgICAgICB9O1xuXG4gICAgICAgIHZhciBzaW5nbGUgPSBmdW5jdGlvbihpZCkge1xuICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgncHJvZHVjdHMnLGlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGFsbDogYWxsLFxuICAgICAgICAgICAgc2luZ2xlOiBzaW5nbGVcbiAgICAgICAgfTtcbiAgICB9XSk7XG59KSgpOyIsIihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICAgICAqL1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnKS5jb250cm9sbGVyKCdCcm93c2VDb250cm9sbGVyJyxcbiAgICAgICAgWyckc2NvcGUnLCAnJHN0YXRlUGFyYW1zJywgJ18nLCAncHJvZHVjdHMnLCAnY2F0ZWdvcmllcycsXG5cbiAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIF8sIHByb2R1Y3RzLCBjYXRlZ29yaWVzKSB7XG5cbiAgICAgICAgJHNjb3BlLmZpbHRlcnMgPSBbXTtcblxuICAgICAgICBmdW5jdGlvbiBhY3RpdmF0ZSgpIHtcbiAgICAgICAgICAgIC8vR2V0IFRoZSBDYXRlZ29yaWVzXG4gICAgICAgICAgICB2YXIgZ2VuZGVyID0gJHN0YXRlUGFyYW1zLmdlbmRlcjtcbiAgICAgICAgICAgIGNhdGVnb3JpZXMuYWxsKCkuZ2V0KCkudGhlbihmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgICAgICRzY29wZS5jYXRlZ29yaWVzID0gcmVzb2x2ZTtcbiAgICAgICAgICAgICAgICAkc2NvcGUuYWN0aXZlR2VuZGVyID0gJHNjb3BlLmNhdGVnb3JpZXNbJHN0YXRlUGFyYW1zLmdlbmRlcl07XG4gICAgICAgICAgICB9LCBmdW5jdGlvbiAocmVqZWN0KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcbiAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAvLyBHZXQgVGhlIFByb2R1Y3RzXG4gICAgICAgICAgICBwcm9kdWN0cy5hbGwoKS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbiAocmVzb2x2ZSkge1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gXy5maWx0ZXIocmVzb2x2ZSxbJ2dlbmRlcicsIGdlbmRlcl0pO1xuICAgICAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gJHNjb3BlLnByb2R1Y3RzO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vV2hhdCBXZSBNYW5pcHVsYXRlIER1cmluZyBDSSwgd2lsbCBiZSBhbGwgZG9uZSB0aHJvdWdoIHJlc3QuXG4gICAgICAgICRzY29wZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgaWYoJHNjb3BlLmZpbHRlcnNbaW5kZXhdLnR5cGUgPT0gXCJjYXRlZ29yeVwiKSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMgPSBbXTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgICAgIC8vY29uc29sZS5sb2coJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gXy5maW5kSW5kZXgoJHNjb3BlLmZpbHRlcnMse3R5cGU6dHlwZSx2YWx1ZTp2YWx1ZX0pO1xuICAgICAgICAgICAgaWYoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGluZGV4KTtcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyKGluZGV4KTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIC8vIEZpbHRlciBvYmplY3QgdG8gaW5jbHVkZVxuICAgICAgICAgICAgICAgIHZhciBvYmogPSB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlOiB2YWx1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycywgZnVuY3Rpb24obykgeyByZXR1cm4gby50eXBlID09IG9iai50eXBlO30pO1xuICAgICAgICAgICAgICAgIC8vIElmIHRoZSBmaWx0ZXIgd2FzIG5vdCBpbmNsdWRlZCBhdCBhbGxcbiAgICAgICAgICAgICAgICBpZihpbmRleCAhPSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyKGluZGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBfLmZpbHRlcigkc2NvcGUucmVzdWx0cyxbb2JqLnR5cGUsb2JqLnZhbHVlXSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMucHVzaChvYmopO1xuICAgICAgICAgICAgICAgIGRyYWZ0KCRzY29wZS5maWx0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcblxuICAgICAgICBmdW5jdGlvbiBkcmFmdChhcnJheSkge1xuICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAgICAgICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbihlbnRyeSkge1xuICAgICAgICAgICAgICAgIG9ialtlbnRyeS50eXBlXSA9IGVudHJ5LnZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAkc2NvcGUucmVzdWx0cyA9IF8uZmlsdGVyKCRzY29wZS5wcm9kdWN0cywgb2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFjdGl2YXRlKCk7XG4gICAgfV0pO1xufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgQmVuamFtaW4gb24gNC8yNi8yMDE2LlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gICAgICovXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1Byb2R1Y3RDb250cm9sbGVyJywgWyckc2NvcGUnLCAncHJvZHVjdHMnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24gKCRzY29wZSwgcHJvZHVjdHMsICRzdGF0ZVBhcmFtcykge1xuICAgICAgICAvL0RvbmUgVGhyb3VnaCBSRVNUXG5cbiAgICAgICAgcHJvZHVjdHMuc2luZ2xlKCRzdGF0ZVBhcmFtcy5pZCkuZ2V0KCkudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICAkc2NvcGUuaXRlbSA9IHJlc29sdmU7XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlamVjdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHByb2R1Y3RzLnNpbmdsZSgkc3RhdGVQYXJhbXMuaWQpLmdldExpc3QoJ3JlbGF0ZWQnKS50aGVuKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICAgICRzY29wZS5yZWxhdGVkID0gcmVzb2x2ZTtcbiAgICAgICAgfSxmdW5jdGlvbihyZWplY3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgIH1dKTtcbn0pKCk7XG4iLCIvKipcclxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA1LzI1LzIwMTYuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignTGFuZGluZ0NvbnRyb2xsZXInLCBbJyRzY29wZScsICdwcm9kdWN0cycsIGZ1bmN0aW9uICgkc2NvcGUsIHByb2R1Y3RzLCAkc3RhdGVQYXJhbXMpIHtcclxuICAgICAgICAvL0RvbmUgVGhyb3VnaCBSRVNUXHJcbiAgICAgICAgcHJvZHVjdHMuc2luZ2xlKDApLmdldExpc3QoJ2xhdGVzdCcpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xyXG4gICAgICAgICAgICAkc2NvcGUubGF0ZXN0ID0gcmVzb2x2ZTtcclxuICAgICAgICB9LGZ1bmN0aW9uKHJlamVjdCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWplY3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHByb2R1Y3RzLnNpbmdsZSgwKS5nZXRMaXN0KCdjbGVhcmFuY2UnKS50aGVuKGZ1bmN0aW9uKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgJHNjb3BlLmNsZWFyYW5jZSA9IHJlc29sdmU7XHJcbiAgICAgICAgfSxmdW5jdGlvbihyZWplY3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuXHJcblxyXG4gICAgICAgICRzY29wZS5icmVha3BvaW50cyA9IFtcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogOTkyLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDMsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDNcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgYnJlYWtwb2ludDogNjAwLFxyXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Nob3c6IDIsXHJcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TY3JvbGw6IDJcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIF07XHJcbiAgICB9XSk7XHJcbn0pKCk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
