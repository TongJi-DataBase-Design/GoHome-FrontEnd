<template>
  <div>
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

<style>
.el-row {
  margin-bottom: 20px;
}
</style>

<script>
export default {
  data() {
    return {
      form: {
        nearId: "",
        nearName: "",
        nearType: "",
        nearPop: "",
        nearRoad: "",
        nearAdd: "",
      },
    };
  },
  created: function () {
    let nearby = this.$route.params.nearby;
    //通过nearbyID获取nearby的相关信息进行赋值
    this.form.nearName = nearby.nearbyName;
    this.form.nearId = nearby.nearbyId;
    this.form.nearType = nearby.nearbyType;
    this.form.nearPop = nearby.nearbyPop;
    this.form.nearAdd = nearby.nearbyAdd;
  },
  methods: {
    submitInfo: function () {
      this.$confirm("确定要提交吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          //向后端传递消息
          this.$router.push("near");
        })
        .catch(() => {});
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
