/* login.js create by wuwc in 2016-08-18 */
define(function(require,exports,module){
    // 引入依赖js文件
    var $ = require('jquery');require('jquery.validate');require('distpicker');
    var utilsForm = require('utils/utils.form.js');
    $(function(){
        // login对象
        var uCenter = {
            formBaseInfo:$('#formBaseInfo'),
            distpicker:$('.distpicker'),
            btnEditBaseInfo:$('.btn-edit-baseinfo'),
            btnEditRealInfo:$('.btn-edit-realinfo'),
            btnAddLabel:$('.btn-add-skill'),
            btnCancel:$('.btn-cancel'),
            formHiddenGender:$('input[name="gender'),
            formHiddenSphere:$('input[name="sphere'),
            formHiddenSkills:$('input[name="skills'),
            init:function(){
                var self = this,addressArr = self.splitBySpace($('.sw_address').text());
                //编辑的字段
                this.editfields = {
                    name:$('#username'),
                    gender:$('.gender'),
                    address:$('.distpicker'),
                    sphere:$('.sphere'),
                    skills:$('.list-skills')
                };
                //基本信息
                this.baseInfo = {
                    name:$('.sw_name').text(),
                    gender:$('.sw_gender').text()==='男'?0:1,
                    address:{
                        province:addressArr[0],
                        city:addressArr[1],
                        district:addressArr[2]
                    },
                    sphere:self.splitBySpace($('.sw_sphere').attr('data-id')),
                    skills:self.splitBySpace($('.sw_skills').text())
                };

                this.validate = this.formBaseInfo.validate(this.validatorConfigOne);
                //绑定事件函数
                this.bindEvent();
            },
            bindEvent:function(){
                var self = this;
                //编辑基本信息的函数
                this.btnEditBaseInfo.on('click',function(){
                    $('.baseinfo-edit').removeClass('hidden').prev('div.baseinfo-show').addClass('hidden');
                    self.editBaseInfo(self.baseInfo);
                });
                //选择性别的效果
                this.editfields.gender.on('click','span.cn-radio',function(){
                    var that = $(this);
                        that.addClass('cur').siblings('span').removeClass('cur');
                        self.formHiddenGender.val(that.attr('data-gid'));
                });
                //选择领域的效果
                this.editfields.sphere.on('click','i[data-id]',function(){
                    $('#sphere-error').text('');//点击之后说明当前已有选择，则隐藏错误提示消息
                    $(this).toggleClass('chk');
                    self.reloadSphereValue();

                });
                /*
                * 添加技能标签
                * 1.获取新添加的技能标签
                * 2.判断在新添加之前有没有技能标签如果有的话，
                *   将两个标签数组合并放到技能标签的form隐藏域里面
                * */
                this.btnAddLabel.on('click',function(){
                    var that = $(this),a = that.prev('input'), b = new Array(), c= self.formHiddenSkills.val();
                        if(a.val() != ''){
                            var newSkill  = a.val().split(/[,\n\s]/g);
                            if(c !== ''){
                                b = c.split(',').concat(newSkill)
                            }else{
                                b = newSkill;
                            }
                            self.setSkills(b);
                            a.val('');
                        }
                });
                //删除技能标签
                this.editfields.skills.on('click','i',function(){
                    $(this).parent().remove();
                    self.reloadSkillsValue();
                });
                //取消
                this.btnCancel.on('click',function(){
                    $('.baseinfo-edit').addClass('hidden').prev('div.baseinfo-show').removeClass('hidden');
                });
            },
            /* 编辑信息的函数 */
            editBaseInfo:function(baseInfo){
                //1.昵称
                this.editfields.name.val(baseInfo.name);
                //2.性别
                this.setGender(baseInfo.gender);
                //3.地址
                this.distpicker.distpicker(baseInfo.address);
                //4.领域
                this.setSphere(baseInfo.sphere);
                //5.技能
                this.setSkills(baseInfo.skills);
            },
            /* 设置性别 */
            setGender:function(n){
                var n = n || 0,ipt_radio = this.editfields.gender.find('span.cn-radio');
                $(ipt_radio[n]).addClass('cur').siblings('span').removeClass('cur');
                this.formHiddenGender.val(n);//值设置到隐藏域里面
            },
            /* 设置领域 */
            setSphere:function(s){
                var self = this,s = s || [],sphere = this.editfields.sphere.find('i[data-id]');
                self.formHiddenSphere.val(s);//值设置到隐藏域里面
                for(var i= 0,len= s.length;i<len;i++){
                    $(sphere[i]).addClass('chk');
                }
            },
            /* 设置技能 */
            setSkills:function(s){
                var s = s || [],self = this;
                self.formHiddenSkills.val(s);//值设置到隐藏域里面
                for(var i= 0,len= s.length;i<len;i++){
                    if(s[i] !== ''){
                        self.editfields.skills.append('<span>'+s[i]+'<i></i></span>');
                    }
                }
            },
            /* 重新加载关注领域的值 */
            reloadSphereValue:function(){
                var saveSphereValue = [];
                this.editfields.sphere.find('i.chk').each(function(){
                    saveSphereValue.push($(this).attr('data-id'));
                });
                this.formHiddenSphere.val(saveSphereValue);
            },
            /* 重新加载技能标签的值 */
            reloadSkillsValue:function(){
                var saveSkillsValue = [];
                this.editfields.skills.find('span').each(function(){
                    saveSkillsValue.push($(this).text());
                });
                this.formHiddenSkills.val(saveSkillsValue);
            },
            /* 根据空格分隔返回数据函数 */
            splitBySpace:function(v){
                return v.split(/[,\n\s]/g);
            },
            validatorConfigOne:{
                ignore:"",
                rules:{
                    username:{required:true},
                    sphere:{required:true}
                },
                messages:{
                    username:{required:"请输入昵称"},
                    sphere:{required:"请选择关注领域"}
                }
            }
        };
        //初始化login页面
        uCenter.init();
    });
});




