<!--
  导航栏
  by：汪明杰
  最近更新时间：7/7 23:40
-->

<template>
    <el-header>
      <el-menu 
      :default-active="activeIndex" 
      class="el-menu-demo" 
      mode="horizontal" 
      
      @select="handleSelect"
      style="
      height: 100%;
      width: 111.8%;
      left: -10%;
      top:-5%;
      align-self: center;
      background-color: rgba(246,248,248,0.913);
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
      ">
        <el-menu-item>
          <el-image 
<<<<<<< HEAD
        :src="require('@/assets/biglogo.png')"
        style="width: 25%;
        left: 15%;"
        >
        </el-image>
=======
            :src="require('@/assets/biglogo.png')"
            style="width: 25%;
            left: 15%;"
            >
          </el-image>
>>>>>>> parent of a709369 (重新修改merge)
        </el-menu-item>

        <el-menu-item style="width: 30%;">
          <!--搜索框-->
          <div style="width:100%; margin-left: 50px;">
            <el-input 
            placeholder="从这里开始，寻找你的归宿" 
            v-model="searchText" 
            class="input-with-select"
            size='medium'
            maxlength=20
            clearable
            >
              <el-select v-model="selectSearch" slot="prepend" placeholder="请选择"
              style="width:80px">
                <el-option label="民宿" value="1"></el-option>
                <el-option label="地点" value="2"></el-option>
              </el-select>
              <el-button slot="append" icon="el-icon-search" @click="handleSearchResult()"></el-button>
            </el-input>
          </div>

        </el-menu-item>
        
        <el-menu-item style="margin-left:10%;">
          <el-divider direction="vertical" >  </el-divider>
        </el-menu-item>

        <el-menu-item index="1" style="padding-left:0% ">
          <i class="el-icon-s-home"></i>
          首页
        </el-menu-item>
        <el-menu-item index="2" style="padding-left:0% ">
          <i class="el-icon-star-on"></i>
          收藏夹</el-menu-item>
        <!-- //AUT:CKX -->
        <el-menu-item index="3" style="padding-left:0% ">
          <i class="el-icon-document"></i>
          历史足迹</el-menu-item> 
        
        <el-menu-item index="4" style="padding-left:0%">
          <i class="el-icon-message"></i>
          <el-badge 
          :is-dot="hasNewMessage" 
          class="item"
          style="height: 20px;"
          >
            <span style="position: relative;top:-21px">
              消息
            </span>
          </el-badge>
        </el-menu-item>

<<<<<<< HEAD
        <el-submenu index="5" v-if="hasLogin" style="float: right;">
=======
        <!--房东个人信息-->
        <el-submenu index="5" v-if="loginState==2" style="float: right;">
          <template #title>
            <!--显示头像-->
            <el-avatar :size="30" :href='userAvatar' :src="userAvatar" @error="errorHandler">
              <!--这里是失败时候展示的图片-->
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            {{userName}}
          </template>
          <el-menu-item index="5-1">个人信息</el-menu-item>
          <el-menu-item index="5-2">我的房源</el-menu-item>
          <el-menu-item index="5-3">我的待定</el-menu-item>
          <el-menu-item index="5-4">退出登录</el-menu-item>
        </el-submenu>
        <!--顾客个人信息-->
        <el-submenu index="5" v-if="loginState==1" style="float: right;">
>>>>>>> parent of a709369 (重新修改merge)
          <template #title>
            <!--显示头像-->
            <el-avatar :size="30" href='https://www.baidu.com/s?wd=%E4%B8%AA%E4%BA%BA%E4%BF%A1%E6%81%AF%E7%95%8C%E9%9D%A2' :src="userAvatar" @error="errorHandler">
              <!--这里是失败时候展示的图片-->
              <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
            </el-avatar>
            {{userName}}
          </template>
          <el-menu-item index="5-1">个人信息</el-menu-item>
          <el-menu-item index="5-2">我的订单</el-menu-item>
          <el-menu-item index="5-3">我的礼券</el-menu-item>
          <el-menu-item index="5-4">退出登录</el-menu-item>
        </el-submenu>
<<<<<<< HEAD
        <el-menu-item  v-else style="float: right;" >
=======
        <el-menu-item  v-if="loginState==0" style="float: right;" >
>>>>>>> parent of a709369 (重新修改merge)
          <el-link :underline="false" @click="login">登录</el-link>
          <el-dialog  
          :visible.sync="dialogTableVisible" 
          center 
          :append-to-body='true' 
          :lock-scroll="false" 
          width="500px"
          :show-close="false"
          class="login-dialog-box"

          >
          <div slot="title" class="header-title">

            <el-image 
            :src="require('@/assets/loginHeader.png')"
            style="width: 100%;
            "
            ></el-image>
          </div>
            <login-name
            @logins="changeLoginState"
            @closeLogin="closeLogin"
            ref="loginComponent"
            />
          <div slot="footer">
            <el-button type="primary" @click="changeLoginState" class="loginButton">登录</el-button>
            <el-button @click="register" class="registerButton">注册</el-button>
          </div>
          </el-dialog>
        </el-menu-item>

      </el-menu>

    </el-header>
    
