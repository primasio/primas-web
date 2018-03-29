import angular from 'angular';
import RestangularModule from './restangular';
import AppConfigModule from './app.config';

let apiModule = angular.module('app.api', [
  RestangularModule,
  AppConfigModule
])

  .run((Restangular, $state, AppConfig) => {

    "ngInject";

    Restangular.setBaseUrl(AppConfig.server_url);
  })

  .factory('reportAPI', (Restangular) => {
    "ngInject";
    return Restangular.service('primas');
  })


.name;

export default apiModule;
