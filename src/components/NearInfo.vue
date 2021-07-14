<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <el-row>
      <el-form :label-position="right" label-width="150px">
        <el-form-item label="周边ID">
          <el-col :span="5">
            <el-input v-model="form.nearId" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="周边名称">
          <el-col :span="5">
            <el-input v-model="form.nearName"></el-input> </el-col
        ></el-form-item>
        <el-form-item label="周边类别">
          <el-col :span="5">
            <el-input v-model="form.nearType"></el-input> </el-col
        ></el-form-item>
        <el-form-item label="周边热度">
          <el-col :span="5">
            <el-input v-model="form.nearPop"></el-input> </el-col
        ></el-form-item>
        <el-form-item label="周边详细地址">
          <el-col :span="5">
            <el-input v-model="form.nearAdd"></el-input> </el-col
        ></el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col span="2" :offset="3">
        <el-button type="primary" @click="submitInfo">确定</el-button>
      </el-col>
      <el-col span="2" :offset="3">
        <el-button type="info" @click="ret">返回</el-button>
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
import { addNear, changeNear } from "@/api/admin";

export default {
  data() {
    return {
      form: {
        nearId: "",
        nearName: "",
        nearType: "",
        nearPop: "",
        nearAdd: "",
      },
      isUpdate: false,
    };
  },
  created: function () {
    let nearby = this.$route.params.nearby;

    this.isUpdate = this.$route.params.isUpdate;
    console.log(this.form);
    if (!this.isUpdate) {
      this.form.nearId = nearby.nearbyId;
      this.form.nearName = nearby.nearbyName;
      this.form.nearType = nearby.nearbyType;
      this.form.nearPop = nearby.nearbyPop;
      this.form.nearAdd = nearby.nearbyAdd;
    }
  },
  methods: {
    submitInfo: function () {
      this.$confirm("确定要提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
          if (
            this.form.nearName === "" ||
            this.form.nearType === "" ||
            this.form.nearPop == "" ||
            this.form.nearAdd === ""
          ) {
            this.$message({
              message: "周边消息不能为空",
              type: "error",
            });
          } else {
            if (isNaN(this.form.nearPop)) {
              this.$message({
                message: "周边热度必须为数字",
                type: "error",
              });
            } else {
              if (this.isUpdate) {
                console.log("xxx");
                console.log(this.form.nearName);
                let param = {
                  nearbyName: this.form.nearName,
                  nearbyType: this.form.nearType,
                  nearbyPopularity: this.form.nearPop,
                  nearbyDetailedAdd: this.form.nearAdd,
                };
                console.log("param", param);
                addNear(param)
                  .then((response) => {
                    console.log(response);
                    this.$router.push("near");
                  })
                  .catch((error) => {
                    this.$message({
                      message: error,
                      type: "warning",
                    });
                    return;
                  });
              } else {
                let param = {
                  nearbyId: this.form.nearId,
                  nearbyName: this.form.nearName,
                  nearbyType: this.form.nearType,
                  nearbyPopularity: this.form.nearPop,
                  nearbyDetailedAdd: this.form.nearAdd,
                };
                console.log("param", param);
                changeNear(param)
                  .then((response) => {
                    console.log(response);
                    this.$router.push("near");
                  })
                  .catch((error) => {
                    this.$message({
                      message: error,
                      type: "warning",
                    });
                    return;
                  });
              }
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });
    },
    ret: function () {
      this.$confirm("确定要返回吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$router.replace("near");
        })
        .catch(() => {});
    },
  },
};
</script>
