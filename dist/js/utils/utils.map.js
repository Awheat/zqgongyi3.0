define("utils/utils.map",["jquery"],function(require,exports,module){var e,a=(require("jquery"),{init:function(a,n){e=new AMap.Map(a,{center:n,resizeEnable:!0,zoom:10})},autoSearch:function(a){function n(e){i.setCity(e.poi.adcode),i.search(e.poi.name)}var t=new AMap.Autocomplete(a),i=new AMap.PlaceSearch({map:e});AMap.event.addListener(t,"select",n)}});exports.module=a});