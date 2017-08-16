'use strict';

export function RecipeService($resource) {
  'ngInject';
  var Recipe = {
    getAllRecipes() {
      return $resource('/api/recipes/').query().$promise;
    },
    getRecipeById(recipeId) {
      let findResource = $resource('/api/recipes/:id', null,
        {
          find: { method: 'GET' }
        });
      return findResource.find({ id: recipeId }).$promise;
    },
    updateRecipe(recipe) {
      let updateResource = $resource('/api/recipes/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: recipe._id }, recipe);
    },
    createRecipe(recipe) {
      let createResource = $resource('/api/recipes/', null,
        {
          create: { method: 'POST' }
        });
      return createResource.create(recipe);
    },
    deleteRecipe(recipe) {
      let deleteResource = $resource('/api/recipes/:id', null,
        {
          delete: { method: 'DELETE' }
        });
      return deleteResource.delete({ id: recipe._id });
    },
  };
  return Recipe;
}
