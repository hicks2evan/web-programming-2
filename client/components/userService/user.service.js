'use strict';

export function UserService($resource) {
  'ngInject';
  var User = {
    getAllUsers() {
      return $resource('/api/users/').query().$promise;
    },
    getUserById(userId) {
      let findResource = $resource('/api/users/:id', null,
        {
          find: { method: 'GET' }
        });
      return findResource.find({ id: userId }).$promise;
    },
    updateUser(user) {
      let updateResource = $resource('/api/users/:id', null,
        {
          update: { method: 'PUT' }
        });
      return updateResource.update({ id: user._id }, user);
    },
    createUser(user) {
      let createResource = $resource('/api/users/', null,
        {
          create: { method: 'POST' }
        });
      return createResource.create(user);
    },
    deleteUser(user) {
      let deleteResource = $resource('/api/users/:id', null,
        {
          delete: { method: 'DELETE' }
        });
      return deleteResource.delete({ id: user._id });
    },
  };
  return User;
}
