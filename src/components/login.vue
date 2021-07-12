<!--
  顾客登录输入框组件
  by：汪明杰
-->

<template>
    <el-container style="height: 100%;">
        <el-header style="height: auto;">
            <!--顾客身份-->
            <el-image 
                :src="customerIcon"
                style="width: 10%;position:absolute;top:20%"
                @click="changeToCustomer(1)"
                @mouseover="changeToCustomer(2)" 
                @mouseout="changeToCustomer(3)"
            ></el-image>
            
            <p 
            style="font-size: xx-large;
            margin-top: 10px;
            text-align: center;">
            登录</p>
            <!--房东身份-->
            <el-image 
                :src="hostIcon"
                style="width: 10%;position:absolute;top:20%;right: 10%;"
                @click="changeToHost(1)"
                @mouseover="changeToHost(2)" 
                @mouseout="changeToHost(3)"
            ></el-image>
            <p>登录“归宿”，体验专属于你的精彩世界！</p>
        </el-header>
        <el-form style="margin-top: 20px;margin-left: 40px; margin-right: 40px;height: 100%;">
            <el-row style="height: 100%;">
                <el-form-item>
                    <el-input v-model="phonenumber" placeholder="手机号"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input 
                    v-model="password" 
                    placeholder="请输入密码" 
                    show-password
                    ></el-input>
                </el-form-item>
                <!--验证码-->
                <el-form-item style="height: 100%;margin-bottom: 0;">
                    <el-col :span="11">
                        <el-input 
                        v-model="verifycode" 
                        placeholder="验证码"
                        maxlength=4
                        >
                        </el-input>
                    </el-col>
                    <el-col :span="11" style="margin-left: 30px;height: 100%;">
                        <el-image
                        :src="codeimg"
                        style="width: 140px;height:50px">
                        </el-image>
                    </el-col>
                    
                </el-form-item>
                <el-form-item style="margin-bottom: 10px;">
                    <el-col :span="11" style="margin-left: 20px;">
                        <el-checkbox label="记住我" name="type"></el-checkbox>
                    </el-col>
                    <el-col :span="11" style="width: auto;margin-left: 40px;">
                        <el-button 
                        type="text"
                        @click="forgetPassword"
                        >
                            忘记密码？</el-button>
                    </el-col>
                </el-form-item>
                
            </el-row>
        </el-form>
    </el-container>
</template>
  
<script>
import { getVerifyCode } from '@/api/public'

export default {
    name: 'LoginName',//这个LoginName最好和引入的vue的LoginName相同
    data(){
        return{
            phonenumber:'',
            password:'',
            verifycode:'',
            codeimg:'',
            customerLogin:true,//标记当前是顾客登录还是房东登录
            customerIcon:require('@/assets/customerIconSelected.png'),
            hostIcon:require('@/assets/hostIcon.png'),
        }
    },
    created(){
        /*
        页面生成时更新
        */
       this.updateVerifyCode();
    },
    methods:{
        submitForm(){
            console.log('点击登录键')
            // this.$parent.$parent.$parent.$parent.$parent.dialogTableVisible=false;
            this.$emit("logins")
        },
        updateVerifyCode(){
            /*
            更新验证码
            */
            console.log('正在尝试更新验证码');
            getVerifyCode().then(response=>{
                console.log('verifycode:',response)
            })
        },
        changeToCustomer(index){
            if(index==1){
                if(this.customerLogin){
                    return;
                }
                this.$message({
                    message: '已切换为顾客登录',
                    type: 'success'
                });
                console.log('切换为顾客登录');
                this.customerLogin=true;
                this.customerIcon=require('@/assets/customerIconSelected.png');
                this.hostIcon=require('@/assets/hostIcon.png');
            }
            else if (index==2&&!this.customerLogin){
                //鼠标移动上来
                this.customerIcon=require('@/assets/customerIconHover.png');
            }
            else if (index==3){
                //鼠标移动出去
                if(this.customerLogin){
                    this.customerIcon=require('@/assets/customerIconSelected.png');
                }
                else{
                    this.customerIcon=require('@/assets/customerIcon.png');
                }
            }
            
        },
        changeToHost(index){
            if(index==1){
                if(!this.customerLogin){
                    return;
                }
                this.$message({
                    message: '已切换为房东登录',
                    type: 'success'
                });
                console.log('切换为房东登录');
                this.customerLogin=false;
                this.customerIcon=require('@/assets/customerIcon.png');
                this.hostIcon=require('@/assets/hostIconSelected.png');
            }
            else if (index==2&&this.customerLogin){
                //鼠标移动上来
                this.hostIcon=require('@/assets/hostIconHover.png');
            }
            else if (index==3){
                //鼠标移动出去
                if(!this.customerLogin){
                    this.hostIcon=require('@/assets/hostIconSelected.png');
                }
                else{
                    this.hostIcon=require('@/assets/hostIcon.png');
                }
            }

        },
        forgetPassword(){
            /*
            忘记密码
            */
           console.log('忘记密码按钮被触发')
            this.$router.replace('/forgetPassword');
            //关闭登录界面
            this.$emit('closeLogin');
        }
    }
}
</script>

<style scoped>

</style>
