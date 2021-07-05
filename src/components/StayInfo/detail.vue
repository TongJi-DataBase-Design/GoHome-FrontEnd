<template>
<div class="detailInfo">
  <el-card shadow="hover">
  <p id="stayType">{{ stay.characteristic }}</p>
  <h2 id="characteristic">【{{stay.stayName}}】{{ stay.stayDescription }}</h2>
  <div class="basicinfo">
    <div class="icons">
      <img src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210704143358.png" alt="Room" width="20px"/>
    </div>
    <div class="infos">
      {{stay.roomNum}}间卧室
    </div>
<!--    <div class="icons">-->
<!--      <img src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210704144703.png" alt="Bed" width="20px"/>-->
<!--    </div>-->
<!--    <div class="infos">-->
<!--      1张床-->
<!--    </div>-->
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
      <p style="position: relative; left: 20px">入住时间{{stay.startTime}}-{{stay.endTime}}</p>
    </div>
  </div>
    <div id="host">
      <el-card shadow="hover">
        <div>

        <el-avatar :src="stay.hostAvatar" size="large" fill="cover" style="position: relative; left: -400px;"></el-avatar>
          <span style="position: relative; left: -400px; top:0px; margin-top:1px;">{{stay.hostName}}</span>
          <span style="position: relative; left: -400px; top:0px; margin-top:1px;">{{stay.hostLevel}}</span>
          <span style="position: relative; left: -350px; top:0px; margin-top:1px;">{{stay.hostCommentNum}}条评价</span>

        </div>
      </el-card>
    </div>


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
#characteristic{
  display: flex;
  justify-content: center;
  text-align: left;
}

.detailInfo{
  /*display:flex;*/
  /*justify-content: center;*/
  /*background-color:blue;*/

}

.el-card{
  /*background-color:orange;*/
  /*display:flex;*/
  /*justify-content: left;*/
}

#stayType{
  text-align: left;
}
.basicinfo{
  text-align: left;
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

#host{
  /*display:inline-block;*/
  /*align-content: flex;*/
}
</style>