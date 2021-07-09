<!--
  登录输入框组件
  by：汪明杰
-->

<template>
    <el-container style="height: 100%;">
        <el-header style="height: auto;">
            <h1  align="center" style="font-size: xx-large;margin-top: 10px;">登录</h1>
            登录“归宿”，体验专属于你的精彩世界！
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
                        <el-link href="https://element.eleme.io" target="_blank" :underline="false">忘记密码？</el-link>
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
            codeimg:''
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
    }
}
</script>

<style scoped>

</style>
