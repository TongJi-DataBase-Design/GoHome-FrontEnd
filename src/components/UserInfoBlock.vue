<template>
  <div>
    <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>


<el-card class="box-card" shadow="hover" style="position: fixed;top: 75px;left: 120px"  >
  <el-image
      style="width: 150px; height: 150px;
       box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;" fit="cover"
      :src="user_img"  class="image"
     >
    <div slot="error" class="image-slot">
      <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/头像 (3).png"></el-image>
    </div>
  </el-image><br>

  <!--更改图像的弹出框-->
  <el-popover transition="fade-in-linear"  placement="right" width="400" trigger="click" >
    <h4 style="padding-top: 1px;vertical-align: text-top;">个人资料>个人头像</h4>
    <el-card style="border-radius: 10px;border-radius: 10px;border-width: 2px;border-color: #7b7b7b">
      <el-row>
        <el-col :span="12">
          <div
              class="grid-content bg-purple">
          <el-image
              style="width: 150px; height: 150px;border-radius: 5px"
              :src="user_img"  >
            <div slot="error" class="image-slot">
              <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/头像 (3).png"></el-image>
            </div>
          </el-image>
        </div>
        </el-col>
        <el-col
            :span="12"><div
            class="grid-content bg-purple-light">
          <p style="font-family: 'PingFang SC';font-size: 14px">
            <b>最好提供显示您正脸的个人头像，可以让房东和房客对您有个大致印象。也可以根据您的喜好随意更改头像，但我们建议上传您的真人头像。
            </b>
            <el-upload
                action=''
                :on-change="getFile"
                :limit="1"
                list-type="picture"
                :auto-upload=false
                >
              <el-button
                  class="Mybutton"
                  size="small" >
                选择图片上传
              </el-button>
            </el-upload>
            <el-button
                class="Mybutton"
                v-show="change_img_show"
                @click="changeImg">
              <u>
                提交修改
              </u>
            </el-button>
          </p>
        </div></el-col>
      </el-row>
    </el-card>
    <el-button
        slot="reference"
        type="text"
        style="color: #333333 ;font-size: medium;font-family: 'Arial Rounded MT Bold'"
        v-on:>
      <u><b>
        更改头像
      </b></u></el-button>
  </el-popover>
<br>
  <br><br>
  <!--评价信息-->
  <span style="position:relative;right: 50px">
    <img
        src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/评价 (2).png"
        style="width: 40px;height: 40px;">
  </span>

  <span
      style="position: relative;top: -10px;right: 40px;font-size: large"><b>
    {{reviewNum}}条评价
  </b></span>
<!--用户组等级-->
  <br>
  <br>
  <span style="position:relative;right: 50px">
    <img
        src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/等级.png"
        style="width: 40px;height: 40px;">
  </span>

  <span style="position: relative;top: -10px;right: 40px;font-size: large"><b>
    {{UserGroupLevel}}
  </b></span>
  <el-divider ></el-divider>

  <div style="font-size: large"><b>
    {{UserNickName}}已确认
  </b></div>
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
    <img src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/积分.png" style="width: 30px;height: 30px;">
  </span>
  <span class="BigFont"style="position: relative;left: -30px;top: -8px">用户积分</span>
  <span style="font-size: 15px;color: #7b7b7b;font-family: 'PingFang SC';font-weight: bold;position: relative;top: -10px">{{Score}}分</span>
</el-card>
    <el-image
        src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/室内1 (1) (4).png"
        style="position:fixed;left:-50px;top:0px;width: 300px;height: 420px">
    </el-image>


  </div>
</template>

<script>
import UserInfoMessage from "./UserInfoMessage";
import {getCustomerInfo, uploadAvatar} from "../api/customerInfo";
import { mapMutations } from 'vuex';
export default {
  name: 'HelloWorld',
  props: {
    reviewNum:Number,
    UserGroupLevel:String,
    UserNickName:String,
    AuthenticationTag:Number,
    EmailTag:Number,
    PhoneTag:Number,
    TagimgList:Array,
    Score:Number,
    user_img:String,
  },
data:function ()
{
  return {

    new_img:"",//用户更改的新头像
    change_img_show:false
  }
},
created() {
  
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
    ...mapMutations(['changeLogin']),
    changeImg:function ()
    {
      this.user_img=this.new_img;
      let param= {
        avatarCode:this.new_img
      };
      console.log('参数为',param.avatarCode)
      uploadAvatar(param).then(response=>{
 
        //刷新
       // this.$router.go(0);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import url("//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");
.box-card{
  width: 250px;
  height: 650px;
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: #ffffff;
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 1s;
}
.image
{
  border-radius: 75px;
}


.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #ffffff;
}
.bg-purple {
  background: #ffffff;
}
.bg-purple-light {
  background: #ffffff;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.UserListtext
{
  position: relative;
  top: -5px;
  right: 50px;
  font-size:medium;
  color: #7b7b7b
}

.BigFont
{
  font-size: 20px;
  font-family: "PingFang SC";
  font-weight: bold;

}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
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
.avatar {
  width: 178px;
  height: 178px;
  display: block;
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

</style>
