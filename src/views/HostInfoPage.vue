<template>
<el-container>
  <el-aside class="el-aside" width="450px" scoped>
    <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/室内1.png "
    style="position:fixed;width:300px;height: 400px;left:-50px;top:10px" ></el-image>
<HostInfoBlock style="position: fixed;left:180px;top:180px"  :review-num="reviewNum"
:host-level="hostLevel" :host-nick-name="hostNickName"
:host-real-name="hostRealName" :tagimg-list="TagimgList"
               :authentication-tag="AuthenticationTag" :email-tag="EmailTag"
               :phone-tag="PhoneTag" :host-score="hostScore" :host-image="hostImage"

>
</HostInfoBlock>
      <el-divider direction="vertical" class="el-divider--vertical" ></el-divider>
  </el-aside>

  <el-main class="el-main">
<HostInfoMessage :host-real-name="hostRealName"
                 :host-create-time="hostCreateTime"
                  :host-nick-name="hostNickName"
                  :review-num="reviewNum"
:host-sex="hostSex" :published-num="publishedNum"
:pending-review-num="pendingReviewNum" :unpublished-num="unpublishedNum"
                 :average-rate="averageRate" :published-house-info="publishedHouseInfo"
                 :pending-stay-info="pendingStayInfo" :unpublished-stay-info="unpublishedStayInfo"
                 :host-level-name="hostLevelName"
                  @UpdateName="updateNickName" @UpdateAvatar="updateNewAvatar"
></HostInfoMessage>
  </el-main>
</el-container>
</template>

