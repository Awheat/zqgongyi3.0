/* active.js create by wuwc in 2016-08-29 */
define(function(require, exports, module){
    /* 引入js文件 */
    var $ = require('jquery');
    require('distpicker');
    require('libs/laydate/laydate');
    require('jquery.validate');
    require('libs/kindeditor-min');
    require('libs/zh_CN');
    require('utils/utils.modal.box');
    var utilsForm = require('utils/utils.form.js');

    /* 初始化富文本编辑器 */
    KindEditor.ready(function(K) {
        window.editor = K.create('#active_detail',{
            afterBlur: function(){this.sync();}
        });
    });


    $(function(){

        /* 活动对象 */
        var active = {
            init:function(){
                /*调用选择地址插件*/
                $('.distpicker').distpicker();


                map.initMap('wraper-map');
                map.initMap('test-map');

                $('.map-tips').on('click',function(){
                    $(this).ModalBox({
                        width:650,
                        height:300,
                        content:$('.wraper-modal').clone(true).html(),
                        onOpen:function(callback){
                            alert(callback);
                        }
                    });

                    /* 问题所在初始化地图需要一个id这样的话页面上出现了两个id所以有问题; */

                });
            }
        };
        /* 地图对象 */
        var map = {
            initMap:function(id){
                var map = new AMap.Map(id,{
                    resizeEnable: false,
                    zoom: 10,
                    center: [116.39,39.9]
                });
                return map;
            }
        };
        /* 日期选择对象 */
        var date = {
            init:function(){
                laydate(this.config.deadline);
                laydate(this.config.start);
                laydate(this.config.end);
            },
            config:{
                deadline:{
                    elem: '#active_deadline',
                    format: 'YYYY-MM-DD hh:mm:ss',
                    istime: true,
                    choose:function(datas){
                        $('#active_deadline-error').hide();
                    }
                },
                start:{
                    elem: '#active_startdate',
                    format: 'YYYY-MM-DD hh:mm:ss',
                    min: laydate.now(), //设定最小日期为当前日期
                    max: '2099-06-16 23:59:59', //最大日期
                    istime: true,
                    istoday: false,
                    choose: function(datas){
                        date.config.end.min = datas; //开始日选好后，重置结束日的最小日期
                        date.config.end.start = datas //将结束日的初始值设定为开始日
                        $('#active_startdate-error').hide();
                    }
                },
                end:{
                    elem: '#active_enddate',
                    format: 'YYYY-MM-DD hh:mm:ss',
                    min: laydate.now(),
                    max: '2099-06-16 23:59:59',
                    istime: true,
                    istoday: false,
                    choose: function(datas){
                        date.config.start.max = datas; //结束日选好后，重置开始日的最大日期
                        $('#active_enddate-error').hide();
                    }
                }
            }
        };
        /* 验证对象 */
        var validate = {
            init:function(){
                $('#createActiveForm').validate(this.config);
                utilsForm.addValidatorRules('isPeopleName', utilsForm.regs.username, '请输入合法的姓名');
                utilsForm.addValidatorRules('isMobile', utilsForm.regs.mobile, '请输入合法手机号');
                utilsForm.addValidatorRules('isActiveName', utilsForm.regs.username, '请输入合法的活动名称');
            },
            config:{
                ignore: '',
                onkeyup:false,
                submitHandler: function (form) {
                    alert('1');
                    form.submit();
                },
                rules: {
                    active_people_name: {required: true,isPeopleName:true},
                    active_people_tel: {required: true,isMobile:true},
                    active_num_limit: {required: true,digits:true},
                    active_name: {required: true,isActiveName:true},
                    active_category: {required: true},
                    active_deadline: {required: true},
                    active_startdate: {required: true},
                    active_enddate: {required: true},
                    active_detail: {required: true}
                },
                messages: {
                    active_people_name: {required: "请输入活动负责人姓名"},
                    active_people_tel: {required: "请输入活动负责人电话"},
                    active_num_limit: {required: "请输入最多报名人数",digits:"请输入正确的限制人数"},
                    active_name: {required: "请输入活动名称"},
                    active_category: {required: "请选择活动类别"},
                    active_deadline: {required: "请选择报名截止时间"},
                    active_startdate: {required: "请选择活动开始时间"},
                    active_enddate: {required: "请选择活动结束时间"},
                    active_detail: {required: "请输入活动详情"}
                }
            }
        };

        active.init();
        date.init();
        validate.init();
    });
});