import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import careerComponent from './career.component';


let careerModule = angular.module('career', [
  uiRouter
])
    .component('career', careerComponent)

    .name;

let states = [
    {
        name: 'career',
        url: '/career',
        component: 'career'
    }
];


export default {name: careerModule, states: states};
