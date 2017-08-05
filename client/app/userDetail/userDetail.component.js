import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './userDetail.routes';
import User from '../main/main.component';

export class UserDetailController {
   /*@ngInject*/
  constructor($http, $routeParams) {
    this.$http = $http;
    this.$routeParams = $routeParams;
  }

  $onInit() {
    this.user = User.getUserById(this.$routeParams.id);
  }
}

export default angular.module('comp3705App.userDetail', [ngRoute])
  .config(routing)
  .component('userDetail', {
    template: require('./userDetail.html'),
    controller: UserDetailController,
    controllerAs: 'userDetailController'

  })
  .name;
