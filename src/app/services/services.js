import angular from 'angular';
import message from './message.service';


let servicesModule = angular.module('app.services', [])
    .service({
        message
    })
    .name;

export default servicesModule;
