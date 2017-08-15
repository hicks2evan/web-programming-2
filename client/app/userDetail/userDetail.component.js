import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './userDetail.routes';
import User from '../../components/userService/user.service';

export class UserDetailController {
   /*@ngInject*/
  constructor($routeParams) {
    this.$routeParams = $routeParams;
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
   .config(['$qProvider', function($qProvider) {
     $qProvider.errorOnUnhandledRejections(false);
   }])
  .name;
