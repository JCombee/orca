angular
  .module('app')
  .config(['$authProvider', function($authProvider) {
    $authProvider.baseUrl = '/api/users/';
    $authProvider.loginUrl = '/login';
    $authProvider.signupUrl = '/';
    $authProvider.unlinkUrl = '/unlink/';
    $authProvider.tokenName = 'id';
  }]);