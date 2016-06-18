/**
 * Created by Stan on 18/06/2016.
 */
(function(window, angular, undefined){
  angular.module('chatApp')
    .controller("ChatController", ['$rootScope','$scope', function($rootScope, $scope){
      var vm = this;
      var socket = window.io('localhost:3000/');
      vm.newMessage = undefined;
      vm.username = undefined;
      vm.messages = [];

      socket.on("receive-message", function(msg){
        $scope.$apply(function(){
          vm.messages.push(msg);
        });
      });

      vm.sendMessage = function(){
        if (vm.newMessage && vm.username) {
          var newMessage = {
            time: newDate(),
            username: vm.username,
            message: vm.newMessage
          };
          socket.emit("new-message", newMessage);
        }
        if (vm.username == undefined) {
          alert('Register username');
        }
        vm.newMessage = undefined;
      };

      socket.on('receive-user', function(username){
        $scope.$apply(function(){
          vm.username = username;
        });
      });

      $scope.$watch(function(){
        return vm.username;
      });
    }]);

    var newDate = function(){
      var date = new Date();
      var minutes = date.getMinutes();
      minutes = (minutes < 10) ? '0' + minutes : minutes;
      var seconds = date.getSeconds();
      seconds = (seconds < 10) ? '0' + seconds : seconds;
      return date.getFullYear()
        + '-' + date.getMonth()
        + '-' + date.getDate()
        + ', ' + date.getHours()
        + ':' + minutes
        + ':' + seconds
        + ' ';
    };
})(window, window.angular);