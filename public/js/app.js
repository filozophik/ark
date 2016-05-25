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
        products.all().getList({limit:5}).then(function(resolve) {
            $scope.related = resolve
        },function(reject) {
            console.log(reject);
        });
        products.single($stateParams.id).get().then(function(resolve) {
            $scope.item = resolve;
        }, function(reject) {
            console.log(reject);
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9wcm9kdWN0L1Byb2R1Y3RDb250cm9sbGVyLmpzIiwicm91dGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLE1BQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7V0FDQSxTQUFBLElBQUE7O0lBRUEsUUFBQSxPQUFBLGNBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGlCQUFBLGFBQUEsU0FBQSxjQUFBO0lBQ0EsUUFBQSxPQUFBLGVBQUE7SUFDQSxRQUFBLE9BQUEsZ0JBQUE7SUFDQSxRQUFBLE9BQUEsa0JBQUE7SUFDQSxRQUFBLE9BQUEsY0FBQTtJQUNBLElBQUEsK0JBQUEsU0FBQSxxQkFBQTtRQUNBLG9CQUFBLFdBQUE7Ozs7Ozs7QUNwQkEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGdCQUFBLFFBQUEsY0FBQSxDQUFBLGVBQUEsVUFBQSxhQUFBOztRQUVBLE9BQUE7WUFDQSxLQUFBLFlBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxPQUFBLFlBQUEsSUFBQTs7Ozs7Ozs7QUNSQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxRQUFBLE9BQUEsZ0JBQUEsUUFBQSxZQUFBLENBQUEsZUFBQSxTQUFBLGFBQUE7O1FBRUEsSUFBQSxNQUFBLFdBQUE7WUFDQSxRQUFBO1lBQ0EsT0FBQSxZQUFBLElBQUE7OztRQUdBLElBQUEsU0FBQSxTQUFBLElBQUE7WUFDQSxPQUFBLFlBQUEsSUFBQSxXQUFBOztRQUVBLE9BQUE7WUFDQSxLQUFBO1lBQ0EsUUFBQTs7OztBQ2xCQSxDQUFBLFVBQUE7SUFDQTs7Ozs7SUFLQSxRQUFBLE9BQUEsbUJBQUEsV0FBQTtRQUNBLENBQUEsVUFBQSxnQkFBQSxLQUFBLFlBQUE7O1FBRUEsU0FBQSxRQUFBLGNBQUEsR0FBQSxVQUFBLFlBQUE7O1FBRUEsT0FBQSxVQUFBOztRQUVBLFNBQUEsV0FBQTs7WUFFQSxJQUFBLFNBQUEsYUFBQTtZQUNBLFdBQUEsTUFBQSxNQUFBLEtBQUEsVUFBQSxTQUFBO2dCQUNBLE9BQUEsYUFBQTtnQkFDQSxPQUFBLGVBQUEsT0FBQSxXQUFBLGFBQUE7ZUFDQSxVQUFBLFFBQUE7Z0JBQ0EsUUFBQSxJQUFBOzs7O1lBSUEsU0FBQSxNQUFBLFVBQUEsS0FBQSxVQUFBLFNBQUE7O2dCQUVBLE9BQUEsV0FBQSxFQUFBLE9BQUEsUUFBQSxDQUFBLFVBQUE7Z0JBQ0EsT0FBQSxVQUFBLE9BQUE7ZUFDQSxVQUFBLFFBQUE7Z0JBQ0EsUUFBQSxJQUFBOzs7OztRQUtBLE9BQUEsZUFBQSxTQUFBLE9BQUE7WUFDQSxHQUFBLE9BQUEsUUFBQSxPQUFBLFFBQUEsWUFBQTtnQkFDQSxPQUFBLFVBQUE7bUJBQ0E7Z0JBQ0EsT0FBQSxRQUFBLE9BQUEsTUFBQTs7O1lBR0EsTUFBQSxPQUFBOzs7UUFHQSxPQUFBLFlBQUEsU0FBQSxNQUFBLE9BQUE7WUFDQSxJQUFBLFFBQUEsRUFBQSxVQUFBLE9BQUEsUUFBQSxDQUFBLEtBQUEsS0FBQSxNQUFBO1lBQ0EsR0FBQSxTQUFBLENBQUEsR0FBQTs7Z0JBRUEsT0FBQSxhQUFBO2dCQUNBO21CQUNBOztnQkFFQSxJQUFBLE1BQUE7b0JBQ0EsTUFBQTtvQkFDQSxPQUFBOztnQkFFQSxRQUFBLEVBQUEsVUFBQSxPQUFBLFNBQUEsU0FBQSxHQUFBLEVBQUEsT0FBQSxFQUFBLFFBQUEsSUFBQTs7Z0JBRUEsR0FBQSxTQUFBLENBQUEsR0FBQTtvQkFDQSxPQUFBLGFBQUE7O2dCQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxRQUFBLENBQUEsSUFBQSxLQUFBLElBQUE7Z0JBQ0EsT0FBQSxRQUFBLEtBQUE7Z0JBQ0EsTUFBQSxPQUFBOzs7O1FBSUEsU0FBQSxNQUFBLE9BQUE7WUFDQSxJQUFBLE1BQUE7WUFDQSxNQUFBLFFBQUEsU0FBQSxPQUFBO2dCQUNBLElBQUEsTUFBQSxRQUFBLE1BQUE7O1lBRUEsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFVBQUE7OztRQUdBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hFQSxDQUFBLFdBQUE7SUFDQTs7Ozs7SUFLQSxRQUFBLE9BQUEsbUJBQUEsV0FBQSxxQkFBQSxDQUFBLFVBQUEsWUFBQSxnQkFBQSxVQUFBLFFBQUEsVUFBQSxjQUFBOztRQUVBLFNBQUEsTUFBQSxRQUFBLENBQUEsTUFBQSxJQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxVQUFBO1VBQ0EsU0FBQSxRQUFBO1lBQ0EsUUFBQSxJQUFBOztRQUVBLFNBQUEsT0FBQSxhQUFBLElBQUEsTUFBQSxLQUFBLFNBQUEsU0FBQTtZQUNBLE9BQUEsT0FBQTtXQUNBLFNBQUEsUUFBQTtZQUNBLFFBQUEsSUFBQTs7Ozs7Ozs7QUNoQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsaURBQUEsU0FBQSxnQkFBQSxxQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxnQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsU0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFVBQUE7Z0JBQ0EsS0FBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxXQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsYUFBQSxRQUFBOzs7ZUFHQSxNQUFBLFFBQUE7Z0JBQ0EsSUFBQTtnQkFDQSxPQUFBO29CQUNBLFFBQUE7d0JBQ0EsWUFBQSxRQUFBOztvQkFFQSxNQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsUUFBQTt3QkFDQSxZQUFBLFFBQUE7Ozs7O0tBS0EiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTEvMDQvMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgdmFyIGFwcCA9IGFuZ3VsYXIubW9kdWxlKCdhcHAnLFxuICAgICAgICBbXG4gICAgICAgICAgICAnYXBwLmNvbnRyb2xsZXJzJyxcbiAgICAgICAgICAgICdhcHAuZmlsdGVycycsXG4gICAgICAgICAgICAnYXBwLnNlcnZpY2VzJyxcbiAgICAgICAgICAgICdhcHAuZGlyZWN0aXZlcycsXG4gICAgICAgICAgICAnYXBwLnJvdXRlcycsXG4gICAgICAgICAgICAnYXBwLmNvbmZpZydcbiAgICAgICAgXSkuY29uc3RhbnQoJ18nLF8pO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnLCBbJ3VpLnJvdXRlciddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJywgWyd1aS5tYXRlcmlhbGl6ZScsJ3VpLnJvdXRlcicsICdzbGljaycsICdyZXN0YW5ndWxhcicsJ25nQ2FydCddKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmZpbHRlcnMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5zZXJ2aWNlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmRpcmVjdGl2ZXMnLCBbXSk7XG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb25maWcnLCBbXSk7XG4gICAgYXBwLmNvbmZpZyhmdW5jdGlvbihSZXN0YW5ndWxhclByb3ZpZGVyKSB7XG4gICAgICAgIFJlc3Rhbmd1bGFyUHJvdmlkZXIuc2V0QmFzZVVybCgnL2FwaS92MScpO1xuICAgIH0pO1xuXG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTAvMDUvMTYuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBhbmd1bGFyLm1vZHVsZShcImFwcC5zZXJ2aWNlc1wiKS5mYWN0b3J5KCdjYXRlZ29yaWVzJywgWydSZXN0YW5ndWxhcicsIGZ1bmN0aW9uIChSZXN0YW5ndWxhcikge1xyXG5cclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBhbGw6IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIub25lKCdjYXRlZ29yeScpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgIH1dKTtcclxufSkoKTsiLCIvKipcbiAqIENyZWF0ZWQgYnkgQmVuamFtaW4gb24gNC8yNy8yMDE2LlxuICovXG4oZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYXBwLnNlcnZpY2VzXCIpLmZhY3RvcnkoJ3Byb2R1Y3RzJywgWydSZXN0YW5ndWxhcicsIGZ1bmN0aW9uKFJlc3Rhbmd1bGFyKSB7XG5cbiAgICAgICAgdmFyIGFsbCA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coKTtcbiAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5vbmUoJ3Byb2R1Y3RzJyk7XG4gICAgICAgIH07XG5cbiAgICAgICAgdmFyIHNpbmdsZSA9IGZ1bmN0aW9uKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVzdGFuZ3VsYXIub25lKCdwcm9kdWN0cycsaWQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYWxsOiBhbGwsXG4gICAgICAgICAgICBzaW5nbGU6IHNpbmdsZVxuICAgICAgICB9O1xuICAgIH1dKTtcbn0pKCk7IiwiKGZ1bmN0aW9uKCl7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ0Jyb3dzZUNvbnRyb2xsZXInLFxyXG4gICAgICAgIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsICdfJywgJ3Byb2R1Y3RzJywgJ2NhdGVnb3JpZXMnLFxyXG5cclxuICAgICAgICBmdW5jdGlvbigkc2NvcGUsICRzdGF0ZVBhcmFtcywgXywgcHJvZHVjdHMsIGNhdGVnb3JpZXMpIHtcclxuXHJcbiAgICAgICAgJHNjb3BlLmZpbHRlcnMgPSBbXTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gYWN0aXZhdGUoKSB7XHJcbiAgICAgICAgICAgIC8vR2V0IFRoZSBDYXRlZ29yaWVzXHJcbiAgICAgICAgICAgIHZhciBnZW5kZXIgPSAkc3RhdGVQYXJhbXMuZ2VuZGVyO1xyXG4gICAgICAgICAgICBjYXRlZ29yaWVzLmFsbCgpLmdldCgpLnRoZW4oZnVuY3Rpb24gKHJlc29sdmUpIHtcclxuICAgICAgICAgICAgICAgICRzY29wZS5jYXRlZ29yaWVzID0gcmVzb2x2ZTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5hY3RpdmVHZW5kZXIgPSAkc2NvcGUuY2F0ZWdvcmllc1skc3RhdGVQYXJhbXMuZ2VuZGVyXTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24gKHJlamVjdCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICAvLyBHZXQgVGhlIFByb2R1Y3RzXHJcbiAgICAgICAgICAgIHByb2R1Y3RzLmFsbCgpLmdldExpc3QoKS50aGVuKGZ1bmN0aW9uIChyZXNvbHZlKSB7XHJcblxyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnByb2R1Y3RzID0gXy5maWx0ZXIocmVzb2x2ZSxbJ2dlbmRlcicsIGdlbmRlcl0pO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSAkc2NvcGUucHJvZHVjdHM7XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uIChyZWplY3QpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9XaGF0IFdlIE1hbmlwdWxhdGUgRHVyaW5nIENJLCB3aWxsIGJlIGFsbCBkb25lIHRocm91Z2ggcmVzdC5cclxuICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyID0gZnVuY3Rpb24oaW5kZXgpIHtcclxuICAgICAgICAgICAgaWYoJHNjb3BlLmZpbHRlcnNbaW5kZXhdLnR5cGUgPT0gXCJjYXRlZ29yeVwiKSB7XHJcbiAgICAgICAgICAgICAgICAkc2NvcGUuZmlsdGVycyA9IFtdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMuc3BsaWNlKGluZGV4LDEpO1xyXG4gICAgICAgICAgICAgICAgLy9jb25zb2xlLmxvZygkc2NvcGUuZmlsdGVycyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xyXG4gICAgICAgIH07XHJcblxyXG4gICAgICAgICRzY29wZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycyx7dHlwZTp0eXBlLHZhbHVlOnZhbHVlfSk7XHJcbiAgICAgICAgICAgIGlmKGluZGV4ICE9IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAvL2NvbnNvbGUubG9nKGluZGV4KTtcclxuICAgICAgICAgICAgICAgICRzY29wZS5yZW1vdmVGaWx0ZXIoaW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgLy8gRmlsdGVyIG9iamVjdCB0byBpbmNsdWRlXHJcbiAgICAgICAgICAgICAgICB2YXIgb2JqID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXHJcbiAgICAgICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBfLmZpbmRJbmRleCgkc2NvcGUuZmlsdGVycywgZnVuY3Rpb24obykgeyByZXR1cm4gby50eXBlID09IG9iai50eXBlO30pO1xyXG4gICAgICAgICAgICAgICAgLy8gSWYgdGhlIGZpbHRlciB3YXMgbm90IGluY2x1ZGVkIGF0IGFsbFxyXG4gICAgICAgICAgICAgICAgaWYoaW5kZXggIT0gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICAkc2NvcGUucmVtb3ZlRmlsdGVyKGluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnJlc3VsdHMsW29iai50eXBlLG9iai52YWx1ZV0pO1xyXG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMucHVzaChvYmopO1xyXG4gICAgICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gZHJhZnQoYXJyYXkpIHtcclxuICAgICAgICAgICAgdmFyIG9iaiA9IHt9O1xyXG4gICAgICAgICAgICBhcnJheS5mb3JFYWNoKGZ1bmN0aW9uKGVudHJ5KSB7XHJcbiAgICAgICAgICAgICAgICBvYmpbZW50cnkudHlwZV0gPSBlbnRyeS52YWx1ZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICRzY29wZS5yZXN1bHRzID0gXy5maWx0ZXIoJHNjb3BlLnByb2R1Y3RzLCBvYmopO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgYWN0aXZhdGUoKTtcclxuICAgIH1dKTtcclxufSkoKTsiLCIvKipcclxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI2LzIwMTYuXHJcbiAqL1xyXG4oZnVuY3Rpb24oKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICAgICAqL1xyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5jb250cm9sbGVycycpLmNvbnRyb2xsZXIoJ1Byb2R1Y3RDb250cm9sbGVyJywgWyckc2NvcGUnLCAncHJvZHVjdHMnLCAnJHN0YXRlUGFyYW1zJywgZnVuY3Rpb24gKCRzY29wZSwgcHJvZHVjdHMsICRzdGF0ZVBhcmFtcykge1xyXG4gICAgICAgIC8vRG9uZSBUaHJvdWdoIFJFU1RcclxuICAgICAgICBwcm9kdWN0cy5hbGwoKS5nZXRMaXN0KHtsaW1pdDo1fSkudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5yZWxhdGVkID0gcmVzb2x2ZVxyXG4gICAgICAgIH0sZnVuY3Rpb24ocmVqZWN0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlamVjdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcHJvZHVjdHMuc2luZ2xlKCRzdGF0ZVBhcmFtcy5pZCkuZ2V0KCkudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pdGVtID0gcmVzb2x2ZTtcclxuICAgICAgICB9LCBmdW5jdGlvbihyZWplY3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1dKTtcclxufSkoKTtcclxuIiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICovXHJcbihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XHJcblxyXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24oIHZpZXdOYW1lICl7XHJcbiAgICAgICAgICAgIHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ2Fib3V0Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Fib3V0JylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXRlKCdsYW5kaW5nJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnLycsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2xhbmRpbmcnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdmb290ZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhdGUoJ2Jyb3dzZScsIHtcclxuICAgICAgICAgICAgICAgIHVybDogJy9icm93c2Uve2dlbmRlcn0nLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdicm93c2UnKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSkuc3RhdGUoJ3Byb2R1Y3QnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvcHJvZHVjdC86aWQnLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ3Nob3BwaW5nLWhlYWRlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBtYWluOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdwcm9kdWN0JylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGZvb3Rlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXRlKCdjYXJ0Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsOicvY2FydCcsXHJcbiAgICAgICAgICAgICAgICB2aWV3czoge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDpnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnY2FydCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0VmlldygnZm9vdGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufSkoKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
