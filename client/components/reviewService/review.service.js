'use strict';

export function ReviewService($resource) {
  'ngInject';
  var Review = {
    getAllReviewsByRecipe(recipeId) {
      return $resource('/api/recipes/:id/reviews').query({id: recipeId}).$promise;
    },
    getReviewById(recipeId, reviewId) {
      let findResource = $resource('/api/recipes/:ida/reviews/:idb', null,
        {
          find: { method: 'GET' }
        });
      return findResource.find({ ida: recipeId, idb: reviewId}).$promise;
    },
    updateReview(recipeId, review) {
      let updateResource = $resource('/api/recipes/:ida/reviews/:idb', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ ida: recipeId, idb: review._id }, review);
    },
    createReview(recipeId, review) {
      let createResource = $resource('/api/recipes/:id/reviews', null,
        {
          create: { method: 'POST' }
        });
      return createResource.create({id: recipeId}, review);
    },
    deleteReview(recipeId, review) {
      let deleteResource = $resource('/api/recipes/:ida/reviews/:idb', null,
        {
          delete: { method: 'DELETE' }
        });
      return deleteResource.delete({ ida: recipeId, idb: review._id });
    },
  };
  return Review;
}
