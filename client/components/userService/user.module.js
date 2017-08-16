'use strict';

import resource from 'angular-resource';


import angular from 'angular';
import {
  UserService
} from './user.service';

export default angular.module('comp3705App.user', [resource])
  .factory('User', UserService)
  .name;
