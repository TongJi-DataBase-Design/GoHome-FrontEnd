<template>
  <div class="amap-page-container">
    <div class="amap-wrapper">
      <el-amap vid="ABuildingMap" ref="ABuildingMap" :center="centerPosition" mapStyle="fresh" :plugin="plugins"
      animateEnable = "true" :events="mapEvents">
      <div v-for="(marker,index) in markerGroups" :key="marker.id">
       <el-amap-marker :extData="index" :position="marker.position" :label="marker.label" 
       icon="https://z3.ax1x.com/2021/07/04/Rf6PFx.png" :events="markerEvents">
       </el-amap-marker>
       <!--点击出现关于房屋的窗体信息-->
       <el-amap-info-window v-if="marker.window" :position="marker.position" closeWhenClickMap ="true" autoMove ="true">
          <!-- 房源图片组信息 -->
          <!--在房源在内部加入一个收藏爱心-->
          <el-carousel trigger='click' height='150px' indicator-position='none'>
          <el-carousel-item v-for='item in buildingImgDir' :key='item'>
              <div class='heart'>
              <i class='el-icon-sunny'></i>
              </div>                                
              <el-image :src="item" fit='fill'></el-image>
          </el-carousel-item>
          </el-carousel>
          <!-- 小标签，用于卡片内部字体 -->
         <div class="cardInfo">
            <div>
            <div class="small-label" >整套公寓.一室一卫一房</div>  
            <!-- 房源标题 -->
            <div class="stay-title">巴拉巴拉巴拉巴拉巴拉不想写啦巴拉巴拉巴拉巴拉巴拉</div>
            <!-- 价格标签 -->
            <div class="price-label" >￥ 起</div>
            <el-rate class="rate-bar"
                v-model="value"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>             
            </div>
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                        style="position:absolute;top:200px;right:20px;"></el-avatar>
          </div>                              
       </el-amap-info-window>
      </div>
      </el-amap>
    </div>
  </div>
</template>

<script>
export default {
    data(){
      const self = this;
      return {
        center: [121.59996, 31.197646],            
        loaded: true,
        plugins:[
          'AMap.Scale',
          'AMap.ToolBar',
        ],
        buildingImgDir:[
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
            'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg'],     
        markerGroups: [
          {
            position:[121.49996, 31.197646],
            id:1,
            text:"test1",
            label:{content:"￥50",offset:[2,47],direction:"right"},
            window:false
            
          },
          {
            position:[125.59996, 25.197646],
            id:2,
            text:"test2",
            label:{content:"￥10",offset:[2,47],direction:"right"},
            window:false
          },          
          {
            position:[115.59996, 20.197646],
            id:3,
            text:"test3",
             label:{content:"￥20",offset:[2,47],direction:"right"},
             window:false
          }
        ],
        markerEvents:{
          click(e){
            let curMarker=e.target;
            let MarkerID=curMarker.Ce.extData;
            if(self.markerGroups[MarkerID].window==true){
              self.markerGroups[MarkerID].window=false;
            }
            else{
              self.markerGroups[MarkerID].window=true;
            }            
            console.log(self.markerGroups[MarkerID].window);                     
          }                      
        },
        mapEvents:{
          click(e){
            let curPoints=self.getMapCeAndBo();
            console.log(curPoints);
          },
          zoomchange(){
            let curPoints=self.getMapCeAndBo();
            console.log(curPoints);
          },
          dragend(){
            let curPoints=self.getMapCeAndBo();
            console.log(curPoints);
          }
        },      
      }
    },
    methods:{
      getMapCeAndBo:function(){
        //获得当前地图的中心点与边界点，然后调用API得到相应范围内的房屋然后Marker
        //
        let map=this.$refs.ABuildingMap;
        let center=map.$$getCenter();
        let instance=map.$$getInstance();
        let bound=instance.getBounds();
        let sw=bound.southwest;
        let sw_lng=sw.lng;
        let sw_lat=sw.lat;
        let ne=bound.northeast;
        let ne_lng=ne.lng;
        let ne_lat=sw.lat;
        console.log(center,[sw_lng,sw_lat],[ne_lng,ne_lat]);
        return [center,[sw_lng,sw_lat],[ne_lng,ne_lat]]
      },
      
    },
    props:{
      centerPosition:{
        type:Array,
        default:[121.473701,31.230416]
      }
    }
}
</script>

<style>
@import url("../assets/css/font.css");
.amap-wrapper {
  width: 720px;
  height: 680px;
  box-shadow: rgba(3, 102, 214, 0.3) 0px 0px 0px 3px;
  
}
.amap-marker-label{
  border-color: black;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
  border-radius: 4px;
  font-family: "Lato-Bold";
  font-size:14px;
}
.amap-info-content{
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  border-radius: 4px;
  width: 250px;
  height: 300px;
  padding-right: 0%;
  padding-top: 0%;
  padding-left: 0%;
  padding-bottom: 0%;
}
.amap-info-close{
  visibility: hidden;
}
.heart{
    position: absolute;
    z-index: 999;
    right: 10px;
    top: 10px;
    width: 20px;
    height: 20px;
}
.small-label{
    font-size: 10px;
    color: #999;
    padding:6px 6px;
    font-family:"Lato-Bold","FZHeiBJW";
    margin:1px;
    word-wrap: break-word;
    word-break: normal;
}
.stay-title{
    font-size:20px;
    padding: 1px 6px;
    font-weight: bold;
    text-align: left;
    font-family:"FZHTDoc";
    height:50px;
    width: 160px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

}
/* 评分栏 */
.rate-bar{
    float:left;
    padding:1px 6px;
    bottom: 10px;
    font-family: "Lato-Bold","FZHeiBJW";
}
/* 评分栏与评论数的分隔符 */
.rate-divide{
    margin:6px;
    float:left;
    color:black
    
}

/* 价格label */
.price-label{
    font-size:15px;
    font-weight: bold;
    text-align: left;
    display:block;
    padding:6px 6px;
    font-family:"Lato-Bold","FZHeiBJW";
    flex: 1;  
}
.cardInfo{
  display: inline-flex;
}
</style>