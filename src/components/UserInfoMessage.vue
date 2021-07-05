<template>
  <el-row style="height: 100%">
    <el-col :span="1" style="height: 100%">
      <el-divider direction="vertical" class="el-divider--vertical">test</el-divider>
    </el-col>
    <el-col :span="14">
      <p class="bigFontSize" style="margin-left: 1px;position:relative;left: -100px;font-size: 35px" >大家好,我是{{UserNickName}}</p>
      <p class="smallgretfontsize" style="position: relative;top: -30px;left: -200px">注册时间:{{RegisterDate}}</p>
      <!--下面是实现修改资料弹出框的代码-->
      <el-button  class="Mybutton" style="position: relative;top: -30px;left: -200px;margin-bottom: 30px;margin-top:20px" @click="dialog=true"><u>修改个人资料</u></el-button>
      <el-drawer title="个人资料" :visible.sync="dialog" :direction="direction"
                 ref="drawer" :before-close="handleClose">
        <!--在抽屉内部定义表单-->
        <el-form ref="form" :rules="rules" :model="form" label-width="100px" >

          <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/任务中心-首次修改昵称.png" style="width: 40px;height: 40px;position: relative;left:-150px" ></el-image>
          <span class="bigFontSize" style="font-size: 25px;position: relative;top: -5px;right: 140px">昵称</span>
          <br>

          <el-form-item label="新的昵称"  prop="name">
            <el-input v-model="form.name"></el-input>
          </el-form-item>

          <el-divider></el-divider>

          <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/性别.png" style="width: 40px;height: 35px;position: relative;left:-150px" ></el-image>
          <span class="bigFontSize" style="font-size: 25px;position: relative;top: -5px;right: 140px">性别</span>
          <br>

          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="性别">
              <el-option label="男" value="男"> </el-option>
              <el-option label="女" value="女"></el-option>
            </el-select>
          </el-form-item>

          <el-divider></el-divider>

          <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704134846108.png" style="width: 50px;height: 50px;position: relative;left:-150px;top: 10px" ></el-image>
          <span class="bigFontSize" style="font-size: 25px;position: relative;top: -5px;right: 140px">生日</span>
          <br>

          <el-form-item label="生日" required>
            <el-date-picker
                v-model="form.BirthDate"
                type="date"
                placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-form>
        <div >
          <el-button @click="cancelForm" class="Mybutton" style="width: 120px;height: 50px">取消修改</el-button>
          <el-button type="primary" class="Mybutton" style="width: 120px;height: 50px;background-color: #025f08;color:white" @click="$refs.drawer.closeDrawer() " :loading="loading">{{ loading ? '更新中...' : '保存' }}</el-button>
        </div>
      </el-drawer>
      <el-card class="box-card" shadow="hover" style="position: relative;top: -20px;left:20px;height: 100%" >
        <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704194410567.png"
                  style="width: 35px;height: 35px ;float:left;" >
        </el-image>
        <span class="bigFontSize" style="font-size: 20px;float:left;padding-top: 1%;padding-left: 2%" > 房客评价</span>
        <span class="bigFontSize" style="font-size: 20px;float:left;padding-top: 1%;padding-left: 2%">{{this.commentNum}}条</span>
        <br><br><br>
        <!--若干个评价模块-->
        <div v-for="i in pageSize">
          <el-card    class="box-card" style="width: 500px;height: 100%">
                            <span class="bigFontSize" style="font-size: 15px;float: left;color: #7b7b7b">
                时间：{{commentList[(currentpage-1)*pageSize+i-1].commentTime}}</span>
            <br><br>
            <el-image :src=commentList[(currentpage-1)*pageSize+i-1].hostAvatar
                      style="width: 56px;height: 56px;border-radius: 28px;float: left"></el-image>
            <span class="bigFontSize" style="font-size: 20px;float:left;padding-left: 2%">
              {{commentList[(currentpage-1)*pageSize+i-1].hostNickName}}</span>
            <br><br>
            <span style="font-size: 15px;font-family: 'PingFang SC';
            font-weight: bold;color: #a3a3a3;float: left;padding-left: 2%">
              注册时间:{{commentList[(currentpage-1)*pageSize+i-1].hostRegisterDate}}</span>
            <el-divider></el-divider>
            <el-rate style="float: left"
                     v-model="commentList[(currentpage-1)*pageSize+i-1].commentStar"
                     disabled
                     show-score
                     text-color="#ff9900"
                     score-template="{value}">
            </el-rate>
            <br><br>
            <span class="bigFontSize" style="font-size: 13px;float: left;text-align: left">
                {{commentList[(currentpage-1)*pageSize+i-1].comment}}</span>
            <br>

          </el-card>
          <br>
        </div>

        <!--下面是评价的列表-->

        <el-pagination
            layout="prev, pager, next"
            :page-size="pageSize"
            :page-count="5"
            :total="commentNum"
            @current-change="current_change"
            style="float: bottom ;padding-bottom: 1%"
            background
        >

        </el-pagination>


      </el-card >





    </el-col>
    <el-col :span="1" style="height: 100%">
      <el-divider direction="vertical" class="el-divider--vertical">test</el-divider>
    </el-col>
    <el-col :span="8">
      <el-image class="pic1 " src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704141706551.png"></el-image>
      <br><br>
      <el-image  class="picstyle" src=" https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704142220234.png"></el-image>

    </el-col>
  </el-row>
</template>

<script>


export default {
  name: "UserInfoMessage",
  props: {
    UserNickName: String,
    RegisterDate:String
  },

  created(){
    //调用api,返回response
  },
  data()
  {
    return{
      dialog:false,
      direction:'rtl',
      loading:false,
      pageSize:3,//默认每次显示三条
      currentpage:1,//现在展示的页数
      commentNum:6,
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
      this.$confirm('确认要提交修改吗？')
          .then(_=>{
            this.loading=true;
            this.timer=setTimeout(()=>{
              done();
              setTimeout(()=>{
                this.loading=false;
              },400);
            },2000);
          })
          .catch(_=>{});
      console.log(this.form.BirthDate);
      console.log(this.form.name);
      console.log(this.form.sex);
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
      this.currentpage=currentPage;
      console.log(this.currentpage);
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
  height:550px;
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: #ffffff;
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
</style>