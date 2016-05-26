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
