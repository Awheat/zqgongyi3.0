define(function(require,exports,module){
    var _is_ajax=false;
    require("jquery");
    var _title=$(".ucenter-sub-title");
    function getData(status,p,that){
        p= p ? p: 1;
        if(_is_ajax){
            return false;
        }

        _is_ajax=true;
        var _article=$("#article");
        var url=_article.attr("data-url");
        $("#show_load").show();
        $.ajax({
            url:url,
            data:{p:p,status:status},
            success:function(html){
	            _is_ajax=false;
                $("#show_load").hide();
                _article.html(html);
                _title.find('a.cur').removeClass('cur');
                _title.find("a[data-status='"+status+"']").addClass("cur");
            }
        });
    }
    function event(that){
        var status=that.attr("data-status");
        var p=that.attr("data-p");
        getData(status,p,that);
    }
    $(".ucenter-content").delegate(".ajax","click",function(){
        event($(this));
    });
    event($(".ajax:first"));

});