<template>
  <div>
    <!--页头-->
    <div id="header">
      <div style="display:inline-block;background-image:red;margin-left:40px">icon</div>        
      <h2 style="display:inline-block;margin-left:40px">section title</h2>
    </div>
    <!--进度条-->
    <el-progress
      :show-text="false"
      :stroke-width="20"
      :percentage="20"
    ></el-progress>

    <!--主体部分-->
    <div id="mymain">
      <!--主功能区-->
      <div id="workspace">
        <h1>标记位置是否正确？</h1>
        <small>若有需要，您可以调整地图，使图钉落在正确位置上。 只有已确认的房客才会看到，这样他们就知道怎么前往您的房源了。</small>

        <!-- <div class="amap-wrapper">
          <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
        </div> -->
      </div>

      <!--页尾-->
      <div style="border-top:1px solid #000;" id="footer">
        <el-button type="text" style="margin-top:10px;color:#63aaf1;font-weight:bolder">返回</el-button>
        <el-button style="margin-top:10px;color:white;float:right;display:inline-block;margin-right:10px;background-color:#63aaf1" @click="nextPage">下一个</el-button>
      </div>
    </div>

  </div>
</template>

<style scoped>
#header {
  text-align: left;
  height: 60px;
  background-color: white;
}

#workspace {
  display: absolute;
  padding: 20px 10px 20px 150px;
  background-color: white;
  width: 600px;
  height: 480px;
  text-align: left;
}
#footer {
  display: absolute;
  padding: 0 10px 0 150px;
  background-color: white;
  width: 600px;
  height: 80px;
  text-align: left;
}

#mymain {
  height: 600px;
  right: 0 !important;
  background-color: #b2d2f1;
}
</style>

<script>
export default {
  data:function(){
    return {
      address:null,  // 房源详细地址信息
      marker:[], // 定位点的经纬度
    }
  },

  mounted(){
    this.address=localStorage.getItem('prov')+localStorage.getItem('road')+localStorage.getItem('floor');
    this.getGeoLocation(); // 根据详细地址信息获取地图定位
  },

  methods:{
      getGeoLocation:function(){
          //let vthis = this
          // $.ajax({
          //     url: 'https://restapi.amap.com/v3/geocode/geo',
          //     type: 'get',
          //     dataType: 'jsonp',
          //     data: {
          //         key: '6e7239cd1f1aaf595bca3753a67986f8',
          //         address: this.address 
          //     },
          //     success: function (data) {
          //       console.log('解析的经纬度为：',data);
          //         //vthis.initAMap(data.geocodes[0].location)
          //     }
          // })

      },

      // initAMap (data) {
      //       let map = new AMap.Map('container', {
      //           resizeEnable: true,
      //           zoom: 20,
      //           center: data.split(',')
      //       })
      //       AMap.plugin('AMap.Geocoder', function () {
      //           let marker = new AMap.Marker({
      //               map: map,
      //               bubble: true
      //           })
      //       })
      // },

      nextPage:function(){
      this.$router.push('/become-a-host/disInfo');        
      }
    }
}
</script>