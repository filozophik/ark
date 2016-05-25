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