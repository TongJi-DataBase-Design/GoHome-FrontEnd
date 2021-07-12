<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-11 15:15:47
 * @LastEditTime: 2021-07-12 19:37:07
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\homeCheapGroup.vue
-->

<template>
  <div>
    <div v-show="this.stayList.length" class="container">

      <el-col style="margin-left:10%" class="col-card">
                <cardGroup6 v-for="item in this.stayList" 
                  :info="item" 
                  :offset="2"
                  :key="item.stayID"
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
    })},10)
    // GetCheapestList().then(response=>{
    //   this.stayList=response.data.stayList;
    //   console.log("最便宜:",this.stayList);
    // })
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
  width:91%
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