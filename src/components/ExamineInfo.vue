<template>
  <div>
    <el-row>
      <el-col :span="16">
        <el-form :label-position="right" label-width="150px">
          <el-form-item label="房源位置">
            <el-col :span="5">
              <el-input v-model="stayAdd" disabled></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="房源类型">
            <el-col :span="5">
              <el-input v-model="stayType" disabled></el-input> </el-col
          ></el-form-item>
          <el-form-item label="容纳房客数">
            <el-col :span="5">
              <el-input v-model="stayCap" disabled></el-input> </el-col
          ></el-form-item>
        </el-form>
        <el-row>
          <el-table :data="form.roomList" stripe style="width: 100%">
            <el-table-column type="index" width="50"> </el-table-column>
            <el-table-column prop="bathNum" label="房间号" width="150">
            </el-table-column>
            <el-table-column prop="bathNum" label="卫生间数量">
            </el-table-column>
            <el-table-column prop="bedNum" label="床数"> </el-table-column>
            <el-table-column prop="bedType" label="床型"> </el-table-column>
          </el-table>
        </el-row>
        <el-row>
          <el-form :label-position="right" label-width="150px">
            <el-form-item label="公共卫生间数量">
              <el-col :span="5">
                <el-input v-model="tolietNum" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="公共浴室数量">
              <el-col :span="5">
                <el-input v-model="bathNum" disabled></el-input> </el-col
            ></el-form-item>
            <el-form-item label="是否有无障碍设施">
              <el-col :span="5">
                <el-input v-model="hasBarrierFree" disabled></el-input> </el-col
            ></el-form-item>
            <el-form-item label="拒绝理由">
              <el-col :span="24">
                <el-input v-model="reason"></el-input> </el-col
            ></el-form-item>
          </el-form>
        </el-row>
      </el-col>
      <el-col :span="7" :offset="1">
        <div class="block">
          <el-carousel trigger="click" height="300px">
            <el-carousel-item v-for="item in form.stayPic" :key="item">
              <el-image
                style="width: 400px; height: 300px"
                :src="item"
                fit="contain"
              ></el-image>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="3" :offset="3">
        <el-button type="danger" @click="refuse">审核拒绝</el-button>
      </el-col>
      <el-col :span="3" :offset="5">
        <el-button type="warning" @click="save">保存并返回</el-button>
      </el-col>
      <el-col :span="3" :offset="5">
        <el-button type="success" @click="accept">审核通过</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style>
.el-row {
  margin-bottom: 20px;
}
</style>

<script>
export default {
  created: function () {
    //获得信息
    let id = this.$route.params.stayId;
    console.log(id);
  },
  data() {
    return {
      form: {
        stayAdd: "",
        stayType: "",
        stayCap: "",
        roomList: [
          {
            roomId: "",
            bathNum: "",
            bedNum: "",
            bedType: "",
          },
          {
            roomId: "",
            bathNum: "",
            bedNum: "",
            bedType: "",
          },
        ],
        tolietNum: "",
        bathNum: "",
        hasBarrierFree: "",
        stayPic: [
          "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
          "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210705141615.jpg",
          "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210705141558.jpg",
          "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210705141547.jpg",
          "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210705141345.bmp",
          "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210705141317.jpg",
          "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210705141237.gif",
          "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210705141148.png",
          "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210705141105.jpg",
        ],
      },
      reason: "",
    };
  },
  methods: {
    refuse: function () {
      this.$confirm("确定要拒绝申请吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "error",
      })
        .then(() => {
          //上传更新
          this.$router.replace("examine");
        })
        .catch(() => {});
    },
    save: function () {
      this.$confirm("确定要保存并返回吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //保存到本地
          this.$router.replace("examine");
        })
        .catch(() => {});
    },
    accept: function () {
      this.$confirm("确定要提交审核结果吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          this.$router.replace("examine");
        })
        .catch(() => {});
    },
  },
};
</script>