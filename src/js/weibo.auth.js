define(function (require, exports, module) {
    require("jquery");
    var _btn_login = $(".bind-btn "),_is_ajax=false;
    _btn_login.click(function () {
    	var that=$(this);
        window.type=$(this).attr("data-type");
        if (_is_ajax) {
            return;
        }
        if(that.hasClass("istrue")){
            //解除绑定
            if(window.confirm("确定要解除吗？")){
                ubind(that);
            }
        }else{
            //执行绑定
            var wName="_auth_window";
            if(window[wName]){
                window[wName].focus();
            }else{
                window.open(bind_url[window.type]['bind'],wName,'channelmode=1,directories=no,height=500px,width=800px,location=no,menubar=0,resizable=0,scrollbars=no,status=0,titlebar=0,toolbar=0,scroll=0');

            }
        }
    });
    function ubind(that) {
        _is_ajax = true;
        var url=bind_url[window.type]['unbind'];
        that.text("正在解除");
        $.ajax({
            url:url,
            type:'post',
            dataType:'json',
            success:function(result){
                if(result.errcode==0){
                    //解除成功
                    $("#show_"+type+"_ico").addClass("isfalse").removeClass("istrue");
                    $("#show_"+type+"_name").html("<span>尚未绑定微博</span>");
                    $("#show_"+type+"_btn").addClass("isfalse").removeClass("istrue").text("立即绑定");

                }else{
                    alert(result.errmsg);
                }
                _is_ajax=false;
            }
        });
    }


});