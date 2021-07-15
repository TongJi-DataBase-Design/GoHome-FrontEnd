<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-13 15:50:10
 * @LastEditTime: 2021-07-13 17:12:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\homeSearchBar.vue
-->
<template>
    <div class="search-main">
        <el-input placeholder="请输入内容" v-model="input" class="search-bar-content">
            <el-button class="search-button" slot="append" icon="el-icon-search" @click.native="onSearchButtonClicked"></el-button>
        </el-input>
    </div>    
</template>

 
<style>
  .search-main{
      margin-top:-1%;
      width:50%;
      margin-left:25%;
  }
  .search-bar-content {
    width: 50%;
    background-color: rgb(0, 0, 0);
    border-radius: 16px;
  }
  .search-bar-content:hover{
      background-color: rgb(0, 0, 0);
  }
  .search-button{
      color: black;
  }
</style>
 
<script>
export default {
  methods:{
    onSearchButtonClicked(){
        //TODO:添加wly搜索路由
        if(this.input===""){
            this.$message({
              type:"info",
              message:"请输入搜索内容"
            })
        }
        else{
          this.$router.push({path:"/staysView",query:{searchText:this.input,searchValue:2}});
        }
        
    }
  },
  data() {
    return {
      input: '',
    }
  }
}
</script>