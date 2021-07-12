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
<!--使用标签页-->
      <el-tabs type="border-card"
      v-model="tabValue"
      style="width: 631.5px">
        <el-tab-pane label="已发布的房源" >
        </el-tab-pane>
        <el-tab-pane label="待发布的房源">

        </el-tab-pane>
        <el-tab-pane label="审核中的房源"></el-tab-pane>
      </el-tabs>
<!--      已发布的房源卡片-->
      <el-card class="bigCard" v-if="tabValue==0" >
        <p
            style="float: left;font-size: 20px"
            class="bigFontSize">
          已发布的房源
        </p>
        <br><br><br><br>
      <div v-for="i in publishedNum<=3?publishedNum:((this.publishedNum-this.publishedPageSize*(this.publishedCurrentPage-1))>3?3:(this.publishedNum-this.publishedPageSize*(this.publishedCurrentPage-1)))"
           v-if="publishedNum===0?false:true">
      <el-card shadow="hover" class="card-class" style="float: left">
        <!--放置一个图片走马灯-->
        <div class="imgBox"
             style="position: relative;left:-20px;top:-20px">
          <el-carousel
              height="130px"
              style="border-radius: 15px;width: 130px "
              indicator-position="none">
            <el-carousel-item style="width: 130px;height: 130px"
                v-for="item in publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayImgList"
                :key="item">
<!--              内嵌房源图片-->
              <el-image :src="item"
              style="width: 130px;height: 130px;"
              fit="cover"></el-image>
            </el-carousel-item>
          </el-carousel>

        </div >
        <p class="smallgretfontsize"
           style="position:relative;left:120px;top:-160px;text-align: left;font-size: 12px">
          {{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayType}}
        </p>
        <span class="smallgretfontsize"
           style="position:relative;left:-80px;top:-190px;text-align: left;font-size: 12px">
          {{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayPlace}}
        </span>
        <p class="bigFontSize"
           style="position:relative;left:120px;top:-200px;text-align: left;font-size: 17px">
          {{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayNickName}}
        </p>
        <el-image
           style="position:relative;left:-152px;top:-210px;text-align: left;font-size: 17px;width: 25px;height: 25px"
        src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/订单.png">
        </el-image>
        <p class="bigFontSize"
           style="position:relative;left:140px;top:-245px;text-align: left;font-size: 12px">
          共{{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].orderNum}}个订单
        </p>
        <el-image
            style="position:relative;left:-152px;top:-250px;text-align: left;font-size: 17px;width: 22px;height: 22px"
            src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/评价 (4).png">
        </el-image>
        <p class="bigFontSize"
           style="position:relative;left:140px;top:-285px;text-align: left;font-size: 12px">
          共{{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].reviewNum}}条评价
        </p>
        <el-rate v-model="publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].reviewScore" disabled
                 show-text
                 show-score
                 text-color="#ff9900"
                 score-template="{value}"
                 style="position:relative;left:115px;top:-292px;text-align: left;font-size: 12px" >
        </el-rate>
<!--        房源的价格-->
        <p class="bigFontSize" @click=""
           style="position:relative;left:470px;top:-430px;text-align: left;font-size: 20px">
          ￥{{publishedHouseInfo[(publishedCurrentPage-1)*publishedPageSize+i-1].stayPrice}}
        </p>
        <!--查看房源销量报表-->
        <el-image
            style="position:relative;left:320px;top:-480px;width: 22px;height: 22px;cursor: pointer"

            src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/查看.png"
        @click="viewChart">
        </el-image>
        <el-button class="smallButton"
                   style="position:relative;left:240px;top:-430px;text-align: left"
        @click="updateStay">
          编辑房源
        </el-button>
        <br>
        <el-button class="smallButton"
                   style="position:relative;left:252px;top:-425px;text-align: left">
          删除房源
        </el-button>
      </el-card>
        <br><br><br><br><br><br><br><br>
      </div>
