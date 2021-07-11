<!--
    房东注册界面
    by:汪明杰
-->
<template>
    <div
    style="height:645px;">
        <!--装饰植物-->
        <el-image
            :src="require('@/assets/registerImg/plant11.png')"
            style="
            position: absolute;
            width: 7%;
            left: 1%;
            bottom: 0;
            "
            v-if="curStep==0"
        ></el-image>
        <el-image
            :src="require('@/assets/registerImg/plant14.png')"
            style="
            position: absolute;
            width: 5%;
            left: 1%;
            bottom: 0;
            "
            v-if="curStep==1"
        ></el-image>
        <el-image
            :src="require('@/assets/registerImg/plant1.png')"
            style="
            position: absolute;
            width: 7%;
            left: 1%;
            bottom: 0;
            "
            v-if="curStep==2"
        ></el-image>
        <el-container
        style="height: 100%;"
        >
            <el-aside
            style="
            width: 36%;
            height: 100%;
            box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
            opacity: 0.9;
            "
            >
            <div style="margin-bottom: 10%;width: 75%;margin-left: 12%;margin-top: 10%;">
                <el-divider>
                  <strong style="font-size: xx-large;">注册</strong>
                </el-divider>
              </div>
            <el-steps :active=curStep finish-status="success" simple style="margin-top: 20px">
                <el-step title="基本信息" ></el-step>
                <el-step title="实名认证" ></el-step>
                <el-step title="完成注册" ></el-step>
            </el-steps>

            <!--第一阶段信息-->
            <el-form 
            ref="form" 
            style="margin-right: 15%;margin-top: 15%;margin-left: 15%;"
            v-if="curStep==0"
            >
                <el-form-item>
                  <el-input 
                  v-model="name"
                  placeholder="昵称"
                  maxlength="10"
                  ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    v-model="password"
                    placeholder="密码(6-16个字符组成，区分大小写)"
                    maxlength="16"
                    minlength="6"
                    type="password"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    v-model="phone"
                    placeholder="填写常用手机号"
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    v-model="verifyCode" 
                    style="width: 50%;"
                    placeholder="请输入短信验证码"
                    maxlength="6"
                    ></el-input>
                    <el-button 
                    type='primary' 
                    style="margin-left: 5%;" 
                    @click="getCode"
                    :disabled="!canSendMessage"
                    >
                      {{messageButtonName}}
                    </el-button>
                </el-form-item>
                
                <el-form-item>
                    <el-button 
                    type="primary" 
                    @click="nextStep"
                    style="width: 40%;margin-top: 5%;"
                    icon="el-icon-right"
                    plain
                    >下一步</el-button>
                </el-form-item>
            </el-form>

            <!--第二阶段信息-->
            <el-form
            style="margin-right: 15%;margin-top: 5%;margin-left: 15%;"
            v-if="curStep==1"
            >
            <!--
                <el-form-item>
                <el-input 
                v-model="trueName"
                placeholder="真实姓名"
                maxlength="10"
                ></el-input>
            </el-form-item>
            <el-form-item>
                <el-input 
                v-model="ID"
                placeholder="身份证号"
                maxlength="18"
                ></el-input>
            </el-form-item>
            -->
            <el-form-item>
                <p>请上传身份证号正反面，用于实名认证</p>

                <el-upload
                    action="none"
                    list-type="picture-card"
                    :on-preview="handlePictureCardPreview"
                    :on-remove="handleRemove"
                    :limit="2"
                    :on-change="checkPhoto"
                    :auto-upload="false"
                >
                <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog >
                <img width="100%" :src="dialogImageUrl" alt="">
                </el-dialog>
            </el-form-item>
            <el-form-item>
                <el-button 
                type="primary" 
                @click="nextStep"
                style="width: 40%;"
                icon="el-icon-right"
                plain
                >下一步</el-button>
            </el-form-item>

            </el-form>

            <!--第三阶段信息-->
            <el-form 
            label-width="80px" 
            v-if="curStep==2"
            style="
            width: 70%;
            margin-left: 15%;
            margin-top:10%;
            "
            >
                <el-form-item label="手机号">
                  <el-input v-model="phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名">
                  <el-input v-model="trueName" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="身份证号">
                  <el-input v-model="ID" :disabled="true"></el-input>
                </el-form-item>
                <!--相关事项-->
                <el-form-item>
                    <el-checkbox 
                    v-model="licenseAccept"
                    >
                        我已同意
                        <el-link 
                        type="primary"
                        :underline="false"
                        >
                        <router-link target="_blank" :to="{path:'/license'}">
                        《归宿平台用户使用协议》
                        </router-link>
                        </el-link>
                    </el-checkbox>
                </el-form-item>
                <el-form-item>
                    <el-button 
                    type="primary" 
                    @click="nextStep"
                    style="width: 40%;margin-top: 5%;"
                    icon="el-icon-upload2"
                    plain
                    >确认提交</el-button>
                </el-form-item>
            </el-form>

            </el-aside>
            <el-main>
                <!--竖版归宿-->

                <el-image
                :src="require('@/assets/biglogo.png')"
                style="
                position: absolute;
                width: 10%;
                top: 50%;
                left:80%;
                "
                >

                </el-image>

                <!--走马灯展示-->
                <el-carousel 
                    :interval="4000" 
                    height="390px"
                    indicator-position=none
                    arrow=never
                    style="
                    margin-top: 21%;
                    "
                    >
                    <el-carousel-item v-for="(item,index) in showImage" :key="index"
                    style="height: auto;margin-top: 5%;">
                        <p style="text-align: center;margin-left: 10%;">{{item.name}}</p>
                        <el-image :src="item.image"
                        fit="contain"
                        style="
                        width: 30%;
                        "
                        >
                        </el-image>
                    </el-carousel-item>
                </el-carousel>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import { hostRegister,phoneUnique } from '@/api/host'
