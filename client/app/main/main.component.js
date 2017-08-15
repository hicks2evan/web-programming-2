import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
   /*@ngInject*/
  constructor() {
    this.var = "test";
  }
}

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'

  })
  .name;
