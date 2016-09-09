/**
 * Created by zhangzg on 2016/9/2.
 */
/* login.js create by wuwc in 2016-08-18 */
define(function (require, exports, module) {
    // 引入依赖js文件
    var $ = require('jquery');
    require('jquery.validate');

    var utilsForm = require('utils/utils.form.js');
    $(function () {
        /**
         * 编辑用户基本信息表单
         *
         */
        var editBaseInfo = {
            isAjax: false,
            init: function () {
                var self = this;
                //编辑的字段
                self.editfields = {
                    sphere: $('.form-sphere')
                };
                self.formBaseInfo = $('.form'); 
                self.formHiddenSphere = $('#category');

                self.formBaseInfo.validate(this.validatorConfigOne);
                var iswebsite = /^(https?|ftp):\/\/[^\s]+$/i;
                utilsForm.addValidatorRules('isWebSite', iswebsite, '请输入合法网址');
                utilsForm.addValidatorRules('ckLength', /^[_a-zA-Z0-9\u4E00-\u9FA5]{0,500}$/, '请输1-500字符的内容');
                self.bindEvent();
                self.editBaseInfo();
            },
            validatorConfigOne: {
                ignore: '',
                onkeyup: false,
                submitHandler: function (form) {
                    myInfo.submit(form);
                },
                success: function (label) {
                },
                rules: {
                    countyid: {required: true},
                    category: {required: true},
                    web_url: {isWebSite: true},
                    summary: {ckLength: true}

                },
                messages: {
                    countyid: {required: "请选择常住地址"},
                    category: {required: "请选择关注领域"}
                }
            },
            bindEvent: function () {
                
                var self = this;
                //选择领域的效果
                this.editfields.sphere.on('click', 'i[data-id]', function () {
                    $('#sphere-error').text('');//点击之后说明当前已有选择，则隐藏错误提示消息
                    $(this).toggleClass('chk');
                    self.reloadSphereValue();

                });

                if (window.AjaxUpload) {
                    window.upload = function () {
                        var loadBtn = ['logo'];
                        $.each(loadBtn, function (index, ele) {
                            var button = $('#btn-upload_' + ele), interval;
                            var url = button.attr("data-url");
                            new AjaxUpload(button, {
                                name: 'img_file_' + ele,
                                action: url,
                                onSubmit: function (file, ext) {
                                    if (!(ext && /^(jpg|JPG|png|PNG|jpeg|JPEG)$/.test(ext))) {
                                        alert("您上传的图片格式不对，请重新选择！");
                                        return false;
                                    }

                                    $('#image-preview_' + ele).attr('src', load).show();
                                },
                                onComplete: function (file, response) {
                                    var obj = eval("(" + response + ")");
                                    if (obj.status === 0) {
                                        alert(obj.info);
                                    }
                                    $('#image-preview_' + ele).attr('src', obj.url);
                                    $("input[name='" + ele + "']").val(obj.imgName);
                                    window.upload();

                                }
                            });
                        });
                    };
                    window.upload();
                }



            },
            /* 重新加载关注领域的值 */
            reloadSphereValue: function () {
                var saveSphereValue = [];
                this.editfields.sphere.find('i.chk').each(function () {
                    saveSphereValue.push($(this).text());
                });
                this.formHiddenSphere.val(saveSphereValue);
            },

            /* 根据空格分隔返回数据函数 */
            splitBySpace: function (v) {
                return v.split(/[,\n\s]/g);
            },

            editBaseInfo: function () {

                var sphere = $('#category').val().split(',');
                this.setSphere(sphere);

            },

            /* 设置领域 */
            setSphere: function (s) {
                var self = this, s = s || [];
                self.formHiddenSphere.val(s);//值设置到隐藏域里面

                for (var i = 0, len = s.length; i < len; i++) {
                    //$(sphere[i]).addClass('chk');
                    this.editfields.sphere.find('i[data-id]:contains("' + s[i] + '")').addClass('chk');
                }
            }
        };
        var editRealInfo = {
            isAjax: false,
            init: function () {
                this.formRealInfo = $('form');
                this.realInfo = {
                    name: $('.sw_realname').text(),
                    value: $('.sw_cardtype').attr('data-id'),
                    number: $('.sw_cardnum').text()
                };
                this.formRealInfo.validate(this.validatorConfigTwo);
                this.validatorCardNumByType();
            },
            validatorConfigTwo: {
                ignore: ":hidden",
                onkeyup: false,
                rules: {
                    contact: {required: true},
                    idcard: {required: true,
                        isCreditCode: true},
                    mail: {email: true}

                },
                messages: {
                    contact: {required: "请输入真实姓名"},
                    idcard: {required: "请输入证件号码",isCreditCode:"身份证错误"},
                    mail: {email: "请输入合法的邮箱"}
                },
                submitHandler: function (form) {
                    myInfo.submit(form);
                }
            },
            validatorCardNumByType: function () {
                var util = {
                    //滤除空格
                    trimCenter: function (_str) {
                        var result = _str.replace(/(^\s*)|(\s*$)/g, "");
                        return result.replace(/\s/g, "");
                    },
                    //判断文本框是否必填
                    requiredJudge: function (_value, _element) {
                        var reObj = $(_element).attr("aria-required");
                        if (("undefined" == typeof Obj) && ("" == _value)) return true;
                    }
                };
                /**
                 *证件号码验证
                 */
                $.validator.addMethod("isCreditCode", function (_value, _element) {
                    if (util.requiredJudge(_value, _element)) return true;
                    var selectedVal = $("#cardtype").find('option:selected').html();
                    if ("身份证" == selectedVal) {
                        return creditCode.creditIdCode(_value);
                    } else if ("护照" == selectedVal) {
                        return creditCode.passportCode(_value);
                    }
                }, "请输入有效的证件号");
                var creditCode = {
                    "creditIdCode": function (_value) {
                        var Wi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1]; // 加权因子
                        var ValideCode = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2];  // 身份证验证位值.10代表X

                        var idCard = util.trimCenter(_value); //去掉字符串头尾空格
                        if (idCard.length != 18) {
                            return false;
                        }
                        var a_idCard = idCard.split(""); // 得到身份证数组

                        /**
                         * 判断身份证号码为18位时最后的验证位是否正确
                         */
                        var sum = 0; // 声明加权求和变量
                        if (a_idCard[17].toLowerCase() == 'x') {
                            a_idCard[17] = 10; // 将最后位为x的验证码替换为10方便后续操作
                        }
                        for (var i = 0; i < 17; i++) {
                            sum += Wi[i] * a_idCard[i]; // 加权求和
                        }

                        valCodePosition = sum % 11; // 得到验证码所位置
                        if (a_idCard[17] == ValideCode[valCodePosition]) {
                            var year = idCard.substring(6, 10);
                            var nowYear = new Date();
                            nowYear = nowYear.getFullYear();
                            if (nowYear - year >= 120) {
                                return false;
                            } else {
                                return true;
                            }
                        } else {
                            return false;
                        }
                    }, "passportCode": function (_value) {
                        var regexp = new RegExp('^[a-zA-Z][0-9.]{7,9}$');
                        return regexp.test(util.trimCenter(_value));
                    }
                }
            }
        };
        var myInfo = {
            btnEdit: $('.btn-edit'),
            isAjax: false,
            init: function () {
                //绑定事件函数
                this.bindEvent();
            },
            bindEvent: function () {
                var self = this;
                /*
                 * 一，编辑基本信息
                 * */
                this.btnEdit.on("click", function () {

                    var that = $(this);
                    var url = that.attr('data-url');
                    var type = that.attr('data-type');
                    var parentor = that.attr('data-parent');
                    var form = {
                        'baseinfo': editBaseInfo,
                        'realinfo': editRealInfo
                    };
                    var parent = $("." + parentor);
                    if (type == 0) {
                        if($('.info-edit').length>0){
                            return;
                        }
                        if (self.isAjax) {
                           return;
                        }
			 self.isAjax = true;
                        //当前为显示状态 切换为编辑状态
                        $.post(url, function (html) {
                            parent.find('.info-show').hide();
                            parent.append(html);
                            that.attr('data-type', 1);
                            form[parentor].init();
                            self.isAjax = false;
                        });
                    } else {
                        //当前为编辑状态，取消编辑状态，切换为显示状态
                        parent.find('.info-show').show();
                        parent.find(".info-edit").remove();
                        that.attr('data-type', 0);
                    }
                });
                $(".ucenter-content").delegate(".cancel-edit", "click", function () {
                    var that = $(this);
                    that.parents('div.block').find("i.btn-edit").click();
                });
            },
            submit: function (form) {
                var that = $(form);
                var param = that.serialize();
                var url = that.attr('data-url');
                $.ajax({
                    url: url,
                    data: param,
                    dataType: 'json',
                    type: 'post',
                    success: function (data) {
                        var errcode = data.errcode;
                        if (errcode >= 0) {
                            var type = data.type;
                            //$type

                            var baseInfo = type == 0 ? $('.baseinfo') : $('.realinfo');

                            //成功
                            var con = data.content;
                            baseInfo.find('.info-show').remove();
                            baseInfo.find('.info-edit').remove();
                            baseInfo.append(con);
                            baseInfo.find('.btn-edit').attr('data-type', '0');

                        } else {
                            alert(data.errmsg);
                        }
                    }
                })
            }

        };
        //初始化login页面
        myInfo.init();
    });
});




