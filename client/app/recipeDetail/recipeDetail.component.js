import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipeDetail.routes';

export class RecipeDetailController {
   /*@ngInject*/
  constructor($routeParams, Recipe) {
    this.$routeParams = $routeParams;
    this.setData();
  }

  setData() {
    var id = this.$routeParams.id;
    this.recipe = this.Recipe.getRecipeById(id);
  }
}

export default angular.module('comp3705App.recipeDetail', [ngRoute])
   .config(routing)
   .component('recipeDetail', {
     template: require('./recipeDetail.html'),
     controller: RecipeDetailController,
     controllerAs: 'recipeDetailController'

   })
   .name;
