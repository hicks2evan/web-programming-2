'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/user/:id', {
    template: '<user></user>'
  });
}
