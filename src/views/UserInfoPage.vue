<template>

  <div >
    <el-container>
      <el-container>
        <el-aside width="450px" class="el-aside" scoped>

          <UserInfoBlock v-bind:user_img="user_img"
                         :review-num="reviewNum"
                         :user-group-level="UserGroupLevel"
                         :user-nick-name="UserNickName"
                         :authentication-tag="AuthenticationTag"
                         :email-tag="EmailTag"
                         :phone-tag="PhoneTag"
                         :tagimg-list="TagimgList"
                         :score="Score"

          ></UserInfoBlock>
          <el-divider direction="vertical" class="el-divider--vertical" ></el-divider>
        </el-aside>
        <el-main class="el-main">
          <UserInfoMessage   :user-nick-name="UserNickName"
                             :register-date="RegisterDate"
                             :comment-num="reviewNum"
                             :user-birth-date="userBirthDate"
                             :user-sex="userSex" :mood="mood"
                             :comment-list="commentList"
                             @UpdateName="updateNickName"
                             @UpdateNameBirthDay="updateNameAndBirthDate"
                             @UpdateNameSex="updateNameAndSex"
                             @UpdateAll="updateAllInfo"
                             @UpdateMood="updateMood"
                            ></UserInfoMessage>
        </el-main>
      </el-container>
    </el-container>

  </div>

</template>

