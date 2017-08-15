import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './api.routes';

export class ApiController {
   /*@ngInject*/
  constructor() {
  }
}

export default angular.module('comp3705App.api', [ngRoute])
  .config(routing)
  .component('api', {
    template: require('./api.html'),
    controller: ApiController,
    controllerAs: 'apiController'

  })
  .name;
