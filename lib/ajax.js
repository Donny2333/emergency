// 发起GET请求
function doGet(url, options, callback) {
    $.ajax({
        type: 'GET',
        async: true,
        dataType: 'jsonp',
        url: url,
        contentType: "application/x-www-form-urlencoded",
        data: options,
        success: callback,
        error: function (xhr, Error) {
            
        }
    });
}