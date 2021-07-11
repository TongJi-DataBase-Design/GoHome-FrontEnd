<!--
 * @Author: your name
 * @Date: 2021-07-05 19:12:01
 * @LastEditTime: 2021-07-11 16:27:21
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\views\Home.vue
-->
<template>
  <div class="home">
    <homeHighScoreGroup></homeHighScoreGroup>
    <homeCheapGroup></homeCheapGroup>
    <homeHotGroup></homeHotGroup>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
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
