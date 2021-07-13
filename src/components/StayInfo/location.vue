<template>
<div>
  <el-card shadow="hover" style="width:95%;margin:0 auto;border-radius:15px;margin-top:10px">
    <div slot="header">
        <h2>
            <i class="iconfont icon-jingdian3" id="myIcon" ></i>
            <span  > 周边信息</span>
        </h2>

      </div>
    <div v-for="cnt of 3" :key="cnt" style="width:600px;margin:0 auto">
      <div style="margin:5px 0 5px 0;float:left" v-if="cnt===1">
          <i class="iconfont icon-jingdian2" id="myIcon"></i>
          <span class="myInfo">热门景点</span>
         <span class="myVal" v-for="n of spotsNearby" :key="n"> {{n.nearbyName}}({{n.nearbyDistance}})</span>
      </div>

<!--        <div v-for="near of "></div>-->
      <div style="margin:5px 0 5px 0;float:left" v-else-if="cnt===2">
          <i class="iconfont icon-gongjiaozhandian" id="myIcon"></i>
          <span class="myInfo">地铁/公交车站</span>
          <span class="myVal" v-for="n of metroNearby" :key="n">
              {{n.nearbyName}}({{n.nearbyDistance}})
          </span>
      </div>
      <div style="margin:5px 0 5px 0;float:left" v-else>
          <i class="iconfont icon-huochezhan3" id="myIcon"></i>
          <span class="myInfo">机场/火车站</span>
          <span class="myVal" v-for="n of airpotNearby" :key="n">{{n.nearbyName}}({{n.nearbyDistance}}) &nbsp; </span>
      </div>
    </div>

    <div style="width: 1000px">
      <h1>这里是地图</h1>
      <StayLocationMap name="hh"></StayLocationMap>
    </div>
    
  </el-card>
  
</div>
</template>

<script>
import near from '@/assets/getnearby.json'
import StayLocationMap from '@/components/stayLocationMap.vue'
let nearby = near.data;
export default {
  name: "location",
  components: {
    StayLocationMap,
  },
  data() {
    return{
      nearby,
      centerPosition:[121.47,31.23],

    }
  },
  computed:{
    spotsNearby: function(){
      return this.nearby.nearbys.filter(function (nearby){
        return nearby.nearbyType==="热门景点";
      })
    },
    airpotNearby: function(){
      return this.nearby.nearbys.filter(function (nearby){
        return nearby.nearbyType==="机场/火车站";
      })
    },
    metroNearby: function(){
      return this.nearby.nearbys.filter(function (nearby){
        return nearby.nearbyType==="地铁/公交车站";
      })
    }
  }
}
</script>

<style scoped>
@import  'https://at.alicdn.com/t/font_2668999_sb9ohwr9vfn.css';

#myIcon{
  display:inline-block;
  margin-right:10px;
  color:#0f68ba;
  font-size:1.2em;
}

.myInfo{
  font-size:1em;
  font-weight: 700;
  color:#0c5192;
}

.myVal{
   font-size:1em;
  margin:0 5px 0 5px;
}

#myIcon{
  display:inline-block;
  margin-right:10px;
  color:#0f68ba;
  font-size:1.2em;
}

</style>