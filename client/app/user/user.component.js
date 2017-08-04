import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './user.routes';
import User from '../main/main.component';

export class UserController {
   /*@ngInject*/
  constructor($http, $routeParams) {
    this.$http = $http;
    this.$routeParams = $routeParams;
  }

  $onInit() {
    this.user = User.getUserById(this.$routeParams.id);
  }
}

export default angular.module('comp3705App.user', [ngRoute])
  .config(routing)
  .component('user', {
    template: require('./user.html'),
    controller: UserController,
    controllerAs: 'userController'

  })
  .name;
