define(function(require, exports, module) {
    var $ = require('jquery');

    /* ��װjquery��� */
    $.fn.extend({
        ColumnSlider:function(options){
            return this.each(function(){
                new ColumnSlider(this,options);
            });
        }
    });
    /* ���캯�� */
    function ColumnSlider(element,options){
        /* ��ʼ������������ */
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
    /* Ĭ�ϲ��� */
    ColumnSlider.DEFAULTS = {
        sliderPreView:5,
        autoPlay:false,
        loop:false
    };
    /* ColumnSliderԭ�� */
    ColumnSlider.prototype = {
        /* ��ʼ������ */
        init:function(){
            var self = this;
            /* ����������޷����,����ض�Ӧ���� */
            if(this.options.loop){
                this.trueLoop();
            }else{
                this.falseLoop();
            }
            /* ���������������,�����������Զ�����,���ض�Ӧ�ĺ��� */
            if(this.options.loop && this.options.autoPlay){
                this.autoPlay();
            }
            /* ����������ֲ�ͼ��ʱȡ���������� */
            this.elem.hover(function(){
                clearInterval(self.timer);
            },function(){
                self.autoPlay();
            });

            /* �¼����� */
            this.events();
        },
        /* �¼����� */
        events:function(){
            var self = this;
            /* ���go��һ�� */
            this.domBtnPrev.on('click',function(){
                if(self.options.loop){
                    self.loopGoPrev();
                }else{
                    if(!$(this).hasClass('disable')){
                        self.goPrev();
                    }
                }
            });
            /* ���go��һ�� */
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
        /* ������һҳ�ĺ��� */
        goPrev:function(){
            this.index--;
            this.domBtnNext.removeClass('disable');
            if(this.index === 0){
                this.domBtnPrev.addClass('disable');
            }
            this.go(this.index);
        },
        /* ������һҳ�ĺ��� */
        goNext:function(){
            this.index++;
            this.domBtnPrev.removeClass('disable');
            if(this.index === this.len-this.options.sliderPreView){
                this.domBtnNext.addClass('disable');
            }
            this.go(this.index);
        },
        /* �Զ����� */
        autoPlay:function(){
            var self = this;
            this.timer = setInterval(function(){
                self.loopGoNext();
            },2000);
        },
        /* ��һ��ѭ������ */
        loopGoPrev:function(){
            this.index--;
            if(this.index === -1){
                this.domUl.css('left',-this.domWidth*(this.len+1));
                this.index = this.len-1;
            }
            this.go(this.index);
        },
        /* ��һ��ѭ������ */
        loopGoNext:function(){
            this.index++;
            if(this.index === 11){
                this.domUl.css('left',0);
                this.index = 1;
            }
            this.go(this.index);
        },
        /* �˶����� */
        go:function(index){
            var self = this;
            this.domUl.stop().animate({
                left:-(this.domWidth+20)*index
            },500);
        },
        /* û���޷�����ĳ�ʼ���� */
        falseLoop:function(){
            this.domUl.css('width',this.len * (this.domWidth+20)+'px');
            this.domBtnPrev.addClass('disable');
            if(this.len < this.options.sliderPreView+1){
                this.domBtnNext.addClass('disable');
            }
        },
        /* �޷�����ĳ�ʼ���� */
        trueLoop:function(){
            var ulNode = this.domUl.html();
            this.domUl.append(ulNode).css({
                width:(this.domWidth+20) * (this.len*2)+'px'
            });
            this.domBtnPrev.removeClass('disable');
        }
    };
});