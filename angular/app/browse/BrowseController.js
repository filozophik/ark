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