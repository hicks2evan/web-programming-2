import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
   /*@ngInject*/
  constructor(Recipe) {
    this.Recipe = Recipe;
    this.getData();
  }

  getData() {
    this.Recipe.getAllRecipes()
        .then(response => {
          this.recipes = response;
        })
        .catch(error => {
          console.error(error);
        });
  }
}

export default angular.module('comp3705App.main', [ngRoute])
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController,
    controllerAs: 'mainController'

  })
  .name;