<!--      已经发布的房源分页-->
        <div class="newPagination" >
      <el-pagination v-if="publishedNum<4?false:true"
                     layout="prev, pager, next"
                     :page-size="publishedPageSize"
                     :page-count="5"
                     :total="publishedNum"
                     @current-change="current_change"
                     background
                     style="position: absolute;left:240px;top:1050px"
      >
      </el-pagination>
        </div>
      </el-card>
      <!--      审核中的房源卡片-->
      <el-card class="bigCard" style="height:450px" v-if="tabValue==2">
        <p
            style="float: left;font-size: 20px"
            class="bigFontSize">
          审核中的房源
        </p>
        <br><br><br><br>
        <div v-for="i in pendingReviewNum<=2?pendingReviewNum:((this.pendingReviewNum-this.pendingPageSize*(this.pendingCurrentPage-1))>2?2:(this.pendingReviewNum-this.pendingPageSize*(this.pendingCurrentPage-1)))"
             v-if="pendingReviewNum===0?false:true">
          <el-card shadow="hover" class="card-class" style="float: left">
            <!--放置一个图片走马灯-->
            <div class="imgBox"
                 style="position: relative;left:-20px;top:-20px">
              <el-carousel
                  height="130px"
                  style="border-radius: 15px;width: 130px "
                  indicator-position="none">
                <el-carousel-item style="width: 130px;height: 130px"
                                  v-for="item in pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayImgList"
                                  :key="item">
                  <!--              内嵌房源图片-->
                  <el-image :src="item"
                            style="width: 130px;height: 130px;"
                            fit="cover"></el-image>
                </el-carousel-item>
              </el-carousel>

            </div >
            <p class="smallgretfontsize"
               style="position:relative;left:120px;top:-160px;text-align: left;font-size: 12px">
              {{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayType}}
            </p>
            <span class="smallgretfontsize"
                  style="position:relative;left:-80px;top:-190px;text-align: left;font-size: 12px">
          {{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayPlace}}
        </span>
            <p class="bigFontSize"
               style="position:relative;left:120px;top:-200px;text-align: left;font-size: 17px">
              {{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayNickName}}
            </p>
            <!--        房源的价格-->
            <p class="bigFontSize"
               style="position:relative;left:470px;top:-250px;text-align: left;font-size: 20px">
              ￥{{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].stayPrice}}
            </p>
            <el-button class="smallButton"
                       style="position:relative;left:240px;top:-255px;text-align: left"
                       @click="updateStay">
              编辑房源
            </el-button>
            <br>
            <el-button class="smallButton"
                       style="position:relative;left:240px;top:-250px;text-align: left">
              删除房源
            </el-button>
