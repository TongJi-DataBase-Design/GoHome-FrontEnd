<template>
    <div class="coupon">
        <div class="couponTitle">
            <p class="titleText">礼券中心</p>
        </div>
        <div class="couponList">
            <el-select class="select" v-model="sortOrder" placeholder="默认顺序" @change="sortOrderChange">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-tabs class="tabs" v-model="couponStation">
                <el-tab-pane v-for="(tabPane,index) in tabPanes" :key="index" :label="tabPane.label" :name="tabPane.name">
                    <CouponCardList v-if="selectCouponList.length > 0" :couponList="selectCouponList"/>
                    <el-empty v-else :image="emptyImgUrl" :image-size="350" description="您还没有领取过礼金券，前往首页探索当季优惠吧">
                        <el-button type="primary">
                            <a href="/" class="link">开始探索</a>
                        </el-button>
                    </el-empty>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="couponTips">
            <div class="tipsImg">
                <img :src="bulbImgUrl" style="float:left;width:80px;">
            </div>
            <div v-for="(tip,index) in couponTips" :key="index" class="tipsText">
                <h3 class="tipsTitle">{{tip.title}}</h3>
                <p class="tipsPar">{{tip.content}}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.coupon{
    width: 1000px;
    margin: 0 auto;
    position: relative;
}
.couponTitle{
    width: 650px;
    height: 80px;
    top:60px;
    left:20px;
    position: absolute;
    line-height: 0px;
    text-align: left;
}
.titleText{
    font-size: 40px;
}
.couponList{
    width: 650px;
    top:155px;
    left:20px;
    position: absolute;
}
.select{
    width:105px;
    float:right;
    line-height:30px;
}
.tabs{
    float:left;
    width:545px;
}
.couponTips{
    width:300px;
    top:150px;
    right:20px;
    position: absolute;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset;
}
.tipsImg{
    width:250px;
    height:80px;
}
.tipsText{
    width:250px;
    margin:10px 25px;
}
.tipsTitle{
    text-align: left;
}
.tipsPar{
    text-align: left;
}
.link{
    text-decoration:none;
    color: white;
}
</style>

<script>
import { GetCouponInfo } from '@/api/coupon';
import CouponCardList from '@/components/CouponCardList.vue'

export default{
    name: 'Coupon',
    components: {
        CouponCardList
    },
    data() {
        return {
            sortOrder: '',
            couponStation: "unused",
            options: [{
                value: 'couponStart',
                label: '新到'
            }, {
                value: 'couponEnd',
                label: '快到期'
            },{
                value: 'couponAmount',
                label: '大额优先'
            }],
            tabPanes: [{
                label: '未使用',
                name: 'unused'
            },{
                label: '已失效',
                name: 'expired'
            }],
            couponList: [],
            couponTips: [{
                title: '如何使用礼金券？',
                content: '在结算页面，您可以看到自动添加的礼金券优惠。如果您有多张礼金券，系统将匹配最高优惠额度。您可以手动删除或选择使用其他礼金券和优惠种类。'
            },{
                title: '在哪里可以领取礼金券？',
                content: '您可以前往爱彼迎首页，关注我们最新的营销活动。您也可以关注爱彼迎官方微信服务号，及时获取最新优惠信息。如果您已经有了礼金券兑换码，可以在本页点击「兑换」输入兑换码领取礼金券。'
            },{
                title: '我的礼金券怎么不见了？',
                content: '礼金券的有效期不尽相同，如果您在可用礼金券找不到已领取的礼金券，可能礼金券已经失效。您可以在本页面查看失效礼金券。'
            }],
            emptyImgUrl:require("https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/e797192c747c6dfb849530eae88e88ae.png"),
            bulbImgUrl:require("https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/78bc55d17c018971448c701bb78b7979.png")
        }
    },
    created:function(){
        GetCouponInfo().then(response=>{
            this.couponList=response.data.couponList; 
        }).catch(()=>{
            console.log("fail");
            this.$message.error("错误:数据库连接错误");
        })
    },
    methods: {
        sortOrderChange(val){
            var order = val=='couponEnd'?-1:1;
            this.couponList.sort((a,b)=>{return a[val]<b[val]?order:-order;});
        },
    },
    computed: {
        selectCouponList: function(){
            var date = this.$moment(new Date()).format('YYYY-MM-DD HH:mm');
            var isExpired = this.couponStation == 'expired';
            return this.couponList.filter(function(coupon){
                return (coupon.couponEnd < date) == isExpired;
        })
      }
    }
}
</script>

