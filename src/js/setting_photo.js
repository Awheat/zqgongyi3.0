/* setting_photo.js create by wuwc in 2016-08-18 */
define(function(require,exports,module){
    // 引入依赖js文件
    var $ = require('jquery');require('libs/jquery.Jcrop.min.js');
    var utilsForm = require('utils/uploadjs');
    $(function(){

        // settingPhoto对象
        var settingPhoto = {
            formLoginPwd:$('#formLoginPwd'),
            formLoginPhone:$('#formLoginPhone'),
            init:function(){

                //绑定事件函数
                this.bindEvent();
            },
            bindEvent:function(){

            }
        };
        //初始化login页面
        settingPhoto.init();
    });
});
