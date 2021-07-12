<template>
  <div>
    <!--页头-->
    <div id="header">
      <div style="display:inline-block;background-image:red;margin-left:40px">icon</div>        
      <h2 style="display:inline-block;margin-left:40px">地址</h2>
    </div>
    <!--进度条-->
    <el-progress
      :show-text="false"
      :stroke-width="20"
      :percentage="57"
    ></el-progress>

    <!--主体部分-->
      <div id="mymain" >
      <!--主功能区-->
      <div id="workspace">
        <!--文字区-->
        <div id="text" style="vertical-align: top;display:inline-block;margin-top:0;margin-bottom:5%;width:500px;">
          

          <h1>你的房源位于什么地方？</h1>
          <div style="margin-top:10%">
          <h3 style="display:block;margin-top:5px;margin-bottom:5px">省市区</h3>
          <el-cascader
          size="large"
          :options="options"
          v-model="selectedOptions"
          >
          </el-cascader>
          </div>

          <div style="margin-top:5%;">
          <h3 style="display:block;margin-bottom:5px">详细地址</h3>
          <el-input v-model="delPos" placeholder="例如「津塘路 2 号」或「嘉华小区」" @change="searchPos" :disabled="selectedOptions.length<3"></el-input>
          </div>

        </div>

          <!--地图区-->
          <div>
          <i style="display:inline-block;font-size:1.8em;color:#196ebe" class="iconfont icon-dingwei"></i>
          <strong style="display:inline-block;margin-left:5px;">在地图中标注位置</strong>
          </div>
      <div id="map">
        <amap
          cache-key="coord-picker-map"
          map-style="amap://styles/fresh"

          style="width:550px;height:400px"
          
          :zoom="zoom"
          is-hotspot
          @click="onMapClick"
        >
        <amap-marker v-if="position" :position.sync="position" draggable />
        </amap>
      </div>

      

      </div>

<div style="display:inline-block;">
        <el-card id="help" class="box-card">
          <i class="el-icon-s-opportunity" style="font-size:2em;color:orange"></i>
          <h3>确定房源位置</h3>
          <p>
            可以通过省市区和详细地址精确输入房源位置；
          </p>
          <p>
            还可以拖动地图，点击以选择房源的位置。
          </p>

        </el-card>
      </div>
        
      <!--页尾-->
      <div style="border-top:1px solid #000;" id="footer">
        <el-button type="text" style="margin-top:10px;color:#63aaf1;font-weight:bolder" @click="backPage">返回</el-button>
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

#help{
  width:300px;
  height:300px;
  margin-top:30%;
  text-align: left;
  color: #909399;
}

#workspace {
  display: inline-block;
  float:left;
  padding: 20px 10px 20px 150px;
  background-color: white;
  height: 480px;
  width: 600px;
  text-align: left;
  overflow: auto;
}
#footer {
  float:left;
  display: absolute;
  padding: 0 10px 0 150px;
  background-color: white;
  height: 80px;
  text-align: left;
  width:600px;
}

div::-webkit-scrollbar {
  width: 0;
}

#map{
  width:500px;
  margin-top:10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
}

#mymain {
  height: 600px;
  right: 0 !important;
  background-color: #b2d2f1;
}
</style>

<script>
import { regionData, CodeToText, TextToCode } from "element-china-area-data";
export default {
    data:function(){
        return {

            position:null, //具体房源的经纬度（marker显示）存储
            pos:null,//级联选择的结构化地址 存储
            delPos:null,//用户输入结构化地址 存储
            zoom: 10,

            options:regionData,
            selectedOptions: [], //存储
        }
    },

    
    methods: {
      //重置位置
      reset(){
        this.position=null;
        this.pos=null;
        this.delPos=null;
        this.selectedOptions=[];

      },


    // 通过输入具体位置进行定位
    searchPos(e){
      console.log('用户输入的delpos:',e);

      var geocoder = new AMap.Geocoder({
        city: '全国'
      });

      let that=this;
      geocoder.getLocation(that.pos+that.delPos, function(status, result) {
        if (status === 'complete' && result.info === 'OK') {
          // result中对应详细地理坐标信息
          console.log('编码结果：',result.geocodes[0].location);
          let lat=result.geocodes[0].location.lat;
          let ln=result.geocodes[0].location.lng;
          that.position=[ln,lat]; //更新position
      }
      else{
        this.$message.error('输入地址有误');
      }
      })

    },

    parseStrucPos(position){
        var geocoder = new AMap.Geocoder({
                  city: '全国'
        });
        let that=this;
        geocoder.getAddress(position, function(status, result) {
          if (status === 'complete' && result.info === 'OK') {
            // result中对应详细地理坐标信息
            console.log(result);
            if(result.regeocode.formattedAddress=="中华人民共和国"){
              console.log('点击到海域');
              that.reset();
              return ;
            }
            let p1=TextToCode[result.regeocode.addressComponent.province].code;
            let t='市辖区';
            if(result.regeocode.addressComponent.city!=''){
              t=result.regeocode.addressComponent.city;
            }
            let p2=TextToCode[result.regeocode.addressComponent.province][t].code;
            let p3=TextToCode[result.regeocode.addressComponent.province][t][result.regeocode.addressComponent.district].code;
            console.log('结构地址：',p1+p2+p3);
            that.selectedOptions=[p1,p2,p3]; //更新级联选择地址

            let loc = "";
            for (let i = 0; i < that.selectedOptions.length; i++) {
              let t=CodeToText[that.selectedOptions[i]];
              if(t=='市辖区'){
                loc+='';
              }
              else
                loc += CodeToText[that.selectedOptions[i]];
            };
            that.pos=loc; //更新级联选择结构地址
            console.log('级联选择的结构地址为：',that.pos);

            that.delPos=result.regeocode.formattedAddress.substring(that.pos.length);//更新输入框具体结构地址
            console.log('具体结构地址：',that.delPos); 
          }
        })
      },

    // 地图点击进行定位
    onMapClick(e) {
      console.log('点击位置');
      if (e.lnglat) {
        this.position = [e.lnglat.lng, e.lnglat.lat];
        this.parseStrucPos(this.position);
      } else {
        this.position = null;
      }

    },
      

    nextPage:function(){
        console.log(this.prov);
        if(!this.position){
            console.log('信息不完整！');
            this.$message({
              message:'需要填写以下内容才能继续!',
              type:'warning',
              duration:1500,
              center:true
            })
            return ;
        }
        else{
          const parsed = JSON.stringify(this.position);
          localStorage.setItem('position', parsed);
            
          this.$router.push('/become-a-host/disInfo');
        }
    },

    backPage:function(){
      this.$router.go(-1);
    },

    
    },

    mounted() {
      if(localStorage.getItem('position')){
        try{
          console.log('具体位置经纬度：',localStorage.getItem('position'));
          this.position=JSON.parse(localStorage.getItem('position'));
          this.parseStrucPos(this.position);
        }catch(e){
          localStorage.removeItem('position');
        }
      }

    },

    
}
</script>