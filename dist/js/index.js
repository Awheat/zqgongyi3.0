define("index",["jquery","utils/utils.slider","utils/utils.column.slider"],function(require,exports,module){var $=require("jquery");require("utils/utils.slider"),require("utils/utils.column.slider"),$(function(){$(".slider").Slider(),$(".gy-organization").ColumnSlider({loop:!0,autoPlay:!0}),$(".gy-business").ColumnSlider()})}),define("utils/utils.slider",["jquery"],function(require,exports,module){function i(t,s){this.options=$.extend({},i.DEFAULTS,s),this.elem=$(t),this.domUl=this.elem.find("ul"),this.domLi=this.elem.find("li"),this.domWidth=this.domLi.width(),this.domBtnPrev=this.elem.find(".btn-prev"),this.domBtnNext=this.elem.find(".btn-next"),this.domControll=this.elem.find(".btn-controll"),this.len=this.domLi.length,this.ind=1,this.timer=null,this.init()}var $=require("jquery");$.fn.extend({Slider:function(t){return this.each(function(){new i(this,t)})}}),i.DEFAULTS={sliderPreView:1},i.prototype={init:function(){1!==this.len?(this.cloneNodes(),this.addControllerBtn(),this.autoPlay()):(this.domBtnNext.hide(),this.domBtnPrev.hide()),this.events()},events:function(){var i=this;this.domBtnPrev.on("click",function(t){i.goPrev()}),this.domBtnNext.on("click",function(t){i.goNext()}),this.domControll.on("click","span",function(){i.ind=$(this).index()+1,i.go(i.ind)}),this.elem.hover(function(){clearInterval(i.timer)},function(){1!==i.len&&i.autoPlay()})},autoPlay:function(){var i=this;this.timer=setInterval(function(){i.goNext()},3e3)},goPrev:function(){this.ind--,this.ind===-1&&(this.domUl.css("left",-this.domWidth*this.len),this.ind=this.len-1),this.go(this.ind)},goNext:function(){this.ind++,this.ind===this.len+2&&(this.domUl.css("left",-this.domWidth),this.ind=2),this.go(this.ind)},go:function(i){var t=this;1!==this.len&&this.domUl.stop().animate({left:-this.domWidth*i},500,function(){i==t.len+1&&(i=1),t.domControll.find("span").eq(i-1).addClass("active").siblings("span").removeClass("active")})},cloneNodes:function(){var i=this.domUl.find("li:first").clone(),t=this.domUl.find("li:last").clone();this.domUl.append(i).prepend(t).css({width:this.domWidth*(this.len+2)+"px",left:-this.domWidth})},addControllerBtn:function(){for(var i="",t=0;t<this.len;t++)i+="<span></span>";this.domControll.append(i).find("span").eq(this.ind-1).addClass("active")}}}),define("utils/utils.column.slider",["jquery"],function(require,exports,module){function i(t,s){this.options=$.extend({},i.DEFAULTS,s),this.elem=$(t),this.domUl=this.elem.find("ul"),this.domLi=this.elem.find("li"),this.domWidth=this.domLi.width(),this.domBtnPrev=this.elem.find(".btn-prev"),this.domBtnNext=this.elem.find(".btn-next"),this.len=this.domLi.length,this.index=0,this.timer=null,this.init()}var $=require("jquery");$.fn.extend({ColumnSlider:function(t){return this.each(function(){new i(this,t)})}}),i.DEFAULTS={sliderPreView:5,autoPlay:!1,loop:!1},i.prototype={init:function(){var i=this;this.options.loop?this.trueLoop():this.falseLoop(),this.options.loop&&this.options.autoPlay&&this.autoPlay(),this.elem.hover(function(){clearInterval(i.timer)},function(){i.autoPlay()}),this.events()},events:function(){var i=this;this.domBtnPrev.on("click",function(){i.options.loop?i.loopGoPrev():$(this).hasClass("disable")||i.goPrev()}),this.domBtnNext.on("click",function(){i.options.loop?i.loopGoNext():$(this).hasClass("disable")||i.goNext()})},goPrev:function(){this.index--,this.domBtnNext.removeClass("disable"),0===this.index&&this.domBtnPrev.addClass("disable"),this.go(this.index)},goNext:function(){this.index++,this.domBtnPrev.removeClass("disable"),this.index===this.len-this.options.sliderPreView&&this.domBtnNext.addClass("disable"),this.go(this.index)},autoPlay:function(){var i=this;this.timer=setInterval(function(){i.loopGoNext()},2e3)},loopGoPrev:function(){this.index--,this.index===-1&&(this.domUl.css("left",-this.domWidth*(this.len+1)),this.index=this.len-1),this.go(this.index)},loopGoNext:function(){this.index++,11===this.index&&(this.domUl.css("left",0),this.index=1),this.go(this.index)},go:function(i){this.domUl.stop().animate({left:-(this.domWidth+20)*i},500)},falseLoop:function(){this.domUl.css("width",this.len*(this.domWidth+20)+"px"),this.domBtnPrev.addClass("disable"),this.len<this.options.sliderPreView+1&&this.domBtnNext.addClass("disable")},trueLoop:function(){var i=this.domUl.html();this.domUl.append(i).css({width:(this.domWidth+20)*this.len*2+"px"}),this.domBtnPrev.removeClass("disable")}}});