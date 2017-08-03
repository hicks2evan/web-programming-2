import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './user.routes';
import UserService from '/Users/Evan/Documents/GIT/COMP-3705/client/app/main/main.component.js';

export class UserController {
   /*@ngInject*/
  constructor($http, $routeParams) {
    this.$http = $http;
    this.$routeParams = $routeParams;
    this.setData();
  }

  setData() {
    this.userId = this.$routeParams.id;
    this.user = UserService.getUserById(this.userId);
    console.log(this.userId);
  }

  $onInit() {
  }
}


export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('user', {
    template: require('./user.html'),
    controller: UserController,
    controllerAs: 'userController'

  })
  .name;
