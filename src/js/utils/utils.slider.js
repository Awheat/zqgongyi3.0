define(function(require, exports, module){
    var $ = require('jquery');
    /*
    * 封装插件
    * */
    $.fn.extend({
        Slider:function(options){
            return this.each(function(){
                new Slider(this,options);
            });
        }
    });
    /*
    *
    * Slider无缝轮播插件
    * 构造函数
    *
    * */
    function Slider(element,options){
        this.options = $.extend({},Slider.DEFAULTS,options);
        /* 初始化变量 */
        this.elem = $(element);
        this.domUl = this.elem.find('ul');
        this.domLi = this.elem.find('li');
        this.domWidth = this.domLi.width();
        this.domBtnPrev = this.elem.find('.btn-prev');
        this.domBtnNext = this.elem.find('.btn-next');
        this.domControll = this.elem.find('.btn-controll');
        this.len = this.domLi.length;
        this.ind = 1;
        this.timer = null;

        /* 初始化函数 */
        this.init();
    }
    /* 默认参数 */
    Slider.DEFAULTS = {
        sliderPreView:1
    };
    /* Slider对象的原型 */
    Slider.prototype = {
        init:function(){

            /* 初始化复制dom节点函数 */
            if(this.len !== 1){
                this.cloneNodes();
                this.addControllerBtn();
                this.autoPlay();
            }else{
                this.domBtnNext.hide();
                this.domBtnPrev.hide();
            }
            /* 初始化事件函数 */
            this.events();
        },
        /* 事件函数 */
        events:function(){
            var self = this;
            /* 点击上一张 */
            this.domBtnPrev.on('click',function(e){
                self.goPrev();
            });
            /* 点击下一张 */
            this.domBtnNext.on('click',function(e) {
                self.goNext();
            });
            /* 右下角的控制按钮事件 */
            this.domControll.on('click','span',function(){
                self.ind = $(this).index()+1;
                self.go(self.ind);
            });
            /* 鼠标悬浮在轮播图上时取消西东播放 */
            this.elem.hover(function(){
                clearInterval(self.timer);
            },function(){
                if(self.len !== 1){
                    self.autoPlay();
                }
            });
        },
        /* 自动播放 */
        autoPlay:function(){
            var self = this;
            this.timer = setInterval(function(){
                self.goNext();
            },3000);
        },
        /* 去上一张 */
        goPrev:function(){
            this.ind--;
            if(this.ind === -1){
                this.domUl.css('left',-this.domWidth*this.len);
                this.ind = this.len-1;
            }
            this.go(this.ind);
        },
        /* 去下一张 */
        goNext:function(){
            this.ind++;
            if(this.ind === this.len+2){
                this.domUl.css('left',-this.domWidth);
                this.ind = 2;
            }
            this.go(this.ind);
        },
        /* 播放函数 */
        go:function(index){
            var self = this;
            if(this.len !== 1){
                this.domUl.stop().animate({
                    left:-this.domWidth * index
                },500,function(){
                    /*
                    * 设置控制按钮当前选中的效果
                    * */
                    if(index == self.len+1) index = 1;
                    self.domControll.find('span').eq(index-1).addClass('active').siblings('span').removeClass('active');
                });
            }
        },
        /* 复制第一个和最后一个元素，并设置外层容器的宽度 */
        cloneNodes:function(){
            var firstNode = this.domUl.find('li:first').clone();
            var lastNode = this.domUl.find('li:last').clone();
            this.domUl.append(firstNode).prepend(lastNode).css({
                width:this.domWidth * (this.len+2)+'px',
                left:-this.domWidth
            });
        },
        /* 根据元素个数添加控制按钮的个数 */
        addControllerBtn:function(){
            var btns = '';
            for(var i=0;i<this.len;i++){
                btns += '<span></span>';
            }
            this.domControll.append(btns).find('span').eq(this.ind-1).addClass('active');
        }
    };
});