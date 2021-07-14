<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <el-row>
      <el-col :span="16">
        <el-form :label-position="right" label-width="150px">
          <el-form-item label="房源位置">
            <el-col :span="15">
              <el-input v-model="form.stayAdd" disabled></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="房源类型">
            <el-col :span="5">
              <el-input v-model="form.stayType" disabled></el-input> </el-col
          ></el-form-item>
          <el-form-item label="容纳房客数">
            <el-col :span="5">
              <el-input v-model="form.stayCap" disabled></el-input> </el-col
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
                <el-input v-model="form.tolietNum" disabled></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="公共浴室数量">
              <el-col :span="5">
                <el-input v-model="form.bathNum" disabled></el-input> </el-col
            ></el-form-item>
            <el-form-item label="是否有无障碍设施">
              <el-col :span="5">
                <el-input
                  v-model="form.hasBarrierFree"
                  disabled
                ></el-input> </el-col
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
        <el-button type="success" @click="accept">审核通过</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-table {
  animation: fadeIn;
  animation-duration: 1s;
}
</style>

<script>
import { stay, stayResult } from "@/api/admin";
export default {
  created: function () {
    //获得信息
    let id = this.$route.params.stayId;
    stay(id)
      .then((response) => {
        let pre = response.data;
        this.form.stayAdd = pre.detailedAddress;
        this.form.stayType = pre.stayType;
        this.form.stayCap = pre.stayCapability;
        this.form.roomList = [];
        for (let i = 0; i < pre.roomList.length; i++) {
          let now = pre.roomList;
          let temp = {
            roomId: "",
            bathNum: "",
            bedNum: "",
            bedType: "",
          };
          temp.roomId = now[i].roomId;
          temp.bathNum = now[i].bathroomNum;
          temp.bedNum = now[i].bedNum;
          temp.bedType = now[i].bedType;
          this.form.roomList.push(temp);
        }
        this.form.tolietNum = pre.publicToliet;
        this.form.bathNum = pre.publicBath;
        this.form.hasBarrierFree = pre.hasBarrierFree ? "是" : "否";
        this.form.stayPic = [];
        for (let i = 0; i < pre.stayPicList.length; i++) {
          this.form.stayPic.push(pre.stayPicList[i]);
        }
      })
      .catch((error) => {
        this.$message({
          message: error,
          type: "warning",
        });
        return;
      });
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
        stayPic: [],
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
          let id = this.$route.params.stayId;
          if (this.reason === "") {
            this.$message({
              message: "必须填写拒绝理由",
              type: "error",
            });
          } else {
            let param = {
              stayId: id,
              isPass: 0,
              msg: this.reason,
            };
            console.log(this.form.reason);
            stayResult(param)
              .then((response) => {
                this.$router.replace("examine");
              })
              .catch((error) => {
                this.$message({
                  message: error,
                  type: "warning",
                });
                return;
              });
          }
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
          let id = this.$route.params.stayId;
          let param = {
            stayId: id,
            isPass: 1,
          };
          stayResult(param)
            .then((response) => {
              this.$router.replace("examine");
            })
            .catch((error) => {
              this.$message({
                message: error,
                type: "warning",
              });
              return;
            });
        })
        .catch(() => {});
    },
  },
};
</script>