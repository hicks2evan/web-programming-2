import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './ui.routes';

export class UiController {
   /*@ngInject*/
}

export default angular.module('comp3705App.ui', [ngRoute])
  .config(routing)
  .component('ui', {
    template: require('./ui.html'),
    controller: UiController,
    controllerAs: 'uiController'

  })
  .name;
