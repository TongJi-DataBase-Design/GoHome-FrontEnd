<!--
  导航栏
  by：汪明杰
-->

<template>
  <el-header
    style="
      display: inline-block;
      width: 100%;
      margin-bottom: -5px;
      position: fixed;
      left: 0;
      z-index: 10;
    "
  >
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
      style="
        display: block;

        height: 100%;
        width: 106.5%;
        left: -5%;
        top: -5%;
        align-self: center;
        background-color: rgba(246, 248, 248, 0.913);
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px,
          rgba(0, 0, 0, 0.24) 0px 1px 2px;
      "
    >
      <el-menu-item>
        <el-image
          :src="require('@/assets/biglogo.png')"
          style="width: 25%; left: 15%"
        >
        </el-image>
      </el-menu-item>

      <!--顾客个人信息-->
      <el-submenu index="5" v-if="loginState == 1" style="float: right">
        <template #title>
          <!--显示头像-->
          <el-avatar
            :size="30"
            href="https://www.baidu.com/s?wd=%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF%E7%95%8C%E9%9D%A2"
            :src="userAvatar"
            @error="errorHandler"
          >
            <!--这里是失败时候展示的图片-->
            <img
              src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
            />
          </el-avatar>
          {{ userName }}
        </template>
        <el-menu-item index="5-1">
          <i class="el-icon-info"></i>
          个人信息</el-menu-item
        >
        <el-menu-item index="5-4">
          <i class="el-icon-remove"></i>
          退出登录</el-menu-item
        >
      </el-submenu>
      <el-menu-item v-if="loginState == 0" style="float: right">
        <el-link :underline="false" @click="login">登录</el-link>
      </el-menu-item>
    </el-menu>
  </el-header>
</template>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

<script>
import ref from 'vue';
import { mapMutations } from "vuex";
export default {
  name: 'navigate',
  
  mounted(){
    window['startLogin']=()=>{
      this.login()
      
    }
  },
  methods:{
    
    ...mapMutations(["delLogin"]),
    login:function() {
      this.userName=localStorage.getItem('userName');
      this.userAvatar=localStorage.getItem('userAvatar');
      this.userIdentity=localStorage.getItem('userIdentity');
      this.loginState=1;
    },

    // add@ckx
    errorHandler(){
      return true
    },
    handleSelect(key, keyPath) {
      //这里表示切换了导航内容，应该更换路由
      console.log( keyPath);
      console.log('处理选择信息');
      if(key==='1'){
        console.log('前往首页');
        this.$router.push({path:'/'});
        return;
      }
      if(key==='2'){
        this.$router.push({path:'/favoritesPage'});
        return;
      }
      if (this.loginState==1){
        if (keyPath[1]==='5-4'){
          console.log('正在退出登录')
          //清除token信息
          this.delLogin();
          this.loginState=0;
          this.$router.push("adminlogin");
        }
        else if (keyPath[1]==='5-1'){
          console.log('查看顾客个人信息')
          this.$router.replace("information");
        }
      }
      else if (this.loginState==2){
        if (keyPath[1]==='5-4'){
          console.log('正在退出登录')
          //清除token信息
          this.delLogin();
          this.loginState=0;
        }
        else if (keyPath[1]==='5-1'){
          console.log('查看房东个人信息')

        }
      }
      else{
        if (key=='5'){
          console.log('打开登录界面')
        }
      }

    },
    
  },
  data(){
    return {
      selectSearch:'1',
      searchText:'',
      activeIndex:'1',
      loginState:0, //登录状态，先用这个
      dialogTableVisible: false,
      hasNewMessage:true,//是否有新消息
      getMessage:'',
      userName:'',//用户名
      userAvatar:'',//用户头像信息
      userIdentity:'',//用户身份信息
    }
  }
}
</script>


<style>
  .dialogClass{ border-radius: 20px; }
</style>

<style scoped>

.el-divider--vertical{
  display:inline-block;
  width:1px;
  height:70%;		
  margin:0 0 2 2px;
  vertical-align:middle;
  position:relative;
}

.login-dialog-box{
  background-image:'../assets/bg.jpg';
}

.login-dialog-box >>> .el-dialog {
  border-radius: 20px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;

}
.login-dialog-box >>> .el-dialog .el-dialog__header{
  padding:0;
}
.login-dialog-box >>> .el-dialog .el-dialog__body {
  padding: 5px 10px 20px 20px;
}
.login-dialog-box >>> .el-dialog .el-dialog__footer {
  padding: 0px 10px 10px;
}
.loginButton{
  width: 100px;
  margin-right: 50px;
}
.registerButton{
  width: 100px;
}
.el-menu-item.is-active{
  font-weight: bold !important;
  background-color: rgba(0,0,0,0) !important;
}
.el-menu-item:hover{
  background-color: rgba(0,0,0,0) !important;
}
.el-menu:hover{
  background-color:none !important;
}

</style>

<style >
.el-submenu.el-submenu__title:hover{
  background-color:rgba(0,0,0,0) !important;
}
.el-submenu.el-submenu__title.is-active{
  background-color:rgba(0,0,0,0) !important;
}
</style>