<!--
 * @Author: your name
 * @Date: 2021-07-05 19:12:01
 * @LastEditTime: 2021-07-12 20:05:45
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\views\Home.vue
-->
<template>
  <div class="home">
    <!-- <img src="../assets/pexels-jeffrey-czum-2904142-removebg.png" class="img"> -->
    <h3 class="homepage-title">高分房源 极致享受</h3>

    <homeHighScoreGroup class="group1"></homeHighScoreGroup>
    
    <h3 class="homepage-title">经济房源 实惠出行</h3>

    <homeCheapGroup class="group2"></homeCheapGroup>

    <h3 class="homepage-title">热门房源 丰富参考</h3>

    <homeHotGroup class="group3"></homeHotGroup>

    <h3 style="margin-top:200px;">...</h3>
    
    <el-divider></el-divider>
    
  </div>
</template>

<script>
// @ is an alias to /src
import homeHighScoreGroup from '../components/homeHighGroup.vue'
import homeCheapGroup from '../components/homeCheapGroup.vue'
import homeHotGroup from '../components/homeHotGroup.vue'
  

export default {
  name: 'Home',
  components: {
    homeHighScoreGroup,
    homeCheapGroup,
    homeHotGroup
  }
}
</script>

<style scoped>
.home{

  position: relative;  
  background-image: url("../assets/pexels-jeffrey-czum-2904142-removebg.png");
  background-size:contain;
  background-attachment:fixed;
  -webkit-background-size: cover;
  -o-background-size: cover;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  background-size:100% 100%;
}


/* .img{
  background-image: url("../assets/pexels-jeffrey-czum-2904142-removebg.png");
  background-size:contain;
  background-attachment:fixed;
  -webkit-background-size: cover;
  -o-background-size: cover;
  z-index: -1;
  top: 0;
  left: 0;
  width:100%;
  height:100%;
  background-size:100% 100%;

} */

.homepage-title{
  font-weight: 100 !important;
  margin-bottom: 32px !important;
  margin-top:40px;
  padding-left:150px;
  text-align: left;
  margin-left:8px;

  font-size: 24px !important;
  line-height: 30px !important;
  letter-spacing: normal !important;
  text-transform: undefined !important;
  color: #484848 !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
}
</style>
