import angular from 'angular';

export class CreateUserModalController {
   /*@ngInject*/
  constructor($uibModalInstance, User, user) {
    this.User = User;
    this.$uibModalInstance = $uibModalInstance;
    this.user = user;
  }

  cancel() {
    this.$uibModalInstance.dismiss('cancel');
  }

  submitForm() {
    //console.log("something");
    this.User.createUser(this.user);
  }
}


export default angular.module('comp3705App.createUserModal', [])
   .controller('createUserModalController', CreateUserModalController)
   .config(['$qProvider', function($qProvider) {
     $qProvider.errorOnUnhandledRejections(false);
   }])
  .name;
