<template>
  <el-row style="height: 100%">

    <el-col :span="14">
      <p class="bigFontSize"
         style="margin-left: 1px;position:relative;left: -100px;font-size: 35px" >
        大家好,我是{{UserNickName}}
      </p>
      <p
          class="smallgretfontsize"
          style="position: relative;top: -30px;left: -200px">
        注册时间:{{RegisterDate}}
      </p>
      <!--下面是实现修改资料弹出框的代码-->
      <el-button
          class="Mybutton"
          style="position: relative;top: -45px;left: -200px;margin-bottom: 30px;margin-top:20px"
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
        <el-form
            ref="form"
            :rules="rules"
            :model="form"
            label-width="100px" >

          <el-image
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/任务中心-首次修改昵称.png"
              style="width: 40px;height: 40px;position: relative;left:-150px" ></el-image>
          <span
              class="bigFontSize"
              style="font-size: 25px;position: relative;top: -5px;right: 140px">
            昵称
          </span>
          <br>

          <el-form-item
              label="新的昵称"
              prop="name">
            <el-input
                v-model="form.name"></el-input>
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

          <el-divider></el-divider>

          <el-image
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704134846108.png"
              style="width: 50px;height: 50px;position: relative;left:-150px;top: 10px" ></el-image>
          <span
              class="bigFontSize"
              style="font-size: 25px;position: relative;top: -5px;right: 140px">
            生日
          </span>
          <br>

          <el-form-item label="生日" required>
            <el-date-picker
                v-model="form.BirthDate"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div >
          <el-button
              @click="cancelForm"
              class="Mybutton"
              style="width: 120px;height: 50px">
            取消修改
          </el-button>
          <el-button
              type="primary"
              class="Mybutton"
              style="width: 120px;height: 50px;background-color: #025f08;
                     color:white"
              @click="$refs.drawer.closeDrawer()"
              :loading="loading">
            {{ loading ? '更新中...' : '保存' }}
          </el-button>
        </div>
      </el-drawer>

      <el-card
          shadow="hover"
          style="width: 550px;height: 200px;position: relative;top:-60px;
          box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px,rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;">
        <!--信息卡片-->
        <el-col :span="15">
          <el-image
              class="icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/用户名.png">
          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;float: left;position: relative;left: 2px;top:7px" >
            用户名:{{UserNickName}}
          </span>

          <!--          生日-->
          <br><br>
          <el-image
              class="icon"
              style="width:35px;height: 35px;position: relative;left:-4px"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/生日 (1).png"
          >
          </el-image>
          <span class="smallgretfontsize"
                style="color: #333333;
                float: left;position: relative;
                left:-3px;top:10px;text-align: left" >
            生日：{{userBirthDate}}
          </span>
          <!--          总评价数-->
          <span class="smallgretfontsize"
                style="color: #333333;float: left;position: relative;
                left: -143px;top:45px" >
            共收获{{commentNum}}条评价
          </span>
          <br><br>
          <el-image
              class="icon"
              src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/评价 (3).png"
          style="position: relative;top:5px">

          </el-image>
<!--          性别-->
          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left: -28px;top:45px" >
            性别：{{userSex}}
          </span>
          <el-image
              class="icon"
              :src="sexImgList[userSex]"
              style="width:25px;height:25px;position: relative;left:-25px;top:42px">
          </el-image>
        </el-col>
        <el-col :span="1"
                style="height: 190px ;position: relative;top:-90px">
          <el-divider
              direction="vertical"
              class="el-divider--vertical"></el-divider>
        </el-col>
        <el-col :span="8">
<!--          心情卡片-->

          <span
              class="smallgretfontsize"
              style="color: #333333;float: left;position: relative;left:10px;top:10px;font-size: 17px" >
            当前心情:{{moodSentenceList[mood]}}
          </span>
          <br><br>
<el-card class="moodCard" style="position: relative;left: 50px">
          <el-image
              class="icon"
              style="width: 50px;height: 40px;position: relative;left: -13px;top:-10px"

              :src=moodImgList[mood]>
          </el-image>
