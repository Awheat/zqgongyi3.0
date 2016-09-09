/**
 * Created by zhangzg on 2016/8/26.
 */
define(function(require, exports, module){
    require('jquery');
    $(".distpicker > select ").on("change",function(){
        var that = $(this);
        var type = that.attr("data-type");
        if (type == 3) {
            return;
        }
        var c = that.next();
        c.html('<option value="">--请选择--</option>');
        if (type == 1) {
            c.next().html('<option value="">--请选择--</option>');
        }
        var val = that.val();
        if (val == 0) {
            return;
        }
        var url = that.parent().attr("data-url");

        $.getJSON(url, {parent_id: val}, function (data) {
            var p = ['<option value="">--请选择--</option>'];
            $.each(data, function (i, n) {
                    if (!n.id) {
                        return;
                    }
                    p.push('<option value="' + n.id + '">' + n.class_name + '</option>')
                }
            );
            c.html(p.join(''));
        });
    });

});