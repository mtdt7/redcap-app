(function() {
    'use strict';

    angular
        .module('app.form')
        .run(appRun);

    appRun.$inject = ['routerHelper'];
    /* @ngInject */
    function appRun(routerHelper) {
        routerHelper.configureStates(getStates());
    }

    function getStates() {
        return [
            {
                state: 'form',
                config: {
                    url: '/',
                    templateUrl: 'app/form/form.html',
                    controller: 'FormController',
                    controllerAs: 'fc',
                    title: 'Form',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-lock"></i> Form'
                    }
                }
            }
        ];
    }
})();
