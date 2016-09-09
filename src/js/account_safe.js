/* account_safe.js create by wuwc in 2016-08-18 */
define(function(require,exports,module){
    // 引入依赖js文件
    var $ = require('jquery');require('jquery.validate');
    var utilsForm = require('utils/utils.form.js');
    $(function(){
        // login对象
        var accountSafe = {
            formLoginPwd:$('#formLoginPwd'),
            formLoginPhone:$('#formLoginPhone'),
            init:function(){

                //初始化表单验证插件
                this.formLoginPwd.validate(this.validatorConfigOne);
                this.formLoginPhone.validate(this.validatorConfigTwo);
                //绑定事件函数
                this.bindEvent();
            },
            bindEvent:function(){
                var self = this;
                /* 点击修改密码 */
                $('.btn-update-pwd').on('click',function(){
                    $('.login-pwd').removeClass('hidden').siblings('div').addClass('hidden');
                });
                /* 点击修改手机号 */
                $('.btn-update-tel').on('click',function(){
                    $('.login-tel').removeClass('hidden').siblings('div').addClass('hidden');
                });
            },
            validatorConfigOne:{
                ignore: ':hidden',
                onkeyup:false,
                submitHandler: function (form) {

                },
                rules:{
                    curpwd:{
                        required:true,
                        remote:function(){
                            return $('#curpwd').attr('data-url');
                        }
                    },
                    newpwd:{
                        required:true, rangelength: [6, 16]
                    },
                    repwd:{
                        required:true,equalTo: "#newpwd"
                    }
                },
                messages:{
                    curpwd:{required:"请输入当前密码",remote:"当前密码错误"},
                    newpwd:{required:"请输入新密码"},
                    repwd:{required:"请再次输入新密码",equalTo:"两次输入密码不一致"}
                }
            },
            validatorConfigTwo:{
                ignore:":hidden",
                submitHandler: function (form) {
                },
                rules:{
                    curphone:{required:true},
                    newphone:{required:true},
                    msgcode:{required:true},
                    vdcode:{required:true}
                },
                messages:{
                    curphone:{required:"请输入当前手机号"},
                    newphone:{required:"请输入新手机号"},
                    msgcode:{required:"请输入短信验证码"},
                    vdcode:{required:"请输入验证码"}
                }
            }

        };
        //初始化login页面
        accountSafe.init();
    });
});




