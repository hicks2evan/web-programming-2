import angular from 'angular';
const ngRoute = require('angular-route');
import routing from './recipeDetail.routes';

export class RecipeDetailController {
   /*@ngInject*/
  constructor($routeParams, Recipe, Review, User, $uibModal) {
    this.$routeParams = $routeParams;
    this.Recipe = Recipe;
    this.Review = Review;
    this.User = User;
    this.$uibModal = $uibModal;
    this.setData();

    this.ratingStates = [
        {stateOn: 'glyphicon-ok-sign', stateOff: 'glyphicon-ok-circle'},
        {stateOn: 'glyphicon-star', stateOff: 'glyphicon-star-empty'},
        {stateOn: 'glyphicon-heart', stateOff: 'glyphicon-ban-circle'},
        {stateOn: 'glyphicon-heart'},
        {stateOff: 'glyphicon-off'}
    ];
  }

  hoveringOver(value) {
    this.overStar = value;
    this.percent = 100 * (value / this.max);
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

  createReview(recipe, review) {
    this.$uibModal.open({
      template: require('../../components/createReviewModal/createReviewModal.html'),
      controller: 'createReviewModalController as createReviewModalController',
      resolve: {
        review() {
          return review;
        },
        recipe() {
          return recipe;
        }
      }
    });
  }

  deleteReview(recipe, review) {
    this.Review.deleteReview(recipe._id, review);
    this.setData();
  }

  updateReview(recipe, review) {
    this.$uibModal.open({
      template: require('../../components/updateReviewModal/updateReviewModal.html'),
      controller: 'updateReviewModalController as updateReviewModalController',
      resolve: {
        review() {
          return review;
        },
        recipe() {
          return recipe;
        }
      }
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
