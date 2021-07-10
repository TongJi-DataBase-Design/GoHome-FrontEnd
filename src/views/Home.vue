<!--
 * @Author: your name
 * @Date: 2021-07-05 19:12:01
 * @LastEditTime: 2021-07-10 20:23:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\views\Home.vue
-->
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
  

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
