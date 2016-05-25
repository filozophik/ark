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
