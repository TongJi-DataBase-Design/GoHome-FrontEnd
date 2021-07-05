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
      :type="line"
      :stroke-width="20"
      :percentage="20"
      :color="blue"
    ></el-progress>

    <!--主体部分-->
    <div id="mymain">
      <!--主功能区-->
      <div id="workspace">
        <h1>是否有公共卫生间或公共浴室？</h1>

        <div style="margin-top:10%">
            <small style="margin-right:20px">公共卫生间数量</small>
            <el-input-number size="small" v-model="pubRestNum" :min="0" :max="10" label="公共卫生间数量"></el-input-number>
        </div>

        <div style="margin-top:10%">
            <small style="margin-right:20px">公共浴室数量</small>
            <el-input-number size="small" v-model="pubBathNum" :min="0" :max="10" label="公共浴室数量"></el-input-number>
        </div>

        <div  style="margin-top:10%">
            <small style="margin-right:20px">是否有无障碍设施</small>
            <el-switch v-model="barrierFree" ></el-switch>

        </div>
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
            pubRestNum:0,
            pubBathNum:0,
            barrierFree:false
        }
    },

    mounted(){
      if(localStorage.getItem('pubRestNum')){
        try{
          console.log('浏览器获取pubRestNum');
          this.pubRestNum=localStorage.getItem('pubRestNum');
        }catch(e){
          localStorage.removeItem('pubRestNum');
        }
      }

      if(localStorage.getItem('pubBathNum')){
        try{
          console.log('浏览器获取pubBathNum');
          this.pubBathNum=localStorage.getItem('pubBathNum');
        }catch(e){
          localStorage.removeItem('pubBathNum');
        }
      }

      // @todo switch初始默认不显示状态怎么办？？？
      if(localStorage.getItem('barrierFree')){
        try{
          console.log('浏览器获取barrierFree',localStorage.getItem('barrierFree'));
          this.barrierFree=localStorage.getItem('barrierFree');
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

          const parsed2=JSON.stringify(this.barrierFree);
          localStorage.setItem('barrierFree',parsed2);

          this.$router.push('/become-a-host/addrInfo');
        },

        backPage:function(){
          this.$router.go(-1);
        }
    }
}
</script>