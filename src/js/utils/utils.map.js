/* utils.map.js create by wuwc in 2016-09-08 */
define(function(require, exports, module){
    var $ = require('jquery');

    var mapObj;
    var map = {
        init:function(id,center){
            mapObj = new AMap.Map(id,{
                center:center,
                resizeEnable: true,
                zoom: 10
            });
        },
        autoSearch:function(options){
            var auto = new AMap.Autocomplete(options);
            var placeSearch = new AMap.PlaceSearch({
                map: mapObj
            });
            AMap.event.addListener(auto, "select", select);//注册监听，当选中某条记录时会触发
            function select(e) {
                placeSearch.setCity(e.poi.adcode);
                placeSearch.search(e.poi.name);  //关键字查询查询
            }
        }
    };
    exports.module = map;
});