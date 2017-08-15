'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/api', {
    template: '<api></api>'
  });
}
