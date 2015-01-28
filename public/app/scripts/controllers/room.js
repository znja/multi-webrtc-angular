'use strict';

/**
 * @ngdoc function
 * @name publicApp.controller:RoomCtrl
 * @description
 * # RoomCtrl
 * Controller of the publicApp
 */
angular.module('publicApp')
  .controller('RoomCtrl', function ($sce, VideoStream, $location, $routeParams, $scope, Room) {

    if (!window.RTCPeerConnection || !navigator.getUserMedia) {
      $scope.error = 'WebRTC is not supported by your browser. You can try the app with Chrome and Firefox.';
      return;
    }
    if (!$routeParams.roomId)
      $location.path('/room/' + uuid());

    var stream;

    $scope.start = function (constraint) {
      VideoStream.get(constraint)
      .then(function (s) {
        $scope.clicked = true;
        stream = s;
        Room.init(s);
        stream = URL.createObjectURL(stream);
        Room.joinRoom($routeParams.roomId);
        }, function () {
          $scope.error = 'No audio/video permissions. Please refresh your browser and allow the audio/video capturing.';
      });
    };

    $scope.peers = [];
    Room.on('peer.stream', function (peer) {
      console.log('Client connected, adding new stream');
      $scope.peers.push({
        id: peer.id,
        stream: URL.createObjectURL(peer.stream)
      });
    });
    Room.on('peer.disconnected', function (peer) {
      console.log('Client disconnected, removing stream');
      $scope.peers = $scope.peers.filter(function (p) {
        return p.id !== peer.id;
      });
    });

    $scope.getLocalVideo = function () {
      return $sce.trustAsResourceUrl(stream);
    };
  });
