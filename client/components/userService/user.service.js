'use strict';

export function UserService($resource) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $resource('/api/users/').query().$promise;
    },
    getUserById(userId) {
      return $resource('/api/users/:id').get({id: userId}).$promise;
    },
    updateUser(user) {
      let updateResource = $resource('/api/users/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: user._id }, user);
    },
    createUser(user) {
      let updateResource = $resource('/api/users/', null,
        {
          create: { method: 'POST' }
        });
      return updateResource.create(user);
    },
    deleteUser(user) {
      let updateResource = $resource('/api/users/:id', null,
        {
          delete: { method: 'DELETE' }
        });
      return updateResource.delete({ id: user._id });
    },
  };
  return User;
}