import {sendMessage,IDVerify} from '@/api/public'
import axios from 'axios'

export default {
    data(){
        return{
            curStep:0, //当前进度

            name: '',
            password:'',
            phone:'',
            verifyCode:'',
            correctCode:'',
            canSendMessage:true, //发送验证码按钮状态
            waitingTime:60, //剩余需要等待的时间
            messageButtonName:'获取验证码',
            messageIsSend:false,//验证码尚未被发送
            licenseAccept:false,//是否同意协议

            ID:'', //身份证号
            trueName:'',//真实姓名
            fileImg:[],

            dialogImageUrl: '',
            dialogVisible: false,

            //走马灯数据
            showImage:[
                {
                name:'从这里开始',
                image:require('@/assets/registerImg/house0.png'),
                },
                {
                name:'升级你的民宿',
                image:require('@/assets/registerImg/house1.png')
                },
                {
                name:'吸引更多客人',
                image:require('@/assets/registerImg/house2.png')
                },
                {
                name:'你的未来可期',
                image:require('@/assets/registerImg/house3.png')
                },
            ]
        }
    },
    created(){

    },
    methods:{
        //身份证上传处理相关
        handleRemove(file, fileList) {
            console.log(file, fileList);
            for(let i=0;i<this.fileImg.length;++i){
                if(this.fileImg[i]==file){
                    //删除该元素
                    console.log('删除的图片编号为',i);
                    if(i==0){
                        this.fileImg.shift();
                    }
                    else{
                        this.fileImg.pop();
                    }
                    return;
                }
            }
        },
        handlePictureCardPreview(file) {
            this.dialogImageUrl = file.url;
            this.dialogVisible = true;
        },
        checkPhoto(file,fileList){
            console.log('正在检查上传的图片')
            this.fileImg.push(file);
        },
        nextStep(){
            console.log('file:',this.fileImg);
            if(this.curStep==0){
                this.curStep++;
                return;
                //检验是否填写了昵称
                if(this.name===''){
                    this.$message({
                    message: '请填写用户昵称',
                    type: 'warning'
                    });
                    return;
                }

                //判断是否输入了手机号
                if(!this.isLegalPhone()){
                    this.$message({
                    message: '请输入正确的手机号',
                    type: 'warning'
                    });
                    return false;
                }

                //检验是否完成发送验证码的步骤
                if (!this.messageIsSend){
                    this.$message({
                    message: '请先发送验证码',
                    type: 'warning'
                    });
                    return false;
                }

                //判断验证码是否正确
                if(this.correctCode!=this.verifyCode){
                    this.$message({
                        message: '验证码输入错误',
                        type: 'warning'
                    });
                    return false;
                }
            }
            else if (this.curStep==1){
                //上传图片相关
                if(this.fileImg.length!=2){
                    this.$message({
                        message: '请上传身份证的正面和反面照片',
                        type: 'warning'
                    });
                    return false;
                }
                //调用身份证检验api
                console.log(this.fileImg[0].raw)

                let param={
                    positivephoto:this.fileImg[0].raw,
                    negativephoto:this.fileImg[1].raw
                }

                IDVerify(param).then(response=>{
                    if(response.verifyResult){
                        //身份证校验成功
                        this.$message({
                            message: '身份证号检验成功！',
                            type: 'success'
                        });
                        //读取身份证号
                        this.ID=response.trueID
                        this.trueName=response.trueName

                        //进入下一步
                        this.curStep+=1;
                    }
                    else{
                        this.$message({
                            message: '无效的身份证，请重新上传',
                            type: 'warning'
                        });
                        return;
                    }
                }).catch(error=>{
                    this.$message.error('发生异常，请稍后再试');
                    //debug
                    this.curStep+=1;
                    return;
                })
            }
            else if (this.curStep==2){
                //检验是否同意协议
                if(!this.licenseAccept){
                    this.$message({
                    message: '请同意《归宿平台用户使用协议》',
                    type: 'warning'
                    });
                    return;
                }

                //获取注册信息
                let param={
                    prenumber:'+86',
                    phonenumber:this.phone,
                    password:this.password,
                    username:this.name,
                    ID:this.ID,
                    truename:this.trueName,
                    gender:this.ID[-2]==='1'?'M':'F'
                }
                console.log('最终提交的注册信息为',param);

                //判断完成，注册
                hostRegister(param).then(response=>{
                    console.log(response)
                    if(response.reigisterState){
                        this.curStep=4;
                        
                        this.$message({
                            message: '成功注册账号！',
                            type: 'success'
                        });

                        //跳转到首页
                        this.$router.push('/'); 

                        //打开登录界面
                        startLogin();
                    }
                    else{
                        this.$message.error('发生异常，请稍后再试');
                        return;
                    }
                }).catch(error=>{
                    this.$message.error('发生异常，请稍后再试');
                    return;
                })
            }
            
        },
        isLegalPhone(){
            /*
            判断输入的手机号是否合法
            */
            var myreg = /^1[3|4|5|7|8|9][0-9]{9}$/;
            if (!myreg.test(this.phone)) {
                console.log('手机号格式不正确')
                return false;
            } 
            else {
                console.log('手机号格式正确')
                return true;
            }
        },
        getCode(){
            /*
            发送验证码
            */

            //判断是否输入了手机号
            if(!this.isLegalPhone()){
                this.$message({
                message: '请输入正确的手机号',
                type: 'warning'
                });
                return false;
            }

            //首先判断手机号是否已被注册
            let param= {
                prenumber:'+86',
                phonenumber:this.phone,
            }
            
            console.log('param',param);
            phoneUnique(param).then(response=>{
                console.log('状态：',response.data.phoneunique)
                //判断手机号是否被注册过
                if (response.data.phoneunique){
                console.log('该手机号尚未被注册过')

                //暂时禁止发短信
                this.waitingTime=60;
                var waitingForMessage=setInterval(()=>{
                    this.canSendMessage=false;
                    this.waitingTime-=1;
                    this.messageButtonName='请等待'+this.waitingTime+'s';
                    if(this.waitingTime<=0){
                    clearInterval(waitingForMessage);
                    this.canSendMessage=true;
                    this.messageButtonName='获取验证码';
                    this.waitingTime=60;
                    }
                },600)
                
                //更新参数
                param= {
                    prenumber:'+86',
                    phonenumber:this.phone,
                    state:'2' //state为2：表示房东注册验证码
                }

                //手机号未被注册过，则发送验证码
                sendMessage(param).then(response=>{
                    if(response.data.sendstate){
                    console.log('成功发送验证码')

                    //读取回复中的验证码内容
                    this.correctCode=response.data.code;

                    //已经完成发送验证码步骤
                    this.messageIsSend=true;
                    }
                    else{
                    this.$message({
                        message: '发送失败，请稍后尝试重新发送',
                        type: 'error'
                    });
                    }

                })
                }
                else{
                console.log('该手机号已经被注册过')
                this.$message({
                    message: '该手机已被注册',
                    type: 'warning'
                });
                return;
                }
            }).catch(error=>{
                this.$message.error('发生异常，请稍后再试');
                return;
            })
        }
    }
}
</script>

<style scoped>
.el-main{
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  background-image: url('../assets/registerImg/cityLife.png');
  background-size: 115%;
  background-repeat: no-repeat;
}
</style>