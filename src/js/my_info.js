/* login.js create by wuwc in 2016-08-18 */
define(function(require,exports,module){
    // 引入依赖js文件
    var $ = require('jquery');
    require('jquery.validate');
    require('distpicker');
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
                    name: $('#username'),
                    gender: $('.form-gender'),
                    address: $('.distpicker'),
                    sphere: $('.form-sphere'),
                    skills: $('.list-skills')
                };
                self.formBaseInfo = $('#formBaseInfo');
                self.btnAddLabel = $('.btn-add-skill');
                self.formHiddenGender = $('input[name="gender');
                self.formHiddenSphere = $('input[name="sphere');
                self.formHiddenSkills = $('input[name="skills');

                self.formBaseInfo.validate(this.validatorConfigOne);
                self.bindEvent();
                self.editBaseInfo();
            },
            validatorConfigOne: {
                ignore: "",
                rules: {
                    username: {required: true},
                    sphere: {required: true},
                    county: {required: true}
                },
                messages: {
                    username: {required: "请输入昵称"},
                    sphere: {required: "请选择关注领域"},
                    county: {required: "请选择"}
                },
                submitHandler: function (form) {
                    myInfo.submit(form);
                }
            },
            bindEvent: function () {
                //选择性别的效果
                var self = this;
                this.editfields.gender.on('click', 'span.radio', function () {
                    var that = $(this);
                    that.addClass('cur').siblings('span').removeClass('cur');
                    self.formHiddenGender.val(that.attr('data-gid'));
                });
                //选择领域的效果
                this.editfields.sphere.on('click', 'i[data-id]', function () {
                    $('#sphere-error').text('');//点击之后说明当前已有选择，则隐藏错误提示消息
                    $(this).toggleClass('chk');
                    self.reloadSphereValue();

                });
                /*
                 * 添加技能标签
                 * 1.获取新添加的技能标签
                 * 2.判断在新添加之前有没有技能标签如果有的话，
                 *   将两个标签数组合并放到技能标签的form隐藏域里面
                 * */
                this.btnAddLabel.on('click', function () {
                    var that = $(this), a = that.prev('input'), b = new Array(), c = self.formHiddenSkills.val();
                    if (a.val() != '') {
                        var newSkill = a.val().split(/[,\n\s]/g);
                        if (c !== '') {
                            b = c.split(',').concat(newSkill)
                        } else {
                            b = newSkill;
                        }
                        self.setSkills(b);
                        a.val('');
                    }
                });
                //删除技能标签
                this.editfields.skills.on('click', 'i', function () {
                    $(this).parent().remove();
                    self.reloadSkillsValue();
                });

                $(".distpicker > select").on('change', function () {
                    var that = $(this);
                    var type = that.attr("data-type");
                    if (type == 3) {
                        return;
                    }

                    var c = that.next();
                    c.html('<option value="">--请选择--</option>');
                    if (type == 1) {
                        c.next().html('<option value="">--请选择--</option>');
                    }
                    var val = that.val();
                    if (val == 0) {
                        return;
                    }
                    var url = that.parent().attr("data-url");

                    $.getJSON(url, {parent_id: val}, function (data) {
                        var p = ['<option value="">--请选择--</option>'];
                        $.each(data, function (i, n) {
                                if (!n.id) {
                                    return;
                                }
                                p.push('<option value="' + n.id + '">' + n.class_name + '</option>')
                            }
                        );
                        c.html(p.join(''));

                    });
                });
            },
            /* 重新加载关注领域的值 */
            reloadSphereValue: function () {
                var saveSphereValue = [];
                this.editfields.sphere.find('i.chk').each(function () {
                    saveSphereValue.push($(this).text());
                });
                this.formHiddenSphere.val(saveSphereValue);
            },
            /* 重新加载技能标签的值 */
            reloadSkillsValue: function () {
                var saveSkillsValue = [];
                this.editfields.skills.find('span').each(function () {
                    saveSkillsValue.push($(this).text());
                });
                this.formHiddenSkills.val(saveSkillsValue);
            },
            /* 根据空格分隔返回数据函数 */
            splitBySpace: function (v) {
                return v.split(/[,\n\s]/g);
            },
            /* 设置技能 */
            setSkills: function (s) {
                var s = s || [], self = this;
                self.formHiddenSkills.val(s);//值设置到隐藏域里面
                self.editfields.skills.html('');
                for (var i = 0, len = s.length; i < len; i++) {
                    if (s[i] !== '') {
                        self.editfields.skills.append('<span>' + s[i] + '<i></i></span>');
                    }
                }
            },
            editBaseInfo: function () {
                var gender = $('.form-gender').attr('data-val');
                gender = gender != 1 && gender != 2 ? 1 : gender;
                //2.性别
                this.setGender(gender);
                //4.领域
                var sphere = $('.form-sphere').attr('data-val').split(',');
                this.setSphere(sphere);
                //5.技能
                var skills = $('.form-skills').attr('data-val').split(',');
                this.setSkills(skills);
                this.setProvince();
            },
            /* 设置性别 */
            setGender: function (n) {
                var n = n || 0, ipt_radio = this.editfields.gender.find('span.radio');
                $(ipt_radio[n-1]).addClass('cur').siblings('span').removeClass('cur');
                this.formHiddenGender.val(n);//值设置到隐藏域里面
            },
            /* 设置领域 */
            setSphere: function (s) {
                var self = this, s = s || [];//, sphere = this.editfields.sphere.find('i[data-id]');

                self.formHiddenSphere.val(s);//值设置到隐藏域里面

                for (var i = 0, len = s.length; i < len; i++) {
                    //$(sphere[i]).addClass('chk');
                    this.editfields.sphere.find('i[data-id]:contains("' + s[i] + '")').addClass('chk');
                }
            },

            setProvince: function () {
                var province = $('select[name="province"]');
                var val = province.attr('data-val');
                province.val(val);

                var city = $('select[name="city"]');
                var val = city.attr('data-val');
                city.val(val);

                var county = $('select[name="county"]');
                var val = county.attr('data-val');
                county.val(val);
            }
        };
        var editRealInfo = {
            isAjax: false,
            init: function () {
                this.formRealInfo = $('#formRealInfo');
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
                    realname: {required: true},
                    cardnumber: {
                        required: true,
                        isCreditCode: true,
                        remote: function () {
                            var a = $("#cardnumber").attr('data-url');

                            return a;
                        }
                    }

                },
                messages: {
                    realname: {required: "请输入真实姓名"},
                    cardnumber: {required: "请输入证件号码",remote:"身份证已经被使用"}
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
                        if (self.isAjax) {
                            self.isAjax = true;
                        }
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




