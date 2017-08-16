import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './userDetail.routes';

export class UserDetailController {
   /*@ngInject*/
  constructor($routeParams, User) {
    this.$routeParams = $routeParams;
    this.User = User;
    this.setData();
  }

  setData() {
    var id = this.$routeParams.id;
    this.user = this.User.getUserById(id);
    console.log(this.user);
  }
}

export default angular.module('comp3705App.userDetail', [ngRoute])
   .config(routing, ['$qProvider', function($qProvider) {
     $qProvider.errorOnUnhandledRejections(false);
   }])
   .component('userDetail', {
     template: require('./userDetail.html'),
     controller: UserDetailController,
     controllerAs: 'userDetailController'

   })
   .name;
