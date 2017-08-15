import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './home.routes';

export class HomeController {
   /*@ngInject*/
  constructor() {

  }
}

export default angular.module('comp3705App.home', [ngRoute])
  .config(routing)
  .component('home', {
    template: require('./home.html'),
    controller: HomeController,
    controllerAs: 'homeController'

  })
  .name;
