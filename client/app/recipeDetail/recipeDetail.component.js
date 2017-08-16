import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipeDetail.routes';

export class RecipeDetailController {
   /*@ngInject*/
  constructor($routeParams, Recipe, User) {
    this.$routeParams = $routeParams;
    this.Recipe = Recipe;
    this.User = User;
    this.setData();
  }

  setData() {
    var id = this.$routeParams.id;
    this.Recipe.getRecipeById(id)
        .then(response => {
          this.recipe = response;
          this.setUserData(this.User);
        })
        .catch(error => {
          console.error(error);
        });
  }

  setUserData(Service) {
    var c = 0;
    this.recipe.reviews.forEach(function(review) {
      console.log(review.user);
      Service.getUserById(review.user)
           .then(response => {
             review.user = response;
           })
           .catch(error => {
             console.error(error);
           });
      c++;
    });
  }
}

export default angular.module('comp3705App.recipeDetail', [ngRoute])
   .config(routing, ['$qProvider', function($qProvider) {
     $qProvider.errorOnUnhandledRejections(false);
   }])
   .component('recipeDetail', {
     template: require('./recipeDetail.html'),
     controller: RecipeDetailController,
     controllerAs: 'recipeDetailController'

   })
   .name;
