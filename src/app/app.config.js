import angular from 'angular';
import options from './config';

let appConfigModule = angular.module('app.config', [])

  .provider('AppConfig', function AppConfigProvider(){

    var config = options;

    this.$get = function AppConfigFactory(){
      return config;
    };

    this.getConf = (key) => {
      return config[key];
    };
  }).name;

export default appConfigModule;
