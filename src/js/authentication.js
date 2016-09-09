/* authentication.js create by wuwc in 2016-08-18 */
define(function(require,exports,module){
    // 引入依赖js文件
    var $ = require('jquery');
    require('jquery.validate');
    require('distpicker');
    var utilsForm = require('utils/utils.form.js');
    $(function(){
        // settingPhoto对象
        var authentication = {
            init:function(){
                /* 初始化变量 */
                this.formAuthentication = $("#formAuthentication");
                this.formSphere = $('.form-sphere');
                this.formHiddenSphere = $('input[name="sphere');
                this.formRadio = $('input[name="authways"]');

                /*调用选择地址插件*/
                $('.distpicker').distpicker();

                /*调用表单验证插件*/
                this.formAuthentication.validate(this.validatorConfig);
                var iswebsite = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
                utilsForm.addValidatorRules('isWebSite',iswebsite, '请输入合法网址');
                utilsForm.addValidatorRules('ckLength',/^[_a-zA-Z0-9\u4E00-\u9FA5]{0,500}$/, '请输1-500字符的内容');


                this.bindEvent();

            },
            bindEvent:function(){
                var self = this;
                //选择领域的效果
                this.formSphere.on('click', 'i[data-id]', function () {
                    $('#sphere-error').text('');
                    $(this).toggleClass('chk');
                    self.reloadSphereValue();
                });

                //选择认证方式
                this.formRadio.on('click',function(){
                    var that = $(this),type = that.attr('data-type');
                    $('.auth-ways'+type).show().siblings('div').hide();
                });

                //立即认证按钮
                $('.auth-status').on('click','button.btn',function(){
                    var that = $(this);
                    that.parents('div.block').addClass('hidden').siblings('div').removeClass('hidden');
                });
            },
            validatorConfig: {
                ignore: '',
                onkeyup: false,
                submitHandler: function (form) {},
                success: function (label) {},
                rules: {
                    username: {required: true},
                    county:{required:true},
                    sphere:{required:true},
                    officsite:{isWebSite:true},
                    introduct:{ckLength:true},
                    realname:{required:true},
                    cardnumber:{required:true},
                    email:{email:true}
                },
                messages: {
                    username: {required: "名称不能为空"},
                    county:{required:"请选择常住地址"},
                    sphere:{required:"请选择关注领域"},
                    realname:{required:"请输入真实姓名"},
                    cardnumber:{required:"请输入证件号码"},
                    email:{email:"请输入合法的邮箱"}
                }
            },
            /* 重新加载关注领域的值 */
            reloadSphereValue: function () {
                var saveSphereValue = [],sphere = this.formSphere.find('i.chk'),sphere_err=$("#sphere-error");
                if(sphere.size() == 0){
                    sphere_err.remove();
                    $('.form-sphere').append('<label id="sphere-error" class="error" for="msgcode">请选择关注领域</label>');
                }else{
                    sphere_err.text("");
                }
                sphere.each(function () {
                    saveSphereValue.push($(this).text());
                });
                this.formHiddenSphere.val(saveSphereValue);
            }
        };

        //初始化login页面
        authentication.init();
    });
});












//formAuthentication:$('#formAuthentication'),
//    init:function(){
//    $('.distpicker').distpicker();
//
//    this.formSphere = $('.form-sphere');
//    this.formHiddenSphere = $('input[name="sphere');
//
//    var iswebsite = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
//    //调用验证的方法
//    this.formAuthentication.validate(this.validatorConfig);
//    utilsForm.addValidatorRules('isWebSite',iswebsite, '请输入合法网址');
//    utilsForm.addValidatorRules('ckLength',/^[_a-zA-Z0-9\u4E00-\u9FA5]{0,500}$/, '请输1-500字符的内容');
//    //绑定事件函数
//    this.bindEvent();//
//},
//bindEvent:function(){
//    var self = this;
//    //选择领域的效果
//    this.formSphere.on('click', 'i[data-id]', function () {
//        $('#sphere-error').text('');
//        $(this).toggleClass('chk');
//        self.reloadSphereValue();
//    });
//},
//validatorConfig: {
//    //ignore: ':hidden',
//    onkeyup: false,
//        submitHandler: function (form) {},
//    errorPlacement: function (error, element) {
//        error.appendTo(element.parent());
//    },
//    success: function (label) {},
//    showErrors: function (errorMap, errorList) {
//        console.log(errorList.length);
//        this.defaultShowErrors();
//        if (errorList.length == 0) {
//            return;
//        }
//        var ele = errorList[0].element;
//        var id = $(ele).attr("id");
//
//        if (id == "telephone") {
//            regist.dom.btnGetMsgCode.attr("disabled", 'disabled').addClass('disable');
//        }
//    },
//    rules: {
//        username: {required: true,isName:true},
//        county:{required:true},
//        sphere:{required:true},
//        officsite:{isWebSite:true},
//        introduct:{ckLength:true},
//        realname:{required:true},
//        cardnumber:{required:true},
//        email:{email:true}
//    },
//    messages: {
//        username: {required: "名称不能为空"},
//        county:{required:"请选择常住地址"},
//        sphere:{required:"请选择关注领域"},
//        realname:{required:"请输入真实姓名"},
//        cardnumber:{required:"请输入证件号码"},
//        email:{email:"请输入合法的邮箱"}
//    }
//},
///* 重新加载关注领域的值 */
//reloadSphereValue: function () {
//    var saveSphereValue = [],sphere = this.formSphere.find('i.chk'),sphere_err=$("#sphere-error");
//    if(sphere.size() == 0){
//        sphere_err.remove();
//        $('.form-sphere').append('<label id="sphere-error" class="error" for="msgcode">请选择关注领域</label>');
//    }else{
//        sphere_err.text("");
//    }
//    sphere.each(function () {
//        saveSphereValue.push($(this).text());
//    });
//    this.formHiddenSphere.val(saveSphereValue);
//}
