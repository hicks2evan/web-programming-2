import angular from 'angular';

export class UpdateReviewModalController {
   /*@ngInject*/
  constructor($uibModalInstance, Review, recipe, review) {
    this.Review = Review;
    this.$uibModalInstance = $uibModalInstance;
    this.recipe = recipe;
    this.review = review;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    this.Review.updateReview(this.recipe._id, this.review);
    this.$uibModalInstance.dismiss('submit');
  }
}


export default angular.module('comp3705App.updateReviewModal', [])
   .controller('updateReviewModalController', UpdateReviewModalController)
   .config(['$qProvider', function($qProvider) {
     $qProvider.errorOnUnhandledRejections(false);
   }])
  .name;
