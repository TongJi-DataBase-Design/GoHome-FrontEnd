<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-11 15:15:47
 * @LastEditTime: 2021-07-12 14:45:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\homeCheapGroup.vue
-->

<template>
  <div>
    <div v-show="this.stayList.length" class="container">

      <el-col :offset="1">
                <cardGroup6 v-for="item in this.stayList" 
                  :info="item" 
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
    })},200)
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


.cjthfy-top {
  
  font-weight: 800 !important;
  margin-bottom: 8px !important;
  font-size: 24px !important;
  line-height: 30px !important;
  letter-spacing: normal !important;
  text-transform: undefined !important;
  color: #484848 !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  margin-top: 20px;
  
  background-color:rgba(255, 255, 255,0)
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
.list-control {
  background: #fff;
  border-radius: 6px;
  /* margin: 16px; */
  width: 378px;
  overflow: hidden;
}
.list-control-filter {
  width: 178px;
  overflow: hidden;
  margin: 16px 0px;
}
.list-control-filter-item {
  min-width: 120px;
  height: 48px;
  padding: 14px 16px;
  border-radius: 3px;
  background: rgb(255, 255, 255);
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 1px 2px;
  font-size: 17px;
  color: rgb(72, 72, 72);
  text-align: center;
  font-weight: bold;
  line-height: 20px;
  outline: none;
  border: 0.5px solid rgb(216, 216, 216);
  transition: box-shadow 0.5s ease 0s;
  line-height: 42px;
}
.list-control-filter-item,
.list-control-order-item {
  cursor: pointer;
  display: inline-block;
  border: 1px solid #e9eaec;
  border-radius: 4px;
  margin-right: 16px;
  padding: 2px 6px;
}
.list-control-filter-item.on,
.list-control-order-item.on {
  background: rgb(0, 132, 138);
  border: 1px solid rgb(0, 132, 138);
  color: #fff;
}
.six-not-found {
  text-align: center;
  padding: 32px;
}
.xianshi{
    color:rgb(0, 132, 137);
    font-size: 18px;
    font-weight: 800;
    margin-bottom: 100px;
}
.xianshi-fath{
    margin-bottom: 100px;

}
</style>