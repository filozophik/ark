(function(){
    "use strict";

    /**
     * Created by lofo on 11/04/16.
     */
    angular.module('app.controllers').controller('ProductController', ['$scope', function($scope) {
        $scope.products = [{
            name:'Nick Jonas'
        }];
    }]);

})();