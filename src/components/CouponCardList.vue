<template>
  <div class="couponCardList">
    <div class="couponCard" :key="index" v-for="(coupon,index) in selectCouponList">
        <div class="leftCouponCard">
          <div class="couponAmount">￥{{coupon.couponAmount}}</div>
          <div class="couponLimit">{{coupon.couponLimit}}元起用</div>
        </div>
        <div class="rightCouponCard">
          <el-tooltip :content="coupon.couponName" placement="bottom" :open-delay=500 :visible-arrow=false>
            <div class="couponName">{{coupon.couponName}}</div>
          </el-tooltip>
          <div class="couponTime">
            <i class="el-icon-time"></i>
            {{coupon.couponStart}}到{{coupon.couponEnd}}
          </div>
        </div>
    </div>
    <div class="pagination">
        <div style="margin:0 auto">
            <el-pagination :page-size="pageSize" layout="prev, pager, next" :total="couponList.length" :current-page.sync="currentPage"></el-pagination>
        </div>
    </div>
  </div>
</template>

<style scoped>


.couponCardList{
    width:500px;
    height:800px;
    margin-left: 45px;
    position: relative;
}
.couponCard{
    width: 100%;
    height: 120px;
    margin:30px auto;
    box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
}
.couponCard:hover{
  box-shadow: rgba(0, 0, 0, 0.45) 0px 25px 20px -20px;
}
.pagination{
    position:absolute;
    bottom:20px;
    width:100%;
}
.leftCouponCard{
    width:30%;
    float:left;
    color:white;
    background-image: 
    radial-gradient(
      circle at 1px 10px, 
      transparent 6px, 
      #b0c4de 6px, 
      #b0c4de 0px);
      background-size: 150px 20px;
}
.leftCouponCard>>>.el-carousel{
  margin-left: 0px;
}
.rightCouponCard{
    width:70%;
    float:right;
    background-image: 
    radial-gradient(
      circle at 349px 10px, 
      transparent 6px, 
      #f0f0f0 6px, 
      #f0f0f0 0px);
      background-size: 350px 20px;
}
.couponAmount{
    height:80px;
    line-height:100px;
    font-size:40px;
}
.couponLimit{
    height:40px;
    line-height:40px;
}
.couponName{
    height: 65px;
    line-height:100px;
    font-size: 30px;
    font-family: "楷体";
    overflow:hidden;
    white-space: nowrap;
    text-overflow:ellipsis;
}
.couponTime{
    height:55px;
    line-height:80px;
    font-size: 10px;
}
</style>

<script>
export default {
  name: 'CouponCard',
  props: {
    couponList: Array
  },
  computed:{
      selectCouponList: function(){
        var end = this.currentPage * this.pageSize;
        var begin = end - this.pageSize;
        return this.couponList.slice(begin,end);
      }
    },
  data(){
    return{
      currentPage: 1,
      pageSize: 5
    }
  }
}
</script>