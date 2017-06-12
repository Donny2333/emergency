/**
 * Created by Donny on 17/3/22.
 */
(function(angular) {
    'use strict';

    angular.module('emergency.services', [])
        .factory('uuid', function() {
            var uuid = {};

            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }

            uuid.create = function() {
                return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                    s4() + '-' + s4() + s4() + s4();
            };

            return uuid;
        })

    .factory('Http', ["$q", "$http", '$sce', function($q, $http, $sce) {
        function parseParams(url, params) {
            var p = [];
            for (var key in params) {
                p.push(key + '=' + params[key]);
            }
            return url + p.join('&');
        }

        return {
            get: function(url) {
                var deferred = $q.defer();

                $http.get(url).then(function(res) {
                    deferred.resolve(res);
                }, function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            },
            post: function(url, params) {
                var deferred = $q.defer();

                $http.post(url, params).then(function(res) {
                    deferred.resolve(res);
                }, function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            },
            jsonp: function(url, params) {
                var deferred = $q.defer();
                var _url = parseParams(url, params);

                $http.jsonp($sce.trustAsResourceUrl(_url)).then(function(res) {
                    deferred.resolve(res);
                }, function(err) {
                    deferred.reject(err);
                });

                return deferred.promise;
            }
        }
    }])

    .factory('Route', ['$http', 'Http', 'LEADOR_API_URL', 'LEADOR_AK', function($http, Http, LEADOR_API_URL, LEADOR_AK) {
        var url = LEADOR_API_URL;
        return {
            drive: function(params) {
                $http.defaults.jsonpCallbackParam = 'callback';
                angular.extend(params, {
                    coord_type: 'gcj02',
                    tactics: 5, // 0:费用优先，2:国道优先，4:省道优先，5:不走高速，6:多策略1，10:不走快速路，11:速度优先，12:距离优先
                    ak: LEADOR_AK,
                    output: 'json'
                });
                return Http.jsonp(url + '/route/car?', params);
            }
        }
    }])

    .factory('FullFeatures', ['$http', 'Http', function($http, Http) {
        // var url = 'http://192.168.250.42:8822/TotalFactorQueryWcfService';
        var url = 'http://111.47.18.22:8090/TotalFactorQueryWcfService';

        return {
            query: function(params) {
                var callback = $http.defaults.jsonpCallbackParam;
                $http.defaults.jsonpCallbackParam = 'jsoncallback';
                return Http.jsonp(url + '/Query?', params).then(function(res) {
                    $http.defaults.jsonpCallbackParam = callback;
                    return res;
                }, function(err) {
                    $http.defaults.jsonpCallbackParam = callback;
                    return err;
                })
            }
        }
    }])

})(angular);
