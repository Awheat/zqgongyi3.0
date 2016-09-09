/* guide_bind.js create by wuwc in 2016-08-18 */
define(function(require,exports,module){
    // 引入依赖js文件
    var $ = require('jquery');require('jquery.validate');
    var utilsForm = require('utils/utils.form.js');
    $(function(){
        // login对象
        var guideBind = {
            formGuide:$('#formGuide'),
            guideStep1:'.step1',
            guideStep2:'.step2',
            guideStep3:'.step3',
            init:function(){

                //初始化表单验证插件
                this.formGuide.validate(this.validatorConfig);
                utilsForm.addValidatorRules('isMobile', utilsForm.regs.mobile, '请输入合法手机号');
                utilsForm.addValidatorRules('isName', utilsForm.regs.username, '请输入合法用昵称');
                //绑定事件函数
                this.bindEvent();
            },
            bindEvent:function(){
                var self = this;
            },
            validatorConfig:{
                ignore:':hidden',
                submitHandler: function (form) {},
                success: function (label) {},
                rules:{
                    telephone:{required:true,isMobile:true},
                    msgcode:{required:true},
                    vdcode:{required:true},
                    username:{required:true,isName:true},
                    newpwd:{required:true},
                    repwd:{required:true,equalTo:"#newpwd"}
                },
                messages:{
                    telephone:{required:"请输入手机号"},
                    msgcode:{required:"请输入验证码"},
                    vdcode:{required:"请出入验证码"},
                    username:{required:"请输入昵称"},
                    newpwd:{required:"请输入新密码"},
                    repwd:{required:"请再次输入新密码",equalTo:"两次输入密码不一致"}
                }
            }
        };
        //初始化login页面
        guideBind.init();
    });
});




