define("contribute",["jquery","jquery.validate","libs/kindeditor-min","libs/zh_CN"],function(require,exports,module){var $=require("jquery");require("jquery.validate"),require("libs/kindeditor-min"),require("libs/zh_CN"),KindEditor.ready(function(e){window.editor=e.create("#article_content",{afterBlur:function(){this.sync()}})}),$(function(){var e={init:function(){$("#editArticleForm").validate(this.validatorConfig),this.events()},events:function(){var e=$(".contr-type"),i=e.next('input[name="article_type"]');e.on("click","span",function(){$(this).toggleClass("active").siblings("span").removeClass("active"),i.val(e.find("span.active").attr("data-type"))})},validatorConfig:{ignore:"",submitHandler:function(e){e.submit()},errorPlacement:function(e,i){e.appendTo(i.next(".error"))},rules:{article_title:{required:!0},article_content:{required:!0},article_type:{required:!0},article_yzcode:{required:!0}},messages:{article_title:{required:"请输入文章标题"},article_content:{required:"请输入正文类容"},article_type:{required:"请选择稿件类型"},article_yzcode:{required:"请输入验证码"}}}};e.init()})});