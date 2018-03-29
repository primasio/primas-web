import angular from 'angular';
import uiRouter from '@uirouter/angularjs';
import whitepaperComponent from './whitepaper.component';


let whitepaperModule = angular.module('whitepaper', [
  uiRouter
])
    .component('whitepaper', whitepaperComponent)

    .name;

let states = [
    {
        name: 'whitepaper',
        url: '/whitepaper/:lang',
        component: 'whitepaper'
    }
];


export default {name: whitepaperModule, states: states};
