/**
 * Created by Donny on 17/4/26.
 */
(function(angular) {
    "use strict";

    var prodURL = 'https://172.30.1.246:9527/',
        devURL = 'http://192.168.250.44:9527/',
        Urls = {
            Prod_Cfg: {
                api: prodURL,
                img: 'http://172.30.1.246:9528/',
                map: 'http://111.47.18.22:9008/arcgis/rest/services/ThemeMap/MapServer',
                featureQuery: 'http://111.47.18.22:8090/TotalFactorQueryWcfService',
                socket: 'http://111.47.18.22:8082/emergency/websocket'
            },
            Dev_Cfg: {
                api: devURL,
                img: 'http://192.168.250.44:9528/',
                map: 'http://192.168.250.45:6080/arcgis/rest/services/ThemeMap/MapServer',
                featureQuery: 'http://192.168.250.42:8822/TotalFactorQueryWcfService',
                socket: 'http://192.168.99.69:8083/emergency/websocket'
            }
        };

    angular.module('emergency.config', [])
        .constant('URL_CFG', Urls.Prod_Cfg)
        .constant('LEADOR_API_URL', "http://27.17.60.7:35001/v3")
        .constant('LEADOR_AK', "ec85d3648154874552835438ac6a02b2")

})(angular);
