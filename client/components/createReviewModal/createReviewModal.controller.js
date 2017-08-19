import angular from 'angular';

export class CreateReviewModalController {
   /*@ngInject*/
  constructor($uibModalInstance, Review, recipe, review) {
    this.Review = Review;
    this.$uibModalInstance = $uibModalInstance;
    this.review = review;
    this.recipe = recipe;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.Review.createReview(this.recipe._id, this.review);
    this.$uibModalInstance.dismiss('submit');
  }

}


export default angular.module('comp3705App.createReviewModal', [])
   .controller('createReviewModalController', CreateReviewModalController)
   .config(['$qProvider', function($qProvider) {
     $qProvider.errorOnUnhandledRejections(false);
   }])
  .name;
