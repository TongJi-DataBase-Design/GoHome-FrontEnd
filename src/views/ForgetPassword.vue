<!--
    找回密码页面
    by：汪明杰
-->

<template>
    <div>
        <div style="
        width: 50%;
        height: 100%;
        margin-left: 25%;
        margin-top:5%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        ">
            <el-steps :active="curStep"
            style="
            margin-left: 5%;
            margin-right: 5%;
            margin-top: 5%;
            ">
                <el-step title="手机号验证" icon="el-icon-edit"></el-step>
                <el-step title="找回成功" icon="el-icon-upload"></el-step>
            </el-steps>
            <el-form 
            ref="form" 
            style="margin-right: 15%;margin-top: 15%;margin-left: 15%;"
            >
                <el-form-item>
                    <el-input 
                    v-model="phone"
                    placeholder="填写注册手机号"
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
                    style="width: 40%;"
                    icon="el-icon-right"
                    plain
                    >下一步</el-button>
                </el-form-item>
            </el-form>
        </div>

    </div>
</template>

<script>
import { phoneUnique } from '@/api/customer'
import { sendMessage } from '@/api/public'
import axios from 'axios'

export default{
    data(){
        return{
            canSendMessage:true, //发送验证码按钮状态
            waitingTime:60, //剩余需要等待的时间
            messageButtonName:'获取验证码',
            messageIsSend:false,//验证码尚未被发送
            phone:'',
            verifyCode:'',
            curStep:0,
        }
    },
    methods:{
        nextStep(){
            /*
            点击下一步按钮
            */

            console.log('点击了[下一步]')
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

            //输入无误，进入下一步
            this.curStep++;
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
                if (!response.data.phoneunique){

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
                    state:'1' //state为1：表示用户找回密码验证码
                }

                //发送验证码
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
                this.$message({
                    message: '该手机尚未被注册',
                    type: 'warning'
                });
                return;
                }
            }).catch(error=>{
                this.$message.error('发生异常，请稍后再试');
                return;
            })
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
    }
}
</script>