</el-card>
          <br>
          <el-dropdown split-button
                       class="dropDown"
                       type="primary"
                       @command="handleCommand"
                       size="large"
                       placement="top"
                       trigger="click"
                       :tabindex="moodIndex"
                       >
              修改我的心情
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="0">
                  {{moodSentenceList[0]}}
              </el-dropdown-item>
              <el-dropdown-item command="1">
                {{moodSentenceList[1]}}
              </el-dropdown-item>
              <el-dropdown-item command="2">
                {{moodSentenceList[2]}}
              </el-dropdown-item>
              <el-dropdown-item command="3">
                {{moodSentenceList[3]}}
              </el-dropdown-item>
              <el-dropdown-item command="4">
                {{moodSentenceList[4]}}
              </el-dropdown-item>
              <el-dropdown-item command="5">
                {{moodSentenceList[5]}}
              </el-dropdown-item>
              <el-dropdown-item command="6">
                {{moodSentenceList[6]}}
              </el-dropdown-item>
              <el-dropdown-item command="7">
                {{moodSentenceList[7]}}
              </el-dropdown-item>
              </el-dropdown-menu >
          </el-dropdown>
        </el-col>
      </el-card>



      <el-card class="box-card" shadow="hover" style="position: relative;top: -20px;left:20px;height: 100%;background-color: white;" >
        <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704194410567.png"
                  style="width: 35px;height: 35px ;float:left;" >
        </el-image>
        <span class="bigFontSize" style="font-size: 20px;float:left;padding-top: 1%;padding-left: 2%" > 房客评价</span>
        <span class="bigFontSize" style="font-size: 20px;float:left;padding-top: 1%;padding-left: 2%">{{this.commentNum}}条</span>
        <br><br><br>
        <!--若干个评价模块-->
        <div v-for="i in commentNum<=3?commentNum:((this.commentNum-this.pageSize*(this.currentPage-1))>3?3:(this.commentNum-this.pageSize*(this.currentPage-1)))"
             v-if="commentNum===0?false:true">
          <el-card    class="smallcard" style="width: 500px;height: 100%">
                            <span class="bigFontSize" style="font-size: 15px;float: left;color: #7b7b7b">
                时间：{{commentList[(currentPage-1)*pageSize+i-1].commentTime}}</span>
            <br><br>
            <el-image :src=commentList[(currentPage-1)*pageSize+i-1].hostAvatar
                      style="width: 56px;height: 56px;border-radius: 28px;float: left"></el-image>
            <span class="bigFontSize" style="font-size: 20px;float:left;padding-left: 2%">
              {{commentList[(currentPage-1)*pageSize+i-1].hostNickName}}</span>
            <br><br>
            <span style="font-size: 15px;font-family: 'PingFang SC';
            font-weight: bold;color: #a3a3a3;float: left;padding-left: 2%">
              注册时间:{{commentList[(currentPage-1)*pageSize+i-1].hostRegisterDate}}</span>
            <el-divider></el-divider>
            <el-rate style="float: left"
                     v-model="commentList[(currentPage-1)*pageSize+i-1].commentStar"
                     disabled
                     show-score
                     text-color="#ff9900"
                     score-template="{value}">
            </el-rate>
            <br><br>
            <span class="bigFontSize" style="font-size: 13px;float: left;text-align: left">
                {{commentList[(currentPage-1)*pageSize+i-1].comment}}</span>
            <br>

          </el-card>
          <br>
        </div>

        <el-image  v-if="commentNum===0?true:false" src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/空状态.png"style="width: 200px;height: 200px;
margin-top: 10%"></el-image>
        <!--下面是评价的列表-->
        <p class="smallgretfontsize" v-if="commentNum===0?true:false" style="margin-bottom: 5%">该用户暂无评价哦...</p>
        <div class="newPagination" >
        <el-pagination v-if="commentNum<4?false:true"
            layout="prev, pager, next"
            :page-size="pageSize"
            :page-count="5"
            :total="commentNum"
            @current-change="current_change"
            style="float: bottom ;padding-bottom: 1%"
            background
        >
        </el-pagination>
        </div>
      </el-card >

    </el-col>
    <el-col :span="1" style="height: 100%">
      <el-divider direction="vertical" class="el-divider--vertical">test</el-divider>
    </el-col>
    <el-col :span="7">
      <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/室内2.png"
                style="width: 300px;height: 400px;position: relative;right:-50px;top:-70px"></el-image>
      <br><br>
      <el-image  class="picstyle"   src=" https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704142220234.png"></el-image>
      <!--      添加一个走马灯-->
      <div style="width: 250px;position: relative;left: -50px;height: 440px">
        <el-carousel
            :interval="3000"
            type="card"
            height="500px"
            direction="vertical"
            style="position: relative;top:-220px;left:100px;height: 600px"
            indicator-position="none">
          <el-carousel-item
              v-for="item in 4"
              :key="item" style="width: 250px;height: 300px;border-radius: 20px;">
            <el-image
                :src="asideImgList[item-1]"
                fit="cover"
                style="width: 250px;height: 300px;">
            </el-image>
          </el-carousel-item>
        </el-carousel>
      </div>
    </el-col>
  </el-row>
</template>

<script>

