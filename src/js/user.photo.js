define(function(require, exports, module) {
    require('jquery');
    require("libs/jquery.uploadify-3.1.min");
    require("libs/jquery.Jcrop.min");
    require("libs/jquery.ThinkBox");
    $(function () {
        //上传头像(uploadify插件)
        $("#user-pic").uploadify({
            'queueSizeLimit': 1,
            'removeTimeout': 0.5,
            'preventCaching': true,
            'multi': false,
            'swf': uploadifyswf,
            'uploader' 		: uploader,
            'buttonText': '<i class="userup-icon"></i>上传头像',
            'width': '200',
            'height': '200',
            'fileTypeExts': '*.jpg; *.png; *.gif;',
            'onUploadSuccess': function (file, data, response) {

                var data = $.parseJSON(data);
                if (data['status'] == 0) {
                    $.ThinkBox.error(data['info'], {'delayClose': 3000});
                    return;
                }
                var _imgPath = data['filePath'],
                    _imgSrc=data['url'];
                //"/Uploads/avatar_tmp/2014/04/14/534b7f5a20904.png"
                var l_index = _imgPath.lastIndexOf('/') + 1;
                $('#img_name').val(data['info']['savename']);//
                var preview = $('.upload-area').children('#preview-hidden');
                preview.show().removeClass('hidden');
                //两个预览窗口赋值
                $('.crop').children('img').attr('src', _imgSrc + '?random=' + Math.random());
                //隐藏表单赋值
                $('#img_src').val(_imgPath);
                //绑定需要裁剪的图片
                var img = $('<img />');
                preview.append(img);
                preview.children('img').attr('src', _imgSrc + '?random=' + Math.random());
                var crop_img = preview.children('img');
                crop_img.attr('id', "cropbox").show();
                var img = new Image();
                img.src = _imgSrc + '?random=' + Math.random();
                //根据图片大小在画布里居中
                img.onload = function () {
                    var img_height = 0;
                    var img_width = 0;
                    var real_height = img.height;
                    var real_width = img.width;
                    if (real_height > real_width && real_height > 200) {
                        var persent = real_height / 200;
                        real_height = 200;
                        real_width = real_width / persent;
                    } else if (real_width > real_height && real_width > 200) {
                        var persent = real_width / 200;
                        real_width = 200;
                        real_height = real_height / persent;
                    }
                    if (real_height < 200) {
                        img_height = (200 - real_height) / 2;
                    }
                    if (real_width < 200) {
                        img_width = (200 - real_width) / 2;
                    }
                    preview.css({width: (200 - img_width) + 'px', height: (200 - img_height) + 'px'});
                    preview.css({paddingTop: img_height + 'px', paddingLeft: img_width + 'px'});
                }
                //裁剪插件
                $('#cropbox').Jcrop({
                    bgColor: '#333',   //选区背景色
                    bgFade: true,      //选区背景渐显
                    fadeTime: 1000,    //背景渐显时间
                    allowSelect: false, //是否可以选区，
                    allowResize: true, //是否可以调整选区大小
                    aspectRatio: 1,     //约束比例
                    minSize: [100, 100],//可选最小大小
                    boxWidth: 200,		//画布宽度
                    boxHeight: 200,	//画布高度
                    onChange: showPreview,//改变时重置预览图
                    onSelect: showPreview,//选择时重置预览图
                    setSelect: [0, 0, 100, 100],//初始化时位置
                    onSelect: function (c) {	//选择时动态赋值，该值是最终传给程序的参数！
                        $('#x').val(c.x);//需裁剪的左上角X轴坐标
                        $('#y').val(c.y);//需裁剪的左上角Y轴坐标
                        $('#w').val(c.w);//需裁剪的宽度
                        $('#h').val(c.h);//需裁剪的高度
                    }
                });
                //提交裁剪好的图片
                $('.save-pic').click(function () {
                    if ($('#preview-hidden').html() == '') {
                        $.ThinkBox.error('请先上传图片！');
                    } else {
                        //由于GD库裁剪gif图片很慢，所以长时间显示弹出框
                        $.ThinkBox.success('图片处理中，请稍候……', {'delayClose': 30000});
                        $('#pic').submit();
                    }
                });
                //重新上传,清空裁剪参数
                var i = 0;
                $('.reupload-img').click(function () {
                    $('#preview-hidden').find('*').remove();
                    $('#preview-hidden').hide().addClass('hidden').css({'padding-top': 0, 'padding-left': 0});
                });
            },
            onUpladError: function (a, b, c) {

            }
        });
        //预览图
        function showPreview(coords) {
            var img_width = $('#cropbox').width();
            var img_height = $('#cropbox').height();
            //根据包裹的容器宽高,设置被除数
            var rx = 100 / coords.w;
            var ry = 100 / coords.h;
            $('#crop-preview-100').css({
                width: Math.round(rx * img_width) + 'px',
                height: Math.round(ry * img_height) + 'px',
                marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                marginTop: '-' + Math.round(ry * coords.y) + 'px'
            });
            rx = 60 / coords.w;
            ry = 60 / coords.h;
            $('#crop-preview-60').css({
                width: Math.round(rx * img_width) + 'px',
                height: Math.round(ry * img_height) + 'px',
                marginLeft: '-' + Math.round(rx * coords.x) + 'px',
                marginTop: '-' + Math.round(ry * coords.y) + 'px'
            });
        }
    });
});