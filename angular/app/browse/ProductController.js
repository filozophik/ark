(function(){
    "use strict";

    /**
     * Created by lofo on 11/04/16.
     */
    angular.module('app.controllers').controller('ProductController', ['$scope', function($scope) {
        $scope.products = [
            /* Dresses */
            {
                description:'Light Open Dress w/ Silk Bottom',
                category: 'dress',
                subcategory: 'open',
                gender:'F',
                colors:['green'],
                price: 10.00,
                pictures : [
                    'lime_1.gif',
                    'lime_2.gif'
                ]
            },
            {
                description:'Rose Floral Dress',
                category: 'dress',
                subcategory: 'cut',
                gender:'F',
                colors:['red'],
                price: 18.00,
                pictures : [
                    'rose_1.gif',
                    'rose_2.gif'
                ]
            },
            {
                description:'Sakura Japanese Style Dress',
                category: 'dress',
                subcategory: 'full',
                gender:'F',
                colors:['green'],
                price: 22.00,
                pictures : [
                    'sakura_1.gif',
                    'sakura_2.gif'
                ]
            },
            {
                description:'Tropics Style Dress w/ Shoestring Shoulders',
                category: 'dress',
                subcategory: 'full',
                gender:'F',
                colors:['green'],
                price: 13.00,
                pictures : [
                    'tropics_1.gif',
                    'tropics_2.gif'
                ]
            },
            /* Tops */
            {
                description:'Western Style Ponch Top',
                category: 'top',
                subcategory: 'cardigan',
                gender:'F',
                colors:['pink'],
                price: 13.00,
                pictures : [
                    '49_03.gif',
                    '49_04.gif'
                ]
            },{
                description:'African Style Short Skirt Top w/ Shoestring Shoulders',
                category: 'top',
                subcategory: 'cardigan',
                gender:'F',
                colors:['blue'],
                price: 13.00,
                pictures : [
                    '49_08.gif',
                    '49_09.gif'
                ]
            },{
                description:'Open Motif Beach Top',
                category: 'top',
                subcategory: 'beach',
                gender:'F',
                colors:['blue'],
                price: 8.00,
                pictures : [
                    '50_03.gif',
                    '50_04.gif'
                ]
            },{
                description:'Light Blue Beach Top',
                category: 'top',
                subcategory: 'beach',
                gender:'F',
                colors:['blue'],
                price: 13.00,
                pictures : [
                    '50_06.gif',
                    '50_07.gif'
                ]
            },{
                description:'African Neckstring Top',
                category: 'top',
                subcategory: 'skirt',
                gender:'F',
                colors:['black'],
                price: 13.00,
                pictures : [
                    '51_03.gif',
                    '51_04.gif'
                ]
            },{
                description:'Light Shoelace Silk Top',
                category: 'top',
                subcategory: 'cardigan',
                gender:'F',
                colors:['red'],
                price: 13.00,
                pictures : [
                    '51_06.gif',
                    '51_07.gif'
                ]
            }
            /* Pants */
            /* Skirts*/
        ];
    }]);
})();