export default {
  name: "UserInfoMessage",
  props: {
    UserNickName: String,
    RegisterDate:String,
    commentNum:Number,
    userBirthDate:String,
    userSex:String,
    mood:Number
  },
  created(){

  },
  data()
  {
    return{
      dialog:false,
      moodIndex:0,
      direction:'rtl',
      loading:false,
      pageSize:3,//默认每次显示三条
      currentPage:1,//现在展示的页数
      sexImgList:{"未知":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/问号.png",
        "男":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/男.png",
        "女":"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/女.png"},//性别图像数组
      moodImgList:[
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/QQ图片20210713180613.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/11.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/22.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/33.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/44.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/55.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/66.png",
          "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/77.png",
      ],//心情图像数组
      moodSentenceList:["平淡","开心","激动","惊讶","哭泣","犯愁","自闭","恋爱中"],
      asideImgList:[
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/Dark_支付.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/Dark_钱包收入.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/Dark_费用管理.png",
        "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/Dark_卡包.png"
      ],
      commentList:[
        {commentTime:"2021-4-21",
          hostNickName:"OliverShang",
          hostRegisterDate:"2021-7-3",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/a.jpg",
          comment:"很好的房客，非常有礼貌，欢迎下次入住！",
          commentStar:5
        },
        {commentTime:"2021-4-21",
          hostNickName:"OliverShang",
          hostRegisterDate:"2021-7-3",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/a.jpg",
          comment:"还行吧，房客退房时间晚了些，其他问题不大！",
          commentStar:4
        },
        {commentTime:"2021-4-21",
          hostNickName:"OliverShang",
          hostRegisterDate:"2021-7-3",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/a.jpg",
          comment:"zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵" +
              "zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵" +
              "zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵" +
              "zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵zcx什么伞兵！么伞兵！么伞兵！么伞兵！么伞兵！么伞兵！么伞兵！么伞兵！",
          commentStar:3
        },
        {commentTime:"2021-4-21",
          hostNickName:"OliverShang",
          hostRegisterDate:"2021-7-3",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/a.jpg",
          comment:"很好的房客，非常有礼貌，欢迎下次入住！",
          commentStar:2
        },
        {commentTime:"2021-4-21",
          hostNickName:"OliverShang",
          hostRegisterDate:"2021-7-3",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/a.jpg",
          comment:"很好的房客，非常有礼貌，欢迎下次入住！",
          commentStar:1
        },
        {commentTime:"2021-4-21",
          hostNickName:"OliverShang",
          hostRegisterDate:"2021-7-3",
          hostAvatar:"https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/a.jpg",
          comment:"很好的房客，非常有礼貌，欢迎下次入住！",
          commentStar:0
        }
      ],

      form:{//表单
        name:'',
        sex:'',//性别
        BirthDate:'',
      },
      rules:{//表单验证
        name:[
          {required:true,message:'请输入新的昵称',trigger:'blur'},
          {min:1,max:15,message: "长度在1到15个字符",trigger: 'blur'}
        ],
        sex:[
          {required:true,message:'选择性别',trigger:'change'}
        ],
        BirthDate:[
          {type:'BirthDate',required:true,message:'请选择生日',trigger:'chaneg'}
        ]
      }
    };
  },

  components:{
  },
  methods:{
    handleCommand(command){
      let newCommand=command;
      this.$emit("UpdateMood",newCommand);

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
      this.$confirm('您确定要做这样的修改吗？',{dangerouslyUseHTMLString:true,
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
    resaveInfo:function ()
    {
      console.log("更新的日期",this.form.BirthDate);
      let Name=this.form.name;
      if(this.form.BirthDate===''&&this.form.sex==='') {
        this.$emit('UpdateName', Name);
      }
      else if(this.form.sex===''&&this.form.BirthDate!='')
      {
        let NewBirth=this.form.BirthDate;
          this.$emit('UpdateNameBirthDay',Name,NewBirth);
      }
      else if(this.form.sex!=''&&this.form.BirthDate===''){
        let NewSex=this.form.sex;
        this.$emit('UpdateNameSex',Name,NewSex);
      }
      else {
        let NewBirth=this.form.BirthDate;
        let NewSex=this.form.sex;
        let NewName=this.form.name;
        this.$emit('UpdateAll',NewName,NewSex,NewBirth);
      }




    }

  }

}
</script>

<style scoped>
@import url("//unpkg.com/element-ui@2.15.3/lib/theme-chalk/index.css");
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
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
.box-card{
  width: 550px;
  height:520px;
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: rgba(246, 248, 248, 0.918);
  box-shadow: 7px 7px 10px #888888;
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

.picstyle
{
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 1s;
  animation: fadeInDown;
  animation-duration: 1s;
}

.pic1
{

  animation: fadeInDown;
  animation-duration: 1s;
}
.icon {
  width: 30px;
  height: 30px;
  float: left;
  animation: fadeInDown;
  animation-duration: 1s;
}


.moodCard{
  width: 60px;
  height: 60px;
  border-radius: 30px;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
}
.smallcard{

box-shadow: rgba(0, 0, 0, 0.56) 0px 22px 70px 4px;
  border-radius: 20px;
}
.newPagination>>>.el-pager li{
  background-color: #c4d4dc !important;
  color: white!important;
  border-radius: 8px !important;
  box-shadow: rgba(0, 0, 0, 0.17) 0px -23px 25px 0px inset, rgba(0, 0, 0, 0.15) 0px -36px 30px 0px inset, rgba(0, 0, 0, 0.1) 0px -79px 40px 0px inset, rgba(0, 0, 0, 0.06) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px!important;
}
.newPagination >>> .el-pagination.is-background .el-pager li:not(.disabled).active
{
  background-color: #739de5 !important;
}

</style>