<script>
import UserInfoBlock from "../components/UserInfoBlock";
import UserInfoMessage from "../components/UserInfoMessage";
import {getCustomerInfo} from "../api/customerInfo";
import {uploadBasicInfo} from "../api/customerInfo";
import { mapMutations } from 'vuex';
export default {
  name: 'UserInfoPage',
  props: {

  },
  methods:
  {
    ...mapMutations(['changeLogin']),
    updateMood:function (mood)
    {
      this.mood=mood;
      let NewName=this.UserNickName;
      let param={
        mood:mood,
        userNickName:NewName
      };

      uploadBasicInfo(param).then(response=>{
        console.log("需要在这里更改基本信息")
        //如果修改成功，需要更改本地信息
        this.changeLogin({ 
            Authorization: localStorage.getItem('Authorization'),
            userName:NewName,
            userAvatar:localStorage.getItem('userAvatar'),
            userIdentity:localStorage.getItem('userIdentity')
          });
        
        //刷新
        this.$router.go(0);

      }).catch((error)=>{
        this.$message({
          message:error,
          type:'warning'
        });
        return;
      })
    },
    ...mapMutations(['changeLogin']),
      updateNickName:function(NewName)
      {
        this.UserNickName=NewName;
        let param={
          userNickName:NewName
        };
        console.log("修改昵称传入的参数",NewName)
        uploadBasicInfo(param).then(response=>{
          console.log("需要在这里更改基本信息")
        //如果修改成功，需要更改本地信息
        this.changeLogin({ 
            Authorization: localStorage.getItem('Authorization'),
            userName:NewName,
            userAvatar:localStorage.getItem('userAvatar'),
            userIdentity:localStorage.getItem('userIdentity')
          });
        
         //刷新
         this.$router.go(0);
        }).catch((error)=>{
          this.$message({
            message:error,
            type:'warning'
          });
          return;
        })
    },
    ...mapMutations(['changeLogin']),
    updateNameAndBirthDate:function (NewName,NewBirth){
        this.UserNickName=NewName;
        this.BirthDate=NewBirth;
        let param={
          userNickName:NewName,
          userBirthDate:NewBirth
        };
        console.log("传入的生日",NewBirth,typeof(NewBirth),)
        uploadBasicInfo(param).then(response=>{
          console.log("需要在这里更改基本信息")
        //如果修改成功，需要更改本地信息
        this.changeLogin({ 
            Authorization: localStorage.getItem('Authorization'),
            userName:NewName,
            userAvatar:localStorage.getItem('userAvatar'),
            userIdentity:localStorage.getItem('userIdentity')
          });
        
         //刷新
         this.$router.go(0);
        }).catch((error)=>{
          this.$message({
            message:error,
            type:'warning'
          });
          return;
        })
    },
    ...mapMutations(['changeLogin']),
    updateNameAndSex:function (NewName,NewSex)
    {
      this.UserNickName=NewName;
      this.userSex=NewSex;
      console.log("传入的性别参数",NewSex);
      let sex=NewSex==='男'?'m':'f';
      let param={
        userNickName:NewName,
        userSex:sex
      };
      uploadBasicInfo(param).then(response=>{
        console.log("需要在这里更改基本信息")
        //如果修改成功，需要更改本地信息
        this.changeLogin({ 
            Authorization: localStorage.getItem('Authorization'),
            userName:NewName,
            userAvatar:localStorage.getItem('userAvatar'),
            userIdentity:localStorage.getItem('userIdentity')
          });
        
         //刷新
         this.$router.go(0);

      }).catch((error)=>{
        this.$message({
          message:error,
          type:'warning'
        });
        return;
      })
    },
    updateAllInfo:function (NewName,NewSex,NewBirthDate)
    {
      this.UserNickName=NewName;
      console.log("传入的生日参数",NewBirthDate);
      console.log("传入的性别参数",NewSex);
      let sex=NewSex==='男'?'m':'f';
      let param={
        userNickName:NewName,
        userSex:sex,
        userBirthDate:NewBirthDate
      };
      uploadBasicInfo(param).then(response=>{
        console.log("需要在这里更改基本信息")
        //如果修改成功，需要更改本地信息
        this.changeLogin({ 
            Authorization: localStorage.getItem('Authorization'),
            userName:NewName,
            userAvatar:localStorage.getItem('userAvatar'),
            userIdentity:localStorage.getItem('userIdentity')
          });
        
        //刷新
        this.$router.go(0);
      }).catch((error)=>{
        this.$message({
          message:error,
          type:'warning'
        });
        return;
      })
    }

  },
  created:function() {

    const loading = this.$loading({
      lock: true,
      text: '个人主页加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0,0,0,0.7)'
    });

    //有token,则读取token
    console.log('有token信息')
    this.userName = localStorage.getItem('userName');
    console.log('user:', this.userName)
    this.userAvatar = localStorage.getItem('userAvatar');
    this.hasLogin = true;
    //loading.close()
    //调用api
    getCustomerInfo().then(response => {
      console.log(response.data);
      //获取api中的数据
      this.reviewNum = response.data.evalNum;
      if (response.data.userGroupLevel == null)
        this.UserGroupLevel = "暂无等级";
      else
        this.UserGroupLevel = '等级：'+response.data.userGroupLevel;
      this.UserNickName = response.data.userNickName;
      this.AuthenticationTag = 1;
      this.EmailTag = response.data.emailTag == false ? 0 : 1;
      this.PhoneTag = 1;
      this.Score = response.data.userScore;
      this.RegisterDate = response.data.registerDate.substring(0, 10);
      this.user_img = response.data.userAvatar;
      console.log(this.user_img);
      this.userBirthDate = response.data.userBirthDate === null ? '未知' : response.data.userBirthDate;
      this.commentList=response.data.hostCommentList;
      this.mood = response.data.mood;
      if (this.userBirthDate != '未知') {
        this.userBirthDate = this.userBirthDate.substring(0, 10);
      }
      this.userSex = response.data.userSex;
      if (this.userSex === null)
        this.userSex = '未知';
      else if (this.userSex === 'f')
        this.userSex = '女';
      else
        this.userSex = '男';

      console.log(this.reviewNum);
      loading.close()
    }).catch((error) => {
      this.$message({
        message: error,
        type: 'warning'
      });
      console.log('error', error)
      return;
    })


  },
  data:function ()
  {
    return {
      user_img: "",//一个用户图片url的假数据
      reviewNum:1,//评价条数
      UserGroupLevel:'基础用户',//用户组等级，字符串
      UserNickName:"Redifinition",//用户昵称
      AuthenticationTag:1,//是否进行了身份认证表示，0表示未认证，1表示认证
      EmailTag:0,//是否拥有电子邮箱标识
      PhoneTag:1,//是否进行了手机号认证标识
      TagimgList:["https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/错误.png","https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/正确.png"],
      Score:0,
      RegisterDate:"2021年7月1日",//注册的时间
      fullScreenTag:true,//加载页面
      userBirthDate:'',
      userSex:'未知',
      mood:0,//当前心情
      commentList:[],
  }},
  components:
      {
        UserInfoBlock,
        UserInfoMessage
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");
.el-header, .el-footer {
  background-color: #B3C0D1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  height: 800px;
  padding-left: 170px;
  padding-top: 30px;
}

.el-main {
  color: #333;
  text-align: center;
  height: 1500px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}


.el-divider--vertical{
  height:90%;
  margin-top: 10px;
  width: 2px;
  animation: fadeInDown;
  animation-duration: 1s;
  color: #42b983;
  margin-left:200px
}
</style>
