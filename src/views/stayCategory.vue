<template>
  <div>
    <!--页头-->
    <div id="header" style="visibility:hidden">
      <div style="display:inline-block;background-image:red;margin-left:40px">icon</div>        
      <h2 style="display:inline-block;margin-left:40px">section title</h2>
    </div>
    <!--进度条-->
    <el-progress
    style="visibility:hidden"
      :show-text="false"
      :stroke-width="20"
      :percentage="20"
    ></el-progress>

    <!--主体部分-->
    <div id="mymain">
      <!--主功能区-->
      <div id="workspace" style="inline-block">
        <h1>完善房源资料可开始赚取收入</h1>
        <small>房源发布后可随时编辑房源信息</small>

        <div>
          <div>
            <i style="display:inline-block;font-size:1.5em;color:#196ebe" class="iconfont icon-duihao1"></i>
            <router-link  id="mylink" to="/become-a-host/type">房源和房客</router-link>
          </div>
          <div>
            <i style="display:inline-block;font-size:1.5em;color:#196ebe" class="iconfont icon-duihao1"></i>
            <router-link  id="mylink" to="/become-a-host/addrInfo">地址</router-link>
          </div>
          <div>
            <i style="display:inline-block;font-size:1.5em;color:#196ebe" class="iconfont icon-duihao1"></i>
            <router-link  id="mylink" to="/become-a-host/disInfo">描述</router-link>
          </div>
          <div>
            <i style="display:inline-block;font-size:1.5em;color:#196ebe" class="iconfont icon-duihao1"></i>
            <router-link  id="mylink" to="/become-a-host/roomImg">照片</router-link>
            <small style="display:block;margin-left:5%;margin-top:10px;color:#FF7F50;font-weight:bold">请至少添加一张照片</small>
          </div>
          <div>
            <i style="display:inline-block;font-size:1.5em;color:#196ebe" class="iconfont icon-duihao1"></i>
            <router-link  id="mylink" to="/become-a-host/stayInfo">入住</router-link>
          </div>
        </div>
      </div>
      
      <div style="display:inline-block;">
          <img  id="help" src="https://z3.ax1x.com/2021/07/12/WikIxK.png" class="image">
      </div>

      <!--页尾-->
      <div style="border-top:1px solid #000;" id="footer">
        <el-button type="text" style="margin-top:10px;color:#63aaf1;font-weight:bolder">返回</el-button>
        <el-button style="margin-top:10px;color:white;float:right;display:inline-block;margin-right:10px;background-color:#63aaf1">下一个</el-button>
      </div>
    </div>

  </div>
</template>

<style scoped>

#help{
  width:350px;
  height:400px;
  margin-top:30%;
  text-align: left;
  color: #909399;
}
#header {
  text-align: left;
  height: 60px;
  background-color: white;
}

#img{
  display: inline;
  background-color: blue;
  left:0;
  margin-left:0;
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
  background-color: white;
}

#mylink{
    display:inline-block;
    margin-top:5%;
    margin-left:10px;
    color:#696969;
    font-weight:bold;
    font-size:1.3em
}
</style>

<script>
import catImg from "@/assets/cat.png";
export default {
  data(){
    return {
      catImg
    }
  },
    watch:{
    $route(to,from){
      if(to.path.substr(0,15)!='/become-a-host/'){
        //清除浏览器记录
        let paramList=['stayType','maxTenantNum','roomNum','bedNum','pubRestNum','pubBathNum','barrierFree',
            'position','stayName','stayChars','stayTags','startTime','endTime','minDay','maxDay','roomInfo','imgList'];
        for(let i=0;i<paramList.length;i++){
            localStorage.removeItem(paramList[i]);
            localStorage.removeItem('stayAlter');
            localStorage.removeItem('stayId');
        }
        console.log('清楚浏览器记录！');
      }
    }

  },
  
}
</script>

