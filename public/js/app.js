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
    angular.module('app.controllers', ['ui.materialize','ui.router', 'angucomplete-alt','slick', 'restangular','ngCart']);
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
            });
        /*.state('landing', {
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
*/
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

/**
 * Created by lofo on 26/05/16.
 */
(function() {
    "use strict";

    angular.module('app.controllers').controller('HeaderController', ['$scope','categories', function ($scope,categories) {
        //Done Through REST

        categories.all().getList('subcategories').then(function (resolve) {
            console.log(resolve);
            $scope.searchSubjects = resolve;
        }, function(reject) {
            console.log(reject);
        });
        $scope.selectedSubject = '';
    }]);
})();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9sYW5kaW5nL0xhbmRpbmdDb250cm9sbGVyLmpzIiwiYXBwL3Byb2R1Y3QvUHJvZHVjdENvbnRyb2xsZXIuanMiLCJhcHAvc2hvcHBpbmctaGVhZGVyL0hlYWRlckNvbnRyb2xsZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7OztBQUdBLENBQUEsVUFBQTtJQUNBOztJQUVBLElBQUEsTUFBQSxRQUFBLE9BQUE7UUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtXQUNBLFNBQUEsSUFBQTs7SUFFQSxRQUFBLE9BQUEsY0FBQSxDQUFBO0lBQ0EsUUFBQSxPQUFBLG1CQUFBLENBQUEsaUJBQUEsYUFBQSxtQkFBQSxTQUFBLGNBQUE7SUFDQSxRQUFBLE9BQUEsZUFBQTtJQUNBLFFBQUEsT0FBQSxnQkFBQTtJQUNBLFFBQUEsT0FBQSxrQkFBQTtJQUNBLFFBQUEsT0FBQSxjQUFBO0lBQ0EsSUFBQSwrQkFBQSxTQUFBLHFCQUFBO1FBQ0Esb0JBQUEsV0FBQTs7Ozs7OztBQ3BCQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsY0FBQSxzRUFBQSxTQUFBLGdCQUFBLG1CQUFBLG9CQUFBOztRQUVBLElBQUEsVUFBQSxVQUFBLFVBQUE7WUFDQSxPQUFBLGdCQUFBLFdBQUEsTUFBQSxXQUFBOzs7UUFHQSxtQkFBQSxVQUFBO1FBQ0E7YUFDQSxNQUFBLFNBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxhQUFBLFFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUF1REEsa0JBQUEsV0FBQTs7Ozs7O0FDNUVBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLGNBQUEsQ0FBQSxlQUFBLFVBQUEsYUFBQTs7UUFFQSxPQUFBO1lBQ0EsS0FBQSxZQUFBO2dCQUNBLE9BQUEsWUFBQSxJQUFBOzs7Ozs7OztBQ1BBLENBQUEsVUFBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxnQkFBQSxRQUFBLFlBQUEsQ0FBQSxlQUFBLFNBQUEsYUFBQTs7UUFFQSxJQUFBLE1BQUEsV0FBQTtZQUNBLFFBQUE7WUFDQSxPQUFBLFlBQUEsSUFBQTs7O1FBR0EsSUFBQSxTQUFBLFNBQUEsSUFBQTtZQUNBLE9BQUEsWUFBQSxJQUFBLFdBQUE7O1FBRUEsT0FBQTtZQUNBLEtBQUE7WUFDQSxRQUFBOzs7O0FDbEJBLENBQUEsVUFBQTtJQUNBOzs7OztJQUtBLFFBQUEsT0FBQSxtQkFBQSxXQUFBO1FBQ0EsQ0FBQSxVQUFBLGdCQUFBLEtBQUEsWUFBQTs7UUFFQSxTQUFBLFFBQUEsY0FBQSxHQUFBLFVBQUEsWUFBQTs7UUFFQSxPQUFBLFVBQUE7O1FBRUEsU0FBQSxXQUFBOztZQUVBLElBQUEsU0FBQSxhQUFBO1lBQ0EsV0FBQSxNQUFBLE1BQUEsS0FBQSxVQUFBLFNBQUE7Z0JBQ0EsT0FBQSxhQUFBO2dCQUNBLE9BQUEsZUFBQSxPQUFBLFdBQUEsYUFBQTtlQUNBLFVBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUE7Ozs7WUFJQSxTQUFBLE1BQUEsVUFBQSxLQUFBLFVBQUEsU0FBQTs7Z0JBRUEsT0FBQSxXQUFBLEVBQUEsT0FBQSxRQUFBLENBQUEsVUFBQTtnQkFDQSxPQUFBLFVBQUEsT0FBQTtlQUNBLFVBQUEsUUFBQTtnQkFDQSxRQUFBLElBQUE7Ozs7O1FBS0EsT0FBQSxlQUFBLFNBQUEsT0FBQTtZQUNBLEdBQUEsT0FBQSxRQUFBLE9BQUEsUUFBQSxZQUFBO2dCQUNBLE9BQUEsVUFBQTttQkFDQTtnQkFDQSxPQUFBLFFBQUEsT0FBQSxNQUFBOzs7WUFHQSxNQUFBLE9BQUE7OztRQUdBLE9BQUEsWUFBQSxTQUFBLE1BQUEsT0FBQTtZQUNBLElBQUEsUUFBQSxFQUFBLFVBQUEsT0FBQSxRQUFBLENBQUEsS0FBQSxLQUFBLE1BQUE7WUFDQSxHQUFBLFNBQUEsQ0FBQSxHQUFBOztnQkFFQSxPQUFBLGFBQUE7Z0JBQ0E7bUJBQ0E7O2dCQUVBLElBQUEsTUFBQTtvQkFDQSxNQUFBO29CQUNBLE9BQUE7O2dCQUVBLFFBQUEsRUFBQSxVQUFBLE9BQUEsU0FBQSxTQUFBLEdBQUEsRUFBQSxPQUFBLEVBQUEsUUFBQSxJQUFBOztnQkFFQSxHQUFBLFNBQUEsQ0FBQSxHQUFBO29CQUNBLE9BQUEsYUFBQTs7Z0JBRUEsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFFBQUEsQ0FBQSxJQUFBLEtBQUEsSUFBQTtnQkFDQSxPQUFBLFFBQUEsS0FBQTtnQkFDQSxNQUFBLE9BQUE7Ozs7UUFJQSxTQUFBLE1BQUEsT0FBQTtZQUNBLElBQUEsTUFBQTtZQUNBLE1BQUEsUUFBQSxTQUFBLE9BQUE7Z0JBQ0EsSUFBQSxNQUFBLFFBQUEsTUFBQTs7WUFFQSxPQUFBLFVBQUEsRUFBQSxPQUFBLE9BQUEsVUFBQTs7O1FBR0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDeEVBLENBQUEsV0FBQTtJQUNBOztJQUVBLFFBQUEsT0FBQSxtQkFBQSxXQUFBLHFCQUFBLENBQUEsVUFBQSxZQUFBLFVBQUEsUUFBQSxVQUFBLGNBQUE7O1FBRUEsU0FBQSxPQUFBLEdBQUEsUUFBQSxVQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxTQUFBO1VBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOztRQUVBLFNBQUEsT0FBQSxHQUFBLFFBQUEsYUFBQSxLQUFBLFNBQUEsU0FBQTtZQUNBLE9BQUEsWUFBQTtVQUNBLFNBQUEsUUFBQTtZQUNBLFFBQUEsSUFBQTs7OztRQUlBLE9BQUEsY0FBQTtZQUNBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtvQkFDQSxjQUFBO29CQUNBLGdCQUFBOztlQUVBO2dCQUNBLFlBQUE7Z0JBQ0EsVUFBQTtvQkFDQSxjQUFBO29CQUNBLGdCQUFBOzs7Ozs7Ozs7QUM1QkEsQ0FBQSxXQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUEsQ0FBQSxVQUFBLFlBQUEsZ0JBQUEsVUFBQSxRQUFBLFVBQUEsY0FBQTs7O1FBR0EsU0FBQSxPQUFBLGFBQUEsSUFBQSxNQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxPQUFBO1dBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOztRQUVBLFNBQUEsT0FBQSxhQUFBLElBQUEsUUFBQSxXQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxVQUFBO1VBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOzs7Ozs7OztBQ2pCQSxDQUFBLFdBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsbUJBQUEsV0FBQSxvQkFBQSxDQUFBLFNBQUEsY0FBQSxVQUFBLE9BQUEsWUFBQTs7O1FBR0EsV0FBQSxNQUFBLFFBQUEsaUJBQUEsS0FBQSxVQUFBLFNBQUE7WUFDQSxRQUFBLElBQUE7WUFDQSxPQUFBLGlCQUFBO1dBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOztRQUVBLE9BQUEsa0JBQUE7OztBQUdBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxuICovXG4oZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIHZhciBhcHAgPSBhbmd1bGFyLm1vZHVsZSgnYXBwJyxcbiAgICAgICAgW1xuICAgICAgICAgICAgJ2FwcC5jb250cm9sbGVycycsXG4gICAgICAgICAgICAnYXBwLmZpbHRlcnMnLFxuICAgICAgICAgICAgJ2FwcC5zZXJ2aWNlcycsXG4gICAgICAgICAgICAnYXBwLmRpcmVjdGl2ZXMnLFxuICAgICAgICAgICAgJ2FwcC5yb3V0ZXMnLFxuICAgICAgICAgICAgJ2FwcC5jb25maWcnXG4gICAgICAgIF0pLmNvbnN0YW50KCdfJyxfKTtcblxuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAucm91dGVzJywgWyd1aS5yb3V0ZXInXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycsIFsndWkubWF0ZXJpYWxpemUnLCd1aS5yb3V0ZXInLCAnYW5ndWNvbXBsZXRlLWFsdCcsJ3NsaWNrJywgJ3Jlc3Rhbmd1bGFyJywnbmdDYXJ0J10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpIHtcbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlci5zZXRCYXNlVXJsKCcvYXBpL3YxJyk7XG4gICAgfSk7XG5cbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIsJGxvY2F0aW9uUHJvdmlkZXIgKSB7XG5cbiAgICAgICAgdmFyIGdldFZpZXcgPSBmdW5jdGlvbiggdmlld05hbWUgKXtcbiAgICAgICAgICAgIHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XG4gICAgICAgIH07XG5cbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xuICAgICAgICAkc3RhdGVQcm92aWRlclxuICAgICAgICAgICAgLnN0YXRlKCdhYm91dCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcbiAgICAgICAgICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYWJvdXQnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIC8qLnN0YXRlKCdsYW5kaW5nJywge1xuICAgICAgICAgICAgICAgIHVybDogJy8nLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdsYW5kaW5nJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdicm93c2UnLCB7XG4gICAgICAgICAgICAgICAgdXJsOiAnL2Jyb3dzZS97Z2VuZGVyfScsXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Jyb3dzZScpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KS5zdGF0ZSgncHJvZHVjdCcsIHtcbiAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdC86aWQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdwcm9kdWN0JylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pLnN0YXRlKCdjYXJ0Jywge1xuICAgICAgICAgICAgICAgIHVybDonL2NhcnQnLFxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NhcnQnKVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOmdldFZpZXcoJ2Zvb3RlcicpXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuKi9cbiAgICAgICAgJGxvY2F0aW9uUHJvdmlkZXIuaGFzaFByZWZpeCgnIScpO1xuICAgIH0pO1xufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMC8wNS8xNi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgnY2F0ZWdvcmllcycsIFsnUmVzdGFuZ3VsYXInLCBmdW5jdGlvbiAoUmVzdGFuZ3VsYXIpIHtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWxsOiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgnY2F0ZWdvcnknKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICB9XSk7XG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI3LzIwMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgncHJvZHVjdHMnLCBbJ1Jlc3Rhbmd1bGFyJywgZnVuY3Rpb24oUmVzdGFuZ3VsYXIpIHtcblxuICAgICAgICB2YXIgYWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgncHJvZHVjdHMnKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc2luZ2xlID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5vbmUoJ3Byb2R1Y3RzJyxpZCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbGw6IGFsbCxcbiAgICAgICAgICAgIHNpbmdsZTogc2luZ2xlXG4gICAgICAgIH07XG4gICAgfV0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAgICAgKi9cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQnJvd3NlQ29udHJvbGxlcicsXG4gICAgICAgIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsICdfJywgJ3Byb2R1Y3RzJywgJ2NhdGVnb3JpZXMnLFxuXG4gICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgJHN0YXRlUGFyYW1zLCBfLCBwcm9kdWN0cywgY2F0ZWdvcmllcykge1xuXG4gICAgICAgICRzY29wZS5maWx0ZXJzID0gW107XG5cbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XG4gICAgICAgICAgICAvL0dldCBUaGUgQ2F0ZWdvcmllc1xuICAgICAgICAgICAgdmFyIGdlbmRlciA9ICRzdGF0ZVBhcmFtcy5nZW5kZXI7XG4gICAgICAgICAgICBjYXRlZ29yaWVzLmFsbCgpLmdldCgpLnRoZW4oZnVuY3Rpb24gKHJlc29sdmUpIHtcbiAgICAgICAgICAgICAgICAkc2NvcGUuY2F0ZWdvcmllcyA9IHJlc29sdmU7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmFjdGl2ZUdlbmRlciA9ICRzY29wZS5jYXRlZ29yaWVzWyRzdGF0ZVBhcmFtcy5nZW5kZXJdO1xuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlamVjdCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgLy8gR2V0IFRoZSBQcm9kdWN0c1xuICAgICAgICAgICAgcHJvZHVjdHMuYWxsKCkuZ2V0TGlzdCgpLnRoZW4oZnVuY3Rpb24gKHJlc29sdmUpIHtcblxuICAgICAgICAgICAgICAgICRzY29wZS5wcm9kdWN0cyA9IF8uZmlsdGVyKHJlc29sdmUsWydnZW5kZXInLCBnZW5kZXJdKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUucmVzdWx0cyA9ICRzY29wZS5wcm9kdWN0cztcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWplY3QpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZWplY3QpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvL1doYXQgV2UgTWFuaXB1bGF0ZSBEdXJpbmcgQ0ksIHdpbGwgYmUgYWxsIGRvbmUgdGhyb3VnaCByZXN0LlxuICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyID0gZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgICAgIGlmKCRzY29wZS5maWx0ZXJzW2luZGV4XS50eXBlID09IFwiY2F0ZWdvcnlcIikge1xuICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXJzID0gW107XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXJzLnNwbGljZShpbmRleCwxKTtcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKCRzY29wZS5maWx0ZXJzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRyYWZ0KCRzY29wZS5maWx0ZXJzKTtcbiAgICAgICAgfTtcblxuICAgICAgICAkc2NvcGUuYWRkRmlsdGVyID0gZnVuY3Rpb24odHlwZSwgdmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBpbmRleCA9IF8uZmluZEluZGV4KCRzY29wZS5maWx0ZXJzLHt0eXBlOnR5cGUsdmFsdWU6dmFsdWV9KTtcbiAgICAgICAgICAgIGlmKGluZGV4ICE9IC0xKSB7XG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZyhpbmRleCk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlbW92ZUZpbHRlcihpbmRleCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBGaWx0ZXIgb2JqZWN0IHRvIGluY2x1ZGVcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiB0eXBlLFxuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogdmFsdWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIGluZGV4ID0gXy5maW5kSW5kZXgoJHNjb3BlLmZpbHRlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8udHlwZSA9PSBvYmoudHlwZTt9KTtcbiAgICAgICAgICAgICAgICAvLyBJZiB0aGUgZmlsdGVyIHdhcyBub3QgaW5jbHVkZWQgYXQgYWxsXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggIT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnJlbW92ZUZpbHRlcihpbmRleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnJlc3VsdHMsW29iai50eXBlLG9iai52YWx1ZV0pO1xuICAgICAgICAgICAgICAgICRzY29wZS5maWx0ZXJzLnB1c2gob2JqKTtcbiAgICAgICAgICAgICAgICBkcmFmdCgkc2NvcGUuZmlsdGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZHJhZnQoYXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICAgICBvYmpbZW50cnkudHlwZV0gPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBfLmZpbHRlcigkc2NvcGUucHJvZHVjdHMsIG9iaik7XG4gICAgICAgIH1cblxuICAgICAgICBhY3RpdmF0ZSgpO1xuICAgIH1dKTtcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDUvMjUvMjAxNi5cbiAqL1xuKGZ1bmN0aW9uKCkge1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0xhbmRpbmdDb250cm9sbGVyJywgWyckc2NvcGUnLCAncHJvZHVjdHMnLCBmdW5jdGlvbiAoJHNjb3BlLCBwcm9kdWN0cywgJHN0YXRlUGFyYW1zKSB7XG4gICAgICAgIC8vRG9uZSBUaHJvdWdoIFJFU1RcbiAgICAgICAgcHJvZHVjdHMuc2luZ2xlKDApLmdldExpc3QoJ2xhdGVzdCcpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgICAgJHNjb3BlLmxhdGVzdCA9IHJlc29sdmU7XG4gICAgICAgIH0sZnVuY3Rpb24ocmVqZWN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvZHVjdHMuc2luZ2xlKDApLmdldExpc3QoJ2NsZWFyYW5jZScpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgICAgJHNjb3BlLmNsZWFyYW5jZSA9IHJlc29sdmU7XG4gICAgICAgIH0sZnVuY3Rpb24ocmVqZWN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWplY3QpO1xuICAgICAgICB9KTtcblxuXG4gICAgICAgICRzY29wZS5icmVha3BvaW50cyA9IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA5OTIsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAzLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogM1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sIHtcbiAgICAgICAgICAgICAgICBicmVha3BvaW50OiA2MDAsXG4gICAgICAgICAgICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgICAgICAgICAgICAgc2xpZGVzVG9TaG93OiAyLFxuICAgICAgICAgICAgICAgICAgICBzbGlkZXNUb1Njcm9sbDogMlxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgXTtcbiAgICB9XSk7XG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI2LzIwMTYuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAgICAgKi9cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUHJvZHVjdENvbnRyb2xsZXInLCBbJyRzY29wZScsICdwcm9kdWN0cycsICckc3RhdGVQYXJhbXMnLCBmdW5jdGlvbiAoJHNjb3BlLCBwcm9kdWN0cywgJHN0YXRlUGFyYW1zKSB7XG4gICAgICAgIC8vRG9uZSBUaHJvdWdoIFJFU1RcblxuICAgICAgICBwcm9kdWN0cy5zaW5nbGUoJHN0YXRlUGFyYW1zLmlkKS5nZXQoKS50aGVuKGZ1bmN0aW9uKHJlc29sdmUpIHtcbiAgICAgICAgICAgICRzY29wZS5pdGVtID0gcmVzb2x2ZTtcbiAgICAgICAgfSwgZnVuY3Rpb24ocmVqZWN0KSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhyZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgICAgcHJvZHVjdHMuc2luZ2xlKCRzdGF0ZVBhcmFtcy5pZCkuZ2V0TGlzdCgncmVsYXRlZCcpLnRoZW4oZnVuY3Rpb24ocmVzb2x2ZSkge1xuICAgICAgICAgICAgJHNjb3BlLnJlbGF0ZWQgPSByZXNvbHZlO1xuICAgICAgICB9LGZ1bmN0aW9uKHJlamVjdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcbiAgICAgICAgfSk7XG4gICAgfV0pO1xufSkoKTtcbiIsIi8qKlxuICogQ3JlYXRlZCBieSBsb2ZvIG9uIDI2LzA1LzE2LlxuICovXG4oZnVuY3Rpb24oKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignSGVhZGVyQ29udHJvbGxlcicsIFsnJHNjb3BlJywnY2F0ZWdvcmllcycsIGZ1bmN0aW9uICgkc2NvcGUsY2F0ZWdvcmllcykge1xuICAgICAgICAvL0RvbmUgVGhyb3VnaCBSRVNUXG5cbiAgICAgICAgY2F0ZWdvcmllcy5hbGwoKS5nZXRMaXN0KCdzdWJjYXRlZ29yaWVzJykudGhlbihmdW5jdGlvbiAocmVzb2x2ZSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVzb2x2ZSk7XG4gICAgICAgICAgICAkc2NvcGUuc2VhcmNoU3ViamVjdHMgPSByZXNvbHZlO1xuICAgICAgICB9LCBmdW5jdGlvbihyZWplY3QpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XG4gICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUuc2VsZWN0ZWRTdWJqZWN0ID0gJyc7XG4gICAgfV0pO1xufSkoKTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
