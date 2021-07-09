<template>

  <div >
    <el-container>
      <el-container>
        <el-aside width="450px" class="el-aside" scoped>
          <UserInfoBlock :user_img="user_img" :review-num="reviewNum" :user-group-level="UserGroupLevel"
                      :user-nick-name="UserNickName" :authentication-tag="AuthenticationTag" :email-tag="EmailTag"
                      :phone-tag="PhoneTag" :tagimg-list="TagimgList" :score="Score"

          ></UserInfoBlock>
        </el-aside>
        <el-main class="el-main">
          <UserInfoMessage   :user-nick-name="UserNickName" :register-date="RegisterDate"
                             :comment-num="reviewNum"  @UpdateName="updateNickName"></UserInfoMessage>
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

export default {
  name: 'UserInfoPage',
  props: {

  },
  methods:
  {
      updateNickName:function(NewName)
      {
        this.UserNickName=NewName;
        let param={
          userNickName:NewName
        };
        uploadBasicInfo(param).then(response=>{
            console.log("更改用户基本信息的API返回的东西：",this.response.data.errcode);
        })


    }

  },
  created:function() {
    let token=localStorage.getItem('Authorization');

    if(token==null||token=='')
    {
      //无token,需要登陆
      console.log('无token信息')
      return;
    }
    else {
      //有token,则读取token
      console.log('有token信息')
      this.userName = localStorage.getItem('userName');
      console.log('user:',this.userName)
      this.userAvatar = localStorage.getItem('userAvatar');
      this.hasLogin = true;
      //调用api
      getCustomerInfo().then(response=>{
        console.log("dwffwff");
        console.log(response.data);
        //获取api中的数据
        this.reviewNum=response.data.evalNum;
        if(response.data.userGroupLevel==null)
          this.UserGroupLevel="暂无等级";
        else
          this.UserGroupLevel=response.data.userGroupLevel;
        this.UserNickName=response.data.userNickName;
        this.AuthenticationTag=1;
        this.EmailTag=response.data.emailTag==false?0:1;
        this.PhoneTag=1;
        this.Score=response.data.userScore;
        this.RegisterDate=response.data.registerDate.substring(0,10);
        this.user_img=response.data.userAvatar;
        console.log(this.reviewNum);

      }).catch((error)=>{
        this.$message({
          message:error,
          type:'warning'
        });
        console.log('error',error)
        return;
      })


    }},
  data:function ()
  {
    return {
      user_img: "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/yonghutouxiang.JPG",//一个用户图片url的假数据
      reviewNum:1,//评价条数
      UserGroupLevel:'基础用户',//用户组等级，字符串
      UserNickName:"Redifinition",//用户昵称
      AuthenticationTag:1,//是否进行了身份认证表示，0表示未认证，1表示认证
      EmailTag:0,//是否拥有电子邮箱标识
      PhoneTag:1,//是否进行了手机号认证标识
      TagimgList:["https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/错误.png","https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/正确.png"],
      Score:0,
      RegisterDate:"2021年7月1日",//注册的时间


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
  height: 1250px;
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



</style>
