<template>
  <div>

    <el-card class="box-card" shadow="hover" style="width:95%;margin:0 auto;border-radius:15px" >
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
        <el-rate  v-model="comments.ratings" disabled show-score text-color="#ff9900" score-template="{value}" ></el-rate>
      </div>
      

      <br><br>
      <div style="margin-top:3%" v-for="comment in comments.comments" :key="comment">
        <el-card    class="box-card" style="width: 800px;height: 100%;margin:0 auto">
          <span class="bigFontSize" style="font-size: 15px;float: left;color: #7b7b7b">时间：{{comment.date}}</span>
          <br><br>
          <el-image :src=comment.avatar
                    style="width: 56px;height: 56px;border-radius: 28px;float: left"></el-image>
          <span class="bigFontSize" style="font-size: 20px;float:left;padding-left: 2%">
              {{comment.nickName}}</span>
          <br><br>
          <el-divider></el-divider>
          <el-rate style="float: left"
                   v-model="comment.ratings"
                   disabled
                   show-score
                   text-color="#ff9900"
                   score-template="{value}">
          </el-rate>
          <br><br>
          <span class="bigFontSize" style="font-size: 13px;float: left;text-align: left">
                {{comment.commentContent}}</span>
          <br>

        </el-card>
        <br>
      </div>


      <el-pagination
          layout="prev, pager, next"
          :page-size="pageSize"
          :page-count=5
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
import _comment from '@/assets/comments.json'
let comments = _comment.data
console.log(comments.ratings)
export default {
  name: "comments",
  data() {
    return{
      pageSize: 5,
      comments,
    }
  },
  methods:{
    disableBookButton(){

    }
  }
}
</script>

<style scoped>
/*#ratings{*/
/*  display: block;*/

/*}*/
.el-icon-star-on:before {
    font-size: 1.5em !important;
}

#ratings{
  
  vertical-align: middle;
  horiz-align: center;
  padding-left: 12px;
  text-align: center;
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
</style>