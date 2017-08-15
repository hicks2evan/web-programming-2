'use strict';

import angular from 'angular';
import {
  UserService
} from './review.service';

export default angular.module('comp3705App.user', [])
  .factory('User', UserService)
  .name;
