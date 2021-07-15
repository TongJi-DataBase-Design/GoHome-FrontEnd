<template>
  <div>

    <el-card class="outer-box-card" shadow="hover" style="width:95%;margin:0 auto;border-radius:15px" >
      <div slot="header">
        <h2>
            <i class="iconfont icon-bianji4" id="myIcon" ></i>
            <span  > 房客评价</span>
        </h2>

      </div>

      <div style="margin:0 auto" id="commentNumText">
        <strong>{{comments.commentNum}}</strong>&nbsp;&nbsp;条评价
      </div>
      <div id="ratings" style="margin-left: auto;margin-top:10px;">
        <el-rate  v-model="comments.ratings.toFixed(2)" disabled show-score text-color="#ff9900" score-template="{value}" ></el-rate>
      </div>
      
      <br><br>
      <div style="margin-top:3%" v-for="(comment, index) in comments.comments" :key="index">
        <el-card    class="box-card" style="width: 800px;height: 100%;margin:0 auto">
          <span class="bigFontSize" style="font-size: 15px;float: left;color: #7b7b7b">时间：{{comment.date.replace('T',' ')}}</span>
          <br><br>
          <el-image :src=comment.avatar
                    style="width: 56px;height: 56px;border-radius: 28px;float: left"></el-image>
          <span class="NameFontSize" style="font-size: 20px;float:left;padding-left: 2%">
              {{comment.nickName}}</span>
          <br><br>
          <el-divider></el-divider>
          <el-rate style="float: left"
                   v-model="comment.ratings>=5?5:comment.ratings.toFixed(1)"
                   disabled
                   show-score
                   text-color="#ff9900"
                   score-template="{value}">
          </el-rate>
          <br><br>
          <span class="commentSize" >
                {{comment.commentContent}}</span>
          <br>

        </el-card>
        <br>
      </div>


      
        <el-pagination
          v-if="comments.commentNum<4?false:true"
          layout="prev, pager, next"
          :page-size="publishedPageSize"
          :page-count="5"
          :total="comments.commentNum"
          @current-change="current_change"
          style="float: bottom ;padding-bottom: 1%"
          background
      >
      

      </el-pagination>


    </el-card >
  </div>

</template>

<script>
// import _comment from '@/assets/comments.json'
// let comments = _comment.data
// console.log(comments.ratings)
import {getComments} from '@/api/stay.js'

export default {
  name: "comments",
  data() {
    return{
      publishedPageSize: 5,
      pageCount: 1,
      comments: Object,
      publishedCurrentPage: 1,
    }
  },
  created() {
    // let params = {"stayId": this.stayId};
    // test
    let stayId = this.stayId;
    getComments(stayId)
      .then((response)=>{
        this.comments = response.data;
        // console.log(response.data);
      })
      .catch((error)=>{this.$message({
        message: error,
        type: "warning",
      });
      return;
      });
  },
  methods:{
    disableBookButton(){

    },
    current_change:function (publishedCurrentPage){
      console.log(this.publishedCurrentPage);
      this.publishedCurrentPage = publishedCurrentPage;
    },

  },
  props: {
    stayId: String,
  },
}
</script>

<style scoped>
@import url('../../assets/css/font.css');
/*#ratings{*/
/*  display: block;*/

/*}*/
.el-icon-star-on:before {
    font-size: 1.5em !important;
}
.bigFontSize{
    font-size: 10px;
    color: #999;
    padding:6px 6px;
    font-family:"FZHeiBJW","Lato-Bold";
    margin:1px;
    word-wrap: break-word;
    word-break: normal;
}
.NameFontSize{
    font-size:22px;
    padding: 1px 6px;
    font-weight: bold;
    text-align: left;
    display:block;
    margin-top:10px;
    margin-right:10px;
    font-family:"Lato-Bold","FZHeiBJW";
    flex: 1;  
}
.commentSize{
    font-size: 18px;
    color: rgb(2, 0, 0);
    padding:6px 6px;
    display: block;
    font-family:"PingFang SC";
    margin:1px;
    text-align: left;
    word-wrap: break-word;
    word-break: normal;
}
#ratings{
  
  vertical-align: middle;
  padding-left: 12px;
  text-align: center;
  font-family:"Lato-Bold";
  /*width: 20px;*/
  /*background-color: blue;*/
}

#commentNumText{
  display:inline-block;
  font-size: 1.2em;
  /*horiz-align: center;*/
}

#myIcon{
  display:inline-block;
  margin-right:10px;
  color:#0f68ba;
  font-size:1.2em;
}

.outer-box-card{
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: #ffffff;
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 0.5s;
}
</style>