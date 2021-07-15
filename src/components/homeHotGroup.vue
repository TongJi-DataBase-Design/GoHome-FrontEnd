<!--
 * @Author: your name
 * @Date: 2021-07-12 18:51:48
 * @LastEditTime: 2021-07-13 13:00:26
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\homeHotGroup.vue
-->

<template>
  <div>
    <div v-show="this.stayList.length" class="container">
      <el-col style="margin-left:10%">
                <cardGroup4 v-for="(item,index) in this.stayList" 
                v-bind:info="item" 
                  :key="index"
                  ></cardGroup4>
      </el-col>

      <!-- <div class="xianshi-fath">
          <router-link to="/list"  class="xianshi">显示所有体验</router-link>
          <span></span>
      </div> -->
    </div>
  </div>
</template>




<script>
import cardGroup4 from "../components/cardGroup4.vue";
import {GetHottestList} from "../api/homepage"
export default {
  components: { cardGroup4 },

  created(){
    setTimeout(()=>{GetHottestList().then(response=>{
      this.stayList=response.data.stayList;
      console.log("最热门:",this.stayList);
    }).catch(error=>{
        console.log("fail");
        this.$message.error("网络异常，请稍后重试");
    })},20)
    // GetHottestList().then(response=>{
    //   this.stayList=response.data.stayList;
    //   console.log("最热门:",this.stayList);
    // })
  },


  data() {
    return {
       stayList:[],
    };
  },
  methods: {
   
  },
  // mounted() {
  //   this.$store.dispatch("getproductList");
  // }
};
</script>

<style>

.container{
  width:91%;
  margin-top:20px;
}
</style>