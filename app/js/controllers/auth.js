angular
  .module('app')
  .controller('AuthController', ['$scope', '$state', '$auth', '$mdToast', '$timeout', function($scope,
      $state, $auth, $mdToast, $timeout) {
        
    $scope.login = function(user) {
      $auth.login(user)
        .then(function(response) {
          $mdToast.show($mdToast.simple().content('Hello, you are successfully logged in!'));
          $state.go('frame.dashboard');
        })
        .catch(function(response) {
          $mdToast.show($mdToast.simple().content('Something went wrong!'));
        });
    };
    
    $scope.register = function(user) {
      $auth.signup(user)
        .then(function(response) {
          $mdToast.show($mdToast.simple().content('You are successfully registered!'));
          $state.go('guest.login');
        })
        .catch(function(response) {
          $mdToast.show($mdToast.simple().content('Something went wrong!'));
        });
    }
    
    var self = this;
    self.hidden = false;
    self.isOpen = false;
    self.hover = false;
    
    $scope.$watch('user.fab.isOpen', function(isOpen) {
      if (isOpen) {
        $timeout(function() {
          $scope.tooltipVisible = self.isOpen;
        }, 600);
      } else {
        $scope.tooltipVisible = self.isOpen;
      }
    });
    
    $scope.user = {
      fab: {
        isOpen: false,
        items: [
          {
            name: "Logout",
            icon: "vendor/material-design-icons/action/svg/design/ic_exit_to_app_24px.svg",
            click: function() {
              $auth.logout()
                .then(function(response) {
                  $mdToast.show($mdToast.simple().content('You are successfully logged out!'));
                  $state.go('guest.login');
                })
                .catch(function(response) {
                  $mdToast.show($mdToast.simple().content('Something went wrong!'));
                });
            }
          }
        ]
      }
    };
    
  }]);