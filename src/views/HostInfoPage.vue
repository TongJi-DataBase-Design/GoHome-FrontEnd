<template>
<el-container>
  <el-aside class="el-aside" width="450px" scoped>
<HostInfoBlock :review-num="reviewNum">

</HostInfoBlock>
  </el-aside>
  <el-main class="el-main">

  </el-main>
</el-container>
</template>

<script>
import HostInfoBlock from "../components/HostInfoBlock";

export default {
  name: "HostInfoPage",
  components: {HostInfoBlock},
  data:function ()
  {
    return{
      hostImage:'',
      hostNickName:'',
      hostRealName:'',
      hostSex:'',
      hostLevel:0,//房东的用户组等级，默认为0
      hostScore:0,//房东的信誉积分，默认为0
      publishedNum:0,//已经发布的房源数量
      unpublishedNum:0,//未发布的，尚存草稿的房源数量
      pendingReviewNum:0,//待审核的房源数量
      reviewNum:0,//评价数，默认为0
    }
  }
}
</script>

<style scoped>
.el-aside {
  background-color: #e5b9b9;
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
  background-color: #7b7b7b;
}
</style>