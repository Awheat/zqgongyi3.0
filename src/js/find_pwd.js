/* login.js create by wuwc in 2016-08-18 */
define(function (require, exports, module) {
    // 引入依赖js文件
    var $ = require('jquery');
    require('jquery.validate');
    var utilsForm = require('utils/utils.form.js');
    $(function () {
        // login对象
        var findPwd = {
            dom: {
                formFindPwdOne: $("#formFindPwdOne"),
                formFindPwdTwo: $("#formFindPwdTwo"),
                formFindPwdThree: $("#formFindPwdThree"),
                btnGetMsgCode: $('.btn-msg')
            },
            isajax:false,
            init: function () {
                //调用验证的方法
                this.dom.formFindPwdOne.validate(this.validatorConfigOne);
                this.dom.formFindPwdTwo.validate(this.validatorConfigTwo);
                this.dom.formFindPwdThree.validate(this.validatorConfigThree);
                utilsForm.addValidatorRules('isUsernameOrPhone', [utilsForm.regs.mobile, utilsForm.regs.username], '请输入合法的昵称或手机号');
                //调用事件绑定函数
                this.bindEvent();
            },
            bindEvent: function () {
                var self=this;
                //获取短信验证码的按钮事件
                this.dom.btnGetMsgCode.showError=function(result){
                    var label=$('#msgcode-error');
                    if(label.length==0){
                        $('#msgcode').after('<label id="msgcode-error" class="error" for="msgcode"></label>');
                        label=$('#msgcode-error');
                    }
                    if(result.errcode>=0){
                        label.text('');
                    }else{

                    label.text(result.errmsg).show();

                    }
                };
                this.dom.btnGetMsgCode.on('click', function () {
                    if(self.isajax){
                        return;
                    }
                    self.isajax=true;
                    var that=$(this);
                    var url=that.attr('data-url');
                    $.post(url,function(result){
                        self.isajax=false;
                        var errcode=result.errcode;

                        self.dom.btnGetMsgCode.showError(result);
                        if(errcode>=0){
                            utilsForm.countDown(that, 60);
                        }
                    });
                });
            },
            validatorConfigOne: {
                onkeyup: false,
                rules: {
                    usernameortel: {required: true, isUsernameOrPhone: true},
                    vdcode: {
                        required: true,
                        remote: function () {
                            return $('#vdcode').attr('data-url');
                        }
                    }
                },
                messages: {
                    usernameortel: {required: "请输入手机号或者用户名"},
                    vdcode: {
                        required: "请输入验证码",
                        remote:"验证码错误"
                    }
                },
                submitHandler:function(form){
                    var that=$(form);
                    var param=that.serialize();
                    var url=that.attr('data-url');
                    $.ajax({
                        url:url,
                        data:param,
                        type:'post',
                        dataType:'json',
                        success:function(result){
                            var errcode=result.errcode;
                            if(errcode <0){
                                var errmsg=result.errmsg;
                                var err={'-1':'usernameortel','-2':'vdcode'};
                                var selector=err[errcode]+'-error';
                                var label=$('#'+selector);
                                if(label.length==0){
                                    $("#"+err[errcode]).after('<label id="'+err[errcode]+'-error" class="error" for="'+err[errcode]+'"></label>');
                                    label=$('#'+selector);
                                }
                                label.text(errmsg).show();
                            }else{
                                form.submit();
                            }
                        }
                    });
                }
            },
            validatorConfigTwo: {
                rules: {msgcode: {required: true}},
                messages: {msgcode: {required: "请输入短信验证码"}},
                submitHandler:function(form){
                    var self=this;
                    if(self.isajax){
                        return;
                    }
                    self.isajax=true;
                    var that=$(form);
                    var url=that.attr('data-url');
                    var code=$('#msgcode').val();
                    $.ajax({
                        url:url,
                        data:{code:code},
                        dataType:'json',
                        type:'post',
                        success:function(result){
                            var errcode=result.errcode;
                            findPwd.dom.btnGetMsgCode.showError(result);
                            if(errcode<0){
                                self.isajax=false;
                            }else{
                                form.submit();
                            }
                        }
                    });
                }
            },
            validatorConfigThree: {
                rules: {
                    newpassword: {required: true, rangelength: [6, 32]},
                    repassword: {required: true, equalTo: "#newpassword"}
                },
                messages: {
                    newpassword: {required: "请输入新密码", rangelength: $.validator.format("请输入{0}至{1}位新密码")},
                    repassword: {required: "请再次输入新密码", equalTo: "两次密码不一致"}
                }
            }
        };
        //初始化login页面
        findPwd.init();
    });
});