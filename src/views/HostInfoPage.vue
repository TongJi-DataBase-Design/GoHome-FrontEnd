<template>
<el-container>
  <el-aside class="el-aside" width="450px" scoped>
    <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/室内1.png "
    style="position:fixed;width:300px;height: 400px;left:-50px;top:10px" ></el-image>
<HostInfoBlock style="position: fixed;left:180px;top:180px"  :review-num="reviewNum"
:host-level="hostLevel" :host-nick-name="hostNickName"
:host-real-name="hostRealName" :tagimg-list="TagimgList"
               :authentication-tag="AuthenticationTag" :email-tag="EmailTag"
               :phone-tag="PhoneTag" :host-score="hostScore"

>
</HostInfoBlock>
      <el-divider direction="vertical" class="el-divider--vertical" ></el-divider>
  </el-aside>

  <el-main class="el-main">
<HostInfoMessage></HostInfoMessage>
  </el-main>
</el-container>
</template>

<script>
import HostInfoBlock from "../components/HostInfoBlock";
import HostInfoMessage from "../components/HostInfoMessage";
export default {
  name: "HostInfoPage",
  components: {HostInfoBlock,
  HostInfoMessage},
  data:function ()
  {
    return{
      hostImage:'',
      hostNickName:'假数据',
      hostRealName:'假数据真名',
      hostSex:'',
      hostLevel:0,//房东的用户组等级，默认为0
      hostScore:0,//房东的信誉积分，默认为0
      publishedNum:0,//已经发布的房源数量
      unpublishedNum:0,//未发布的，尚存草稿的房源数量
      pendingReviewNum:0,//待审核的房源数量
      reviewNum:0,//评价数，默认为0
      EmailTag:0,//是否拥有电子邮箱标识
      PhoneTag:1,//是否进行了手机号认证标识
      TagimgList:["https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/错误.png","https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/正确.png"],
      AuthenticationTag:1,//是否进行了身份认证表示，0表示未认证，1表示认证
    }
  }
}
</script>

<style scoped>
.el-aside {
  color: #333;
  text-align: center;
  height: 1250px;
  padding-left: 170px;
  padding-top: 30px;
}
.el-main {
  color: #333;
  text-align: center;
  height: 1250px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
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