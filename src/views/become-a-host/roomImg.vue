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
      :percentage="85"
    ></el-progress>

    <!--主体部分-->
    <div id="mymain">
      <!--主功能区-->
      <div id="workspace">
        <h1 >添加卧室照片</h1>
        <i style="display:inline-block;font-size:1.5em;color:#196ebe" class="iconfont icon-zhaopian6"></i>
        <small style="display:inline-block;margin-left:5px;font-size:1em">为您的卧室添加照片</small>

        <el-collapse  style="margin-top:5%">
          <el-collapse-item  v-for="r in roomNum" :key="r" :title="'卧室   '+r">
            
            <div >
              <el-upload 
                action='' 
                :on-change="(file, fileList) => {getFile(file, fileList, r)}" 
                :show-file-list="false"
                list-type="piture" 
                :auto-upload=false 
                >
                <i  style="font-size:2em;color:#409EFF" class="iconfont icon-shangchuanzhaopian1"></i>
                </el-upload>
              
              <!-- <el-image
                v-for="index in imgURLs[r-1].length"
                :key="imgURLs[r-1][index-1]"
                style="width: 200px; height: 200px"
                v-bind:src="imgURLs[r-1][index-1]"
                fit="contain"></el-image> -->
                <!-- <el-button class="myClr"  type="primary" icon="el-icon-delete"  @click="del(r,index)"></el-button> -->
                <el-row :gutter="10" v-for="index in Math.ceil(imgURLs[r-1].length/3)" :key="index">
                  <el-col :span="7" >
                    <el-image
                      v-bind:src="imgURLs[r-1][(index-1)*3]"
                      fit="fill">
                    </el-image>
                    <i id="myClr"  type="primary" class="el-icon-delete"  @click="del(r,(index-1)*3)"></i>
                  </el-col>
                  <el-col :span="7" v-if="(index-1)*3+1<imgURLs[r-1].length">
                    <el-image
                      v-bind:src="imgURLs[r-1][(index-1)*3+1]"
                      fit="cover">
                    </el-image>
                    <i id="myClr"  type="primary" class="el-icon-delete"  @click="del(r,(index-1)*3+1)"></i>
                  </el-col>
                  <el-col :span="7" v-if="(index-1)*3+2<imgURLs[r-1].length">
                    <el-image
                      v-bind:src="imgURLs[r-1][(index-1)*3+2]"
                      fit="cover">
                    </el-image>
                    <i id="myClr"  type="primary" class="el-icon-delete"  @click="del(r,(index-1)*3+2)"></i>
                  </el-col>
                </el-row>
            </div>

            
            
            
            
          </el-collapse-item>
        </el-collapse>
        
      </div>

      <div style="display:inline-block;">
        <el-card id="help" class="box-card">
          <i class="el-icon-s-opportunity" style="font-size:2em;color:orange"></i>
          
          <p>
            每个房间可添加多张照片，照片需小于 50MB。
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
@import url('https://at.alicdn.com/t/font_2670581_zmvdxwf3kf.css');
@import url('https://at.alicdn.com/t/font_2666163_1eek1wz6kww.css');
#help{
  width:300px;
  height:300px;
  margin-top:30%;
  text-align: left;
  color: #909399;
}
.el-row {
  margin-bottom: 10px;
  /* &:last-child {
    margin-bottom: 0;
  } */
}
.el-col {
  border-radius: 4px;
}


#myClr{
  color:#8c939d;
  background-color: transparent;
  border-color: transparent;
  font-size:1.5em;
  float:right;

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
            roomNum:1, //卧室数量
            imgResults:[], // 图片编码列表
            imgURLs:[], //文件路径列表
            temp:null,

  
        }
    },

    created(){
      this.initData();
    },

    methods:{
      initData(){
        this.roomNum=JSON.parse(localStorage.getItem('roomNum'));
          // 获取图片编码
          if(localStorage.getItem('imgResults')){
              try{
              this.imgResults=JSON.parse(localStorage.getItem('imgResults'));
              this.imgURLs=this.imgResults;
              // this.imgURLs=[];
              // for(let i=0;i<this.roomNum;i++){
              //   let temp=[];
              //   for(let j=0;j<this.imgResults[i].length;j++){
              //     temp.push(this.convertBase64ToFile(this.imgResults[i][j]));
              //   }
              //   this.imgURLs.push(temp);
              // }
              }catch(e){
                  localStorage.removeItem('imgResults');
              }
          }
          else{
              for(let i=0;i<this.roomNum;i++){
                  this.imgResults.push([]);
                  this.imgURLs.push([]);
              }
          }

          // // 获取图片url
          // if(localStorage.getItem('imgURLs')){
          //     try{
          //     this.imgURLs=JSON.parse(localStorage.getItem('imgURLs'));
          //     }catch(e){
          //         localStorage.removeItem('imgURLs');
          //     }
          // }
          // else{
          //     for(let i=0;i<this.roomNum;i++){
          //         this.imgURLs.push([]);
          //     }
          // }
      },

      getFile(file,fileList, r){
        const isJPG = file.raw.type === 'image/jpeg';
        const isPNG=file.raw.type==='image/png';
        const isLt5M = file.size / 1024 / 1024 < 50;

        if((!isJPG)&&(!isPNG)||!isLt5M){
          this.$message.error('上传图片必须是大小不超过50MB的JPG或PNG文件！');
        }
        else{
          this.imgURLs[r-1].push(URL.createObjectURL(file.raw));
          this.getBase64(file.raw,r).then(res=>{
            console.log('文件上传成功！',res);
           console.log("debug",this.imgURLs);
          });
        }

      },

      convertBase64ToFile(dataurl, filename = 'file'){
          let arr = dataurl.split(',')
          let mime = arr[0].match(/:(.*?);/)[1]
          let suffix = mime.split('/')[1]
          let bstr = atob(arr[1])
          let n = bstr.length
          let u8arr = new Uint8Array(n)
          while (n--) {
            u8arr[n] = bstr.charCodeAt(n)
          }
          let rawFile=new File([u8arr], `${filename}.${suffix}`, {
            type: mime
          })
          let reader=new FileReader();
          reader.readAsDataURL(rawFile);
          return reader.result;
      },

      getBase64(file,r){
        let that=this;
        return new Promise(function(resolve, reject) {
          let reader = new FileReader();
          let imgResult='';
          reader.readAsDataURL(file);
          reader.onload = function() {
            that.imgResults[r-1].push(reader.result); // 获取图片的base64编码
          };
          reader.onerror = function(error) {
            console.log('errror:',error);
            reject(error);
          };
          reader.onloadend = function() {
            resolve(imgResult);
          };
        });
      },

      // 删除卧室r的图片
      del(r,index){
        this.imgURLs[r-1].splice(index,1);
        this.imgResults[r-1].splice(index,1);


      },

      nextPage:function(){
          const parsed=JSON.stringify(this.imgResults);
          localStorage.setItem('imgResults',parsed);

          // const parsed1=JSON.stringify(this.imgURLs);
          // localStorage.setItem('imgURLs',parsed1);

          this.$router.push('/become-a-host/stayInfo');
      },
      backPage:function(){
          this.$router.go(-1);
      },

}
    
}
</script>