<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-11 15:15:47
 * @LastEditTime: 2021-07-13 12:59:13
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\homeCheapGroup.vue
-->

<template>
  <div>
    <div v-show="this.stayList.length" class="container">

      <el-col style="margin-left:10%" class="col-card">
                <cardGroup6 v-for="(item,index) in this.stayList" 
                  v-bind:info="item" 
                  :offset="2"
                  :key="index"
                  ></cardGroup6>

      </el-col>


    </div>
  </div>
</template>




<script>
import cardGroup6 from "../components/cardGroup6.vue";
import {GetCheapestList} from "../api/homepage"
export default {
  components: { cardGroup6 },

  created(){
    setTimeout(()=>{GetCheapestList().then(response=>{
      this.stayList=response.data.stayList;
      console.log("最便宜:",this.stayList);
    }).catch(error=>{
      console.log("fail");
      this.$message.error("网络异常，请稍后重试");
    })},10)

  },


  data() {
    return {
       stayList:[]
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

.cjthfy-bott {
  font-size: 16px !important;
  line-height: 22px !important;
  letter-spacing: normal !important;
  text-transform: undefined !important;
  color: #484848 !important;
  padding-top: undefined !important;
  padding-bottom: undefined !important;
  font-weight: normal !important;
  margin-top: 0px !important;
  margin-bottom: 31px;
}

</style>