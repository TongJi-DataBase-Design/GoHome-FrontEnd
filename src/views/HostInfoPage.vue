<template>
<el-container>
  <el-aside class="el-aside" width="450px" scoped>
    <el-image src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/室内1.png "
    style="position:fixed;width:300px;height: 400px;left:-50px;top:10px" ></el-image>
<HostInfoBlock style="position: fixed;left:180px;top:180px"  :review-num="reviewNum"
:host-level="hostLevel" :host-nick-name="hostNickName"
:host-real-name="hostRealName" :tagimg-list="TagimgList"
               :authentication-tag="AuthenticationTag" :email-tag="EmailTag"
               :phone-tag="PhoneTag" :host-score="hostScore"

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
></HostInfoMessage>
    <h1>fwfw</h1>
    <host-echarts></host-echarts>
  </el-main>
</el-container>
</template>

<script>
import HostInfoBlock from "../components/HostInfoBlock";
import HostInfoMessage from "../components/HostInfoMessage";
import hostEcharts from "../components/hostEcharts";
export default {
  name: "HostInfoPage",
  components: {HostInfoBlock,
  HostInfoMessage,
  hostEcharts},
  data:function ()
  {
    return{
      hostImage:'',
      hostNickName:'假数据',
      hostRealName:'假数据真名',
      hostSex:'',
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
          valCreateTime:'2021-1-3',//审核信息创建时间
          valReplyTime:'2021-1-1',//审核信息的回复时间
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
          valCreateTime:'2021-1-3',//审核信息创建时间
          valReplyTime:'2021-1-1',//审核信息的回复时间
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
          valCreateTime:'2021-1-3',//审核信息创建时间
          valReplyTime:'2021-1-1',//审核信息的回复时间
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