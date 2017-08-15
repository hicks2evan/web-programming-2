'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/userDetail/:id', {
    template: '<user-detail></user-detail>'
  });
}
