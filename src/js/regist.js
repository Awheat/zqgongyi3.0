/* regist.js create by wuwc in 2016-08-18 */
define(function (require, exports, module) {
    //引入依赖js文件
    var $ = require('jquery');
    require('jquery.validate');
    var utilsForm = require('utils/utils.form.js');

    $(function () {
        var regist = {
            dom: {
                formRegist: $('#formRegist'),
                btnGetMsgCode: $('.btn-msg')
            },
            init: function () {
                //调用验证的方法
                this.dom.formRegist.validate(this.validatorConfig);
                utilsForm.addValidatorRules('isMobile', utilsForm.regs.mobile, '请输入合法手机号');
                utilsForm.addValidatorRules('isName', utilsForm.regs.username, '请输入合法用户名');
                //调用函数绑定事件
                this.bindEvent();
            },
            bindEvent: function () {
                //获取短信验证码的处理函数
                this.dom.btnGetMsgCode.on('click', function () {
                    var that = $(this);
                    $.ajax({
                        url: that.attr('data-url'),
                        type: 'post',
                        dataType: 'json',
                        data: {telephone: $('#telephone').val()},
                        success: function (data) {
                            if (data.errcode >= 0) {
                                utilsForm.countDown(that, 60);
                            } else {
                                var msgcode_error = $("#msgcode-error");
                                if (msgcode_error.length == 0) {
                                    $("#msgcode").parent().append("<label id=\"msgcode-error\" class=\"error\" for=\"msgcode\"></label>");
                                    msgcode_error = $("#msgcode-error");
                                }
                                msgcode_error.text(data.errmsg).show();
                                // that.parent('p.form-item').append('<label id="msgcode-error" class="error" for="msgcode">短信验证码发送失败</label>');
                            }
                        }
                    });

                });
            },
            validatorConfig: {
                ignore: ':hidden',
                onkeyup: false,
                submitHandler: function (form) {
                    var param = $(form).serialize();
                    alert(param);
                    $.ajax({
                        url: $(form).attr('data-url'),
                        type: "post",
                        dataType: "json",
                        data: param,
                        success: function (result) {
                            console.log(result);
                        }
                    });
                },
                errorPlacement: function (error, element) {
                    error.appendTo(element.parent());
                },
                success: function (label) {
                    if (label[0].getAttribute('for') === 'telephone') {
                        regist.dom.btnGetMsgCode.removeClass('disable');
                        regist.dom.btnGetMsgCode.removeAttr("disabled");
                    }
                },
                showErrors: function (errorMap, errorList) {
                    console.log(errorList.length);
                    this.defaultShowErrors();
                    if (errorList.length == 0) {
                        return;
                    }
                    var ele = errorList[0].element;
                    var id = $(ele).attr("id");

                    if (id == "telephone") {
                        regist.dom.btnGetMsgCode.attr("disabled", 'disabled').addClass('disable');
                    }
                },
                rules: {
                    telephone: {required: true, isMobile: true},
                    msgcode: {
                        required: true
                    },
                    username: {
                        required: true,
                        rangelength: [2, 10],
                        isName: true,
                        remote: {
                            url: $('#username').attr('data-url'),
                            type: "post",
                            data: {
                                username: function () {
                                    return $("#username").val();
                                }
                            }
                        }
                    },
                    password: {required: true, rangelength: [6, 16]},
                    repassword: {required: true, rangelength: [6, 16], equalTo: "#password"},
                    vdcode: {
                        required: true,
                        remote: {
                            url: $('#vdcode').attr('data-url'),
                            type: "post",
                            data: {
                                vdcode: function () {
                                    return $("#vdcode").val()
                                }
                            }
                        }
                    },
                    isagree: {required: true}
                },
                messages: {
                    telephone: {required: "手机号不能为空"},
                    msgcode: {required: "短信验证码不能为空", remote: "短信验证码错误"},
                    username: {
                        required: "昵称不能为空",
                        rangelength: $.validator.format("请输入{0}至{1}个中文字符"),
                        remote: "此昵称已被注册"
                    },
                    password: {required: "密码不能为空", rangelength: $.validator.format("请输入{0}至{1}位密码")},
                    repassword: {
                        required: "密码不能为空",
                        rangelength: $.validator.format("请再次输入{0}至{1}位密码"),
                        equalTo: "两次输入密码不一致"
                    },
                    vdcode: {
                        required: "验证码不能为空", remote: "验证码错误"
                    },
                    isagree: {required: "未同意相关服务条款"}
                }
            }
        };
        //初始化regist页面
        regist.init();
    });
});