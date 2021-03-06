(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$http', '$q', 'exception', 'logger'];
    /* @ngInject */
    function dataservice($http, $q, exception, logger) {
        var service = {
            getTwilio: getTwilio,
            sendData: sendData
        };

        return service;

        function getTwilio(lat, lon) {
            return $http.post('/api/twilio', {
                lat: lat,
                lon: lon
            })
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('XHR Failed for getTwilio')(e);
            }
        }

        function sendData(data) {
            return $http.post('/api/database', {
                data: data
            })
                .then(success)
                .catch(fail);

            function success(response) {
                return response.data;
            }

            function fail(e) {
                return exception.catcher('Failed')(e);
            }
        }
    }
})();
