<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-05 19:12:01
 * @LastEditTime: 2021-07-13 16:21:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\views\Home.vue
-->
<template>
  <div class="home">
    <link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

    <!-- <movingCloud style="float:left"></movingCloud> -->
    <!-- <movingCloud style="margin-left:-55%;width=20%;z-index:-1"></movingCloud> -->
    <movingCloud></movingCloud>
    <searchBar></searchBar>


    <el-main class="card-set">
        <h3 class="homepage-title">高分房源 极致享受</h3>

        <homeHighScoreGroup class="group1"></homeHighScoreGroup>
        
        <h3 class="homepage-title">经济房源 实惠出行</h3>

        <homeCheapGroup class="group2"></homeCheapGroup>

        <h3 class="homepage-title">热门房源 丰富参考</h3>

        <homeHotGroup class="group3"></homeHotGroup>
    </el-main>


    <h3 style="margin-top:220px;">...</h3>
    
    <el-divider></el-divider>
    
  </div>
</template>

<script>
// @ is an alias to /src
import homeHighScoreGroup from '../components/homeHighGroup.vue'
import homeCheapGroup from '../components/homeCheapGroup.vue'
import homeHotGroup from '../components/homeHotGroup.vue'
import movingCloud from '../components/movingCloud.vue'
import searchBar from '../components/homeSearchBar.vue'
  

export default {
  name: 'Home',
  components: {
    homeHighScoreGroup,
    homeCheapGroup,
    homeHotGroup,
    movingCloud,
    searchBar
  },
  data(){
    return{
        input: ''
    }
  }
}
</script>



<style scoped>
.home{

  position: relative;  
  /* background-image: url("../assets/pexels-jeffrey-czum-2904142-removebg.png"); */
  background-image: url("https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/92fa3df3d60f4d4121f6d6b32930c4b1.png");
  /* background-size:contain; */
  background-attachment:fixed;
  /* -webkit-background-size: cover;
  -o-background-size: cover; */
  top: 0;
  left: 0;
  width:100%;
  height:100%;

  animation: fadeIn;
  animation-duration: 2s;
}


.card-set{
  display:block;
}

.homepage-title{
  font-weight: 400 !important;
  margin-bottom: 32px !important;
  margin-top:10px;
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

  transition-delay:2s;
  animation: fadeInUp;
  animation-duration: 1s;
}

.group1{
  animation: fadeInTopRight;
  animation-duration: 1s;
}
.group2{

  animation: fadeInTopRight;
  animation-duration: 1s;
}
.group3{
  animation: fadeInTopRight;
  animation-duration: 1s;
}

</style>
