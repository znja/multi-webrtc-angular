'use strict';

/**
 * @ngdoc service
 * @name publicApp.VideoStream
 * @description
 * # VideoStream
 * Factory in the publicApp.
 */
angular.module('publicApp')
  .factory('VideoStream', function ($q) {
    var stream;
    return {
      get: function (constraints) {
        if (stream || !constraints) {
          return $q.when(stream);
        } else {
          var d = $q.defer();
          navigator.getUserMedia(constraints,
            function (s) {
            stream = s;
            d.resolve(stream);
          }, function (e) {
            d.reject(e);
          });
          return d.promise;
        }
      }
    };
  });
