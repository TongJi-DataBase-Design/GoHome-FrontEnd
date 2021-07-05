<template>
<div>
  <el-card shadow="hover">
    <div slot="header">
    <h3>周边信息</h3>
    </div>
    <div v-for="cnt of 3">
      <div v-if="cnt===1">热门景点：
         <span v-for="n of spotsNearby"> {{n.nearbyName}}({{n.nearbyDistance}})</span>
      </div>

<!--        <div v-for="near of "></div>-->
      <div v-else-if="cnt===2">地铁/公交车站：
      <span v-for="n of metroNearby">
        {{n.nearbyName}}({{n.nearbyDistance}})
      </span></div>
      <div v-else>机场/火车站：
      <span v-for="n of airpotNearby">{{n.nearbyName}}({{n.nearbyDistance}}) &nbsp; </span></div>
    </div>
    <div>
      <h1>这里是地图</h1>
    </div>
  </el-card>
</div>
</template>

<script>
import near from '@/assets/getnearby.json'
let nearby = near.data;
export default {
  name: "location",
  data() {
    return{
      nearby,
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

</style>