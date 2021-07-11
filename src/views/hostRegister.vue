<!--
    房东注册界面
    by:汪明杰
-->
<template>
    <div
    style="height:645px;">
        <el-image
            :src="require('@/assets/registerImg/plant11.png')"
            style="
            position: absolute;
            width: 7%;
            left: 1%;
            bottom: 0;
            "
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
                    style="width: 40%;"
                    icon="el-icon-right"
                    plain
                    >下一步</el-button>
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
import {sendMessage} from '@/api/public'
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
        nextStep(){
            if(this.curStep==0){
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
            this.curStep+=1;
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