<!--            审核信息创建时间-->
            <p class="smallgretfontsize"
               style="position:relative;left:120px;top:-330px;text-align: left;font-size: 13px">
              审核信息创建时间：{{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].valCreateTime}}
            </p>
            <p class="smallgretfontsize"
               style="position:relative;left:120px;top:-330px;text-align: left;font-size: 13px">
              审核信息回复时间：{{pendingStayInfo[(pendingCurrentPage-1)*pendingPageSize+i-1].valReplyTime}}
            </p>
          </el-card>
          <br><br><br><br><br><br><br><br>
        </div>

        <!--      审核中的房源分页-->
        <div class="newPagination">
          <el-pagination v-if="pendingReviewNum<3?false:true"
                         layout="prev, pager, next"
                         :page-size="pendingPageSize"
                         :page-count="5"
                         :total="pendingReviewNum"
                         @current-change="pending_current_change"
                         style="position: absolute;left:240px;top:900px"
                         background
          >
          </el-pagination>
        </div>
      </el-card>
      <!--      草稿的房源卡片-->
      <el-card class="bigCard" style="height:450px;" v-if="tabValue==1" >
        <p
            style="float: left;font-size: 20px"
            class="bigFontSize">
          待发布的房源
        </p>
        <br><br><br><br>
        <div v-for="i in unpublishedNum<=2?unpublishedNum:((this.unpublishedNum-this.unpublishedPageSize*(this.unpublishedCurrentPage-1))>2?2:(this.unpublishedNum-this.unpublishedPageSize*(this.unpublishedCurrentPage-1)))"
             v-if="unpublishedNum===0?false:true">
          <el-card shadow="hover" class="card-class" style="float: left">
            <!--放置一个图片走马灯-->
            <div class="imgBox"
                 style="position: relative;left:-20px;top:-20px">
              <el-carousel
                  height="130px"
                  style="border-radius: 15px;width: 130px "
                  indicator-position="none">
                <el-carousel-item style="width: 130px;height: 130px"
                                  v-for="item in unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayImgList"
                                  :key="item">
                  <!--              内嵌房源图片-->
                  <el-image :src="item"
                            style="width: 130px;height: 130px;"
                            fit="cover"></el-image>
                </el-carousel-item>
              </el-carousel>

            </div >
            <p class="smallgretfontsize"
               style="position:relative;left:120px;top:-160px;text-align: left;font-size: 12px">
              {{unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayType}}
            </p>
            <span class="smallgretfontsize"
                  style="position:relative;left:-80px;top:-190px;text-align: left;font-size: 12px">
          {{unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayPlace}}
        </span>
            <p class="bigFontSize"
               style="position:relative;left:120px;top:-200px;text-align: left;font-size: 17px">
              {{unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayNickName}}
            </p>
            <!--        房源的价格-->
            <p class="bigFontSize"
               style="position:relative;left:470px;top:-250px;text-align: left;font-size: 20px">
              ￥{{unpublishedStayInfo[(unpublishedCurrentPage-1)*unpublishedPageSize+i-1].stayPrice}}
            </p>
            <el-button class="smallButton"
                       style="position:relative;left:240px;top:-255px;text-align: left"
                       @click="updateStay">
              编辑房源
            </el-button>
            <br>
            <el-button class="smallButton"
                       style="position:relative;left:240px;top:-250px;text-align: left">
              删除房源
            </el-button>
          </el-card>
          <br><br><br><br><br><br><br><br>
        </div>

        <!--      审核中的房源分页-->
        <div class="newPagination">
          <el-pagination v-if="unpublishedNum<3?false:true"
                         layout="prev, pager, next"
                         :page-size="unpublishedPageSize"
                         :page-count="5"
                         :total="unpublishedNum"
                         @current-change="pending_current_change"
                         style="position: absolute;left:240px;top:900px"
                         background
          >
          </el-pagination>
        </div>
      </el-card>
    </el-col>
    <el-col :span="1" style="height: 100%">
      <el-divider
          direction="vertical"
          class="el-divider--vertical"></el-divider>
    </el-col>
    <el-col :span="7">
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
    publishedHouseInfo:Array,
    pendingStayInfo:Array,//审核中的房源列表\
    unpublishedStayInfo:Array//草稿的房源列表
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
      publishedPageSize:3,//已经发布的房源每页的展示数
      publishedCurrentPage:1,
      pendingPageSize:2,//审核中的房源的每页的展示数
      pendingCurrentPage:1,//审核中的房源的分页当前页
      unpublishedCurrentPage:1,//草稿的房源的当前分页
      unpublishedPageSize:2,//草稿的房源的每页展示数
      tabValue:0,//标签页的标签值
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
    print(){
      console.log(this.tabValue);
    },
    updateStay:function(){
      //这里是编辑房源按钮点击触发的函数，点击后应根据房源id调相应的API，然后获取数据
      //然后是czy将数据得到的数据存入本地，然后跳转至发布房源页面
    },
    viewChart:function ()
    {
      //查看某个房源的销量报表
this.$message("dwdwdfw");
    },

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
    current_change:function (publishedCurrentPage){
      this.publishedCurrentPage=publishedCurrentPage;
    },
    pending_current_change:function (pendingCurrentPage)
    {
      this.pendingCurrentPage=pendingCurrentPage;
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
.smallButton
{
  width: 80px;
  height: 30px;
  border-color: #929292;
  border-radius:15px;
  border-width: 3px;
  box-shadow: 5px 5px 8px #888888;
  font-family: "PingFang SC";
  font-size: 13px;
  text-align: center;
  padding-left: 10px;
  padding-top: 6px;
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
  width: 600px;
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
}
.bigCard
{
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  height: 100%;
  height: 600px;
}
.newPagination>>>.el-pager li{
  background-color: #d7e8f5 !important;
  color: #ffffff !important;
  border-radius: 8px !important;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px!important;
}
.newPagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active
{
  background-color: #739de5 !important;
}
</style>