<template>
  <el-row style="height: 100%">
    <el-col :span="15" style="height: 100%">
    <!--用户基本信息-->
    <p class="bigFontSize" style="float: left">您好，我是{{hostRealName}}</p>
      <p class="smallgretfontsize"
         style="float: left;position:relative;top:60px;left: -300px" >
        注册时间:{{hostCreateTime}}
      </p>
      <!--下面是实现修改资料弹出框的代码-->
      <br><br><br><br><br>
      <el-button
          class="Mybutton"
          style="position: relative;left:-370px;top:10px"
          @click="dialog=true">
        <u>
          修改个人资料
        </u>
      </el-button>
      <el-drawer
          title="个人资料"
          :visible.sync="dialog"
          :direction="direction"
          ref="drawer"
          :before-close="handleClose">
        <!--在抽屉内部定义表单-->
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" >

          <el-image
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/任务中心-首次修改昵称.png"
              style="width: 40px;height: 40px;position: relative;left:-150px" ></el-image>
          <span
              class="bigFontSize"
              style="font-size: 25px;position: relative;top: -5px;right: 140px">
            昵称
          </span>
          <br>

          <el-form-item label="新的昵称"  prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-divider></el-divider>

          <el-image
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/性别.png"
              style="width: 40px;height: 35px;position: relative;left:-150px" ></el-image>
          <span
              class="bigFontSize"
              style="font-size: 25px;position: relative;top: -5px;right: 140px">
            性别
          </span>
          <br>

          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="性别">
              <el-option label="男" value="男"> </el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>


        </el-form>
        <div >
          <el-button
              @click="cancelForm" class="Mybutton"
              style="width: 120px;height: 50px">
            取消修改
          </el-button>
          <el-button
              type="primary"
              class="Mybutton"
              style="width: 120px;height: 50px;background-color: #025f08;
              color:white"
              @click="$refs.drawer.closeDrawer()"
              :loading="loading">{{ loading ? '更新中...' : '保存' }}
          </el-button>
        </div>
      </el-drawer>


      <br><br>
      <el-card shadow="hover" style="width: 550px;height: 200px;
      box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;">
        <!--信息卡片-->
        <el-col :span="15">
          <el-image
              class="icon" src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户名.png">
          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            用户名:{{hostNickName}}
          </span>
          <el-image
              class="icon" :src="scoreImgList[rateNum]"
              style="float: right;position: relative;left: -70px">
          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;float: right;position: relative;left:30px;top:5px" >
            {{rateString[rateNum]}}
          </span>
<!--          真名-->
          <br><br>
          <el-image
              class="icon" src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/组件-姓名.png"
          >
          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            姓名:{{hostRealName}}
          </span>
<!--          总评价数-->
          <br><br>
          <el-image
              class="icon" src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/评价 (3).png">

          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            共收获{{reviewNum}}条评价
          </span>
        <!--评分-->
          <el-rate v-model="averageRate" disabled
                   show-text
                   show-score
                   text-color="#ff9900"
                   score-template="{value}"
                   style="position:relative;top:8px" >
          </el-rate>
<!--          性别-->
          <br>
          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            性别：{{hostSexString}}
          </span>
          <el-image
              class="icon"
              :src="sexImgList[hostSexString]"
              style="width:25px;height:25px;position: relative;left:5px;top:5px">

          </el-image>
        </el-col>
        <el-col :span="1"
                style="height: 190px ;position: relative;top:-90px">
          <el-divider
              direction="vertical"
              class="el-divider--vertical"></el-divider>
        </el-col>
        <el-col :span="8">
          <el-image
              class="icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/房屋 (1).png">

          </el-image>
          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            已发布{{publishedNum}}套房源
          </span>
          <br><br><br>
          <el-image
              class="icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/审核.png"></el-image>
          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            {{pendingReviewNum}}套审核中的房源
          </span>
          <br><br><br>
          <el-image
              class="icon" src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/草稿箱.png"></el-image>
          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            {{unpublishedNum}}套房源未发布
          </span>
        </el-col>
      </el-card>
<!--      有关房源的信息-->
<!--      有关已发布的房源的信息-->
      <el-divider></el-divider>
      <p
          style="float: left;font-size: 20px"
          class="bigFontSize">
        已发布的房源
      </p>
      <br><br><br><br>
      <el-card shadow="hover" class="card-class" style="float: left">
        <!--放置一个图片走马灯-->
        <div class="imgBox"
             style="position: relative;left:-20px;top:-20px">
          <el-carousel
              height="130px"
              style="border-radius: 15px"
              indicator-position="none">
            <el-carousel-item
                v-for="item in publishedHouseInfo[0].stayImgList"
                :key="item"
            >
