import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './about.routes';

export class AboutController {
   /*@ngInject*/
  constructor($routeParams) {
    this.$routeParams = $routeParams;
    this.setData();
  }

  setData() {
    if(this.$routeParams.somethingToPrint) {
      this.somethingToPrint = this.$routeParams.somethingToPrint;
    } else {
      this.somethingToPrint = 'nothing entered';
    }
  }

  $onInit() {
  }

}

export default angular.module('comp3705App.about', [ngRoute])
  .config(routing)
  .component('about', {
    template: require('./about.html'),
    controller: AboutController,
    controllerAs: 'aboutController'

  })
  .name;
