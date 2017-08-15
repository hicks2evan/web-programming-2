'use strict';

export default function routes($routeProvider) {
  'ngInject';

  $routeProvider.when('/recipeDetail/:id', {
    template: '<recipe-detail></recipe-detail>'
  });
}
