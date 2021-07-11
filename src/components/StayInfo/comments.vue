<template>
  <div>

    <el-card class="box-card" shadow="hover" style="" >
      <el-image src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210704224755.png"
                style="width: 25px;height: 25px ;float:left;" />
      <span class="bigFontSize" style="font-size: 20px;float:left;padding-top: 1%;padding-left: 2%" > 房客评价</span>

      <div id="ratings">
      <el-rate v-model="comments.ratings" disabled show-score text-color="#ff9900" score-template="{value}"></el-rate>
      </div>
      <div id="commentNumText">
      {{comments.commentNum}}条评价
      </div>

      <br><br><br>
      <div v-for="comment in comments.comments">
        <el-card    class="box-card" style="width: 500px;height: 100%">
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
let comments=_comment.data
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
#ratings{
  display:inline-block;
  vertical-align: middle;
  horiz-align: center;
  padding-left: 12px;
  /*width: 20px;*/
  /*background-color: blue;*/
}

#commentNumText{
  display:inline-block;
  /*horiz-align: center;*/
}
</style>