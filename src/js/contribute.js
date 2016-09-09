/* contribute.js create by wuwc in 2016-08-29 */
define(function(require, exports, module){
    var $ = require('jquery');
    require('jquery.validate');
    require('libs/kindeditor-min');
    require('libs/zh_CN');

    KindEditor.ready(function(K) {
        window.editor = K.create('#article_content',{
            afterBlur: function(){this.sync();}
        });
    });


    $(function(){
        var contribute = {
            init:function(){
                $('#editArticleForm').validate(this.validatorConfig);
                this.events();
            },
            events:function(){
                /* 选择投稿类型 */
                var a = $('.contr-type'),b = a.next('input[name="article_type"]');
                    a.on('click','span',function(){
                        $(this).toggleClass('active').siblings('span').removeClass('active');
                        b.val(a.find('span.active').attr('data-type'));
                    });
            },
            validatorConfig: {
                ignore: '',
                submitHandler: function (form) {
                    form.submit();
                },
                errorPlacement: function (error, element) {
                    error.appendTo(element.next('.error'));
                },
                rules: {
                    article_title: {required: true},
                    article_content: {required: true},
                    article_type: {required: true},
                    article_yzcode: {required: true}
                },
                messages: {
                    article_title: {required: "请输入文章标题"},
                    article_content: {required: "请输入正文类容"},
                    article_type: {required: "请选择稿件类型"},
                    article_yzcode:{required: "请输入验证码"}
                }
            }
        };
        contribute.init();
    });
});