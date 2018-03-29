import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import common from './common/common';
import components from './components/components';
import appComponent from './app.component';
import services from './services/services';
import api from './app.api';
import appConfig from './app.config';
import 'normalize.css';
import './app.scss';
import 'angulartics';
import 'angulartics/src/angulartics-baidu';
import 'angulartics-google-analytics';
import translate from 'angular-translate'
import  'angular-translate-loader-static-files'
import  'processing-js'

angular.module('app', [
    uiRouter,
    common,
    components,
    services,
    api,
    appConfig,
    'angulartics',
    'angulartics.baidu',
    'angulartics.google.analytics',
    translate
  ])
  .config(($locationProvider) => {
    "ngInject";

    $locationProvider.html5Mode(true).hashPrefix('!');
  })

  .config(($urlRouterProvider) => {
    "ngInject";

    $urlRouterProvider.otherwise('/');
  })

  .config(($analyticsProvider) => {
    "ngInject";
    $analyticsProvider.withAutoBase(true);
  })
  .config(($translateProvider)=>{
    "ngInject";
    $translateProvider.useSanitizeValueStrategy('escaped');
    var lang = window.localStorage.primas_lang||'en';
    $translateProvider.preferredLanguage(lang);
    $translateProvider.useStaticFilesLoader({
        prefix: 'i18n/',
        suffix: '.json'
    });

  })
  .component('app', appComponent)
