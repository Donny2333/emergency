/**
 * Created by Donny on 17/3/22.
 */
(function (angular) {
    'use strict';

    angular.module('emergency.services', [])
        .factory('uuid', function () {
            var uuid = {};

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            uuid.create = function () {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };

            return uuid;
        })

        .factory('Http', ["$q", "$http", function ($q, $http) {
            return {
                get: function (url) {
                    var deferred = $q.defer();

                    $http.get(url).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                },
                post: function (url, params) {
                    var deferred = $q.defer();

                    $http.post(url, params).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                },
                jsonp: function (url, params) {
                    var deferred = $q.defer();

                    $http.jsonp(url, params).then(function (res) {
                        deferred.resolve(res);
                    }, function (err) {
                        deferred.reject(err);
                    });

                    return deferred.promise;
                }
            }
        }])

        .factory('Route', ['$sce', 'Http', 'LEADOR_API_URL', 'LEADOR_AK', function ($sce, Http, LEADOR_API_URL, LEADOR_AK) {
            var url = LEADOR_API_URL;

            function parseParams(url, params) {
                var p = [];
                angular.extend(params, {
                    coord_type: 'gcj02',
                    tactics: 5,  // 0:费用优先，2:国道优先，4:省道优先，5:不走高速，6:多策略1，10:不走快速路，11:速度优先，12:距离优先
                    ak: LEADOR_AK,
                    output: 'json'
                });

                for (var key in params) {
                    p.push(key + '=' + params[key]);
                }

                return url + p.join('&');
            }

            return {
                drive: function (params) {
                    return Http.jsonp($sce.trustAsResourceUrl(parseParams(url + '/route/car?', params)));
                }
            }
        }])

})(angular);