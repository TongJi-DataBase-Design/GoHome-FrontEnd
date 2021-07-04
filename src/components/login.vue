<template>
    <el-container>
        <el-header style="height: auto;">
            <h1  align="center" style="font-size: xx-large;margin-top: 10px;">登录</h1>
            登录“归宿”，体验专属于你的精彩世界！
        </el-header>
        <el-form style="margin-top: 20px;margin-left: 40px; margin-right: 40px;">
            <el-row>
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


export default {
    name: 'LoginName',//这个LoginName最好和引入的vue的LoginName相同
    data(){
        return{
            phonenumber:'',
            password:''
        }
    },
    methods:{
        submitForm(){
            console.log('点击登录键')
            // this.$parent.$parent.$parent.$parent.$parent.dialogTableVisible=false;
            this.$emit("logins")
        }
    }
}
</script>

<style scoped>

</style>
