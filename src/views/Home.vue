<template>
  <div>
    <movingCloud/>

    <el-image
    :src="require('@/assets/测试背景.jpg')"
    class="showImg"
    >

    </el-image>
  </div>
</template>

<script>
  import movingCloud from '@/components/movingCloud.vue';
  
  export default {
    name: 'App',
    components: {
      movingCloud
    }
  }
  </script>


<style scoped>
  @-webkit-keyframes blur {
    
    0% {
        -webkit-filter: blur(10px); 
        -moz-filter: blur(10px);
        -ms-filter: blur(10px);
        filter: blur(10px);
    }
    25% {
        -webkit-filter: blur(7px); 
        -moz-filter: blur(7px);
        -ms-filter: blur(7px);
        filter: blur(7px);
    }
    
    50% {
        -webkit-filter: blur(5px);
        -moz-filter: blur(5px);
        -ms-filter: blur(5px);
        filter: blur(5px);
    }
    100% {
        -webkit-filter: blur(0px); /* Chrome, Opera */
        -moz-filter: blur(0px);
        -ms-filter: blur(0px);
        filter: blur(0px);
    }
}
.showImg{-webkit-animation-name: blur; /*动画名称*/
-webkit-animation-duration: 4s; /*动画持续时间*/
-webkit-animation-iteration-count: 1; /*动画次数*/
-webkit-animation-timing-function: linear;
-webkit-animation-delay: 0s; /*延迟时间*/}
.mydiv{
width:500px;height:auto;border:#909090 1px solid;background:#fff;color:#333;
filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
-moz-box-shadow: 2px 2px 10px #909090;
-webkit-box-shadow: 2px 2px 10px #909090;
box-shadow:2px 2px 10px #909090;
}
</style>