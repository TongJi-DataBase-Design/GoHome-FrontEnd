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
        <el-form-item label="管理员ID">
          <el-col :span="5">
            <el-input v-model="id" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="用户名">
          <el-col :span="5">
            <el-input v-model="name" disabled></el-input>
          </el-col>
        </el-form-item>
      </el-form>
    </el-row>
    <el-row>
      <el-col :span="3">
        <el-button type="primary">修改头像</el-button>
      </el-col>
      <el-col :span="3" :offset="2">
        <el-button type="primary">修改密码</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    
    return {
      avatar:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg",
      id: "",
      name: "",
      dialogFormVisible: false,
    };
  },
  created: function () {
    //调用和后端连接的函数，获得管理员的头像/id/name
    this.id = "123456";
    this.name = "some";
  },
  
};
</script>