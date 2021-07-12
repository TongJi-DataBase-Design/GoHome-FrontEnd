<template>
<!-- 这是首页里的高分体验快 -->
  <div>
<<<<<<< Updated upstream
    <div v-show="this.stayList.length" class="container">
        <el-col :offset="1">
                  <cardGroup4 v-for="item in this.stayList" 
                    :info="item" 
                    :key="item.stayID"
                    ></cardGroup4>
        </el-col>
    </div> 
  </div>

=======
    <div v-show="list.length" class="container">
      <div class="list-control">
        <h3 class="cjthfy-top">
          <div>高分体验</div>
        </h3>
      </div>
      <six v-for="item in filteredAndOrderedList" :info="item" :key="item.id"></six>
      <div class="xianshi-fath">
          <router-link to="/list"  class="xianshi">显示所有体验</router-link>
          <span></span>
      </div>
    </div>
  </div>
>>>>>>> Stashed changes
</template>




<script>
<<<<<<< Updated upstream
import cardGroup4 from "../components/cardGroup4.vue";
import {GetHighestScoreList} from "../api/homepage"
export default {
  components: { cardGroup4 },
  created(){
    GetHighestScoreList().then(response=>{
      this.stayList=response.data.stayList;
      console.log("最高分",this.stayList);
    })
  },


  data() {
    return {
       stayList:[],
=======
import cardGroup6 from "../components/cardGroup6.vue";
export default {
  components: { cardGroup6 },
  computed: {
    list() {
      return this.$store.state.productList;
    },
    brands() {
      return this.$store.getters.brands;
    },
    colors() {
      return this.$store.getters.colors;
    },

    filteredAndOrderedList() {
      let list = [...this.list];
      if (this.filterBrand == "活动") {
        list = list.filter(item => item.brand === this.filterBrand);
        return list;
      }
    }
  },
  data() {
    return {
      filterBrand: "活动",
      order: ""
>>>>>>> Stashed changes
    };
  },
  methods: {
   
  },
<<<<<<< Updated upstream
  // mounted() {
  //   this.$store.dispatch("getproductList");
  // }
=======
  mounted() {
    this.$store.dispatch("getproductList");
  }
>>>>>>> Stashed changes
};
</script>

<style>


.cjthfy-top {
<<<<<<< Updated upstream
  
  font-weight: 800 !important;
  margin-bottom: 8px !important;
=======
  font-weight: 800 !important;
  margin-bottom: 0px !important;
>>>>>>> Stashed changes
  font-size: 24px !important;
  line-height: 30px !important;
  letter-spacing: normal !important;
  text-transform: undefined !important;
  color: #484848 !important;
  padding-top: 2px !important;
  padding-bottom: 2px !important;
  margin-top: 20px;
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
<<<<<<< Updated upstream
  width: 378px;
  overflow: hidden;
}
.list-control-filter {
  width: 178px;
=======
  width: 1078px;
  overflow: hidden;
}
.list-control-filter {
  width: 1078px;
>>>>>>> Stashed changes
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