<!--
 * @Author: your name
 * @Date: 2021-07-12 18:51:48
 * @LastEditTime: 2021-07-13 11:44:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\homeHighGroup.vue
-->
<template>
<!-- 这是首页里的高分体验快 -->
  <div>

    <div v-show="this.stayList.length" class="container">
        <el-col style="margin-left:10%">

              <el-carousel class="carousel"  :interval="2500" type="card" height="330px" 
                          style="height: auto;margin-top: 5%;opacity: 0.8;"
                          indicator-position="none"
                          arrow="never"
                          loop="true"
                          >
                <el-carousel-item v-for="item in this.stayList" :key="item">
                   <cardGroup4 class="inside"
                    :info="item" 
                    :key="item.stayID"
                    ></cardGroup4>
                </el-carousel-item>
              </el-carousel>

                  <!-- <cardGroup4 v-for="item in this.stayList" 
                    :info="item" 
                    :key="item.stayID"
                    ></cardGroup4> -->
        </el-col>
    </div> 
  </div>

</template>




<script>
import cardGroup4 from "../components/cardGroup4.vue";
import {GetHighestScoreList} from "../api/homepage"
export default {
  components: { cardGroup4 },
  created(){
    GetHighestScoreList().then(response=>{
      this.stayList=response.data.stayList;
      console.log("最高分",this.stayList);
    }).catch(error=>{
            console.log("fail");
            this.$message.error("网络异常，请稍后重试");
    });
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

<style scoped>



.container{
  width:91%;
  margin-bottom:20px;
  opacity: 1;
}

.inside{
  padding:10px;
  
}

.el-carousel{
  margin-left:150px;
}

.el-carousel-item{
    line-height: 200px;
    margin: 0;
    padding:0;
  
}

/* .el-carousel__item:nth-child(2n) {
  
}

.el-carousel__item:nth-child(2n+1) {
  
} */

.el-carousel__item--card.is-active{
  width:400px !important;
}
</style>