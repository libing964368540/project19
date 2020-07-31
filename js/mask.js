mask = (function () {
    var _m = {};
    var self =_m;
    //提示内容
    //成功的提示
    _m.YesTip = function (msg) {
        layer.msg(msg,{
            skin: 'msgStyle',//skin属性可以将layer的标签提取出来，重新定义样式
        });
    }
    //错误的提示
    _m.NoTip = function (msg) {
        layer.msg('<i class="material-icons msgIconStyleFail linkIcon">cancel</i>'+msg,{
            skin: 'msgStyle',//skin属性可以将layer的标签提取出来，重新定义样式
        });
    }
    //查看考题详情
    _m.look = function (data) {
        var index = top.layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: false,
            area: ['710px', '740px'],
            skin: 'lookResult',//skin属性可以将layer的标签提取出来，重新定义样式
            content: '<div class="msgWrap">' +
            '<i class="layui-icon layui-icon-close closeBtn linkIcon">clear</i> '+
             '<div class="imgWrap"><img src="" class="imgSrc"></div>'+
            '<ul style="font-size: 22px">' +
            '<li class="flex justifyContent"><div class="flex"><span style="color: #101010">选手答题</span><p></p></div><p style="color: #101010">正确答案</p></li>'+
                '<li class="flex justifyContent"><div class="flex CriminalName"><span>姓名：</span><p></p></div><p class="CriminalName_error"></p></li>'+

                '<li class="flex justifyContent"><div class="flex error CriminalProvinces "><span>籍贯：</span><p></p></div><p class="CriminalProvinces_error"></p></li>'+
                '<li class="flex justifyContent"><div class="flex CriminalPrisonTerm"><span>原判刑期：</span><p></p></div><p class="CriminalPrisonTerm_error"></p></li>'+
                '<li class="flex justifyContent"><div class="flex IsDanger"><span>顽危情况：</span><p></p></div><p class="IsDanger_error"></p></li>'+
                '<li class="flex justifyContent"><div class="flex ChargeTitle"><span>罪名：</span><p></p></div><p class="ChargeTitle_error"></p></li>'+
            '</ul>'+
            '</div>',
            success: function(layero, index) {
                  var arr=['无','顽固犯','危险犯']
                  for(var i=0;i<data.length;i++){
                      if(data[i].IsSeq==5){//罪名
                          var imgSrc = urls+data[i].CriminalHead;
                          $(layero).find('.imgSrc').attr('src',imgSrc);
                          $(layero).find('.ChargeTitle p').text(data[i].Answer);
                          if(data[i].IsTrue==0){
                              $(layero).find('.ChargeTitle').parent().addClass('error');
                              $(layero).find('.ChargeTitle_error').text(data[i].ChargeTitle);
                          }
                      }
                      if(data[i].IsSeq==4){//顽危情况
                          $(layero).find('.IsDanger p').text(arr[data[i].Answer]);
                          if(data[i].IsTrue==0){
                              $(layero).find('.IsDanger').parent().addClass('error');
                              $(layero).find('.IsDanger_error').text(arr[data[i].IsDanger]);
                          }
                      }
                      if(data[i].IsSeq==3){//原判刑期
                          $(layero).find('.CriminalPrisonTerm p').text(data[i].Answer);
                          if(data[i].IsTrue==0){
                              $(layero).find('.CriminalPrisonTerm').parent().addClass('error');
                              $(layero).find('.CriminalPrisonTerm_error').text(data[i].CriminalPrisonTerm);
                          }
                      }
                      if(data[i].IsSeq==2){//籍贯
                          $(layero).find('.CriminalProvinces p').text(data[i].Answer);
                          if(data[i].IsTrue==0){
                              $(layero).find('.CriminalProvinces').parent().addClass('error');
                              $(layero).find('.CriminalProvinces_error').text(data[i].CriminalProvinces);
                          }
                      }
                      if(data[i].IsSeq==1){//姓名
                          $(layero).find('.CriminalName p').text(data[i].Answer);
                          if(data[i].IsTrue==0){
                              $(layero).find('.CriminalName').parent().addClass('error');
                              $(layero).find('.CriminalName_error').text(data[i].CriminalName);
                          }
                      }

                  }

                $(layero).find('.closeBtn').unbind('click').bind('click', function() {
                    top.layer.close(index);
                })
            }
        })
    }
    //result
    _m.resultScore = function () {
        var index = top.layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            shadeClose: false,
            area: ['1600px', '780px'],
            skin: 'lookResultS',//skin属性可以将layer的标签提取出来，重新定义样式
            content: '<div class="headSrc"><img src="img/lg.png" alt="">' +
            '<i class="layui-icon layui-icon-close closeBtn linkIcon">clear</i></div>'+
                     '<div class="msgWrap2">' +

                            '<div class="tableWrap">'+
                                  '<table></table>'+
                                  '<table style="border-left: 1px solid #CCCCCC;border-right: 1px solid #CCCCCC"></table>'+
                                  '<table></table>'+
                           '</div>'+
                       '</div>',
            success: function (layero, index) {
                  var table = $(layero).find('table');
                $.axse(urls + '/ApiInterface/PoliceTaskRanking', {}, function (result) {
                    var data=result.data;
                    var dom="";
                        for(var i=0;i<16;i++){
                            if(i>=data.length){
                                dom+='<tr>'
                                dom+="<td>"+(i+1)+"</td>"
                                dom+="<td></td>"
                                dom+="<td></td>"
                                dom+="<td></td>"
                                dom+="<td></td>"
                                dom+="</tr>"
                            }else {
                           dom+='<tr>'
                           dom+="<td>"+(i+1)+"</td>"
                           dom+="<td>"+data[i].PoliceName+"</td>"
                            dom+="<td>"+data[i].PoliceUnit+"</td>"
                            dom+="<td>"+data[i].AnswerScore+"</td>"
                            dom+="<td>"+self.time(data[i].AnswerMinute)+"</td>"
                            dom+="</tr>"}
                        }
                    table.eq(0).append(dom);
                    var dom="";
                    for(var i=16;i<32;i++){
                        if(i>=data.length){
                            dom+='<tr>'
                            dom+="<td>"+(i+1)+"</td>"
                            dom+="<td></td>"
                            dom+="<td></td>"
                            dom+="<td></td>"
                            dom+="<td></td>"
                            dom+="</tr>"
                        }else {
                        dom+='<tr>'
                        dom+="<td>"+(i+1)+"</td>"
                        dom+="<td>"+data[i].PoliceName+"</td>"
                        dom+="<td>"+data[i].PoliceUnit+"</td>"
                        dom+="<td>"+data[i].AnswerScore+"</td>"
                        dom+="<td>"+self.time(data[i].AnswerMinute)+"</td>"
                        dom+="</tr>"}
                    }
                    table.eq(1).append(dom);
                    var dom="";
                    for(var i=32;i<48;i++){
                        if(i>=data.length){
                            dom+='<tr>'
                            dom+="<td>"+(i+1)+"</td>"
                            dom+="<td></td>"
                            dom+="<td></td>"
                            dom+="<td></td>"
                            dom+="<td></td>"
                            dom+="</tr>"
                        }else {
                            dom+='<tr>'
                        dom+="<td>"+(i+1)+"</td>"
                        dom+="<td>"+data[i].PoliceName+"</td>"
                        dom+="<td>"+data[i].PoliceUnit+"</td>"
                        dom+="<td>"+data[i].AnswerScore+"</td>"
                        dom+="<td>"+self.time(data[i].AnswerMinute)+"</td>"
                        dom+="</tr>"
                        }

                    }
                    table.eq(2).append(dom);
                },function () {

                })
                $(layero).find('.closeBtn').unbind('click').bind('click', function() {
                    top.layer.close(index);
                })
            }
        })
    }
    _m.time = function (sys_second) {
        var day = Math.floor((sys_second / 1000 / 3600) / 24);
        var hour = Math.floor((sys_second / 1000 / 3600) % 24);
        var minute = Math.floor((sys_second / 1000 / 60) % 60);
        var second = Math.floor(sys_second / 1000 % 60);
        var haomiao = Math.floor(sys_second % 1000 / 10);
        minute = minute >= 10 ? minute : '0' + minute
        second = second >= 10 ? second : '0' + second
        haomiao = haomiao >= 10 ? haomiao : '0' + haomiao
        var arr = [minute, second, haomiao]
        return arr.join(':')
    }
    return _m;
})()