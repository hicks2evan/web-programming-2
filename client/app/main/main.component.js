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
    this.progressBar();
  }

  progressBar() {
    this.max = 200;

    this.random = function() {
      var value = Math.floor(Math.random() * 100 + 1);
      var type;

      if(value < 25) {
        type = 'success';
      } else if(value < 50) {
        type = 'info';
      } else if(value < 75) {
        type = 'warning';
      } else {
        type = 'danger';
      }

      this.showWarning = type === 'danger' || type === 'warning';
      this.dynamic = value;
      this.type = type;
    };

    this.random();
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

  createUser(user) {
    this.$uibModal.open({
      template: require('../../components/createUserModal/createUserModal.html'),
      controller: 'createUserModalController as createUserModalController',
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
