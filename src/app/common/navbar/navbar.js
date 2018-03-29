import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import navbarComponent from './navbar.component';
import navFixed from './nav-fixed.directive';
import './navbar.scss';

let navbarModule = angular.module('navbar', [
    uiRouter
])

    .component('navbar', navbarComponent)
    .directive('navFixed',navFixed)
    .name;

export default navbarModule;
