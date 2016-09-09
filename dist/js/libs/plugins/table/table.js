KindEditor.plugin("table",function(e){function l(e,l){l=l.toUpperCase(),e.css("background-color",l),e.css("color","#000000"===l?"#FFFFFF":"#000000"),e.html(l)}function t(t,o){function a(){e.each(d,function(){this.remove()}),d=[],e(document).unbind("click,mousedown",a),t.unbind("click,mousedown",a)}o.bind("click,mousedown",function(e){e.stopPropagation()}),o.click(function(o){a();var i=e(this),r=i.pos(),c=e.colorpicker({x:r.x,y:r.y+i.height(),z:811214,selectedColor:e(this).html(),colors:n.colorTable,noColor:n.lang("noColor"),shadowMode:n.shadowMode,click:function(e){l(i,e),a()}});d.push(c),e(document).bind("click,mousedown",a),t.bind("click,mousedown",a)})}function o(e,l,t){for(var o=0,n=0,a=l.cells.length;n<a&&l.cells[n]!=t;n++)o+=l.cells[n].rowSpan-1;return t.cellIndex-o}var n=this,a="table",i=n.lang(a+"."),r="ke-zeroborder",d=[];n.plugin.table={prop:function(o){var d=['<div style="padding:20px;">','<div class="ke-dialog-row">','<label for="keRows" style="width:90px;">'+i.cells+"</label>",i.rows+' <input type="text" id="keRows" class="ke-input-text ke-input-number" name="rows" value="" maxlength="4" /> &nbsp; ',i.cols+' <input type="text" class="ke-input-text ke-input-number" name="cols" value="" maxlength="4" />',"</div>",'<div class="ke-dialog-row">','<label for="keWidth" style="width:90px;">'+i.size+"</label>",i.width+' <input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> &nbsp; ','<select name="widthType">','<option value="%">'+i.percent+"</option>",'<option value="px">'+i.px+"</option>","</select> &nbsp; ",i.height+' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> &nbsp; ','<select name="heightType">','<option value="%">'+i.percent+"</option>",'<option value="px">'+i.px+"</option>","</select>","</div>",'<div class="ke-dialog-row">','<label for="kePadding" style="width:90px;">'+i.space+"</label>",i.padding+' <input type="text" id="kePadding" class="ke-input-text ke-input-number" name="padding" value="" maxlength="4" /> &nbsp; ',i.spacing+' <input type="text" class="ke-input-text ke-input-number" name="spacing" value="" maxlength="4" />',"</div>",'<div class="ke-dialog-row">','<label for="keAlign" style="width:90px;">'+i.align+"</label>",'<select id="keAlign" name="align">','<option value="">'+i.alignDefault+"</option>",'<option value="left">'+i.alignLeft+"</option>",'<option value="center">'+i.alignCenter+"</option>",'<option value="right">'+i.alignRight+"</option>","</select>","</div>",'<div class="ke-dialog-row">','<label for="keBorder" style="width:90px;">'+i.border+"</label>",i.borderWidth+' <input type="text" id="keBorder" class="ke-input-text ke-input-number" name="border" value="" maxlength="4" /> &nbsp; ',i.borderColor+' <span class="ke-inline-block ke-input-color"></span>',"</div>",'<div class="ke-dialog-row">','<label for="keBgColor" style="width:90px;">'+i.backgroundColor+"</label>",'<span class="ke-inline-block ke-input-color"></span>',"</div>","</div>"].join(""),c=n.cmd.range.createBookmark(),s=n.createDialog({name:a,width:500,title:n.lang(a),body:d,beforeRemove:function(){S.unbind()},yesBtn:{name:n.lang("yes"),click:function(l){var t=g.val(),o=v.val(),a=u.val(),i=m.val(),d=h.val(),s=b.val(),p=k.val(),C=w.val(),B=f.val(),T=x.val(),A=e(S[0]).html()||"",I=e(S[1]).html()||"";if(0==t||!/^\d+$/.test(t))return alert(n.lang("invalidRows")),void g[0].focus();if(0==o||!/^\d+$/.test(o))return alert(n.lang("invalidRows")),void v[0].focus();if(!/^\d*$/.test(a))return alert(n.lang("invalidWidth")),void u[0].focus();if(!/^\d*$/.test(i))return alert(n.lang("invalidHeight")),void m[0].focus();if(!/^\d*$/.test(p))return alert(n.lang("invalidPadding")),void k[0].focus();if(!/^\d*$/.test(C))return alert(n.lang("invalidSpacing")),void w[0].focus();if(!/^\d*$/.test(T))return alert(n.lang("invalidBorder")),void x[0].focus();if(y)return""!==a?y.width(a+d):y.css("width",""),void 0!==y[0].width&&y.removeAttr("width"),""!==i?y.height(i+s):y.css("height",""),void 0!==y[0].height&&y.removeAttr("height"),y.css("background-color",I),void 0!==y[0].bgColor&&y.removeAttr("bgColor"),""!==p?y[0].cellPadding=p:y.removeAttr("cellPadding"),""!==C?y[0].cellSpacing=C:y.removeAttr("cellSpacing"),""!==B?y[0].align=B:y.removeAttr("align"),""!==T?y.attr("border",T):y.removeAttr("border"),""===T||"0"===T?y.addClass(r):y.removeClass(r),""!==A?y.attr("borderColor",A):y.removeAttr("borderColor"),n.hideDialog().focus(),n.cmd.range.moveToBookmark(c),n.cmd.select(),void n.addBookmark();var R="";""!==a&&(R+="width:"+a+d+";"),""!==i&&(R+="height:"+i+s+";"),""!==I&&(R+="background-color:"+I+";");var q="<table";""!==R&&(q+=' style="'+R+'"'),""!==p&&(q+=' cellpadding="'+p+'"'),""!==C&&(q+=' cellspacing="'+C+'"'),""!==B&&(q+=' align="'+B+'"'),""!==T&&(q+=' border="'+T+'"'),""!==T&&"0"!==T||(q+=' class="'+r+'"'),""!==A&&(q+=' bordercolor="'+A+'"'),q+=">";for(var H=0;H<t;H++){q+="<tr>";for(var W=0;W<o;W++)q+="<td>"+(e.IE?"&nbsp;":"<br />")+"</td>";q+="</tr>"}q+="</table>",e.IE||(q+="<br />"),n.insertHtml(q),n.select().hideDialog().focus(),n.addBookmark()}}}),p=s.div,g=e('[name="rows"]',p).val(3),v=e('[name="cols"]',p).val(2),u=e('[name="width"]',p).val(100),m=e('[name="height"]',p),h=e('[name="widthType"]',p),b=e('[name="heightType"]',p),k=e('[name="padding"]',p).val(2),w=e('[name="spacing"]',p).val(0),f=e('[name="align"]',p),x=e('[name="border"]',p).val(1),S=e(".ke-input-color",p);t(p,S.eq(0)),t(p,S.eq(1)),l(S.eq(0),"#000000"),l(S.eq(1),""),g[0].focus(),g[0].select();var y;if(!o&&(y=n.plugin.getSelectedTable())){g.val(y[0].rows.length),v.val(y[0].rows.length>0?y[0].rows[0].cells.length:0),g.attr("disabled",!0),v.attr("disabled",!0);var C,B=y[0].style.width||y[0].width,T=y[0].style.height||y[0].height;void 0!==B&&(C=/^(\d+)((?:px|%)*)$/.exec(B))?(u.val(C[1]),h.val(C[2])):u.val(""),void 0!==T&&(C=/^(\d+)((?:px|%)*)$/.exec(T))&&(m.val(C[1]),b.val(C[2])),k.val(y[0].cellPadding||""),w.val(y[0].cellSpacing||""),f.val(y[0].align||""),x.val(void 0===y[0].border?"":y[0].border),l(S.eq(0),e.toHex(y.attr("borderColor")||"")),l(S.eq(1),e.toHex(y[0].style.backgroundColor||y[0].bgColor||"")),u[0].focus(),u[0].select()}},cellprop:function(){var o=['<div style="padding:20px;">','<div class="ke-dialog-row">','<label for="keWidth" style="width:90px;">'+i.size+"</label>",i.width+' <input type="text" id="keWidth" class="ke-input-text ke-input-number" name="width" value="" maxlength="4" /> &nbsp; ','<select name="widthType">','<option value="%">'+i.percent+"</option>",'<option value="px">'+i.px+"</option>","</select> &nbsp; ",i.height+' <input type="text" class="ke-input-text ke-input-number" name="height" value="" maxlength="4" /> &nbsp; ','<select name="heightType">','<option value="%">'+i.percent+"</option>",'<option value="px">'+i.px+"</option>","</select>","</div>",'<div class="ke-dialog-row">','<label for="keAlign" style="width:90px;">'+i.align+"</label>",i.textAlign+' <select id="keAlign" name="textAlign">','<option value="">'+i.alignDefault+"</option>",'<option value="left">'+i.alignLeft+"</option>",'<option value="center">'+i.alignCenter+"</option>",'<option value="right">'+i.alignRight+"</option>","</select> ",i.verticalAlign+' <select name="verticalAlign">','<option value="">'+i.alignDefault+"</option>",'<option value="top">'+i.alignTop+"</option>",'<option value="middle">'+i.alignMiddle+"</option>",'<option value="bottom">'+i.alignBottom+"</option>",'<option value="baseline">'+i.alignBaseline+"</option>","</select>","</div>",'<div class="ke-dialog-row">','<label for="keBorder" style="width:90px;">'+i.border+"</label>",i.borderWidth+' <input type="text" id="keBorder" class="ke-input-text ke-input-number" name="border" value="" maxlength="4" /> &nbsp; ',i.borderColor+' <span class="ke-inline-block ke-input-color"></span>',"</div>",'<div class="ke-dialog-row">','<label for="keBgColor" style="width:90px;">'+i.backgroundColor+"</label>",'<span class="ke-inline-block ke-input-color"></span>',"</div>","</div>"].join(""),r=n.cmd.range.createBookmark(),d=n.createDialog({name:a,width:500,title:n.lang("tablecell"),body:o,beforeRemove:function(){w.unbind()},yesBtn:{name:n.lang("yes"),click:function(l){var t=s.val(),o=p.val(),a=g.val(),i=v.val(),d=(u.val(),m.val(),h.val()),c=b.val(),f=k.val(),S=e(w[0]).html()||"",y=e(w[1]).html()||"";return/^\d*$/.test(t)?/^\d*$/.test(o)?/^\d*$/.test(f)?(x.css({width:""!==t?t+a:"",height:""!==o?o+i:"","background-color":y,"text-align":d,"vertical-align":c,"border-width":f,"border-style":""!==f?"solid":"","border-color":S}),n.hideDialog().focus(),n.cmd.range.moveToBookmark(r),n.cmd.select(),void n.addBookmark()):(alert(n.lang("invalidBorder")),void k[0].focus()):(alert(n.lang("invalidHeight")),void p[0].focus()):(alert(n.lang("invalidWidth")),void s[0].focus())}}}),c=d.div,s=e('[name="width"]',c).val(100),p=e('[name="height"]',c),g=e('[name="widthType"]',c),v=e('[name="heightType"]',c),u=e('[name="padding"]',c).val(2),m=e('[name="spacing"]',c).val(0),h=e('[name="textAlign"]',c),b=e('[name="verticalAlign"]',c),k=e('[name="border"]',c).val(1),w=e(".ke-input-color",c);t(c,w.eq(0)),t(c,w.eq(1)),l(w.eq(0),"#000000"),l(w.eq(1),""),s[0].focus(),s[0].select();var f,x=n.plugin.getSelectedCell(),S=x[0].style.width||x[0].width||"",y=x[0].style.height||x[0].height||"";(f=/^(\d+)((?:px|%)*)$/.exec(S))?(s.val(f[1]),g.val(f[2])):s.val(""),(f=/^(\d+)((?:px|%)*)$/.exec(y))&&(p.val(f[1]),v.val(f[2])),h.val(x[0].style.textAlign||""),b.val(x[0].style.verticalAlign||"");var C=x[0].style.borderWidth||"";C&&(C=parseInt(C)),k.val(C),l(w.eq(0),e.toHex(x[0].style.borderColor||"")),l(w.eq(1),e.toHex(x[0].style.backgroundColor||"")),s[0].focus(),s[0].select()},insert:function(){this.prop(!0)},delete:function(){var e=n.plugin.getSelectedTable();n.cmd.range.setStartBefore(e[0]).collapse(!0),n.cmd.select(),e.remove(),n.addBookmark()},colinsert:function(l){var t=n.plugin.getSelectedTable()[0],a=n.plugin.getSelectedRow()[0],i=n.plugin.getSelectedCell()[0],r=i.cellIndex+l;r+=t.rows[0].cells.length-a.cells.length;for(var d=0,c=t.rows.length;d<c;d++){var s=t.rows[d],p=s.insertCell(r);p.innerHTML=e.IE?"":"<br />",r=o(t,s,p)}n.cmd.range.selectNodeContents(i).collapse(!0),n.cmd.select(),n.addBookmark()},colinsertleft:function(){this.colinsert(0)},colinsertright:function(){this.colinsert(1)},rowinsert:function(l){var t=n.plugin.getSelectedTable()[0],o=n.plugin.getSelectedRow()[0],a=n.plugin.getSelectedCell()[0],i=o.rowIndex;1===l&&(i=o.rowIndex+(a.rowSpan-1)+l);for(var r=t.insertRow(i),d=0,c=o.cells.length;d<c;d++){o.cells[d].rowSpan>1&&(c-=o.cells[d].rowSpan-1);var s=r.insertCell(d);1===l&&o.cells[d].colSpan>1&&(s.colSpan=o.cells[d].colSpan),s.innerHTML=e.IE?"":"<br />"}for(var p=i;p>=0;p--){var g=t.rows[p].cells;if(g.length>d){for(var v=a.cellIndex;v>=0;v--)g[v].rowSpan>1&&(g[v].rowSpan+=1);break}}n.cmd.range.selectNodeContents(a).collapse(!0),n.cmd.select(),n.addBookmark()},rowinsertabove:function(){this.rowinsert(0)},rowinsertbelow:function(){this.rowinsert(1)},rowmerge:function(){var e=n.plugin.getSelectedTable()[0],l=n.plugin.getSelectedRow()[0],t=n.plugin.getSelectedCell()[0],o=l.rowIndex,a=o+t.rowSpan,i=e.rows[a];if(!(e.rows.length<=a)){var r=t.cellIndex;if(!(i.cells.length<=r)){var d=i.cells[r];t.colSpan===d.colSpan&&(t.rowSpan+=d.rowSpan,i.deleteCell(r),n.cmd.range.selectNodeContents(t).collapse(!0),n.cmd.select(),n.addBookmark())}}},colmerge:function(){var e=(n.plugin.getSelectedTable()[0],n.plugin.getSelectedRow()[0]),l=n.plugin.getSelectedCell()[0],t=(e.rowIndex,l.cellIndex),o=t+1;if(!(e.cells.length<=o)){var a=e.cells[o];l.rowSpan===a.rowSpan&&(l.colSpan+=a.colSpan,e.deleteCell(o),n.cmd.range.selectNodeContents(l).collapse(!0),n.cmd.select(),n.addBookmark())}},rowsplit:function(){var l=n.plugin.getSelectedTable()[0],t=n.plugin.getSelectedRow()[0],a=n.plugin.getSelectedCell()[0],i=t.rowIndex;if(1!==a.rowSpan){for(var r=o(l,t,a),d=1,c=a.rowSpan;d<c;d++){var s=l.rows[i+d],p=s.insertCell(r);a.colSpan>1&&(p.colSpan=a.colSpan),p.innerHTML=e.IE?"":"<br />",r=o(l,s,p)}e(a).removeAttr("rowSpan"),n.cmd.range.selectNodeContents(a).collapse(!0),n.cmd.select(),n.addBookmark()}},colsplit:function(){var l=(n.plugin.getSelectedTable()[0],n.plugin.getSelectedRow()[0]),t=n.plugin.getSelectedCell()[0],o=t.cellIndex;if(1!==t.colSpan){for(var a=1,i=t.colSpan;a<i;a++){var r=l.insertCell(o+a);t.rowSpan>1&&(r.rowSpan=t.rowSpan),r.innerHTML=e.IE?"":"<br />"}e(t).removeAttr("colSpan"),n.cmd.range.selectNodeContents(t).collapse(!0),n.cmd.select(),n.addBookmark()}},coldelete:function(){for(var l=n.plugin.getSelectedTable()[0],t=n.plugin.getSelectedRow()[0],o=n.plugin.getSelectedCell()[0],a=o.cellIndex,i=0,r=l.rows.length;i<r;i++){var d=l.rows[i],c=d.cells[a];c.colSpan>1?(c.colSpan-=1,1===c.colSpan&&e(c).removeAttr("colSpan")):d.deleteCell(a),c.rowSpan>1&&(i+=c.rowSpan-1)}0===t.cells.length?(n.cmd.range.setStartBefore(l).collapse(!0),n.cmd.select(),e(l).remove()):n.cmd.selection(!0),n.addBookmark()},rowdelete:function(){for(var l=n.plugin.getSelectedTable()[0],t=n.plugin.getSelectedRow()[0],o=n.plugin.getSelectedCell()[0],a=t.rowIndex,i=o.rowSpan-1;i>=0;i--)l.deleteRow(a+i);0===l.rows.length?(n.cmd.range.setStartBefore(l).collapse(!0),n.cmd.select(),e(l).remove()):n.cmd.selection(!0),n.addBookmark()}},n.clickToolbar(a,n.plugin.table.prop)});