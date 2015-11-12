angular
  .module('app', [
    'lbServices',
    'ui.router',
    'ngMaterial',
    'ngMessages',
    'satellizer'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
    
    
      
      // Frame
      .state('frame', {
        templateUrl: 'views/block/frame.html',
        controller: 'FrameController'
      })
    
    // Guest State
      .state('guest', {
        templateUrl: 'views/block/small.html',
        controller: 'FrameController'
      })
      .state('guest.login', {
        url: '/login',
        templateUrl: 'views/guest/login.html',
        controller: 'GuestController',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('guest.register', {
        url: '/register',
        templateUrl: 'views/guest/register.html',
        controller: 'GuestController',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      .state('guest.retrive', {
        url: '/retrive',
        templateUrl: 'views/guest/retrive.html',
        controller: 'GuestController',
        resolve: {
          skipIfLoggedIn: skipIfLoggedIn
        }
      })
      
      // Dashboard
      .state('frame.dashboard', {
        url: '/dashboard',
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'DashboardController',
        resolve: {
          loginRequired: loginRequired
        }
      })
      
      // Tasks
      .state('frame.tasks', {
        url: '/tasks',
        templateUrl: 'views/dashboard/dashboard.html',
        controller: 'DashboardController',
        resolve: {
          loginRequired: loginRequired
        }
      });
      
      
    $urlRouterProvider.otherwise('login');

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        $location.path('/dashboard');
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
    
  }]);