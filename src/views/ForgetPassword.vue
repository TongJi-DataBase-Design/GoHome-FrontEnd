<!--
    找回密码页面
    by：汪明杰
-->

<template>
    <div
    class="blueSky"
    >
        <div style="display: block;height: 30px;"></div>
        <el-image
            :src="require('@/assets/forgetPassword/beautifulPlant.png')"
            style="
            width: 3%;
            left: -10%;
            margin-bottom: -0.3%;
            display: inline-block;
            "
        ></el-image>
        <el-image
            :src="require('@/assets/forgetPassword/beautifulPlant2.png')"
            style="
            width: 4%;
            left: 10%;
            margin-bottom: -1%;
            display: inline-block;
            "
        ></el-image>
        <div style="
        width: 40%;
        height: 450px;
        margin-left: 30%;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
        opacity: 1;
        background-color: white;
        ">
            <div style="
            margin-bottom: 5%;
            padding-top: 5%;
            width: 60%;
            margin-left: 20%;
            background-color: white;
            ">
                <el-divider>
                <strong style="font-size: xx-large;">找回密码</strong>
                </el-divider>
                <el-form
                style="position: absolute;left:30.1%;top:78%;"
                ><!--54.6,30.1 21.1,78 -->
                    <el-form-item>
                        <el-radio-group 
                        v-model="isCustomer" 
                        size="middle"
                        :disabled="curStep==1"
                        >
                            <el-radio-button v-model="isCustomer" label="1" border>
                                <i class="el-icon-user"></i>
                                我是顾客
                            </el-radio-button>
                            <el-radio-button v-model="isCustomer" label="2" border>
                                <i class="el-icon-house"></i>
                                我是房东
                            </el-radio-button>
                        </el-radio-group>
                        
                    </el-form-item>
                </el-form>
            </div>
            <el-steps 
            :active="curStep" 
            finish-status="success" 
            simple 
            style="margin-top: 8%;
            ">
                <el-step title="手机号验证" icon="el-icon-mobile-phone"></el-step>
                <el-step title="修改密码" icon="el-icon-edit"></el-step>
            </el-steps>
            <el-form 
            ref="form" 
            style="margin-right: 15%;margin-top: 5%;margin-left: 15%;"
            v-if="curStep==0"
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
                    style="width: 60%;"
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
                    style="width: 40%;margin-top:5%;margin-bottom: 10%;"
                    icon="el-icon-right"
                    plain
                    >下一步</el-button>
                </el-form-item>
            </el-form>
            <el-form
            style="
            margin-left: 15%;
            margin-right: 15%;
            margin-bottom: 15%;
            margin-top:8%;
            "
            v-else>
                <el-form-item>
                    <el-input v-model="phone" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    v-model="newPassword"
                    placeholder="填写新密码"
                    ></el-input>
                </el-form-item>
                <el-button 
                    type="primary" 
                    @click="nextStep"
                    style="width: 40%;margin-top: 5%;"
                    icon="el-icon-check"
                    plain
                >确认修改</el-button>
            </el-form>
        </div>

    </div>
</template>

<script>
import { customerPhoneUnique,changeCustomerPassword } from '@/api/customer'
import { hostPhoneUnique,changeHostPassword } from '@/api/host'
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
            newPassword:'', //新密码
            isCustomer:'1',//顾客身份
        }
    },
    watch:{
        isCustomer:function(val,oldVal){
            if(val==='1'){
                this.$message({
                    message: '已切换为顾客找回密码',
                    type: 'success'
                });
            }
            else{
                this.$message({
                    message: '已切换为房东找回密码',
                    type: 'success'
                });
            }
            //切换之后，状态应当清空
            this.canSendMessage=true;
            this.waitingTime=60;
            this.messageButtonName='获取验证码',
            this.messageIsSend=false;
            this.verifyCode='';
        }
    },
    methods:{
        submitForm(){
            /*
            提交密码修改
            */
            if(this.newPassword.length<6){
                this.$message({
                    message: '密码长度不足6位',
                    type: 'warning'
                });
                return false;
            }

            
            let param={
                prenumber:'+86',
                phone:this.phone,
                password:this.newPassword
            }
            //根据当前身份进行不同操作
            if (this.isCustomer==='1'){
                
                changeCustomerPassword(param).then(response=>{
                    if(response.data.changestate){
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        //跳转到首页
                        this.$router.push('/'); 

                        //打开登录界面
                        startLogin();

                        return true;
                    }
                    else{
                        this.$message({
                            message: '修改失败，请检查密码',
                            type: 'error'
                        });
                        return false;
                    }
                }).catch(error=>{
                    this.$message.error('发生异常，请稍后再试');
                    return;
                })
            }
            else{
                changeHostPassword(param).then(response=>{
                    if(response.data.changestate){
                        this.$message({
                            message: '修改成功！',
                            type: 'success'
                        });
                        //跳转到首页
                        this.$router.push('/'); 

                        //打开登录界面
                        startLogin();

                        return true;
                    }
                    else{
                        this.$message({
                            message: '修改失败，请检查密码',
                            type: 'error'
                        });
                        return false;
                    }
                }).catch(error=>{
                    this.$message.error('发生异常，请稍后再试');
                    return;
                })
            }

        },
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
            
            //根据当前身份进行不同操作
            if(this.isCustomer==='1'){
                customerPhoneUnique(param).then(response=>{
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
            }
            else{
                hostPhoneUnique(param).then(response=>{
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
                        state:'3' //state为3：表示房东找回密码验证码
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
    }
}
</script>

<style scoped>
.blueSky{
    background-image: url('../assets/bg.jpg');
    background-size: 130%;
    background-repeat: no-repeat;
    height: 648px;
}
</style>