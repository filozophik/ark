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
    angular.module('app.controllers').controller('BrowseController', ['$scope', '$stateParams', '_', 'products', function($scope, $stateParams, _, products) {

        $scope.filters = [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiLCJyb3V0ZXMuanMiLCJzZXJ2aWNlcy9jYXRlZ29yeS5zZXJ2aWNlLmpzIiwic2VydmljZXMvcHJvZHVjdHMuc2VydmljZS5qcyIsImFwcC9icm93c2UvQnJvd3NlQ29udHJvbGxlci5qcyIsImFwcC9wcm9kdWN0L1Byb2R1Y3RDb250cm9sbGVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7QUFHQSxDQUFBLFVBQUE7SUFDQTs7SUFFQSxJQUFBLE1BQUEsUUFBQSxPQUFBO1FBQ0E7WUFDQTtZQUNBO1lBQ0E7WUFDQTtZQUNBO1lBQ0E7V0FDQSxTQUFBLElBQUE7O0lBRUEsUUFBQSxPQUFBLGNBQUEsQ0FBQTtJQUNBLFFBQUEsT0FBQSxtQkFBQSxDQUFBLGlCQUFBLGFBQUEsU0FBQSxjQUFBO0lBQ0EsUUFBQSxPQUFBLGVBQUE7SUFDQSxRQUFBLE9BQUEsZ0JBQUE7SUFDQSxRQUFBLE9BQUEsa0JBQUE7SUFDQSxRQUFBLE9BQUEsY0FBQTtJQUNBLElBQUEsK0JBQUEsU0FBQSxxQkFBQTtRQUNBLG9CQUFBLFdBQUE7Ozs7Ozs7QUNwQkEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGNBQUEsaURBQUEsU0FBQSxnQkFBQSxxQkFBQTs7UUFFQSxJQUFBLFVBQUEsVUFBQSxVQUFBO1lBQ0EsT0FBQSxnQkFBQSxXQUFBLE1BQUEsV0FBQTs7O1FBR0EsbUJBQUEsVUFBQTs7UUFFQTthQUNBLE1BQUEsV0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxVQUFBO2dCQUNBLEtBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7OztlQUdBLE1BQUEsV0FBQTtnQkFDQSxLQUFBO2dCQUNBLE9BQUE7b0JBQ0EsUUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLE1BQUE7d0JBQ0EsYUFBQSxRQUFBOztvQkFFQSxRQUFBO3dCQUNBLGFBQUEsUUFBQTs7O2VBR0EsTUFBQSxRQUFBO2dCQUNBLElBQUE7Z0JBQ0EsT0FBQTtvQkFDQSxRQUFBO3dCQUNBLFlBQUEsUUFBQTs7b0JBRUEsTUFBQTt3QkFDQSxhQUFBLFFBQUE7O29CQUVBLFFBQUE7d0JBQ0EsWUFBQSxRQUFBOzs7Ozs7Ozs7QUMxREEsQ0FBQSxXQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGdCQUFBLFFBQUEsY0FBQSxDQUFBLGVBQUEsVUFBQSxhQUFBOzs7Ozs7O0FDSEEsQ0FBQSxVQUFBO0lBQ0E7O0lBRUEsUUFBQSxPQUFBLGdCQUFBLFFBQUEsWUFBQSxDQUFBLGVBQUEsU0FBQSxhQUFBOztRQUVBLElBQUEsTUFBQSxXQUFBO1lBQ0EsUUFBQTtZQUNBLE9BQUEsWUFBQSxJQUFBOzs7UUFHQSxJQUFBLFNBQUEsU0FBQSxJQUFBO1lBQ0EsT0FBQSxZQUFBLElBQUEsV0FBQTs7UUFFQSxPQUFBO1lBQ0EsS0FBQTtZQUNBLFFBQUE7Ozs7QUNsQkEsQ0FBQSxVQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEsb0JBQUEsQ0FBQSxVQUFBLGdCQUFBLEtBQUEsWUFBQSxTQUFBLFFBQUEsY0FBQSxHQUFBLFVBQUE7O1FBRUEsT0FBQSxVQUFBOztRQUVBLFNBQUEsTUFBQSxVQUFBLEtBQUEsU0FBQSxTQUFBO1lBQ0EsT0FBQSxXQUFBO1lBQ0EsT0FBQSxVQUFBLE9BQUE7V0FDQSxTQUFBLFFBQUE7WUFDQSxRQUFBLElBQUE7Ozs7OztRQU1BLE9BQUEsZUFBQSxTQUFBLE9BQUE7WUFDQSxPQUFBLFFBQUEsT0FBQSxNQUFBO1lBQ0EsUUFBQSxJQUFBLE9BQUE7WUFDQSxNQUFBLE9BQUE7OztRQUdBLE9BQUEsWUFBQSxTQUFBLE1BQUEsT0FBQTs7WUFFQSxJQUFBLE1BQUE7Z0JBQ0EsTUFBQTtnQkFDQSxPQUFBOztZQUVBLElBQUEsUUFBQSxFQUFBLFVBQUEsT0FBQSxTQUFBLFNBQUEsR0FBQSxFQUFBLE9BQUEsRUFBQSxRQUFBLElBQUE7O1lBRUEsR0FBQSxTQUFBLENBQUEsR0FBQTs7Z0JBRUEsT0FBQSxVQUFBLEVBQUEsT0FBQSxPQUFBLFFBQUEsQ0FBQSxJQUFBLEtBQUEsSUFBQTtnQkFDQSxPQUFBLFFBQUEsS0FBQTtnQkFDQSxRQUFBLElBQUEsT0FBQTs7bUJBRUE7Z0JBQ0EsT0FBQSxRQUFBLE9BQUEsTUFBQSxFQUFBO2dCQUNBLE1BQUEsT0FBQTs7OztRQUlBLFNBQUEsTUFBQSxPQUFBO1lBQ0EsSUFBQSxNQUFBO1lBQ0EsTUFBQSxRQUFBLFNBQUEsT0FBQTtnQkFDQSxJQUFBLE1BQUEsUUFBQSxNQUFBOztZQUVBLE9BQUEsVUFBQSxFQUFBLE9BQUEsT0FBQSxVQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREEsQ0FBQSxXQUFBO0lBQ0E7Ozs7O0lBS0EsUUFBQSxPQUFBLG1CQUFBLFdBQUEscUJBQUEsQ0FBQSxVQUFBLFlBQUEsZ0JBQUEsVUFBQSxRQUFBLFVBQUEsY0FBQTs7UUFFQSxPQUFBLFVBQUE7O1lBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7ZUFFQTtnQkFDQSxhQUFBO2dCQUNBLFVBQUE7Z0JBQ0EsYUFBQTtnQkFDQSxRQUFBO2dCQUNBLFFBQUEsQ0FBQTtnQkFDQSxPQUFBO2dCQUNBLFVBQUE7b0JBQ0E7b0JBQ0E7O2VBRUE7Z0JBQ0EsYUFBQTtnQkFDQSxVQUFBO2dCQUNBLGFBQUE7Z0JBQ0EsUUFBQTtnQkFDQSxRQUFBLENBQUE7Z0JBQ0EsT0FBQTtnQkFDQSxVQUFBO29CQUNBO29CQUNBOztlQUVBO2dCQUNBLGFBQUE7Z0JBQ0EsVUFBQTtnQkFDQSxhQUFBO2dCQUNBLFFBQUE7Z0JBQ0EsUUFBQSxDQUFBO2dCQUNBLE9BQUE7Z0JBQ0EsVUFBQTtvQkFDQTtvQkFDQTs7Ozs7UUFLQSxTQUFBLE9BQUEsYUFBQSxJQUFBLE1BQUEsS0FBQSxTQUFBLFNBQUE7WUFDQSxPQUFBLE9BQUE7V0FDQSxTQUFBLFFBQUE7WUFDQSxRQUFBLElBQUE7Ozs7QUFJQSIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAqL1xuKGZ1bmN0aW9uKCl7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICB2YXIgYXBwID0gYW5ndWxhci5tb2R1bGUoJ2FwcCcsXG4gICAgICAgIFtcbiAgICAgICAgICAgICdhcHAuY29udHJvbGxlcnMnLFxuICAgICAgICAgICAgJ2FwcC5maWx0ZXJzJyxcbiAgICAgICAgICAgICdhcHAuc2VydmljZXMnLFxuICAgICAgICAgICAgJ2FwcC5kaXJlY3RpdmVzJyxcbiAgICAgICAgICAgICdhcHAucm91dGVzJyxcbiAgICAgICAgICAgICdhcHAuY29uZmlnJ1xuICAgICAgICBdKS5jb25zdGFudCgnXycsXyk7XG5cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnJvdXRlcycsIFsndWkucm91dGVyJ10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuY29udHJvbGxlcnMnLCBbJ3VpLm1hdGVyaWFsaXplJywndWkucm91dGVyJywgJ3NsaWNrJywgJ3Jlc3Rhbmd1bGFyJywnbmdDYXJ0J10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZmlsdGVycycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLnNlcnZpY2VzJywgW10pO1xuICAgIGFuZ3VsYXIubW9kdWxlKCdhcHAuZGlyZWN0aXZlcycsIFtdKTtcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbmZpZycsIFtdKTtcbiAgICBhcHAuY29uZmlnKGZ1bmN0aW9uKFJlc3Rhbmd1bGFyUHJvdmlkZXIpIHtcbiAgICAgICAgUmVzdGFuZ3VsYXJQcm92aWRlci5zZXRCYXNlVXJsKCcvYXBpL3YxJyk7XG4gICAgfSk7XG5cbn0pKCk7IiwiLyoqXHJcbiAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cclxuICovXHJcbihmdW5jdGlvbigpe1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgYW5ndWxhci5tb2R1bGUoJ2FwcC5yb3V0ZXMnKS5jb25maWcoIGZ1bmN0aW9uKCRzdGF0ZVByb3ZpZGVyLCAkdXJsUm91dGVyUHJvdmlkZXIgKSB7XHJcblxyXG4gICAgICAgIHZhciBnZXRWaWV3ID0gZnVuY3Rpb24oIHZpZXdOYW1lICl7XHJcbiAgICAgICAgICAgIHJldHVybiAnL3ZpZXdzL2FwcC8nICsgdmlld05hbWUgKyAnLycgKyB2aWV3TmFtZSArICcuaHRtbCc7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnLycpO1xyXG5cclxuICAgICAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgICAgICAuc3RhdGUoJ2xhbmRpbmcnLCB7XHJcbiAgICAgICAgICAgICAgICB1cmw6ICcvJyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnbGFuZGluZycpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGF0ZSgnYnJvd3NlJywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL2Jyb3dzZS97ZW5kcG9pbnR9JyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygnYnJvd3NlJylcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pLnN0YXRlKCdwcm9kdWN0Jywge1xyXG4gICAgICAgICAgICAgICAgdXJsOiAnL3Byb2R1Y3QvOmlkJyxcclxuICAgICAgICAgICAgICAgIHZpZXdzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiBnZXRWaWV3KCdzaG9wcGluZy1oZWFkZXInKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgbWFpbjoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogZ2V0VmlldygncHJvZHVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBmb290ZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2Zvb3RlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KS5zdGF0ZSgnY2FydCcsIHtcclxuICAgICAgICAgICAgICAgIHVybDonL2NhcnQnLFxyXG4gICAgICAgICAgICAgICAgdmlld3M6IHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6Z2V0Vmlldygnc2hvcHBpbmctaGVhZGVyJylcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIG1haW46IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGxhdGVVcmw6IGdldFZpZXcoJ2NhcnQnKVxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgZm9vdGVyOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOmdldFZpZXcoJ2Zvb3RlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn0pKCk7IiwiLyoqXG4gKiBDcmVhdGVkIGJ5IGxvZm8gb24gMTAvMDUvMTYuXG4gKi9cbihmdW5jdGlvbigpIHtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIGFuZ3VsYXIubW9kdWxlKFwiYXBwLnNlcnZpY2VzXCIpLmZhY3RvcnkoJ2NhdGVnb3JpZXMnLCBbJ1Jlc3Rhbmd1bGFyJywgZnVuY3Rpb24gKFJlc3Rhbmd1bGFyKSB7XG5cbiAgICB9XSk7XG59KSgpOyIsIi8qKlxuICogQ3JlYXRlZCBieSBCZW5qYW1pbiBvbiA0LzI3LzIwMTYuXG4gKi9cbihmdW5jdGlvbigpe1xuICAgIFwidXNlIHN0cmljdFwiO1xuXG4gICAgYW5ndWxhci5tb2R1bGUoXCJhcHAuc2VydmljZXNcIikuZmFjdG9yeSgncHJvZHVjdHMnLCBbJ1Jlc3Rhbmd1bGFyJywgZnVuY3Rpb24oUmVzdGFuZ3VsYXIpIHtcblxuICAgICAgICB2YXIgYWxsID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygpO1xuICAgICAgICAgICAgcmV0dXJuIFJlc3Rhbmd1bGFyLm9uZSgncHJvZHVjdHMnKTtcbiAgICAgICAgfTtcblxuICAgICAgICB2YXIgc2luZ2xlID0gZnVuY3Rpb24oaWQpIHtcbiAgICAgICAgICAgIHJldHVybiBSZXN0YW5ndWxhci5vbmUoJ3Byb2R1Y3RzJyxpZCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBhbGw6IGFsbCxcbiAgICAgICAgICAgIHNpbmdsZTogc2luZ2xlXG4gICAgICAgIH07XG4gICAgfV0pO1xufSkoKTsiLCIoZnVuY3Rpb24oKXtcbiAgICBcInVzZSBzdHJpY3RcIjtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZWQgYnkgbG9mbyBvbiAxMS8wNC8xNi5cbiAgICAgKi9cbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignQnJvd3NlQ29udHJvbGxlcicsIFsnJHNjb3BlJywgJyRzdGF0ZVBhcmFtcycsICdfJywgJ3Byb2R1Y3RzJywgZnVuY3Rpb24oJHNjb3BlLCAkc3RhdGVQYXJhbXMsIF8sIHByb2R1Y3RzKSB7XG5cbiAgICAgICAgJHNjb3BlLmZpbHRlcnMgPSBbXTtcbiAgICAgICAgLy9Eb25lIFRocm91Z2ggUkVTVFxuICAgICAgICBwcm9kdWN0cy5hbGwoKS5nZXRMaXN0KCkudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XG4gICAgICAgICAgICAkc2NvcGUucHJvZHVjdHMgPSByZXNvbHZlO1xuICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSAkc2NvcGUucHJvZHVjdHM7XG4gICAgICAgIH0sIGZ1bmN0aW9uKHJlamVjdCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy9XaGF0IFdlIE1hbmlwdWxhdGUgRHVyaW5nIENJLCB3aWxsIGJlIGFsbCBkb25lIHRocm91Z2ggcmVzdC5cblxuXG4gICAgICAgICRzY29wZS5yZW1vdmVGaWx0ZXIgPSBmdW5jdGlvbihpbmRleCkge1xuICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMuc3BsaWNlKGluZGV4LDEpO1xuICAgICAgICAgICAgY29uc29sZS5sb2coJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICAgICAgZHJhZnQoJHNjb3BlLmZpbHRlcnMpO1xuICAgICAgICB9O1xuXG4gICAgICAgICRzY29wZS5hZGRGaWx0ZXIgPSBmdW5jdGlvbih0eXBlLCB2YWx1ZSkge1xuICAgICAgICAgICAgLy8gRmlsdGVyIG9iamVjdCB0byBpbmNsdWRlXG4gICAgICAgICAgICB2YXIgb2JqID0ge1xuICAgICAgICAgICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgICAgICAgICAgdmFsdWU6IHZhbHVlXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gXy5maW5kSW5kZXgoJHNjb3BlLmZpbHRlcnMsIGZ1bmN0aW9uKG8pIHsgcmV0dXJuIG8udHlwZSA9PSBvYmoudHlwZTt9KTtcbiAgICAgICAgICAgIC8vIElmIHRoZSBmaWx0ZXIgd2FzIG5vdCBpbmNsdWRlZCBhdCBhbGxcbiAgICAgICAgICAgIGlmKGluZGV4ID09IC0xKSB7XG4gICAgICAgICAgICAgICAgLy8gVXBkYXRlIHRoZSBSZXN1bHRzIEFjY29yZGluZ2x5XG4gICAgICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBfLmZpbHRlcigkc2NvcGUucmVzdWx0cyxbb2JqLnR5cGUsb2JqLnZhbHVlXSk7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMucHVzaChvYmopO1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCRzY29wZS5maWx0ZXJzKTtcbiAgICAgICAgICAgIC8vIEZpbHRlciBjYXRlZ29yeSB3YXMgaW5jbHVkZWRcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgJHNjb3BlLmZpbHRlcnMuc3BsaWNlKGluZGV4LDEsb2JqKTtcbiAgICAgICAgICAgICAgICBkcmFmdCgkc2NvcGUuZmlsdGVycyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gZHJhZnQoYXJyYXkpIHtcbiAgICAgICAgICAgIHZhciBvYmogPSB7fTtcbiAgICAgICAgICAgIGFycmF5LmZvckVhY2goZnVuY3Rpb24oZW50cnkpIHtcbiAgICAgICAgICAgICAgICBvYmpbZW50cnkudHlwZV0gPSBlbnRyeS52YWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJHNjb3BlLnJlc3VsdHMgPSBfLmZpbHRlcigkc2NvcGUucHJvZHVjdHMsIG9iaik7XG4gICAgICAgIH1cbiAgICB9XSk7XG59KSgpOyIsIi8qKlxyXG4gKiBDcmVhdGVkIGJ5IEJlbmphbWluIG9uIDQvMjYvMjAxNi5cclxuICovXHJcbihmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlZCBieSBsb2ZvIG9uIDExLzA0LzE2LlxyXG4gICAgICovXHJcbiAgICBhbmd1bGFyLm1vZHVsZSgnYXBwLmNvbnRyb2xsZXJzJykuY29udHJvbGxlcignUHJvZHVjdENvbnRyb2xsZXInLCBbJyRzY29wZScsICdwcm9kdWN0cycsICckc3RhdGVQYXJhbXMnLCBmdW5jdGlvbiAoJHNjb3BlLCBwcm9kdWN0cywgJHN0YXRlUGFyYW1zKSB7XHJcbiAgICAgICAgLy9Eb25lIFRocm91Z2ggUkVTVFxyXG4gICAgICAgICRzY29wZS5yZWxhdGVkID0gW1xyXG4gICAgICAgICAgICAvKiBUb3BzICovXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnQWZyaWNhbiBTdHlsZSBTaG9ydCBTa2lydCBUb3Agdy8gU2hvZXN0cmluZyBTaG91bGRlcnMnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdjYXJkaWdhbicsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogMTMuMDAsXHJcbiAgICAgICAgICAgICAgICBwaWN0dXJlczogW1xyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOC5naWYnLFxyXG4gICAgICAgICAgICAgICAgICAgICc0OV8wOS5naWYnXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sIHtcclxuICAgICAgICAgICAgICAgIGRlc2NyaXB0aW9uOiAnT3BlbiBNb3RpZiBCZWFjaCBUb3AnLFxyXG4gICAgICAgICAgICAgICAgY2F0ZWdvcnk6ICd0b3AnLFxyXG4gICAgICAgICAgICAgICAgc3ViY2F0ZWdvcnk6ICdiZWFjaCcsXHJcbiAgICAgICAgICAgICAgICBnZW5kZXI6ICdGJyxcclxuICAgICAgICAgICAgICAgIGNvbG9yczogWydibHVlJ10sXHJcbiAgICAgICAgICAgICAgICBwcmljZTogOC4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMaWdodCBCbHVlIEJlYWNoIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2JlYWNoJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ2JsdWUnXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA2LmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUwXzA3LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdBZnJpY2FuIE5lY2tzdHJpbmcgVG9wJyxcclxuICAgICAgICAgICAgICAgIGNhdGVnb3J5OiAndG9wJyxcclxuICAgICAgICAgICAgICAgIHN1YmNhdGVnb3J5OiAnc2tpcnQnLFxyXG4gICAgICAgICAgICAgICAgZ2VuZGVyOiAnRicsXHJcbiAgICAgICAgICAgICAgICBjb2xvcnM6IFsnYmxhY2snXSxcclxuICAgICAgICAgICAgICAgIHByaWNlOiAxMy4wMCxcclxuICAgICAgICAgICAgICAgIHBpY3R1cmVzOiBbXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzAzLmdpZicsXHJcbiAgICAgICAgICAgICAgICAgICAgJzUxXzA0LmdpZidcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSwge1xyXG4gICAgICAgICAgICAgICAgZGVzY3JpcHRpb246ICdMaWdodCBTaG9lbGFjZSBTaWxrIFRvcCcsXHJcbiAgICAgICAgICAgICAgICBjYXRlZ29yeTogJ3RvcCcsXHJcbiAgICAgICAgICAgICAgICBzdWJjYXRlZ29yeTogJ2NhcmRpZ2FuJyxcclxuICAgICAgICAgICAgICAgIGdlbmRlcjogJ0YnLFxyXG4gICAgICAgICAgICAgICAgY29sb3JzOiBbJ3JlZCddLFxyXG4gICAgICAgICAgICAgICAgcHJpY2U6IDEzLjAwLFxyXG4gICAgICAgICAgICAgICAgcGljdHVyZXM6IFtcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDYuZ2lmJyxcclxuICAgICAgICAgICAgICAgICAgICAnNTFfMDcuZ2lmJ1xyXG4gICAgICAgICAgICAgICAgXVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIF07XHJcbiAgICAgICAgcHJvZHVjdHMuc2luZ2xlKCRzdGF0ZVBhcmFtcy5pZCkuZ2V0KCkudGhlbihmdW5jdGlvbihyZXNvbHZlKSB7XHJcbiAgICAgICAgICAgICRzY29wZS5pdGVtID0gcmVzb2x2ZTtcclxuICAgICAgICB9LCBmdW5jdGlvbihyZWplY3QpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2cocmVqZWN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1dKTtcclxufSkoKTtcclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
