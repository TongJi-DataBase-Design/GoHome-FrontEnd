<template>
  <div>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
<el-card class="box-card" shadow="hover" style="position: relative;top: 80px"  >
  <el-image
      style="width: 150px; height: 150px"
      :src="user_img"  class="image"
     ></el-image><br>

  <!--更改图像的弹出框-->
  <el-popover transition="fade-in-linear"  placement="right" width="400" trigger="click" >
    <h4 style="padding-top: 1px;vertical-align: text-top;">个人资料>个人头像</h4>
    <el-card style="background-color: #c4c4c4;border-radius: 10px;border-width: 2px;border-color: #7b7b7b"><h4 >个人头像</h4></el-card>
    <el-card style="border-radius: 10px;border-radius: 10px;border-width: 2px;border-color: #7b7b7b">
      <el-row>
        <el-col :span="12"><div class="grid-content bg-purple">
          <el-image
              style="width: 150px; height: 150px;border-radius: 5px"
              :src="user_img"  >
          </el-image>
        </div></el-col>
        <el-col :span="12"><div class="grid-content bg-purple-light">
          <p style="font-family: 'PingFang SC';font-size: 14px">
            <b>最好提供显示您正脸的个人头像，可以让房东和房客对您有个大致印象。也可以根据您的喜好随意更改头像，但我们建议上传您的真人头像。
            </b>
          </p>
        </div></el-col>
      </el-row>
    </el-card>
    <el-button   slot="reference" type="text" style="color: #333333 ;font-size: medium;font-family: 'Arial Rounded MT Bold'" v-on:> <u><b>更改头像</b></u></el-button>
  </el-popover>
<br>
  <br><br>
  <!--评价信息-->
  <span style="position:relative;right: 50px">
    <img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/评价 (2).png" style="width: 40px;height: 40px;">
  </span>

  <span style="position: relative;top: -10px;right: 40px;font-size: large"><b>{{reviewNum}}条评价</b></span>
<!--用户组等级-->
  <br>
  <br>
  <span style="position:relative;right: 50px">
    <img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/等级.png" style="width: 40px;height: 40px;">
  </span>

  <span style="position: relative;top: -10px;right: 40px;font-size: large"><b>{{UserGroupLevel}}</b></span>
  <el-divider ></el-divider>

  <div style="font-size: large"><b>{{UserNickName}}已确认</b></div>
  <br>
  <span style="position:relative;right: 60px">
    <img :src="TagimgList[AuthenticationTag]" style="width: 20px;height: 20px;">
  </span>
  <span class="UserListtext"><b>身份认证</b></span>
  <br>
  <span style="position:relative;right: 60px">
    <img :src="TagimgList[EmailTag]" style="width: 20px;height: 20px;">
  </span>
  <span class="UserListtext"><b>电子邮箱</b></span>
  <br>
  <span style="position:relative;right: 60px">
    <img :src="TagimgList[PhoneTag]" style="width: 20px;height: 20px;">
  </span>
  <span class="UserListtext"><b>手机号码</b></span>

  <el-divider></el-divider>
  <span style="position:relative;right:40px">
    <img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/积分.png" style="width: 30px;height: 30px;">
  </span>
  <span class="BigFont"style="position: relative;left: -30px;top: -8px">用户积分</span>
  <span style="font-size: 15px;color: #7b7b7b;font-family: 'PingFang SC';font-weight: bold;position: relative;top: -10px">{{Score}}分</span>

</el-card>

  </div>
</template>

<script>
import UserInfoMessage from "./UserInfoMessage";
export default {
  name: 'HelloWorld',
  props: {
    user_img:String,
    reviewNum:Number,
    UserGroupLevel:String,
    UserNickName:String,
    AuthenticationTag:Number,
    EmailTag:Number,
    PhoneTag:Number,
    TagimgList:Array,
    Score:Number
  },

  methods:{


  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");
.box-card{
  width: 250px;
  height: 650px;
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: #ffffff;
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 1s;
}
.image
{
  border-radius: 75px;
}
.el-row {
  margin-bottom: 20px;
&:last-child {
   margin-bottom: 0;
 }
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #ffffff;
}
.bg-purple {
  background: #ffffff;
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.UserListtext
{
  position: relative;
  top: -5px;
  right: 50px;
  font-size:medium;
  color: #7b7b7b
}

.BigFont
{
  font-size: 20px;
  font-family: "PingFang SC";
  font-weight: bold;

}
</style>
