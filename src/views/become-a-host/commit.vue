<template>
  <div>
    
    <!--页头-->
    <div id="header">
      <div style="display:inline-block;background-image:red;margin-left:40px">icon</div>        
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
        <p>作为中国居民，您的相关信息将由爱彼迎中国按照中国的相关法律法规存储、使用和处理。</p>

        <h3 style="margin-top:8%">您当地的法律与税费</h3>
        <p>大多数城市都有共享住宿方面的法律法规，许多地区还可能制定具体的法律和条例（如区划条例、建筑条例、许可条例或税收条例等）。在大多数地区，发布房源或接待房客之前，您必须先登记、获得许可证或执照。您可能还要负责汇缴特定的税费。在有些地区，短租可能被完全禁止。</p>
        <p>您需要对自己发布房源或预订住宿的决定负责。因此在爱彼迎发布房源之前，您应当先了解适用的法律和法规。</p>
      </div>

      <div style="display:inline-block;">
          <img  id="help" :src="commitImg" class="image">
      </div>

      <!--页尾-->
      <div style="border-top:1px solid #000;" id="footer">
        <el-button type="text" style="margin-top:10px;color:#63aaf1;font-weight:bolder" @click="backPage">返回</el-button>       
        <el-button style="margin-top:10px;color:white;float:right;display:inline-block;margin-right:30px;background-color:#63aaf1" @click="save">保存并退出</el-button>
        <el-button style="margin-top:10px;color:white;float:right;display:inline-block;margin-right:10px;background-color:#63aaf1" @click="commit">提交并等待审核</el-button>
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
</style>

<script>
import commitImg from "@/assets/commit.png";
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

        save:function(){
            console.log('保存并退出');
            this.$router.push('/become-a-host/stayCategory');
        },

        commit:function(){
            console.log('提交');
        }
    }
}
</script>