<script>
import HostInfoBlock from "../components/HostInfoBlock";
import HostInfoMessage from "../components/HostInfoMessage";
import {getHostPageInfo, updateHostNickName} from "../api/host";
import {getCustomerInfo, uploadBasicInfo} from "../api/customerInfo";
export default {
  name: "HostInfoPage",
  components: {HostInfoBlock,
  HostInfoMessage,
  },
  created() {
//加载页面
    const loading=this.$loading({
      lock: true,
      text: '房东主页加载中',
      spinner: 'el-icon-loading',
      background: 'rgba(0,0,0,0.7)'
    });


    //loading.close();//调试用



    //调用获取房东的基本信息
    //调用api
    getHostPageInfo().then(response=>{
      console.log(response.data);
      //获取相应的房东数据
      this.hostImage=response.data.hostAvatar;
      this.hostCreateTime=response.data.hostCreateTime;//注册时间
      this.averageRate=response.data.averageRate;
      this.EmailTag=response.data.emailTag===true?1:0;
      this.hostLevel=response.data.hostLevel===null?0:response.data.hostLevel;
      this.hostNickName=response.data.hostNickName;
      this.hostRealName=response.data.hostRealName;
      this.hostScore=response.data.hostScore;
      this.hostSex=response.data.hostSex;
      this.AuthenticationTag=response.data.authenticationTag==true?1:0;
      this.pendingReviewNum=response.data.pendingReviewNum;
      this.pendingStayInfo=response.data.pendingStayInfo;
      this.PhoneTag=response.data.phoneTag==true?1:0;
      this.publishedHouseInfo=response.data.publishedHouseInfo;
      this.unpublishedStayInfo=response.data.unpublishedStayInfo;
      this.publishedNum=response.data.publishedNum;
      this.reviewNum=response.data.reviewNum;
      this.unpublishedNum=response.data.unpublishedNum;
      this.hostLevelName=response.data.hostLevelName;
      console.log("待发布的房源",this.unpublishedNum);
      loading.close();

      console.log("性别",this.hostSex);
    }).catch((error)=>{
      this.$message({
        message:error,
        type:'warning'
      });
      return;
    })

  },
  methods:
  {
    updateNewAvatar(NewImg)
    {
      this.hostImage=NewImg;
    },
    updateNickName(NewName)
    {
      this.hostNickName=NewName;
      console.log("更新的要传入的新名字：",this.hostNickName)
      let param={
        hostNickName:NewName
      };
      updateHostNickName(param).then(response=>{
        console.log("更改房东基本信息的API返回的东西：",this.response.data.errCode);
      }).catch((error)=>{
        this.$message({
          message:error,
          type:'warning'
        });
        return;
      })
    }
  },
  data:function ()
  {
    return{
      fullScreenTag:true,
      hostImage:'',
      hostNickName:'假数据',
      hostRealName:'假数据真名',
      hostSex:'男',
      hostLevel:0,//房东的用户组等级，默认为0
      hostScore:0,//房东的信誉积分，默认为0
      publishedNum:5,//已经发布的房源数量
      unpublishedNum:3,//未发布的，尚存草稿的房源数量
      pendingReviewNum:3,//待审核的房源数量
      reviewNum:0,//评价数，默认为0
      EmailTag:0,//是否拥有电子邮箱标识
      PhoneTag:1,//是否进行了手机号认证标识
      TagimgList:["https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/错误.png","https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/正确.png"],
      AuthenticationTag:1,//是否进行了身份认证表示，0表示未认证，1表示认证
      hostCreateTime:"2021-假数据",
      averageRate:4.4,//假数据，房东的总评分
      hostLevelName:'',
      unpublishedStayInfo:[
        {
          stayId:1111111,
          imgListNum:4,//房源照片的数量
          stayType:'整套房源',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          stayPrice:497,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        },
        {
          stayId:1111111,
          imgListNum:4,//房源照片的数量
          stayType:'整套房源',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          stayPrice:497,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        },
        {
          stayId:1111111,
          imgListNum:4,//房源照片的数量
          stayType:'整套房源',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          stayPrice:497,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        }
      ],
      pendingStayInfo:[
        {
          stayId:1111111,
          imgListNum:4,//房源照片的数量
          stayType:'整套房源',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          stayPrice:497,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        },
        {
          stayId:1111111,
          imgListNum:4,//房源照片的数量
          stayType:'整套房源',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          stayPrice:497,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        },
        {
          stayId:1111111,
          imgListNum:4,//房源照片的数量
          stayType:'整套房源',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          stayPrice:497,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        }
      ],
      publishedHouseInfo:[
        {
          stayId:123456,
          imgListNum:4,//房源照片的数量
          stayType:'整套房源',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          orderNum:12,//订单的数量
          reviewNum:10,//评价数量
          reviewScore:4.7,//房源订单的平均评分
          stayPrice:497,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        },
        {
          stayId:123457,
          imgListNum:4,//房源照片的数量
          stayType:'单个房间',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          orderNum:12,//订单的数量
          reviewNum:10,//评价数量
          reviewScore:4.7,//房源订单的平均评分
          stayPrice:498,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        },
        {
          stayId:123458,
          imgListNum:4,//房源照片的数量
          stayType:'整套别墅',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          orderNum:12,//订单的数量
          reviewNum:10,//评价数量
          reviewScore:4.7,//房源订单的平均评分
          stayPrice:499,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        },
        {
          stayId:123459,
          imgListNum:4,//房源照片的数量
          stayType:'整个房源',
          stayNickName:"顾村公园旁的LOFT",
          stayPlace:"所在区域",
          orderNum:12,//订单的数量
          reviewNum:10,//评价数量
          reviewScore:4.7,//房源订单的平均评分
          stayPrice:500,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        },
        {
          stayId:123423,
          imgListNum:4,//房源照片的数量
          stayNickName:"顾村公园旁的LOFT",
          stayType:'整个房源',
          stayPlace:"所在区域",
          orderNum:12,//订单的数量
          reviewNum:10,//评价数量
          reviewScore:4.7,//房源订单的平均评分
          stayPrice:1500,//房源的价格
          stayImgList:[
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c6b642d770b2a2403f8a8047e878a8f1.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/215c3425ebcd3d28bd6c01c4cb768b9b.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/3f412a51e303e2446f9c50841b582860.jpeg",
            "https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/c07e0a87d3ab82352064b4be2d10fce4.jpeg"
          ]
        },


      ]

      }
    }
  }

</script>

<style scoped>
.el-aside {
  color: #333;
  text-align: center;
  height: 1250px;
  padding-left: 170px;
  padding-top: 30px;
}
.el-main {
  color: #333;
  text-align: center;
  height: 1200px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
}
.el-divider--vertical{
  height:90%;
  margin-top: 10px;
  width: 2px;
  animation: fadeInDown;
  animation-duration: 1s;
  color: #42b983;
  margin-left:200px
}

</style>