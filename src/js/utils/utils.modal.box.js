/* utils.modal.box.js create by wuwc in 2016-09-07 */
define(function(require, exports, module) {
    var $ = require('jquery');

    $.fn.extend({
        ModalBox:function(options){
            return this.each(function(){
                new ModalBox(this,options);
            });
        }
    });
    /* 模态框-构造函数 */
    function ModalBox(element,options){
        this.options = $.extend({},ModalBox.DEFAULTS,options);
        this.elem = $(element);
        this.body = $('body');

        this.init();
    }
    /*
    *默认参数
    *
    * */
    ModalBox.DEFAULTS = {
        width:500,
        height:300,
        title:"标题",
        content:"",
        onOpen:function(){},
        onClose: function(){},
        onOk: function(){},
        onCancel: function(){}
    };
    ModalBox.prototype = {
        init:function(){
            this.render();
            this.events();
        },
        render:function(){
            var self = this;
            /* 拼接html模板 */
            var mask = $('<div id="mask"></div>');
            var htmlStr = [],template = null;

                htmlStr.push('<div class="modal-container" id="modal-'+this.getRandom()+'">');
                /* header */
                htmlStr.push('<div class="modal-header">');
                htmlStr.push('<span class="modal-title">'+this.options.title+'</span>');
                htmlStr.push('<i class="modal-icon">x</i>');
                htmlStr.push('</div>');
                /* content */
                htmlStr.push('<div class="modal-content">'+this.options.content+'</div>');
                /* footer */
                htmlStr.push('<div class="modal-footer">');
                htmlStr.push('<span class="btn-cancenl">取消</span>');
                htmlStr.push('<span class="btn-ok">确认</span>');
                htmlStr.push('</div>');
                htmlStr.push('</div>');

                template = htmlStr.join('');
                /* 追加到body里面 */
                this.boxShow(mask,template,function(){
                    $('.modal-container').css({
                        width:self.options.width,
                        height:self.options.height,
                        marginTop:-(self.options.height/2),
                        marginLeft:-(self.options.width/2)
                    });
                });
        },
        events:function(){
            var self = this;

            this.modalHeader = $('.modal-header');
            this.modalContent = $('.modal-content');
            this.modalFooter = $('.modal-footer');
            /* 右上角关闭按钮 */
            this.modalHeader.on('click','.modal-icon',function(){
                self.runCallBack(self.options.onClose);
            });
            /* 点击取消按钮 */
            this.modalFooter.on('click','.btn-cancenl',function(){
                self.runCallBack(self.options.onCancel);
            });
            /* 点击确认按钮 */
            this.modalFooter.on('click','.btn-ok',function(){
                self.runCallBack(self.options.onOk);
            });
        },
        boxShow:function(mask,tpl,callback){
            /* 打开的回到函数 */
            if(typeof this.options.onOpen === 'function'){
                this.options.onOpen(this.elem);
            }
            this.body.append(mask,tpl);
            callback();
        },
        boxClose:function(){
            this.body.find('.modal-container,#mask').remove();
        },
        runCallBack:function(callback){
            if(typeof callback === 'function'){
                callback();
            }
            this.boxClose();
        },
        getRandom:function(){
            return Math.random().toString().substr(2);
        }
    };
});