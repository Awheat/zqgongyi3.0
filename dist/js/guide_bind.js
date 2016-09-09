define("guide_bind",["jquery","jquery.validate","utils/utils.form.js"],function(require,exports,module){var $=require("jquery");require("jquery.validate");var e=require("utils/utils.form.js");$(function(){var i={formGuide:$("#formGuide"),guideStep1:".step1",guideStep2:".step2",guideStep3:".step3",init:function(){this.formGuide.validate(this.validatorConfig),e.addValidatorRules("isMobile",e.regs.mobile,"请输入合法手机号"),e.addValidatorRules("isName",e.regs.username,"请输入合法用昵称"),this.bindEvent()},bindEvent:function(){},validatorConfig:{ignore:":hidden",submitHandler:function(e){},success:function(e){},rules:{telephone:{required:!0,isMobile:!0},msgcode:{required:!0},vdcode:{required:!0},username:{required:!0,isName:!0},newpwd:{required:!0},repwd:{required:!0,equalTo:"#newpwd"}},messages:{telephone:{required:"请输入手机号"},msgcode:{required:"请输入验证码"},vdcode:{required:"请出入验证码"},username:{required:"请输入昵称"},newpwd:{required:"请输入新密码"},repwd:{required:"请再次输入新密码",equalTo:"两次输入密码不一致"}}}};i.init()})}),define("utils/utils.form",["jquery"],function(require,exports,module){var $=require("jquery"),e={timer:null,toString:Object.prototype.toString,isArray:function(e){return"[object Array]"===this.toString.call(e)},isString:function(e){return"[object String]"===this.toString.call(e)},isObject:function(e){return"[object Object]"===this.toString.call(e)},isRegEx:function(e){return"[object RegExp]"===this.toString.call(e)},regs:{username:/^[_a-zA-Z0-9\u4E00-\u9FA5]{2,10}$/,mobile:/^1\d{10}$/,email:/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/},countDown:function(e,i){var t=this;e.hasClass("disable")||(e.addClass("disable").attr("disabled","disabled"),this.timer=setInterval(function(){e.text(i+" 秒"),i==-1&&(e.text("获取短信验证码").removeClass("disable").attr("disabled",!1),clearInterval(t.timer)),i--},1e3))},addValidatorRules:function(e,i,t){var r=this,n=!0;$.validator.addMethod(e,function(e,t){if(r.isArray(i)){for(var a=0;a<i.length&&!(n=i[a].test(e));a++);return n}return this.optional(t)||i.test(e)},t)}};module.exports=e});