<template>
  <div>
    <movingCloud/>

    
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
  


.mydiv{
width:500px;height:auto;border:#909090 1px solid;background:#fff;color:#333;
filter:progid:DXImageTransform.Microsoft.Shadow(color=#909090,direction=120,strength=4);
-moz-box-shadow: 2px 2px 10px #909090;
-webkit-box-shadow: 2px 2px 10px #909090;
box-shadow:2px 2px 10px #909090;
}
</style>