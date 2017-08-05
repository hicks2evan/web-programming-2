import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
   /*@ngInject*/
  constructor($http, User, $uibModal) {
    this.$http = $http;
    this.User = User;
    this.$uibModal = $uibModal;
    this.setData();
    this.getUserData();
  }

  setData() {
    this.values = ['first', 'second', 'third'];
    this.valueToSquare = 4;
  }

  getUserData() {
    this.User.getAllUsers()
         .then(response => {
           this.users = response;
         })
         .catch(error => {
           console.error(error);
         });
  }

  updateUser(user) {
     //console.log(user);
    this.$uibModal.open({
      template: require('../../components/updateUserModal/updateUserModal.html'),
      controller: 'updateUserModalController as updateUserModalController',
      resolve: {
        user: () => user
      }
    });
  }
}

export function SquareFilter() {
  var squareFunction = function(value) {
    return value * value;
  };
  return squareFunction;
}

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'

  })
   .filter('Square', SquareFilter)
  .name;
