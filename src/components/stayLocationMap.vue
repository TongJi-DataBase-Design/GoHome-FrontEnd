<template>
  <div class="amap-page-container">
    <div class="amap-wrapper">
      <el-amap vid="ABuildingMap" ref="ABuildingMap" :center="centerPosition" mapStyle="fresh" :plugin="plugins"
               animateEnable = "true" >
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      plugins: ['AMap.Scale', 'AMap.ToolBar'],
      centerPosition:[121,37]
    }
  }
}
</script>