</template>
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

<script>
import ref from 'vue';
import LoginName from '@/components/login.vue'
import { mapMutations } from 'vuex';
import { getFavorite,customerLogin } from '@/api/customer'
<<<<<<< HEAD
=======
import {hostLogin} from '@/api/host'
>>>>>>> parent of a709369 (重新修改merge)

export default {
  name: 'navigate',
  components:{
    LoginName
  },
  created:function(){
    /*
    初始化，判断是否有token
    */
    let token = localStorage.getItem('Authorization');
 
    if (token === null || token === '') {
      //无token，需要登录
      console.log('本次访问网页无token信息')
      return;
    }
    else{
      //有token，则读取token
      console.log('本次访问网页有token信息，已自动读取')
      this.userName=localStorage.getItem('userName');
      this.userAvatar=localStorage.getItem('userAvatar');
<<<<<<< HEAD
      this.hasLogin=true;
=======
      this.userIdentity=localStorage.getItem('userIdentity');
      console.log(this.userIdentity,this.userIdentity==='host')
      this.loginState=this.userIdentity==='Host'?2:1;
>>>>>>> parent of a709369 (重新修改merge)
    }

    //
  },
  mounted(){
    window['startLogin']=()=>{
      this.login()
    }
  },
  methods:{

    // add@ckx
    errorHandler(){
      return true
    },
    ...mapMutations(['delLogin']),
    handleSelect(key, keyPath) {
      //这里表示切换了导航内容，应该更换路由
      console.log( keyPath);
      console.log('处理选择信息');
      if(key==='2'){
        console.log('??')
        this.$router.push({path:'/favoritesPage'});
        return;
      }
<<<<<<< HEAD
      if (this.hasLogin){
=======
      if (this.loginState==1){
>>>>>>> parent of a709369 (重新修改merge)
        if (keyPath[1]==='5-4'){
          console.log('正在退出登录')
          //清除token信息
          this.delLogin();
<<<<<<< HEAD
          this.hasLogin=false;
        }
        else if (keyPath[1]==='5-1'){
          console.log('查看个人信息')
=======
          this.loginState=0;
        }
        else if (keyPath[1]==='5-1'){
          console.log('查看顾客个人信息')

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
>>>>>>> parent of a709369 (重新修改merge)

        }
      }
      else{
        if (key=='5'){
          console.log('打开登录界面')
        }
      }

    },
    login(){
      this.dialogTableVisible=true;
      //更新验证码

    },
    closeLogin(){
      /*
      关闭登录窗口
      */
      console.log('登录窗口被关闭');
      this.dialogTableVisible=false;
    },
    isLegalPhone(){
        /*
        判断输入的手机号是否合法
        */
        var myreg = /^1[3|4|5|7|8|9][0-9]{9}$/;
        if (!myreg.test(this.$refs.loginComponent.phonenumber)) {
            console.log('手机号格式不正确')
            return false;
        } 
        else {
            console.log('手机号格式正确')
            return true;
        }
    },
    ...mapMutations(['changeLogin']),
    changeLoginState(){
      /*
      点击登录，检验信息
      */

      let param={
<<<<<<< HEAD
          prenumber:'+86',
          phonenumber:this.$refs.loginComponent.phonenumber,
          password:this.$refs.loginComponent.password
        }
      
      console.log('param',param)
=======
        prenumber:'+86',
        phonenumber:this.$refs.loginComponent.phonenumber,
        password:this.$refs.loginComponent.password
      }
      
>>>>>>> parent of a709369 (重新修改merge)

      if(!this.isLegalPhone()){
        this.$message({
          message: '请输入正确的手机号',
          type: 'warning'
        });
        return false;
      }
<<<<<<< HEAD
      if(param.password===''){
        this.$message({
          message: '',
=======
      if(param.password.length<6){
        this.$message({
          message: '密码长度不正确',
>>>>>>> parent of a709369 (重新修改merge)
          type: 'warning'
        });
        return false;
      }

<<<<<<< HEAD
      customerLogin(param).then(response=>{

          //判断是否登录成功
          if (response.data.loginState){
            this.userName=response.data.userName;
            //获取token
            this.userToken = response.data.token;
            // 将用户token保存到vuex中
            this.changeLogin({ 
              Authorization: this.userToken,
              userName:response.data.userName,
              userAvatar:response.data.userAvatar
            });

            this.dialogTableVisible=false;
            this.hasLogin=true;
            console.log('成功登录')
          }
          else{
            this.$message({
              message: '账号不存在或密码错误！',
              type: 'warning'
            });
            return;
          }

          //尝试读取cookie
          let all=document.cookie
          console.log('cookie:',all)
      }).catch((error)=>{
        this.$message({
            message: error,
            type: 'warning'
          });
        console.log('error',error)
        return;
      })
=======
      //判断当前登录对象
      if(this.$refs.loginComponent.customerLogin){
        customerLogin(param).then(response=>{
        //判断是否登录成功
        if (response.data.loginState){
          this.userName=response.data.userName;
          this.userAvatar=response.data.userAvatar;
          //获取token
          this.userToken = response.data.token;
          // 将用户token保存到vuex中
          this.changeLogin({ 
            Authorization: this.userToken,
            userName:response.data.userName,
            userAvatar:response.data.userAvatar,
            userIdentity:'Customer'
          });

          this.dialogTableVisible=false;
          this.loginState=1;
          console.log('顾客成功登录')
        }
        else{
          this.$message({
            message: '账号不存在或密码错误！',
            type: 'warning'
          });
          return;
        }

        }).catch((error)=>{
        this.$message({
          message: '登录失败，请稍后重试',
          type: 'warning'
        });
        console.log('error',error)
        return;
        })
      }
      else{
        //房东登录
        hostLogin(param).then(response=>{
        //判断是否登录成功
        if (response.data.loginState){
          this.userName=response.data.userName;
          this.userAvatar=response.data.userAvatar;

          console.log('头像为',this.userAvatar)

          //获取token
          this.userToken = response.data.token;
          // 将用户token保存到vuex中
          this.changeLogin({ 
            Authorization: this.userToken,
            userName:response.data.userName,
            userAvatar:response.data.userAvatar,
            userIdentity:'Host'
          });

          this.dialogTableVisible=false;
          this.loginState=2;
          console.log('房东成功登录')
        }
        else{
          this.$message({
            message: '账号不存在或密码错误！',
            type: 'warning'
          });
          return;
        }

        }).catch((error)=>{
        this.$message({
          message: '登录失败，请稍后重试',
          type: 'warning'
        });
        console.log('error',error)
        return;
        })
      }

      
>>>>>>> parent of a709369 (重新修改merge)

      
    },
    register(){
      //注册账号,切换路由
      this.dialogTableVisible=false;
<<<<<<< HEAD
      console.log('注册账号界面')
      this.$router.replace('/register')
=======
      console.log('跳转至注册账号界面')
      //根据当前选项，跳转至不同界面
      if(this.$refs.loginComponent.customerLogin){
        this.$router.replace('/register')
      }
      else{
        this.$router.replace('/hostRegister')
      }
      
>>>>>>> parent of a709369 (重新修改merge)
      
    },
    handleSearchResult(){
      //点击搜索按钮后的逻辑
      if(this.searchText===''){
        this.$notify.info({
          message: '请输入搜索内容'
        });
        return;
      }
      this.setlocalHistory(this.searchText);
      this.searchText='';

      //! 在这之后加入你的搜索与后端交互逻辑，就是点击搜索按钮后的各种跳转页面和传值

    },
    getCurrentTime(){
        //获取当前时间字符串 如2021/7/4 10:58:38
        let yy=new Date().getFullYear();
        let mm=new Date().getMonth()+1;
        let dd=new Date().getDate();
        let hh=new Date().getHours();
        let mn=new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        let ss=new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        return yy+'/'+mm+'/'+dd+' '+hh+':'+mn+':'+ss;
    },
    setlocalHistory(val){
        /*
        点击搜索按钮后的逻辑处理
        @ckx
        */

        val=val.trim(); //去空格啥的
        val=this.getCurrentTime()+" "+val; //开头加上时间戳
        let localHistory=localStorage.getItem('localHistory');//获取历史记录
        if(localHistory===null){
            localStorage.setItem('localHistory',val)    // 若未设置过则直接设置本地存储
            console.log(localHistory);
        }else{
            let tempArray = localHistory.split('|')
            if(tempArray.length>0){
                localHistory = val + '|' + tempArray.join('|'); // 新增记录
            }
            if(localHistory.split('|').length>100){    //历史记录超过100项
                tempArray=localHistory.split('|');
                tempArray.pop(); //删除最旧的一项
                localHistory=tempArray.join('|');
            }
            localStorage.setItem('localHistory',localHistory);  //存入本地
        }
        console.log(localHistory);
    }
  },
  data(){
    return {
      selectSearch:'1',
      searchText:'',
      activeIndex:'1',
<<<<<<< HEAD
      hasLogin:false, //登录状态，先用这个
=======
      loginState:0, //登录状态，先用这个
>>>>>>> parent of a709369 (重新修改merge)
      dialogTableVisible: false,
      hasNewMessage:true,//是否有新消息
      getMessage:'',
      userName:'',//用户名
      userAvatar:'',//用户头像信息
<<<<<<< HEAD
=======
      userIdentity:'',//用户身份信息
>>>>>>> parent of a709369 (重新修改merge)
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