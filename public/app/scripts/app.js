'use strict';

/**
 * @ngdoc overview
 * @name publicApp
 * @description
 * # publicApp
 *
 * Main module of the application.
 */

angular
  .module('publicApp', [
    'ngRoute'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/room/:roomId', {
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl'
      })
      .when('/room', {
        templateUrl: 'views/room.html',
        controller: 'RoomCtrl'
      })
      .otherwise({
        redirectTo: '/room'
      });
  });

angular.module('publicApp')
  .constant('config', {
      SIGNALIG_SERVER_URL: '',
      iceServers: [ {url:'stun:stun.l.google.com:19302'},
                    {
                      url: 'turn:numb.viagenie.ca',
                      credential: 'muazkh',
                      username: 'webrtc@live.com'
                    },
                    {
                      url: 'turn:192.158.29.39:3478?transport=udp',
                      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                      username: '28224511:1379330808'
                    },
                    {
                      url: 'turn:192.158.29.39:3478?transport=tcp',
                      credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
                      username: '28224511:1379330808'
                    }
                  ]
  });

Object.setPrototypeOf = Object.setPrototypeOf || function(obj, proto) {
  obj.__proto__ = proto;
  return obj;
};
