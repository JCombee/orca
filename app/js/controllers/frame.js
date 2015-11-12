angular
  .module('app')
  .controller('FrameController', ['$scope', '$state', function($scope,
      $state) {
        $scope.menu = {
          items: [
            {
              name: "Dashboard",
              icon: "vendor/material-design-icons/action/svg/design/ic_dashboard_24px.svg",
              sref: "frame.dashboard"
            },
            {
              name: "Tasks",
              icon: "vendor/material-design-icons/action/svg/design/ic_list_24px.svg",
              sref: "frame.tasks"
            },
          ]
        };
        
        $scope.go = $state.go;
        $scope.includes = $state.includes;
        
  }]);