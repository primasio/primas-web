import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import faceComponent from './face.component';
import introBg from './intro-bg.directive';

let faceModule = angular.module('face', [
  uiRouter
])
    .component('face', faceComponent)
    .directive('introBg',introBg)
    .name;

let states = [
    {
        name: 'face',
        url: '/',
        component: 'face'
    }
];


export default {name: faceModule, states: states};
