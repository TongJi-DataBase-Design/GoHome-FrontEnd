<template>
<div style="width: 100%">
  <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
  <el-card class="box-card" shadow="hover"
           style="position: relative;top:-75px;left: -5%">
  <!--    用户的头像-->
  <el-image
  style="width: 150px;height: 150px"
  :src="hostImg" class="image">
    <div slot="error" class="image-slot">
      <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/头像 (3).png">
      </el-image>
    </div>
  </el-image>
    <!--更改图像的弹出框-->
    <el-popover transition="fade-in-linear"  placement="right" width="400" trigger="click" >
      <h4 style="padding-top: 1px;vertical-align: text-top;">个人资料>个人头像</h4>
      <el-card style="border-radius: 10px;border-radius: 10px;border-width: 2px;border-color: #7b7b7b">
        <el-row>
          <el-col :span="12"><div class="grid-content bg-purple">
            <el-image
                style="width: 150px; height: 150px;border-radius: 5px"
                :src="hostImg"  >
              <div slot="error" class="image-slot">
                <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/头像 (3).png"></el-image>
              </div>
            </el-image>
          </div></el-col>
          <el-col :span="12"><div class="grid-content bg-purple-light">
            <p style="font-family: 'PingFang SC';font-size: 14px">
              <b>最好提供显示您正脸的个人头像，可以让房东和房客对您有个大致印象。也可以根据您的喜好随意更改头像，但我们建议上传您的真人头像。
              </b>
              <el-upload action='' :on-change="getFile"
                         :limit="1" list-type="picture" :auto-upload=false
              >
                <el-button  class="Mybutton" size="small" >选择图片上传</el-button>
              </el-upload>
              <el-button  class="Mybutton"  v-show="change_img_show" @click="changeImg"><u>提交修改</u></el-button>
            </p>
          </div></el-col>
        </el-row>
      </el-card>
      <el-button   slot="reference" type="text" style="color: #333333 ;font-size: medium;font-family: 'Arial Rounded MT Bold'" v-on:> <u><b>更改头像</b></u></el-button>
    </el-popover>
    <br><br>
<!--   评价信息 -->
    <span style="position:relative;right: 50px">
    <img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/评价 (2).png" style="width: 35px;height: 35px;">
  </span>
    <span style="position: relative;top: -10px;right: 40px;font-size: large"><b>{{reviewNum}}条评价</b></span>
    <br><br>
<!--    的-->
    <span style="position:relative;right: 50px">
    <img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/等级.png" style="width: 35px;height: 35px;position: relative;right: -25px">
  </span>
    <span style="position: relative;top: -10px;right: 15px;font-size: large"><b>房东等级：{{hostLevel}}级</b></span>
    <el-divider></el-divider>
    <div style="font-size: large"><b>{{hostNickName}}已确认</b></div>
    <br>
    <div style="font-size: large"><b>真实姓名：{{hostRealName}}</b></div>
    <br>
    <span style="position:relative;right: 60px">
    <img :src="TagimgList[AuthenticationTag]" style="width: 20px;height: 20px;">
  </span>
    <span class="UserListtext"><b>身份认证</b></span>
    <br>
    <span style="position:relative;right: 60px">
    <img :src="TagimgList[EmailTag]" style="width: 20px;height: 20px;">
  </span>
    <span class="UserListtext"><b>电子邮箱</b></span>
    <br>
    <span style="position:relative;right: 60px">
    <img :src="TagimgList[PhoneTag]" style="width: 20px;height: 20px;">
  </span>
    <span class="UserListtext"><b>手机号码</b></span>
    <el-divider></el-divider>
    <span style="position:relative;right:40px">
    <img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210710222746094.png" style="width: 35px;height: 35px;">
        <span class="BigFont"style="position: relative;top: -8px">信誉积分</span>
  <span style="font-size: 15px;color: #7b7b7b;font-family: 'PingFang SC';font-weight: bold;position: relative;top: -10px;left: 50px">{{hostScore}}分</span>
  </span>
  </el-card>

</div>
</template>

<script>
import {uploadAvatar} from "../api/customerInfo";

export default {
  name: "HostInfoBlock",
  props:{
    reviewNum:Number,
    hostLevel:Number,
    hostNickName:Number,
    hostRealName:Number,
    TagimgList:Array,
    AuthenticationTag:Number,
    EmailTag:Number,
    PhoneTag:Number,
    hostScore:Number
  },
  data:function ()
  {
    return{
      hostImg:"",//默认为空
      new_img:"",//用户更改的新头像
      change_img_show:false
    }
  },
  created() {
    //调用获取房东信息的api
    console.log("dwdwwd",this.reviewNum);
  },
  methods:{
    getFile(file)
    {
      const isJPG=file.raw.type==='image/jpeg';
      const isPNG=file.raw.type==='image/png' ;
      const isLt5M=file.raw.size/1024/2024<5;
      if(!isJPG&&!isPNG){
        this.$message.error('上传图片大小不能超过5MB！');
      }
      if((isJPG||isPNG)&&isLt5M){
        this.getBase64(file.raw).then(res=>{
        });
      }
    },
    getBase64(file)
    {
      let sel=this;//promise作用域问题，在promise内部无法获取到this

      return new Promise(function(resolve,reject){
        let reader=new FileReader();

        reader.readAsDataURL(file);
        let imgResult="";
        reader.onload=function(){
          imgResult=reader.result;
          //现在就可以调用api进行图像的更新

          sel.new_img=imgResult;
          sel.change_img_show=true;

          this.new_img=imgResult;//新的头像路径存储
        };
        reader.onerror=function (error){
          reject(error);
        };
        reader.onloadend=function (){
          resolve(imgResult);
        }
      });
    },
    changeImg:function ()
    {
      this.hostImg=this.new_img;
      //我们在这里进行更改头像api的调用
      console.log("这里是上传头像API的调用")
      let param= {
        avatarCode:this.new_img
      };
      console.log("字符",this.new_img);
      uploadAvatar(param).then(response=>{
        console.log("返回的东西：",response.data.errorCode);
      })

    }
  }
}
</script>

<style scoped>
.box-card{
  width: 250px;
  height: 650px;
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 1s;
  background-color: rgba(246, 248, 248, 0.918);
}
.image
{
  border-radius: 75px;
}
.Mybutton
{
  width: 130px;
  height: 50px;
  border-color: #929292;
  border-radius:15px;
  border-width: 3px;
  box-shadow: 5px 5px 8px #888888;
  font-family: "PingFang SC";
  font-size: medium;
  font-weight: bold;
  color: #7b7b7b;
  animation: fadeInDown;
  animation-duration: 1s;

}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.BigFont
{
  font-size: 20px;
  font-family: "PingFang SC";
  font-weight: bold;

}

.UserListtext
{
  position: relative;
  top: -5px;
  right: 50px;
  font-size:medium;
  color: #7b7b7b
}


</style>