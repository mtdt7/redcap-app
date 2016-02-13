(function () {
    'use strict';

    angular
        .module('app.form')
        .controller('FormController', FormController);

    FormController.$inject = ['$scope', 'lodash', '$http', 'dataservice', '$alert'];
    /* @ngInject */
    function FormController($scope, lodash, $http, dataservice, $alert) {
        var fc = this;
        var _ = lodash;
        fc.title = 'Form';
        fc.showForm = false;
        fc.data;
        activate();

        function activate() {

            //watch function to control data when an address is selected
            $scope.$watch('fc.data', function () {
                fc.showForm = false;
                fc.showWarning = false;
                fc.lat = null;
                fc.lng = null;
                fc.streetNumber = null;
                fc.route = null;
                fc.city = null;
                fc.state = null;
                fc.zip = null;
                fc.address = null;
                fc.availableNumbers = null;

                //if the address is selected from the google places
                if (fc.data && fc.data.name) {

                    //set longitude and latitude
                    fc.lat = fc.data.geometry.location.lat();
                    fc.lng = fc.data.geometry.location.lng();


                    //set the data in the form using the address components
                    _.forEach(fc.data.address_components, function(component) {
                        if (_.includes(component.types, 'street_number')) {
                            fc.streetNumber = component.long_name;
                        }
                        if (_.includes(component.types, 'route')) {
                            fc.route = component.short_name;
                        }
                        if (_.includes(component.types, 'locality') && _.includes(component.types, 'political')) {
                            fc.city = component.long_name;
                        }
                        
                        if (_.includes(component.types, 'administrative_area_level_1') && _.includes(component.types, 'political')) {
                            fc.state = component.long_name;
                        }
                        if (_.includes(component.types, 'postal_code')) {
                            fc.zip = component.short_name;
                        }
                    })
                    
                    //make sure the location has a valid street address
                    if (fc.streetNumber && fc.route) {
                        fc.address = fc.streetNumber + ' ' + fc.route;
                        fc.showForm = true;
                        //call getTwilio service to get data from the node server
                        dataservice.getTwilio(fc.lat, fc.lng).then(function (res) {
                            fc.availableNumbers = res;
                        }, function (err) {
                            console.log(err)
                        });
                    //if not, show warning message
                    } else {
                        fc.showWarning = true;
                    }

                    
                }
            });
        }
    }
})();
