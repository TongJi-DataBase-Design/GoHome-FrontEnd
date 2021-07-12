<template>
<div>
  <el-container>
    <el-header> 导航栏 </el-header>
    <el-main>
      <el-card class="box-card">
        <div class="login" style="margin-bottom:15px;">
            管理员登录
        </div>
        <el-form label-width="60px">
          <el-form-item label="用户名"> 
            <el-input v-model="username"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input v-model="password" show-password></el-input>
          </el-form-item>
          <el-form-item label="验证码">
            <el-input></el-input>
          </el-form-item>
        </el-form>
        <div class="login">
        <el-button type="primary" round style="width:35%;margin-bottom:10px;" @click="clilogin">登录</el-button>
        </div>
      </el-card>
    </el-main>
    <el-footer>
    </el-footer>
  </el-container>
</div>
</template>

<style scoped>
.el-main{
    background-image: url(https://www.picbed.cn/images/2021/07/12/1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 350px;
  height: 500px;
  margin: 0 auto;
}

.login{
    text-align: center;
    margin: 0 auto;
}

.el-button{
    margin: 0 auto;
    text-align: center;
}
</style>

<script>
export default {
  name: 'adminlogin',
  components:{
  },
    data(){
        return{
            username:"",
            password:"",
        }
    },
    methods:{
        clilogin:function(){
            this.$router.push({name:"Inter"});  
        }
    }
}
</script>