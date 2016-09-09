/* index.js create by wuwc in 2016-08-29 */
define(function(require, exports, module){
    var $ = require('jquery');
    require('utils/utils.slider');
    require('utils/utils.column.slider');

    $(function(){
        /* 调用无缝滚动插件 */
        $('.slider').Slider();
        /* 调用滚动插件 */
        $('.gy-organization').ColumnSlider({
            loop:true,
            autoPlay:true
        });
        /* 调用滚动插件 */
        $('.gy-business').ColumnSlider();
    });
});