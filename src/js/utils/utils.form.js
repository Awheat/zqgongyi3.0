/* utils.form.js create by wuwc in 2016-08-18 */
define(function(require,exports,module){
    var $ = require('jquery');
    var form = {
        timer:null,
        toString:Object.prototype.toString,
        isArray:function(v){
            return this.toString.call(v) === '[object Array]';
        },
        isString:function(v){
            return this.toString.call(v) === '[object String]';
        },
        isObject:function(v){
            return this.toString.call(v) === '[object Object]';
        },
        isRegEx:function(v){
            return this.toString.call(v) === '[object RegExp]';
        },
        regs:{
            username:/^[_a-zA-Z0-9\u4E00-\u9FA5]{2,10}$/,
            mobile:/^1\d{10}$/,
            email:/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/
        },
        /* 获取短信验证码的短信倒计时函数 */
        countDown:function(that,second){
            var self = this;
            if(!that.hasClass('disable')){
                that.addClass('disable').attr('disabled','disabled');
                this.timer = setInterval(function(){
                    that.text(second+' 秒');
                    if(second == -1){
                        that.text('获取短信验证码').removeClass('disable').attr('disabled',false);
                        clearInterval(self.timer);
                    }
                    second--;
                },1000);
            }
        },
        /* 自定义验证规则的函数 */
        addValidatorRules:function(props,reg,msg){
            var self = this, flag = true;
            $.validator.addMethod(props, function(value,element) {
                /* 如果是数组循环验证,知道通过 */
                if(self.isArray(reg)){
                    for(var i=0;i<reg.length;i++){
                        flag = reg[i].test(value);
                        if(flag){break;}
                    }
                    return flag;
                }
                return this.optional(element) || (reg.test(value));
            },msg);
        }
    };
    module.exports = form;
});