urls='http://prison.hzsanjose.com';
//判断登录设备
/**
 * ajax封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储，如：{"date": new Date().getTime(), "state": 1}
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * failfn 条件不符合回调函数
 * errorfn 失败回调函数
 */
jQuery.axse = function(url, data, successfn, errorfn) {
    data = (data == null || data == "" || typeof(data) == "undefined") ? { "date": new Date().getTime() }:data;
    jQuery.support.cors=true;
    $.ajax({
        type: "post",
        data: data,
        url: url,
        async:true,
        timeout : 500000,
        jsonp: "jsonpcallback",
        dataType: "jsonp",
        crossDomain: true == !(document.all),
        cache:false,
        success: function(e) {
            //如果errorCode  为400  到  500 内，token失效，返回登录页面
            if(e.errno!=1){
                // layer.msg(e.error,{
                //         skin: 'msgStyle'//skin属性可以将layer的标签提取出来，重新定义样式
                //     });
                if(errorfn){
                    errorfn();
                }
            }else{
                successfn(e);
            }
        },
        error: function(e) {
            layer.msg('服务器繁忙，请稍后再试',{
                skin: 'msgStyle',//skin属性可以将layer的标签提取出来，重新定义样式
            });
        },
        statusCode: {
            400: function() {
                alert('请求错误 : 请求参数错误');
            },
            404: function() {
                alert('请求错误 : 请求不存在');
            },
            500: function() {
                alert('请求错误 : 服务器错误');
            },
            503: function() {
                alert('网络繁忙')
            }
        }
    });
};
