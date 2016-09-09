/* information.js create by wuwc in 2016-08-29 */
define(function(require, exports, module){
    var $ = require('jquery');
    require('utils/utils.slider');
    $(function(){
        /* 调用无缝滚动插件 */
        $('.slider').Slider();
        /* 选项卡 */
        $('.tab_nav i').click(function(){
            var that = $(this),index = that.index();
                that.addClass('cur').siblings('i').removeClass('cur');
                that.parents('h3.block-title')
                    .next('div.tab_content')
                    .children('ul').eq(index)
                    .show().siblings('ul').hide();
        });
    });
});