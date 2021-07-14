<template>
  <div>
    
    <!--页头-->
    <div id="header">
      
      <h2 style="display:inline-block;margin-left:40px">提交</h2>
    </div>
    <!--进度条-->
    <el-progress
      :show-text="false"
      :stroke-width="20"
      :percentage="100"
    ></el-progress>

    <!--主体部分-->
    <div id="mymain">
      <!--主功能区-->
      <div id="workspace">
        <h1>关于发布房源的重要信息</h1>

        <h3 style="margin-top:5%">数据披露</h3>
        <p>作为中国居民，您的相关信息将按照中国的相关法律法规存储、使用和处理。</p>

        <h3 style="margin-top:8%">您当地的法律与税费</h3>
        <p>大多数城市都有共享住宿方面的法律法规，许多地区还可能制定具体的法律和条例（如区划条例、建筑条例、许可条例或税收条例等）。在大多数地区，发布房源或接待房客之前，您必须先登记、获得许可证或执照。您可能还要负责汇缴特定的税费。在有些地区，短租可能被完全禁止。</p>
        <p>您需要对自己发布房源或预订住宿的决定负责。因此在归宿发布房源之前，您应当先了解适用的法律和法规。</p>
      </div>

      <div style="display:inline-block;">
          <img  id="help" src="https://z3.ax1x.com/2021/07/12/WikjPI.png" class="image">
      </div>

      <!--页尾-->
      <div style="border-top:1px solid #000;" id="footer">
        <el-button type="text" style="margin-top:10px;color:#63aaf1;font-weight:bolder" @click="backPage">返回</el-button>       
        <el-button style="margin-top:10px;color:white;float:right;display:inline-block;margin-right:30px;background-color:#63aaf1" @click="commit(0)">保存并退出</el-button>
        <el-button style="margin-top:10px;color:white;float:right;display:inline-block;margin-right:10px;background-color:#63aaf1" @click="commit(1)">提交并等待审核</el-button>
      </div>
    </div>

  </div>
</template>

<style scoped>
@import url('https://at.alicdn.com/t/font_2666163_1eek1wz6kww.css');
.myIcon{
  font-size:6em;
  color:blue;
}
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
  float:left;
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
  background-color: white;
}

 .el-message-box__message p {
    margin: 0;
    line-height: 24px;
    height: 1000px !important;
}
</style>

<script>
import {commitImg} from "@/assets/commit.png";
import {postStayInfo,putStayInfo}  from "@/api/stay";
import { MessageBox } from 'element-ui';

export default {
  data(){
    return{
      commitImg
    };

  },

    methods:{
        backPage:function(){
            this.$router.go(-1);
        },

        suc(status){
          let msg='';
          if(status==0){
            console.log('保存成功!');
            msg='<img src="https://z3.ax1x.com/2021/07/14/WeSpqS.png"/><br/><h1>保存成功</h1>\
          <h3>您可以随时进行房源信息修改</h3><small>3s后返回用户界面！</small>';

          }
          else{
            console.log('提交成功！');
            msg='<img src="https://z3.ax1x.com/2021/07/14/WeSpqS.png"/><br/><h1>提交成功</h1>\
          <h3>请等待管理员审核</h3><small>3s后返回用户界面！</small>';
          }
          MessageBox.alert(msg, {
          dangerouslyUseHTMLString: true,
          showClose:false,
          center:true,
          showConfirmButton:false,
          callback:action=>{
            console.log("即将进入房东也没")
            this.$router.push({path:'/hostinfopage'})
          }
          
        })

        setTimeout(() => {
          MessageBox.close();
          this.$router.push({path:'/hostinfopage'});
        }, 3000);

        },

        

        createParams(status){
          let params={};
          // +stayStatus单独处理
          //+roomInfo单独处理
          // get用于修改的时候添加stayId
          let paramList=['stayType','maxTenantNum','roomNum','bedNum','pubRestNum','pubBathNum','barrierFree',
          'longitude','latitude','stayName','stayChars','startTime','endTime','minDay','maxDay','struPos'];

          for(let i=0;i< paramList.length;i++){
            let v=JSON.parse(localStorage.getItem(paramList[i]));
            params[paramList[i]]=v;
          }
          params['stayStatus']=status; 
          let roomInfo=JSON.parse(localStorage.getItem('roomInfo'));
          let imgs=JSON.parse(localStorage.getItem('imgResults'));
          let roomNum=JSON.parse(localStorage.getItem('roomNum'));
          for(let j=0;j<roomNum;j++){
            roomInfo[j]['images']=imgs[j];
            // roomInfo[j]['bedNums']=JSON.stringify(roomInfo[j]['bedNums']);
            // roomInfo[j]['bedTypes']=JSON.stringify(roomInfo[j]['bedTypes']);
            roomInfo[j]['images']=roomInfo[j]['images'];
            // roomInfo[j]=JSON.stringify(roomInfo[j]);
          }
          params['roomInfo']=JSON.stringify(roomInfo);
          params['stayTags']=localStorage.getItem('stayTags');


          return params;

        },

        clearStorage(){
          let paramList=['stayType','maxTenantNum','roomNum','bedNum','pubRestNum','pubBathNum','barrierFree',
          'longitude','latitude','stayName','stayChars','stayTags','startTime','endTime','minDay','maxDay','struPos','roomInfo','imgResults','stayAlter','stayId'];

          for(let i=0;i<paramList.length;i++){
            localStorage.removeItem(paramList[i]);
          }
          console.log('清除浏览器记录！');
        },

        commit:function(status){
            let params=this.createParams(status);
            console.log(params)
            //修改信息
            if(JSON.parse(localStorage.getItem('stayAlter'))==true){
              let id=JSON.parse(localStorage.getItem('stayId'));
              params['stayId']=id;
              // params=qs.stringify(params);
              putStayInfo(params).then(res=>{
                if(res.errorCode==200){
                console.log('提交房源修改信息成功！status=',status);      
                }
                else{
                  console.log('提交房源修改信息失败！status=',status);
                }
              })
              
            }
            else{
              // params=qs.stringify(params);
              // console.log('params:',params);
              postStayInfo(params).then(res=>{
              if(res.errorCode==200){
                console.log('提交房源信息成功！status=',status);
                
              }
              else{
                console.log('提交房源信息失败！status=',status);
              }
            })
            }
            //this.clearStorage();
            this.suc(status);          
            
        },

    }
}
</script>

