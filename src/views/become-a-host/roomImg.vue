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
        <h1>添加卧室照片</h1>


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
        return{
            roomNum:0,
            imgList:[],
        }
    },

    mounted(){
        this.roomNum=localStorage.getItem('roomNum');

        if(localStorage.getItem('imgList')){
            try{
            this.imgList=localStorage.getItem('imgList');
            }catch(e){
                localStorage.removeItem('imgList');
            }
        }
        else{
            for(let i=0;i<this.roomNum;i++){
                this.imgList.push('');
            }
        }
    },

    methods:{
        nextPage:function(){
            const parsed=JSON.stringify(this.imgList);
            localStorage.setItem('imgList',parsed);

            this.$router.push('/become-a-host/stayInfo');
        },
        backPage:function(){
            this.$router.go(-1);
        }
    }
    
}
</script>