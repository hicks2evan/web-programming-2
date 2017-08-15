import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipeDetail.routes';
import Recipe from '../../components/recipeService/recipe.service';

export class RecipeDetailController {
   /*@ngInject*/
  constructor($routeParams) {
    this.something = Recipe.getRecipeById('59912b2fbd3e8d4bd3eac74a');
    this.$routeParams = $routeParams;
    this.setData();
  }

  setData() {
    //var id = this.$routeParams.id;
    //this.recipe = this.Recipe.getRecipeById(id);
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
