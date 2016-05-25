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