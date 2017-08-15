'use strict';

import angular from 'angular';
import {
  UserService
} from './recipe.service';

export default angular.module('comp3705App.user', [])
  .factory('User', UserService)
  .name;