<!--              内嵌房源图片-->
              <el-image :src="item"
              style="width: 130px;height: 130px;"
              fit="cover"></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-card>
      <br><br>      <br><br>      <br><br>      <br><br>      <br><br>      <br><br>


    </el-col>
    <el-col :span="1" style="height: 100%">
      <el-divider
          direction="vertical"
          class="el-divider--vertical"></el-divider>
    </el-col>
    <el-col :span="8">
      <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/室内2.png"
      style="width: 300px;height: 400px;position: relative;right:-50px;top:-70px"></el-image>
      <el-image
          :src="sexPictureList[hostSexString ]"
          style="transform: scale(0.7);position: relative;top:-200px" ></el-image>
      <br><br>


    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "HostInfoMessage",
  props:{
    hostRealName:String,
    hostCreateTime:String,
    hostNickName:String,
    reviewNum:Number,
    hostSex:String,
    publishedNum:Number,
    pendingReviewNum:Number,
    unpublishedNum:Number,
    averageRate:Number,
    publishedHouseInfo:Array
  },
  data:function ()
  {
    return{
      scoreImgList:["https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/一般.png",
      "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/微笑.png",
      "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/赞.png"],
      rateNum:Math.round(this.averageRate-3)<0?0:Math.round(this.averageRate-3),
      rateString:['评价一般','评价不错','超赞房东'],
      hostSexString:this.hostSex===''?'未知':this.hostSex,
      sexImgList:{"未知":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/问号.png",
      "男":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/男.png",
        "女":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/女.png"},
      sexPictureList:{"未知":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/sitting-4.png",
        "男":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/sitting-2.png",
        "女":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/sitting-1.png"
      },
      dialog:false,
      direction:'rtl',
      loading:false,
      form:{//表单
        name:'',
        sex:'',//性别
      },
      rules:{//表单验证
        name:[
          {required:true,message:'请输入新的昵称',trigger:'blur'},
          {min:1,max:15,message: "长度在1到15个字符",trigger: 'blur'}
        ],
        sex:[
          {required:true,message:'选择性别',trigger:'change'}
        ],
      }

    }
  },
  created() {



  },

  methods:{
handleClose(done)
{
  if(this.loading){
    return;
  }
  if(this.form.name.length>15)
  {
    this.$message.error('啊哦！您输入的昵称长度超过了15个字符');
    return;
  }
  if(this.form.name.length<1)
  {
    this.$message.error('啊哦！您输入的昵称是空的');
    return;
  }
  this.$confirm('您是否确定自己的修改？',{dangerouslyUseHTMLString:true,
    confirmButtonClass:'Mybutton',
    confirmButtonText:'确定',

  })
      .then(_=>{
        this.loading=true;
        this.timer=setTimeout(()=>{
          done();
          setTimeout(()=>{
            this.loading=false;
            this.resaveInfo();
          },400);
        },2000);
      })
      .catch(_=>{});
},
    cancelForm(){
      this.loading=false;
      this.dialog=false;
      clearTimeout(this.timer);

    },
    onsubmit(){
      console.log('submit!')
    },
    current_change:function (currentPage){
      this.currentPage=currentPage;
      console.log(this.currentPage);
    },
    resaveInfo:function () {

      }

  }

}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");
.box-card{
  width: 550px;
  height:550px;
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: rgba(246, 248, 248, 0.918);
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 1s;
}
.Mybutton
{
  width: 150px;
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
.bigFontSize
{
  font-family: "PingFang SC";
  font-size: 30px;
  font-weight: bold;
  animation: fadeInDown;
  animation-duration: 1s;


}
.smallgretfontsize
{
  font-weight: bold;
  font-size:medium;
  font-family: "PingFang SC";
  color: #747474;
  animation: fadeInDown;
  animation-duration: 1s;
}
.el-divider--vertical{
  height:80%;
  margin-top: 100px;
  width: 2px;
  animation: fadeInDown;
  animation-duration: 1s;
}
.icon {
  width: 30px;
  height: 30px;
  float: left;

}
.card-class{
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
  border-radius: 15px;
  width: 500px;
  height: 130px;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.imgBox{
  width: 130px;
  height: 130px;
  border-radius: 15px;
  box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
}
</style>