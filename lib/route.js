var LEADOR_API_URL = "http://27.17.60.7:35001/v3";
var LEADOR_AK = "ec85d3648154874552835438ac6a02b2";

// 公交路径规划默认参数
var DEFAULT_BUS_ROUTE_PLAN = {
    coord_type: 'gcj02',
    tactics: 11, // 1:最省钱，4:最舒适模式，剩坐有空调的专线，5:不乘地铁，11:最少时间，13:最少换乘，14:最少步行
    ak: LEADOR_AK,
    output: 'json'
};

// 驾车路径规划默认参数
var DEFAULT_DRIVE_ROUTE_PLAN = {
    coord_type: 'gcj02',
    tactics: 5,  // 0:费用优先，2:国道优先，4:省道优先，5:不走高速，6:多策略1，10:不走快速路，11:速度优先，12:距离优先
    ak: LEADOR_AK,
    output: 'json'
};

// 步行路径规划默认参数
var DEFAULT_WALK_ROUTE_PLAN = {
    coord_type: 'gcj02',
    tactics: 11,  // 11:最少时间，12:最短路径
    ak: LEADOR_AK,
    output: 'json'
};

// 公交路径规划
// 示例：calcBusRoute({origin: '116.32259,39.97554', destination: '116.32259,39.97554'}, callback);
function calcBusRoute(options, callback) {
    options = $.extend(true, options, DEFAULT_BUS_ROUTE_PLAN);
    doGet(LEADOR_API_URL + '/route/bus', options, callback);
}

// 驾车路径规划
// 示例：calcDriveRoute({origin: '116.32259,39.97554', destination: '116.32259,39.97554'}, callback);
function calcDriveRoute(options, callback) {
    options = $.extend(true, options, DEFAULT_DRIVE_ROUTE_PLAN);
    doGet(LEADOR_API_URL + '/route/car', options, callback);
}

// 步行路径规划
// 示例：calcWalkRoute({origin: '116.32259,39.97554', destination: '116.32259,39.97554'}, callback);
function calcWalkRoute(options, callback) {
    options = $.extend(true, options, DEFAULT_WALK_ROUTE_PLAN);
    doGet(LEADOR_API_URL + '/route/walk', options, callback);
}