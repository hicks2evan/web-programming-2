'use strict';

export function RecipeService($resource) {
  'ngInject';
  var Recipe = {
    getAllRecipes() {
      return $resource('/api/recipes/').query().$promise;
    },
    getRecipeById(recipeId) {
      return $resource('/api/users/:id').get({id: recipeId}).$promise;
    },
    updateRecipe(recipe) {
      let updateResource = $resource('/api/recipes/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: recipe._id }, recipe);
    },
    createRecipe(recipe) {
      let updateResource = $resource('/api/recipes/', null,
        {
          create: { method: 'POST' }
        });
      return updateResource.create(recipe);
    },
    deleteRecipe(recipe) {
      let updateResource = $resource('/api/recipes/:id', null,
        {
          delete: { method: 'DELETE' }
        });
      return updateResource.delete({ id: recipe._id });
    },
  };
  return Recipe;
}
