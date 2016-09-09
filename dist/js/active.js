define("active",["jquery","distpicker","libs/laydate/laydate","jquery.validate","libs/kindeditor-min","libs/zh_CN","utils/utils.modal.box","utils/utils.form.js"],function(require,exports,module){var $=require("jquery");require("distpicker"),require("libs/laydate/laydate"),require("jquery.validate"),require("libs/kindeditor-min"),require("libs/zh_CN"),require("utils/utils.modal.box");var e=require("utils/utils.form.js");KindEditor.ready(function(e){window.editor=e.create("#active_detail",{afterBlur:function(){this.sync()}})}),$(function(){var t={init:function(){$(".distpicker").distpicker(),a.initMap("wraper-map"),a.initMap("test-map"),$(".map-tips").on("click",function(){$(this).ModalBox({width:650,height:300,content:$(".wraper-modal").clone(!0).html(),onOpen:function(e){alert(e)}})})}},a={initMap:function(e){var t=new AMap.Map(e,{resizeEnable:!1,zoom:10,center:[116.39,39.9]});return t}},i={init:function(){laydate(this.config.deadline),laydate(this.config.start),laydate(this.config.end)},config:{deadline:{elem:"#active_deadline",format:"YYYY-MM-DD hh:mm:ss",istime:!0,choose:function(e){$("#active_deadline-error").hide()}},start:{elem:"#active_startdate",format:"YYYY-MM-DD hh:mm:ss",min:laydate.now(),max:"2099-06-16 23:59:59",istime:!0,istoday:!1,choose:function(e){i.config.end.min=e,i.config.end.start=e,$("#active_startdate-error").hide()}},end:{elem:"#active_enddate",format:"YYYY-MM-DD hh:mm:ss",min:laydate.now(),max:"2099-06-16 23:59:59",istime:!0,istoday:!1,choose:function(e){i.config.start.max=e,$("#active_enddate-error").hide()}}}},n={init:function(){$("#createActiveForm").validate(this.config),e.addValidatorRules("isPeopleName",e.regs.username,"请输入合法的姓名"),e.addValidatorRules("isMobile",e.regs.mobile,"请输入合法手机号"),e.addValidatorRules("isActiveName",e.regs.username,"请输入合法的活动名称")},config:{ignore:"",onkeyup:!1,submitHandler:function(e){alert("1"),e.submit()},rules:{active_people_name:{required:!0,isPeopleName:!0},active_people_tel:{required:!0,isMobile:!0},active_num_limit:{required:!0,digits:!0},active_name:{required:!0,isActiveName:!0},active_category:{required:!0},active_deadline:{required:!0},active_startdate:{required:!0},active_enddate:{required:!0},active_detail:{required:!0}},messages:{active_people_name:{required:"请输入活动负责人姓名"},active_people_tel:{required:"请输入活动负责人电话"},active_num_limit:{required:"请输入最多报名人数",digits:"请输入正确的限制人数"},active_name:{required:"请输入活动名称"},active_category:{required:"请选择活动类别"},active_deadline:{required:"请选择报名截止时间"},active_startdate:{required:"请选择活动开始时间"},active_enddate:{required:"请选择活动结束时间"},active_detail:{required:"请输入活动详情"}}}};t.init(),i.init(),n.init()})}),define("libs/laydate/laydate",[],function(require,exports,module){!function(e){var t={path:"../js/libs/laydate/",defSkin:"default",format:"YYYY-MM-DD",min:"1900-01-01 00:00:00",max:"2099-12-31 23:59:59",isv:!1},a={},i=document,n="createElement",s="getElementById",o="getElementsByTagName",l=["laydate_box","laydate_void","laydate_click","LayDateSkin","skins/","/laydate.css"];e.laydate=function(t){t=t||{};try{l.event=e.event?e.event:laydate.caller.arguments[0]}catch(e){}return a.run(t),laydate},laydate.v="1.1",a.getPath=function(){var e=document.scripts,a=e[e.length-1].dist;return t.path?t.path:a.substring(0,a.lastIndexOf("/")+1)}(),a.use=function(e,t){var s=i[n]("link");s.type="text/css",s.rel="stylesheet",s.href=a.getPath+e+l[5],t&&(s.id=t),i[o]("head")[0].appendChild(s),s=null},a.trim=function(e){return e=e||"",e.replace(/^\s|\s$/g,"").replace(/\s+/g," ")},a.digit=function(e){return 10>e?"0"+(0|e):e},a.stopmp=function(t){return t=t||e.event,t.stopPropagation?t.stopPropagation():t.cancelBubble=!0,this},a.each=function(e,t){for(var a=0,i=e.length;i>a&&t(a,e[a])!==!1;a++);},a.hasClass=function(e,t){return e=e||{},new RegExp("\\b"+t+"\\b").test(e.className)},a.addClass=function(e,t){return e=e||{},a.hasClass(e,t)||(e.className+=" "+t),e.className=a.trim(e.className),this},a.removeClass=function(e,t){if(e=e||{},a.hasClass(e,t)){var i=new RegExp("\\b"+t+"\\b");e.className=e.className.replace(i,"")}return this},a.removeCssAttr=function(e,t){var a=e.style;a.removeProperty?a.removeProperty(t):a.removeAttribute(t)},a.shde=function(e,t){e.style.display=t?"none":"block"},a.query=function(e){var t,n,l,d,r;return e=a.trim(e).split(" "),n=i[s](e[0].substr(1)),n?e[1]?/^\./.test(e[1])?(d=e[1].substr(1),r=new RegExp("\\b"+d+"\\b"),t=[],l=i.getElementsByClassName?n.getElementsByClassName(d):n[o]("*"),a.each(l,function(e,a){r.test(a.className)&&t.push(a)}),t[0]?t:""):(t=n[o](e[1]),t[0]?n[o](e[1]):""):n:void 0},a.on=function(t,i,n){return t.attachEvent?t.attachEvent("on"+i,function(){n.call(t,e.even)}):t.addEventListener(i,n,!1),a},a.stopMosup=function(e,t){"mouseup"!==e&&a.on(t,"mouseup",function(e){a.stopmp(e)})},a.run=function(e){var t,i,n,s=a.query,o=l.event;try{n=o.target||o.distElement||{}}catch(e){n={}}if(t=e.elem?s(e.elem):n,o&&n.tagName){if(!t||t===a.elem)return;a.stopMosup(o.type,t),a.stopmp(o),a.view(t,e),a.reshow()}else i=e.event||"click",a.each((0|t.length)>0?t:[t],function(t,n){a.stopMosup(i,n),a.on(n,i,function(t){a.stopmp(t),n!==a.elem&&(a.view(n,e),a.reshow())})})},a.scroll=function(e){return e=e?"scrollLeft":"scrollTop",i.body[e]|i.documentElement[e]},a.winarea=function(e){return document.documentElement[e?"clientWidth":"clientHeight"]},a.isleap=function(e){return 0===e%4&&0!==e%100||0===e%400},a.checkVoid=function(e,t,i){var n=[];return e=0|e,t=0|t,i=0|i,e<a.mins[0]?n=["y"]:e>a.maxs[0]?n=["y",1]:e>=a.mins[0]&&e<=a.maxs[0]&&(e==a.mins[0]&&(t<a.mins[1]?n=["m"]:t==a.mins[1]&&i<a.mins[2]&&(n=["d"])),e==a.maxs[0]&&(t>a.maxs[1]?n=["m",1]:t==a.maxs[1]&&i>a.maxs[2]&&(n=["d",1]))),n},a.timeVoid=function(e,t){if(a.ymd[1]+1==a.mins[1]&&a.ymd[2]==a.mins[2]){if(0===t&&e<a.mins[3])return 1;if(1===t&&e<a.mins[4])return 1;if(2===t&&e<a.mins[5])return 1}else if(a.ymd[1]+1==a.maxs[1]&&a.ymd[2]==a.maxs[2]){if(0===t&&e>a.maxs[3])return 1;if(1===t&&e>a.maxs[4])return 1;if(2===t&&e>a.maxs[5])return 1}return e>(t?59:23)?1:void 0},a.check=function(){var e=a.options.format.replace(/YYYY|MM|DD|hh|mm|ss/g,"\\d+\\").replace(/\\$/g,""),t=new RegExp(e),i=a.elem[l.elemv],n=i.match(/\d+/g)||[],s=a.checkVoid(n[0],n[1],n[2]);if(""!==i.replace(/\s/g,"")){if(!t.test(i))return a.elem[l.elemv]="",a.msg("日期不符合格式，请重新选择。"),1;if(s[0])return a.elem[l.elemv]="",a.msg("日期不在有效期内，请重新选择。"),1;s.value=a.elem[l.elemv].match(t).join(),n=s.value.match(/\d+/g),n[1]<1?(n[1]=1,s.auto=1):n[1]>12?(n[1]=12,s.auto=1):n[1].length<2&&(s.auto=1),n[2]<1?(n[2]=1,s.auto=1):n[2]>a.months[(0|n[1])-1]?(n[2]=31,s.auto=1):n[2].length<2&&(s.auto=1),n.length>3&&(a.timeVoid(n[3],0)&&(s.auto=1),a.timeVoid(n[4],1)&&(s.auto=1),a.timeVoid(n[5],2)&&(s.auto=1)),s.auto?a.creation([n[0],0|n[1],0|n[2]],1):s.value!==a.elem[l.elemv]&&(a.elem[l.elemv]=s.value)}},a.months=[31,null,31,30,31,30,31,31,30,31,30,31],a.viewDate=function(e,t,i){var n=(a.query,{}),s=new Date;e<(0|a.mins[0])&&(e=0|a.mins[0]),e>(0|a.maxs[0])&&(e=0|a.maxs[0]),s.setFullYear(e,t,i),n.ymd=[s.getFullYear(),s.getMonth(),s.getDate()],a.months[1]=a.isleap(n.ymd[0])?29:28,s.setFullYear(n.ymd[0],n.ymd[1],1),n.FDay=s.getDay(),n.PDay=a.months[0===t?11:t-1]-n.FDay+1,n.NDay=1,a.each(l.tds,function(e,t){var i,s=n.ymd[0],o=n.ymd[1]+1;t.className="",e<n.FDay?(t.innerHTML=i=e+n.PDay,a.addClass(t,"laydate_nothis"),1===o&&(s-=1),o=1===o?12:o-1):e>=n.FDay&&e<n.FDay+a.months[n.ymd[1]]?(t.innerHTML=i=e-n.FDay+1,e-n.FDay+1===n.ymd[2]&&(a.addClass(t,l[2]),n.thisDay=t)):(t.innerHTML=i=n.NDay++,a.addClass(t,"laydate_nothis"),12===o&&(s+=1),o=12===o?1:o+1),a.checkVoid(s,o,i)[0]&&a.addClass(t,l[1]),a.options.festival&&a.festival(t,o+"."+i),t.setAttribute("y",s),t.setAttribute("m",o),t.setAttribute("d",i),s=o=i=null}),a.valid=!a.hasClass(n.thisDay,l[1]),a.ymd=n.ymd,l.year.value=a.ymd[0]+"年",l.month.value=a.digit(a.ymd[1]+1)+"月",a.each(l.mms,function(e,t){var i=a.checkVoid(a.ymd[0],(0|t.getAttribute("m"))+1);"y"===i[0]||"m"===i[0]?a.addClass(t,l[1]):a.removeClass(t,l[1]),a.removeClass(t,l[2]),i=null}),a.addClass(l.mms[a.ymd[1]],l[2]),n.times=[0|a.inymd[3]||0,0|a.inymd[4]||0,0|a.inymd[5]||0],a.each(new Array(3),function(e){a.hmsin[e].value=a.digit(a.timeVoid(n.times[e],e)?0|a.mins[e+3]:0|n.times[e])}),a[a.valid?"removeClass":"addClass"](l.ok,l[1])},a.festival=function(e,t){var a;switch(t){case"1.1":a="元旦";break;case"3.8":a="妇女";break;case"4.5":a="清明";break;case"5.1":a="劳动";break;case"6.1":a="儿童";break;case"9.10":a="教师";break;case"10.1":a="国庆"}a&&(e.innerHTML=a),a=null},a.viewYears=function(e){var t=a.query,i="";a.each(new Array(14),function(t){i+=7===t?"<li "+(parseInt(l.year.value)===e?'class="'+l[2]+'"':"")+' y="'+e+'">'+e+"年</li>":'<li y="'+(e-7+t)+'">'+(e-7+t)+"年</li>"}),t("#laydate_ys").innerHTML=i,a.each(t("#laydate_ys li"),function(e,t){"y"===a.checkVoid(t.getAttribute("y"))[0]?a.addClass(t,l[1]):a.on(t,"click",function(e){a.stopmp(e).reshow(),a.viewDate(0|this.getAttribute("y"),a.ymd[1],a.ymd[2])})})},a.initDate=function(){var e=(a.query,new Date),t=a.elem[l.elemv].match(/\d+/g)||[];t.length<3&&(t=a.options.start.match(/\d+/g)||[],t.length<3&&(t=[e.getFullYear(),e.getMonth()+1,e.getDate()])),a.inymd=t,a.viewDate(t[0],t[1]-1,t[2])},a.iswrite=function(){var e=a.query,t={time:e("#laydate_hms")};a.shde(t.time,!a.options.istime),a.shde(l.oclear,!("isclear"in a.options?a.options.isclear:1)),a.shde(l.otoday,!("istoday"in a.options?a.options.istoday:1)),a.shde(l.ok,!("issure"in a.options?a.options.issure:1))},a.orien=function(e,t){var i,n=a.elem.getBoundingClientRect();e.style.left=n.left+(t?0:a.scroll(1))+"px",i=n.bottom+e.offsetHeight/1.5<=a.winarea()?n.bottom-1:n.top>e.offsetHeight/1.5?n.top-e.offsetHeight+1:a.winarea()-e.offsetHeight,e.style.top=i+(t?0:a.scroll())+"px"},a.follow=function(e){a.options.fixed?(e.style.position="fixed",a.orien(e,1)):(e.style.position="absolute",a.orien(e))},a.viewtb=function(){var e,t=[],s=["日","一","二","三","四","五","六"],l={},d=i[n]("table"),r=i[n]("thead");return r.appendChild(i[n]("tr")),l.creath=function(e){var t=i[n]("th");t.innerHTML=s[e],r[o]("tr")[0].appendChild(t),t=null},a.each(new Array(6),function(i){t.push([]),e=d.insertRow(0),a.each(new Array(7),function(a){t[i][a]=0,0===i&&l.creath(a),e.insertCell(a)})}),d.insertBefore(r,d.children[0]),d.id=d.className="laydate_table",e=t=null,d.outerHTML.toLowerCase()}(),a.view=function(e,s){var o,d=a.query,r={};s=s||e,a.elem=e,a.options=s,a.options.format||(a.options.format=t.format),a.options.start=a.options.start||"",a.mm=r.mm=[a.options.min||t.min,a.options.max||t.max],a.mins=r.mm[0].match(/\d+/g),a.maxs=r.mm[1].match(/\d+/g),l.elemv=/textarea|input/.test(a.elem.tagName.toLocaleLowerCase())?"value":"innerHTML",a.box?a.shde(a.box):(o=i[n]("div"),o.id=l[0],o.className=l[0],o.style.cssText="position: absolute;",o.setAttribute("name","laydate-v"+laydate.v),o.innerHTML=r.html='<div class="laydate_top"><div class="laydate_ym laydate_y" id="laydate_YY"><a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a><input id="laydate_y" readonly><label></label><a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a><div class="laydate_yms"><a class="laydate_tab laydate_chtop"><cite></cite></a><ul id="laydate_ys"></ul><a class="laydate_tab laydate_chdown"><cite></cite></a></div></div><div class="laydate_ym laydate_m" id="laydate_MM"><a class="laydate_choose laydate_chprev laydate_tab"><cite></cite></a><input id="laydate_m" readonly><label></label><a class="laydate_choose laydate_chnext laydate_tab"><cite></cite></a><div class="laydate_yms" id="laydate_ms">'+function(){var e="";return a.each(new Array(12),function(t){e+='<span m="'+t+'">'+a.digit(t+1)+"月</span>"}),e}()+"</div></div></div>"+a.viewtb+'<div class="laydate_bottom"><ul id="laydate_hms"><li class="laydate_sj">时间</li><li><input readonly>:</li><li><input readonly>:</li><li><input readonly></li></ul><div class="laydate_time" id="laydate_time"></div><div class="laydate_btn"><a id="laydate_clear">清空</a><a id="laydate_today">今天</a><a id="laydate_ok">确认</a></div>'+(t.isv?'<a href="http://sentsin.com/layui/laydate/" class="laydate_v" target="_blank">laydate-v'+laydate.v+"</a>":"")+"</div>",i.body.appendChild(o),a.box=d("#"+l[0]),a.events(),o=null),a.follow(a.box),s.zIndex?a.box.style.zIndex=s.zIndex:a.removeCssAttr(a.box,"z-index"),a.stopMosup("click",a.box),a.initDate(),a.iswrite(),a.check()},a.reshow=function(){return a.each(a.query("#"+l[0]+" .laydate_show"),function(e,t){a.removeClass(t,"laydate_show")}),this},a.close=function(){a.reshow(),a.shde(a.query("#"+l[0]),1),a.elem=null},a.parse=function(e,i,n){return e=e.concat(i),n=n||(a.options?a.options.format:t.format),n.replace(/YYYY|MM|DD|hh|mm|ss/g,function(){return e.index=0|++e.index,a.digit(e[e.index])})},a.creation=function(e,t){var i=(a.query,a.hmsin),n=a.parse(e,[i[0].value,i[1].value,i[2].value]);a.elem[l.elemv]=n,t||(a.close(),"function"==typeof a.options.choose&&a.options.choose(n))},a.events=function(){var t=a.query,n={box:"#"+l[0]};a.addClass(i.body,"laydate_body"),l.tds=t("#laydate_table td"),l.mms=t("#laydate_ms span"),l.year=t("#laydate_y"),l.month=t("#laydate_m"),a.each(t(n.box+" .laydate_ym"),function(e,t){a.on(t,"click",function(t){a.stopmp(t).reshow(),a.addClass(this[o]("div")[0],"laydate_show"),e||(n.YY=parseInt(l.year.value),a.viewYears(n.YY))})}),a.on(t(n.box),"click",function(){a.reshow()}),n.tabYear=function(e){0===e?a.ymd[0]--:1===e?a.ymd[0]++:2===e?n.YY-=14:n.YY+=14,2>e?(a.viewDate(a.ymd[0],a.ymd[1],a.ymd[2]),a.reshow()):a.viewYears(n.YY)},a.each(t("#laydate_YY .laydate_tab"),function(e,t){a.on(t,"click",function(t){a.stopmp(t),n.tabYear(e)})}),n.tabMonth=function(e){e?(a.ymd[1]++,12===a.ymd[1]&&(a.ymd[0]++,a.ymd[1]=0)):(a.ymd[1]--,-1===a.ymd[1]&&(a.ymd[0]--,a.ymd[1]=11)),a.viewDate(a.ymd[0],a.ymd[1],a.ymd[2])},a.each(t("#laydate_MM .laydate_tab"),function(e,t){a.on(t,"click",function(t){a.stopmp(t).reshow(),n.tabMonth(e)})}),a.each(t("#laydate_ms span"),function(e,t){a.on(t,"click",function(e){a.stopmp(e).reshow(),a.hasClass(this,l[1])||a.viewDate(a.ymd[0],0|this.getAttribute("m"),a.ymd[2])})}),a.each(t("#laydate_table td"),function(e,t){a.on(t,"click",function(e){a.hasClass(this,l[1])||(a.stopmp(e),a.creation([0|this.getAttribute("y"),0|this.getAttribute("m"),0|this.getAttribute("d")]))})}),l.oclear=t("#laydate_clear"),a.on(l.oclear,"click",function(){a.elem[l.elemv]="",a.close()}),l.otoday=t("#laydate_today"),a.on(l.otoday,"click",function(){a.elem[l.elemv]=laydate.now(0,a.options.format),a.close()}),l.ok=t("#laydate_ok"),a.on(l.ok,"click",function(){a.valid&&a.creation([a.ymd[0],a.ymd[1]+1,a.ymd[2]])}),n.times=t("#laydate_time"),a.hmsin=n.hmsin=t("#laydate_hms input"),n.hmss=["小时","分钟","秒数"],n.hmsarr=[],a.msg=function(e,i){var s='<div class="laydte_hsmtex">'+(i||"提示")+"<span>×</span></div>";"string"==typeof e?(s+="<p>"+e+"</p>",a.shde(t("#"+l[0])),a.removeClass(n.times,"laydate_time1").addClass(n.times,"laydate_msg")):(n.hmsarr[e]?s=n.hmsarr[e]:(s+='<div id="laydate_hmsno" class="laydate_hmsno">',a.each(new Array(0===e?24:60),function(e){s+="<span>"+e+"</span>"}),s+="</div>",n.hmsarr[e]=s),a.removeClass(n.times,"laydate_msg"),a[0===e?"removeClass":"addClass"](n.times,"laydate_time1")),a.addClass(n.times,"laydate_show"),n.times.innerHTML=s},n.hmson=function(e,i){var n=t("#laydate_hmsno span"),s=a.valid?null:1;a.each(n,function(t,n){s?a.addClass(n,l[1]):a.timeVoid(t,i)?a.addClass(n,l[1]):a.on(n,"click",function(){a.hasClass(this,l[1])||(e.value=a.digit(0|this.innerHTML))})}),a.addClass(n[0|e.value],"laydate_click")},a.each(n.hmsin,function(e,t){a.on(t,"click",function(t){a.stopmp(t).reshow(),a.msg(e,n.hmss[e]),n.hmson(this,e)})}),a.on(i,"mouseup",function(){var e=t("#"+l[0]);e&&"none"!==e.style.display&&(a.check()||a.close())}).on(i,"keydown",function(t){t=t||e.event;var i=t.keyCode;13===i&&a.creation([a.ymd[0],a.ymd[1]+1,a.ymd[2]])})},a.init=function(){a.use("need"),a.use(l[4]+t.defSkin,l[3]),a.skinLink=a.query("#"+l[3])}(),laydate.reset=function(){a.box&&a.elem&&a.follow(a.box)},laydate.now=function(e,t){var i=new Date(0|e?function(e){return 864e5>e?+new Date+864e5*e:e}(parseInt(e)):+new Date);return a.parse([i.getFullYear(),i.getMonth()+1,i.getDate()],[i.getHours(),i.getMinutes(),i.getSeconds()],t)},laydate.skin=function(e){a.skinLink.href=a.getPath+l[4]+e+l[5]}}(window)}),define("utils/utils.modal.box",["jquery"],function(require,exports,module){function e(t,a){this.options=$.extend({},e.DEFAULTS,a),this.elem=$(t),this.body=$("body"),this.init()}var $=require("jquery");$.fn.extend({ModalBox:function(t){return this.each(function(){new e(this,t)})}}),e.DEFAULTS={width:500,height:300,title:"标题",content:"",onOpen:function(){},onClose:function(){},onOk:function(){},onCancel:function(){}},e.prototype={init:function(){this.render(),this.events()},render:function(){var e=this,t=$('<div id="mask"></div>'),a=[],i=null;a.push('<div class="modal-container" id="modal-'+this.getRandom()+'">'),a.push('<div class="modal-header">'),a.push('<span class="modal-title">'+this.options.title+"</span>"),a.push('<i class="modal-icon">x</i>'),a.push("</div>"),a.push('<div class="modal-content">'+this.options.content+"</div>"),a.push('<div class="modal-footer">'),a.push('<span class="btn-cancenl">取消</span>'),a.push('<span class="btn-ok">确认</span>'),a.push("</div>"),a.push("</div>"),i=a.join(""),this.boxShow(t,i,function(){$(".modal-container").css({width:e.options.width,height:e.options.height,marginTop:-(e.options.height/2),marginLeft:-(e.options.width/2)})})},events:function(){var e=this;this.modalHeader=$(".modal-header"),this.modalContent=$(".modal-content"),this.modalFooter=$(".modal-footer"),this.modalHeader.on("click",".modal-icon",function(){e.runCallBack(e.options.onClose)}),this.modalFooter.on("click",".btn-cancenl",function(){e.runCallBack(e.options.onCancel)}),this.modalFooter.on("click",".btn-ok",function(){e.runCallBack(e.options.onOk)})},boxShow:function(e,t,a){"function"==typeof this.options.onOpen&&this.options.onOpen(this.elem),this.body.append(e,t),a()},boxClose:function(){this.body.find(".modal-container,#mask").remove()},runCallBack:function(e){"function"==typeof e&&e(),this.boxClose()},getRandom:function(){return Math.random().toString().substr(2)}}}),define("utils/utils.form",["jquery"],function(require,exports,module){var $=require("jquery"),e={timer:null,toString:Object.prototype.toString,isArray:function(e){return"[object Array]"===this.toString.call(e)},isString:function(e){return"[object String]"===this.toString.call(e)},isObject:function(e){return"[object Object]"===this.toString.call(e)},isRegEx:function(e){return"[object RegExp]"===this.toString.call(e)},regs:{username:/^[_a-zA-Z0-9\u4E00-\u9FA5]{2,10}$/,mobile:/^1\d{10}$/,email:/^[a-zA-Z0-9_\-]{1,}@[a-zA-Z0-9_\-]{1,}\.[a-zA-Z0-9_\-.]{1,}$/},countDown:function(e,t){var a=this;e.hasClass("disable")||(e.addClass("disable").attr("disabled","disabled"),this.timer=setInterval(function(){e.text(t+" 秒"),t==-1&&(e.text("获取短信验证码").removeClass("disable").attr("disabled",!1),clearInterval(a.timer)),t--},1e3))},addValidatorRules:function(e,t,a){var i=this,n=!0;$.validator.addMethod(e,function(e,a){if(i.isArray(t)){for(var s=0;s<t.length&&!(n=t[s].test(e));s++);return n}return this.optional(a)||t.test(e)},a)}};module.exports=e});