import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './main.routes';

export class MainController {
   /*@ngInject*/
  constructor(Recipe, $uibModal) {
    this.Recipe = Recipe;
    this.getData();
    this.$uibModal = $uibModal;
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

  createRecipe(recipe) {
    this.$uibModal.open({
      template: require('../../components/createRecipeModal/createRecipeModal.html'),
      controller: 'createRecipeModalController as createRecipeModalController',
      resolve: {
        recipe() {
          return recipe;
        }
      }
    });
  }

  deleteRecipe(recipe) {
    this.Recipe.deleteRecipe(recipe);
    this.getData();
  }

  updateRecipe(recipe) {
    this.$uibModal.open({
      template: require('../../components/updateRecipeModal/updateRecipeModal.html'),
      controller: 'updateRecipeModalController as updateRecipeModalController',
      resolve: {
        recipe() {
          return recipe;
        }
      }
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
