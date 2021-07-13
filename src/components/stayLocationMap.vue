<template>
  <div class="amap-page-container">
    <div class="amap-wrapper">
      <el-amap vid="ABuildingMap" ref="ABuildingMap" :center="centerPosition" mapStyle="fresh" :plugin="plugins"
               animateEnable = "true" >
        <el-amap-marker :position="centerPosition" icon="https://z3.ax1x.com/2021/07/04/Rf6PFx.png"></el-amap-marker>
        <el-amap-circle  :center="centerPosition" :radius="radius" fillOpacity=0.5 fillColor="#4e72b8"
        strokeOpacity=0.5 strokeColor="#4e72b8"></el-amap-circle>         
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plugins: ['AMap.Scale', 'AMap.ToolBar'],
      radius:1000,
    }
  },
  props:{
    centerPosition:{
      Type:Array
    }
  }
}
</script>
