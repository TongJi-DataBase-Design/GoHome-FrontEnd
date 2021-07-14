<template>
  <div>
    <!--页头-->
    <div id="header">
      
      <h2 style="display:inline-block;margin-left:40px">section title</h2>
    </div>
    <!--进度条-->
    <el-progress
      :show-text="false"
      :stroke-width="20"
      :percentage="43"
    ></el-progress>

    <!--主体部分-->
    <div id="mymain">
      <!--主功能区-->
      <div id="workspace">
        <h1>是否有公共卫生间或公共浴室？</h1>

        <div style="margin-top:10%">
            <i style="display:inline-block;font-size:1.5em;color:#196ebe" class="iconfont icon-wei"></i>
            <small style="display:inline-block;margin-left:5px;margin-right:20px">公共卫生间数量</small>
            <el-input-number size="small" v-model="pubRestNum" :min="0" :max="10" label="公共卫生间数量"></el-input-number>
        </div>

        <div style="margin-top:10%">
            <i style="display:inline-block;font-size:1.5em;color:#196ebe" class="iconfont icon-bathroom-fill"></i>
            <small style="display:inline-block;margin-left:5px;margin-right:20px">公共浴室数量</small>
            <el-input-number size="small" v-model="pubBathNum" :min="0" :max="10" label="公共浴室数量"></el-input-number>
        </div>

        <div  style="margin-top:10%">
            <i style="display:inline-block;font-size:1.5em;color:#196ebe" class="iconfont icon-wuzhangaisheshi"></i>
            <small style="display:inline-block;margin-left:5px;margin-right:20px">是否有无障碍设施</small>
            <el-switch v-model="barrierFree" ></el-switch>

        </div>
      </div>

      <div style="display:inline-block;">
        <el-card id="help" class="box-card">
          <i class="el-icon-s-opportunity" style="font-size:2em;color:orange"></i>
          <h3>无障碍设施</h3>
          <p>
            您的房源中是否有无台阶通道、无障碍抽水马桶、带淋浴椅的浴缸、手持淋浴花洒等无障碍设施？
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
@import "https://at.alicdn.com/t/font_2666163_1eek1wz6kww.css";

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
  float:left;
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
            pubRestNum:0,
            pubBathNum:0,
            barrierFree:false,
        }
    },

    mounted(){
      if(localStorage.getItem('pubRestNum')){
        try{
          console.log('浏览器获取pubRestNum');
          this.pubRestNum=JSON.parse(localStorage.getItem('pubRestNum'));
        }catch(e){
          localStorage.removeItem('pubRestNum');
        }
      }

      if(localStorage.getItem('pubBathNum')){
        try{
          console.log('浏览器获取pubBathNum');
          this.pubBathNum=JSON.parse(localStorage.getItem('pubBathNum'));
        }catch(e){
          localStorage.removeItem('pubBathNum');
        }
      }

      if(localStorage.getItem('barrierFree')){
        try{
          console.log('浏览器获取barrierFree',localStorage.getItem('barrierFree'));
          this.barrierFree=JSON.parse(localStorage.getItem('barrierFree'))==1?true:false;
        }catch(e){
          localStorage.removeItem('barrierFree');
        }
      }

    },

    methods:{
        nextPage:function(){
          const parsed = JSON.stringify(this.pubRestNum);
          localStorage.setItem('pubRestNum', parsed);

          const parsed1=JSON.stringify(this.pubBathNum);
          localStorage.setItem('pubBathNum',parsed1);


          let t=this.barrierFree?1:0;
          const parsed2=JSON.stringify(t);
          localStorage.setItem('barrierFree',parsed2);

          this.$router.push('/become-a-host/addrInfo');
        },

        backPage:function(){
          this.$router.go(-1);
        }
    }
}
</script>