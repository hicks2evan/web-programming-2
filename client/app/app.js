'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';

const ngRoute = require('angular-route');

import uiBootstrap from 'angular-ui-bootstrap';

import {
  routeConfig
} from './app.config';

import main from './main/main.component';
import about from './about/about.component';
import ui from './ui/ui.component';
import user from '../components/userService/user.module';
import recipe from '../components/recipeService/recipe.module';
import review from '../components/reviewService/review.module';
import userDetail from './userDetail/userDetail.component';
import recipeDetail from './recipeDetail/recipeDetail.component';
import constants from './app.constants';
import util from '../components/util/util.module';
import updateUserModal from '../components/updateUserModal/updateUserModal.controller';
import createUserModal from '../components/createUserModal/createUserModal.controller';
import updateRecipeModal from '../components/updateRecipeModal/updateRecipeModal.controller';
import createRecipeModal from '../components/createRecipeModal/createRecipeModal.controller';
import updateReviewModal from '../components/updateReviewModal/updateReviewModal.controller';
import createReviewModal from '../components/createReviewModal/createReviewModal.controller';

import './app.css';

angular.module('comp3705App', [ngCookies, ngResource, ngSanitize, ngRoute, uiBootstrap, user, recipe, review, main, about, ui, recipeDetail, userDetail, constants, util, createUserModal, updateUserModal, createRecipeModal, updateRecipeModal, createReviewModal, updateReviewModal,
])
  .config(routeConfig);

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['comp3705App'], {
      strictDi: true
    });
  });
