import angular from 'angular';

import './styles/common.scss';
import './styles/_alert.scss';
import navbar from './navbar/navbar';

let commonModule = angular.module('app.common', [
    navbar
])
.name;

export default commonModule;
