(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('placesservice', placesservice);

    placesservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function placesservice($http, $q, exception, logger) {
        var service = {
            clearLocation: clearLocation,
            isValid: isValid,
            formatLocation: formatLocation
        };

        return service;

        function clearLocation(data) {
            data.lat = null;
            data.lng = null;
            data.streetNumber = null;
            data.route = null;
            data.city = null;
            data.state = null;
            data.zip = null;
            data.address = null;
        }

        function isValid(data) {
            if (data && data.name) {
                return true;
            } else {
                return false;
            }
        }

        function formatLocation (data) {
            var formattedData = {};

            //set longitude and latitude
            formattedData.lat = data.geometry.location.lat();
            formattedData.lng = data.geometry.location.lng();


            //set the data in the form using the address components
            _.forEach(data.address_components, function(component) {
                if (_.includes(component.types, 'street_number')) {
                    formattedData.streetNumber = component.long_name;
                }
                if (_.includes(component.types, 'route')) {
                    formattedData.route = component.short_name;
                }
                if (_.includes(component.types, 'locality') && _.includes(component.types, 'political')) {
                    formattedData.city = component.long_name;
                }
                
                if (_.includes(component.types, 'administrative_area_level_1') && _.includes(component.types, 'political')) {
                    formattedData.state = component.long_name;
                }
                if (_.includes(component.types, 'postal_code')) {
                    formattedData.zip = component.short_name;
                }
            });

            if (formattedData.streetNumber && formattedData.route) {
                formattedData.address = formattedData.streetNumber + ' ' + formattedData.route;
            } else {
                formattedData.address = '';
            }

            return formattedData;
        }

    }
})();
