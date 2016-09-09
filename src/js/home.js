/* login.js create by wuwc in 2016-08-26 */
define(function(require, exports, module){
    var $ = require('jquery');
    var orgHome = {
        init:function(){
            this.bindEvent();
        },
        bindEvent:function(){
            /* 展开 */
            $('.info-intro').on('click','em',function(){
                var that = $(this),status = that.attr('data-status');
                if(status == 0){
                    that.attr('data-status',1).text('收起').parent().css('height','auto');
                }else{
                    that.attr('data-status',0).text('展开').parent().css('height','50px');
                }
            });
        }
    }

    orgHome.init();
});