/**
 * Created by Stan on 18/06/2016.
 */
(function(window, angular, undefined){
  angular.module('chatApp')
    .controller("UserController", ['$rootScope' ,'$scope', function($rootScope, $scope){
      var vm = this;
      var socket = window.io('localhost:3000/');
      vm.username = undefined;

      vm.createUser = function(username){
        socket.emit('new-user', username);
      };

      socket.on('reject-user', function(username){
        $scope.$apply(function(){
          alert(username + ' is in used already!');
          vm.username = undefined;
        });
      });

    }]);
})(window, window.angular);