<template>
<div class="detailInfo">
  <el-card shadow="hover" class="detail-box">
  <p id="stayType" >{{ stay.characteristic }}</p>
  <h2 id="characteristic">【{{stay.stayName}}】{{ stay.stayDescription }}</h2>
  <div class="basicinfo">
    <div class="icons">
      <img src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210704143358.png" alt="Room" width="20px"/>
    </div>
    <div class="infos">
      {{stay.roomNum}}间卧室
    </div>
    <div class="icons">
      <img src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210704145114.png" alt="Shower" width="20px" height="17px"/>
    </div>
    <div class="infos">
      {{stay.publicBathroom}}个共享浴室
    </div>
    <div class="icons">
      <img src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210704145401.png" alt="People" width="20px"/>
    </div>
    <div class="infos">
      可住{{stay.stayCapacity}}人
    </div>
    <div class="icons">
      <img src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210704165554.png" alt="Accessibility" height="20px" width="20px" v-show="stay.nonBarrierFacility"/>
    </div>
    <div class="infos">
      <p v-show="stay.nonBarrierFacility">无障碍设施</p>
    </div>
    <div>
      <p style="position: relative; left: 12px">入住时间{{stay.startTime}}-{{stay.endTime}}</p>
    </div>
  </div>
<!--    <div >-->
      <el-card id="host" :body-style="{ padding: '0px' }">
<!--        <div>-->
        <el-image :src="stay.hostAvatar" size="medium" fill="contain" style="width: 50px;height: 50px;border-radius: 28px;float: left; margin: 10px;"></el-image>
        <div style="height: 20px;">
          <span style="margin-left: 1%; margin-top: 1%; float: left; text-align: left; font-size: 18px !important; line-height: 1.33333em !important; font-weight: 800 !important;  height:21px;">{{stay.hostName}}</span>
          <span style="margin-left: 1%; margin-top: 1%; float: left; text-align: left; font-size: 18px;">{{stay.hostLevel}}</span>
        </div>
        <br>
        <div>
          <span style="margin-left: 1%; float: left; text-align:left;">{{stay.hostCommentNum}}条评价</span>
        </div>
<!--        </div>-->
      </el-card>
<!--    </div>-->
  </el-card>
</div>
</template>

<script>
export default {
  name: "detail",
  data() {
  return{
    nonBarrierFacility: true,
  }
  },
  props:{
    stay: Object
  }
}

</script>

<style scoped>
@import url("https://unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");

#characteristic{
  display: flex;
  justify-content: center;
  text-align: left;
}

.detailInfo{
/*background-color: #42b983;*/

}

.detail-box{
  /*width: 1050px;*/
  /*height: 350px;*/
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: #ffffff;
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 0.5s;
}

#host{
  width: 100%;
  border-radius: 15px;
  border-width: 2px;
  border-color: #7b7b7b;
  margin-bottom: 2%;
  /*background-color: #ffffff;*/
  /*box-shadow: 7px 7px 10px #888888;*/
  /*animation: fadeInDown;*/
  /*animation-duration: 0.5s;*/
  /*background-color: orange;*/
  /*padding: 0px;*/
  display: inline-block;
  float: left;
}

#stayType{
  text-align: left;
  color: rgb(20, 39, 94);
  line-height: 1.33333em !important;
  font-size: 16px !important;
  font-weight: 800 !important;
}
.basicinfo{
  text-align: left;
  /*background-color: #42b983;*/
}

.basicinfo .icons{
  display:inline-block;
  vertical-align: middle;
  padding-left: 12px;
  /*width: 20px;*/
  /*background-color: blue;*/
}

.basicinfo .infos{
  display:inline-block;
}

</style>