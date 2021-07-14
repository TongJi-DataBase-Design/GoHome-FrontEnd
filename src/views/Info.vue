<template>
  <div>
    <el-row>
      <el-form :label-position="right" label-width="80px">
        <el-form-item label="头像">
          <el-avatar
            shape="square"
            :size="100"
            fit="fill"
            :src="avatar"
          ></el-avatar>
        </el-form-item>
        <el-form-item label="用户名">
          <el-col :span="5">
            <el-input v-model="name" disabled></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avatar: "",
      name: "",
      dialogFormVisible: false,
    };
  },
  created: function () {
    //调用和后端连接的函数，获得管理员的头像/id/name
    this.avatar = localStorage.getItem("userAvatar");
    this.name = localStorage.getItem("userName");
  },
};
</script>