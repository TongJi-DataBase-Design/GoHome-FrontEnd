<template>
  <div>
    <!--页头-->
    <div id="header">
      <div style="display:inline-block;background-image:red;margin-left:40px">icon</div>        
      <h2 style="display:inline-block;margin-left:40px">照片</h2>
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
        <h1 >添加卧室照片</h1>

        <el-collapse  style="margin-top:10%">
          <el-collapse-item v-for="r in roomNum" :key="r" :title="'卧室   '+r">
            <el-upload action='' :on-change="(file, fileList) => {getFile(file, fileList, r)}" :show-file-list="true"
              list-type="piture" :auto-upload=false class="avatar-uploader">
              <el-image
                v-if="imgURLs[r]"
                style="width: 200px; height: 200px"
                :src="imgURLs[r]"
                fit="contain"></el-image>
              <i  class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <el-button class="myClr"  v-if="imgURLs[r]" type="primary" icon="el-icon-delete"  @click="del(r)"></el-button>
          </el-collapse-item>
        </el-collapse>
        
      </div>

      <div style="display:inline-block;">
        <el-card id="help" class="box-card">
          <i class="el-icon-s-opportunity" style="font-size:2em;color:orange"></i>
          
          <p>
            每个房间最多添加一张照片，照片需小于 50MB。
          </p>
          <p>
            照片在自然光下看起来更清晰自然。建议您在白天拍摄，打开窗户，避免使用闪光灯。
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
#help{
  width:300px;
  height:300px;
  margin-top:30%;
  text-align: left;
  color: #909399;
}


.myClr{
  display:inline-block;
  color:#8c939d;
  background-color: transparent;
  border-color: transparent;
  font-size:1.5em;

}
 .avatar-uploader .el-upload {
    border: 2px dashed #8c939d ;
    border-radius: 6px;
    cursor: pointer;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
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
     overflow:auto;

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
        return{
            roomNum:0, //卧室数量
            imgResults:[], // 图片编码列表
            imgURLs:{}, //文件路径列表
            temp:null,
        }
    },

    mounted(){
        this.roomNum=JSON.parse(localStorage.getItem('roomNum'));


        // 获取图片编码
        if(localStorage.getItem('imgResults')){
            try{
            this.imgResults=localStorage.getItem('imgResults');
            }catch(e){
                localStorage.removeItem('imgResults');
            }
        }
        else{
            for(let i=0;i<this.roomNum;i++){
                this.imgResults.push('');
            }
        }

        // 获取图片url
        if(localStorage.getItem('imgURLs')){
            try{
            this.imgURLs=localStorage.getItem('imgURLs');
            }catch(e){
                localStorage.removeItem('imgURLs');
            }
        }
        else{
            for(let i=0;i<this.roomNum;i++){
                this.imgURLs[string(i+1)]=null;
            }
        }
    },

    methods:{
      getFile(file,fileList, r){
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG=file.raw.type==='image/png';
        const isLt5M = file.size / 1024 / 1024 < 50;

        if((!isJPG)&&(!isPNG)||!isLt5M){
          this.$message.error('上传图片必须是大小不超过5MB的JPG或PNG文件！');
        }
        else{
          this.imgURLs[string(r)] = URL.createObjectURL(file.raw);
          this.getBase64(file.raw,r).then(res=>{
            console.log('文件上传成功！',res);
           console.log("debug",this.imgURLs);
          });
        }

      },

      getBase64(file,r){
        let that=this;
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult='';
          reader.readAsDataURL(file);
          reader.onload = function() {
            that.imgResults[r] = reader.result; // 获取图片的base64编码
          };
          reader.onerror = function(error) {
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },

      // 删除卧室r的图片
      del(r){
        this.imgURLs[r-1]=null;
        this.imgResults[r-1]='';

        //调试用
        this.temp=null;
      },

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