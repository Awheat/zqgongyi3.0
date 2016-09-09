/* login.js create by wuwc in 2016-08-18 */
define(function (require, exports, module) {
    // 引入依赖js文件
    var $ = require('jquery');
    require('jquery.validate');
    var utilsForm = require('utils/utils.form.js');
    $(function () {
        // login对象 
        var login = {
            dom: {
                loginMain: $('.login-main'),
                formLogin: $('#formLogin'),
                btnComLogin: $('.btn-com-login'),
                btnGetMsgCode: $('.btn-msg'),
                btnRemenber: $('#remember')
            },
            init: function () {
                //调用验证的方法
                this.dom.formLogin.validate(this.validatorConfig);
                utilsForm.addValidatorRules('isUsernameOrPhone', [utilsForm.regs.mobile, utilsForm.regs.username], '请输入合法的用户名或手机号');
                utilsForm.addValidatorRules('isPhone', utilsForm.regs.mobile, '请输入合法的手机号');
                //调用绑定事件函数
                this.bindEvent();
            },
            bindEvent: function () {
                var self = this;
                //切换登录的事件函数
                this.dom.btnComLogin.on('click', function () {
                    var that = $(this),
                        id = that.attr('data-id'),
                        form_title = self.dom.loginMain.find('.form-title'),
                        login_type = that.next('input[type="hidden"]'),
                        tips = {text0: "普通登录", text1: "手机登录"};
                    if (id == 0) {
                        form_title.text(tips.text0);
                        that.text(tips.text1).attr('data-id', '1');
                        login_type.val(0);
                    } else {
                        form_title.text(tips.text1);
                        that.text(tips.text0).attr('data-id', '0');
                        login_type.val(1);
                    }
                    $('.common-login,.message-login').toggleClass('hidden');
                });
                //获取短信验证码事件
                this.dom.btnGetMsgCode.on('click', function () {
                    var that = $(this);
                    $.ajax({
                        url: that.attr('data-url'),
                        type: 'post',
                        dataType: 'json',
                        data: {telephone: $("#telephone").val()},
                        success: function (data) {
                            if (data.status == 1) {
                                utilsForm.countDown(that, 60);
                            } else {
                                $("#msgcode-error").remove();
                                that.parent('p.form-item').append('<label id="msgcode-error" class="error" for="msgcode">' + data.errmsg + '</label>');
                            }
                        }
                    });
                });
            },
            validatorConfig: {
                ignore: ':hidden',
                submitHandler: function (form) {
                    var param = $(form).serialize();
                    //ajax 表单提交
                    $.ajax({
                        url: $(form).attr('data-url'),
                        type: "post",
                        dataType: "json",
                        data: param,
                        success: function (result) {
                            var login_type = $('#logintype').val();
                            //var username = $("#usernameortel");
                            //var password = $("#password");
                           // var telephone = $("#telephone");
                            if (result.errcode === 0) {
                                var returnurl = $(form).attr("data-returnurl");
                                location.href = returnurl;
                                //  console.log('登录成功！');
                            } else if (result.errcode < 0) {
                                //登录错误了
                                var errmsg = result.errmsg;
                                var err_id = "";
                                if (login_type == 1) {
                                    //手机号登录
                                    if (result.errcode == -1) {
                                        err_id = 'telephone';
                                    } else {
                                        err_id = 'msgcode';
                                    }

                                } else if (login_type == 0) {
                                    //普通登录
                                    if (result.errcode == -1) {
                                        err_id = 'usernameortel';
                                    } else {
                                        err_id = 'password';
                                    }
                                }
                                $("#" + err_id + "-error").text(errmsg).show();
                            }
                        }
                    });
                },
                errorPlacement: function (error, element) {
                    error.appendTo(element.parent());
                },
                success: function (label) {
                    if (label[0].getAttribute('for') === 'telephone') {
                        $('button.disable').removeClass('disable');
                    }
                },
                rules: {
                    usernameortel: {required: true, isUsernameOrPhone: true},
                    password: {required: true},
                    telephone: {required: true, isPhone: true},
                    msgcode: {
                        required: true,
                        remote: {
                            url: $("#msgcode").attr('data-url'),
                            type: "post",
                            data: {
                                msgcode: function () {
                                    return $("#msgcode").val();
                                }
                            }
                        }
                    }
                },
                messages: {
                    usernameortel: {required: "请输入用户名/手机号"},
                    password: {required: "请输入密码"},
                    telephone: {required: "请输入手机号"},
                    msgcode: {required: "请输入短信验证码", remote: "短信验证码错误"}
                }
            }
        };
        //初始化login页面
        login.init();
    });
});