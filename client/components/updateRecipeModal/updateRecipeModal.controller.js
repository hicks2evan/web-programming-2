import angular from 'angular';

export class UpdateRecipeModalController {
   /*@ngInject*/
  constructor($uibModalInstance, Recipe, recipe) {
    this.Recipe = Recipe;
    this.$uibModalInstance = $uibModalInstance;
    this.recipe = recipe;
    this.ingredients = this.recipe.ingredients;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.recipe.ingredients = this.ingredients;
    this.Recipe.updateRecipe(this.recipe);
    this.$uibModalInstance.dismiss('submit');
  }

  addIngredient() {
    this.ingredients.push({name: '', amount: ''});
  }

  removeIngredient(index) {
    this.ingredients.splice(index, 1);
  }
}


export default angular.module('comp3705App.updateRecipeModal', [])
   .controller('updateRecipeModalController', UpdateRecipeModalController)
   .config(['$qProvider', function($qProvider) {
     $qProvider.errorOnUnhandledRejections(false);
   }])
  .name;
