<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-11 15:15:47
 * @LastEditTime: 2021-07-11 19:58:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\homeCheapGroup.vue
-->

<template>
  <div>
    <div v-show="this.stayList.length" class="container">
      <div class="list-control">
        <h3 class="cjthfy-top">
          <div>经济房源 实惠出行</div>
        </h3>
      </div>
      <el-col :offset="1">
                <cardGroup4 v-for="item in this.stayList" 
                  :info="item" 
                  :key="item.stayID"
                  ></cardGroup4>
      </el-col>


    </div>
  </div>
</template>




<script>
import cardGroup4 from "../components/cardGroup4.vue";
import {GetCheapestList} from "../api/homepage"
export default {
  components: { cardGroup4 },
  // computed: {
  //   list() {
  //     return this.$store.state.productList;
  //   },
  //   brands() {
  //     return this.$store.getters.brands;
  //   },
  //   colors() {
  //     return this.$store.getters.colors;
  //   },

  //   filteredAndOrderedList() {
  //     let list = [...this.list];
  //     if (this.filterBrand == "活动") {
  //       list = list.filter(item => item.brand === this.filterBrand);
  //       return list;
  //     }
  //   }
  // },
  created(){
    GetCheapestList().then(response=>{
      this.stayList=response.data.stayList;
      console.log(this.stayList);
    })
  },


  data() {
    return {
       stayList:[
        {
          stayID:1,
          stayName:"宝庆路洋房",
          stayDescribe:"整套独栋房·1室1卫1床",
          stayLabels:["超赞房东","自助入住","可以做饭"],
          stayPrice:148,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:17,
          stayScore:5.0,
          stayPosition:[121.473701,31.230416]
        },
        {
          stayID:2,
          stayName:"江苏路地铁站暖粉大双人床公寓",
          stayDescribe:"整套普通公寓·1室1卫1床",
          stayLabels:["超赞房东","自助入住","近地铁站"],
          stayPrice:258,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:106,
          stayScore:4.7,
          stayPosition:[121.473701,31.230416]
        },
        {
          stayID:3,
          stayName:"网红酒吧北欧简约风一居室",
          stayDescribe:"整套普通公寓·1室1卫2床",
          stayLabels:["超赞房东","自助入住","灵活退改"],
          stayPrice:199,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:18,
          stayScore:4.5,
          stayPosition:[121.473701,31.230416]
        },
        {
          stayID:4,
          stayName:"要多市中心有多市中心，环贸零距离",
          stayDescribe:"合住房间·1室1卫1床",
          stayLabels:["超赞房东","自助入住","灵活退改"],
          stayPrice:150,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:199,
          stayScore:4.8,
          stayPosition:[121.473701,31.230416]
        },
       ],
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