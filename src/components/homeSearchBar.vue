<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-13 15:50:10
 * @LastEditTime: 2021-07-13 18:50:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\homeSearchBar.vue
-->
<template>
    <div class="search-main">
        <el-input placeholder="请输入内容" v-model="input" class="search-bar-content">
            <el-button class="search-button" slot="append" icon="el-icon-search"></el-button>
        </el-input>
    </div>    
</template>

 
<style>
  .search-main{
      width:50%;
      margin-left:25%;
  }
  .search-content {
    width: 50%;
    border-radius: 16px;
  }
  .search-bar-content:hover{
    color:black;
  }
</style>
 
<script>
export default {
  data() {
    return {
      input: '',
      select: ''
    }
  }
}
</script>