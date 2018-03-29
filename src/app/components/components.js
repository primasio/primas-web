import angular from 'angular';
import face from './face/face';
import career from './career/career';
import whitepaper from './whitepaper/whitepaper';

let modules = [
    face,
    career,
    whitepaper
];

let moduleNames = [];

modules.forEach((m) => {
  moduleNames.push(m.name);
});

let componentModule = angular.module('app.components', moduleNames)

  .config(($stateProvider) => {
    "ngInject";

      modules.forEach((m) => {
          m.states.forEach((state) => {
              $stateProvider.state(state);
          });
      });
  })

.name;

export default componentModule;
