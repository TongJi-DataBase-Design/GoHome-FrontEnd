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
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet">
    <!-- <movingCloud style="float:left"></movingCloud> -->
    <!-- <movingCloud style="margin-left:-55%;width=20%;z-index:-1"></movingCloud> -->
    <el-image 
    class="clouds"
    src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/smallLogo.png">
   </el-image>
    <el-main>
      <p class="main-title">...and homecoming for all.</p>
    </el-main>
    <searchBar></searchBar>


    <el-main class="card-set">
        <h3 class="homepage-title">高分房源 极致享受</h3>

        <homeHighScoreGroup class="group1"></homeHighScoreGroup>
        
        <h3 class="homepage-title">经济房源 实惠出行</h3>

        <homeCheapGroup class="group2"></homeCheapGroup>

        <h3 class="homepage-title">热门房源 丰富参考</h3>

        <homeHotGroup class="group3"></homeHotGroup>
    </el-main>

    <h1 style="margin-top:100px;">更多精彩，等待你的探索......</h1>

    
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
        
    }
  }
}
</script>



<style scoped>
.home{

  position: relative;  
  /* background-image: url("../assets/pexels-jeffrey-czum-2904142-removebg.png"); */
  background-image: url("https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/svg(2).png");
  /* background-size:contain; */
  background-attachment:fixed;

  background-repeat: no-repeat;
  /* -webkit-background-size: cover;
  -o-background-size: cover; */
  top: 0;
  left: 0;
  width:100%;
  height:100%;

  animation: fadeIn;
  animation-duration: 2s;
}

.main-title{
  font-weight: 400 !important;
  margin-bottom: 32px !important;
  margin-top:-10px;
  text-align: center;

  /* font-family: Arial, Helvetica, sans-serif; */
  font-family: 'Lato', sans-serif;
  
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

.clouds{
    width:5%;
    margin-top:3%;
    /* x=0代表移回原位置 */
    transform: translateX(0);
    /* 移回也需要0.4s时间过渡 */
    transition: transform 0.4s;
}
.clouds:hover{
    /* x=-10px代表左移10px */
    transform: translateX(-10px);
    /* 0.4s完成transform移动效果*/
    transition: transform 0.4s;

}
</style>
