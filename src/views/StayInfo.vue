<template>
<div class="StayInfo">
  <div id="ImageCarousel">
    <el-carousel :interval="4000" type="card" trigger="click" width="400px">
      <el-carousel-item v-for="item of data.data.stayImages" :key="item">
<!--        <h5 class="medium">{{ item }}</h5>-->
        <img :src=item :alt=item height="300px"/>
<!--        <img src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210703200915.png"/>-->
      </el-carousel-item>
    </el-carousel>
  </div>
  <div class="NavBar">
    <el-menu class="NavMenu" :default-active="activeIndex" mode="horizontal" >
<!--@select="handleSelect"-->
      <a href="#detail"><el-menu-item index="1">详情</el-menu-item></a>
      <a href="#comments">
      <el-menu-item index="2">评价</el-menu-item>

      </a>
<!--      <el-menu-item index="3"><a href="#bookable">可订日期</a></el-menu-item>-->
      <a href="#location">
      <el-menu-item index="4">位置</el-menu-item>

      </a>
      <a href="#location">

      <el-menu-item index="5">周边信息</el-menu-item>
      </a>
    </el-menu>

  </div>
  <div class="info">
<!--    <el-row :gutter="20" type="flex" align="center">-->
<!--      <a name="detail" >-->
        <detail id="detail" :stay="data.data"></detail>
<!--      </a>-->
<!--      <host></host>-->
<!--    </el-row>-->
<!--    <el-row :gutter="20">-->
      <rooms v-for="room of data.data.rooms" :key="item" :room="room"></rooms>

<!--    </el-row>-->
  </div>
  <div>
    <comments id="comments"> </comments>
  </div>
  <div>
    <location id="location"></location>
  </div>
</div>
</template>

<script>
import detail from '@/components/StayInfo/detail.vue'
import rooms from '@/components/StayInfo/rooms.vue'
import comments from '@/components/StayInfo/comments.vue'
import location from '@/components/StayInfo/location.vue'
//假数据
import stayinfo from '@/assets/stayinfo.json'

let data=stayinfo;
// console.log(data);
export default {
  name: "StayInfo",
  components: {
    detail,
    rooms,
    comments,
    location,
  },
  data() {
    return{
      activeIndex: "1",
      data,
    }
  }
}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  /*background-color: #99a9bf;*/
}

.el-carousel__item:nth-child(2n+1) {
  /*background-color: #d3dce6;*/
}

.NavBar{
  align-content: center;
  width: 100%;
  display: flex;
  justify-content: center;
}

.NavMenu {
  width: 100%;
  /*background-color: blue;*/
  display: flex;
  justify-content: center;
}

.info{

  justify-content: center;
  width: 80%;
  /*background-color: #42b983;*/
  /*text-align:center;*/

}
</style>