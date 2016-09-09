define(function(require, exports, module) {
    var $ = require('jquery');

    /* 封装jquery插件 */
    $.fn.extend({
        ColumnSlider:function(options){
            return this.each(function(){
                new ColumnSlider(this,options);
            });
        }
    });
    /* 构造函数 */
    function ColumnSlider(element,options){
        /* 初始化参数及变量 */
        this.options = $.extend({},ColumnSlider.DEFAULTS,options);
        this.elem = $(element);
        this.domUl = this.elem.find('ul');
        this.domLi = this.elem.find('li');
        this.domWidth = this.domLi.width();
        this.domBtnPrev = this.elem.find('.btn-prev');
        this.domBtnNext = this.elem.find('.btn-next');
        this.len = this.domLi.length;
        this.index = 0;
        this.timer = null;

        this.init();
    }
    /* 默认参数 */
    ColumnSlider.DEFAULTS = {
        sliderPreView:5,
        autoPlay:false,
        loop:false
    };
    /* ColumnSlider原型 */
    ColumnSlider.prototype = {
        /* 初始化函数 */
        init:function(){
            var self = this;
            /* 如果配置了无缝滚动,则加载对应函数 */
            if(this.options.loop){
                this.trueLoop();
            }else{
                this.falseLoop();
            }
            /* 如果启动了如风滚动,并且启动了自动播放,加载对应的函数 */
            if(this.options.loop && this.options.autoPlay){
                this.autoPlay();
            }
            /* 鼠标悬浮在轮播图上时取消西东播放 */
            this.elem.hover(function(){
                clearInterval(self.timer);
            },function(){
                self.autoPlay();
            });

            /* 事件函数 */
            this.events();
        },
        /* 事件函数 */
        events:function(){
            var self = this;
            /* 点击go上一个 */
            this.domBtnPrev.on('click',function(){
                if(self.options.loop){
                    self.loopGoPrev();
                }else{
                    if(!$(this).hasClass('disable')){
                        self.goPrev();
                    }
                }
            });
            /* 点击go下一个 */
            this.domBtnNext.on('click',function(){
                if(self.options.loop){
                    self.loopGoNext();
                }else{
                    if(!$(this).hasClass('disable')){
                        self.goNext();
                    }
                }
            });
        },
        /* 播放上一页的函数 */
        goPrev:function(){
            this.index--;
            this.domBtnNext.removeClass('disable');
            if(this.index === 0){
                this.domBtnPrev.addClass('disable');
            }
            this.go(this.index);
        },
        /* 播放下一页的函数 */
        goNext:function(){
            this.index++;
            this.domBtnPrev.removeClass('disable');
            if(this.index === this.len-this.options.sliderPreView){
                this.domBtnNext.addClass('disable');
            }
            this.go(this.index);
        },
        /* 自动播放 */
        autoPlay:function(){
            var self = this;
            this.timer = setInterval(function(){
                self.loopGoNext();
            },2000);
        },
        /* 上一个循环播放 */
        loopGoPrev:function(){
            this.index--;
            if(this.index === -1){
                this.domUl.css('left',-this.domWidth*(this.len+1));
                this.index = this.len-1;
            }
            this.go(this.index);
        },
        /* 下一个循环播放 */
        loopGoNext:function(){
            this.index++;
            if(this.index === 11){
                this.domUl.css('left',0);
                this.index = 1;
            }
            this.go(this.index);
        },
        /* 运动函数 */
        go:function(index){
            var self = this;
            this.domUl.stop().animate({
                left:-(this.domWidth+20)*index
            },500);
        },
        /* 没有无缝滚动的初始设置 */
        falseLoop:function(){
            this.domUl.css('width',this.len * (this.domWidth+20)+'px');
            this.domBtnPrev.addClass('disable');
            if(this.len < this.options.sliderPreView+1){
                this.domBtnNext.addClass('disable');
            }
        },
        /* 无缝滚动的初始设置 */
        trueLoop:function(){
            var ulNode = this.domUl.html();
            this.domUl.append(ulNode).css({
                width:(this.domWidth+20) * (this.len*2)+'px'
            });
            this.domBtnPrev.removeClass('disable');
        }
    };
});