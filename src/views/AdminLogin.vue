<template>
  <div class="login">
    <el-container>
      <el-header></el-header>
      <div style="height: 130px"></div>
      <el-main>
        <el-card class="box-card">
          <div style="height: 20px"></div>
          <div style="margin-bottom: 30px; font-weight: bold">管理员登录</div>
          <el-form label-width="60px">
            <el-form-item label="用户名">
              <el-input v-model="username"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="password" show-password></el-input>
            </el-form-item>
          </el-form>
          <div style="height: 10px"></div>
          <el-button
            type="primary"
            round
            style="width: 35%; margin-bottom: 10px"
            @click="clilogin"
            >登录</el-button
          >
        </el-card>
        <div style="height: 168px"></div>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
body {
  margin: 0px;
}

.login {
  /* background-image: url(https://ftp.bmp.ovh/imgs/2021/07/bf7ccc0d26fb26f1.jpg); */
  background-image: url(https://i.bmp.ovh/imgs/2021/07/b190fa0e5850486d.jpg);
  background-size: cover;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-size: 100% 100%;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 350px;
  height: 300px;
  margin: 0 auto;
}

.login {
  text-align: center;
  margin: 0 auto;
}

.el-button {
  margin: 0 auto;
  text-align: center;
}
</style>

<script>
import { adLogin } from "@/api/admin";
import { mapMutations } from "vuex";
export default {
  mounted: function () {
    console.log(localStorage.getItem("Authorization"));
    if (
      localStorage.getItem("Authorization") != null &&
      localStorage.getItem("Authorization") != ""
    ) {
      //直接进入下一页面
      this.$router.push({ name: "Inter" });
      startLogin();
    }
  },
  data() {
    return {
      username: "",
      password: "",
      avatar: "",
    };
  },
  methods: {
    ...mapMutations(["changeLogin"]),
    clilogin: function () {
      let param = {
        adminName: this.username,
        password: this.password,
      };
      adLogin(param)
        .then((response) => {
          console.log(response);
          if (response.data.loginState) {
            this.username = response.data.userName;
            this.avatar = response.data.adminAvatar;
            let token = response.data.token;
            this.changeLogin({
              Authorization: token,
              userName: response.data.userName,
              userAvatar: response.data.userAvatar,
            });
            startLogin();
            console.log("success");
            this.$message({
              message: "登陆成功",
              type: "success",
            });
            this.$router.push({ name: "Inter" });
          }
        })
        .catch((error) => {
          console.log(error);
          this.$message({
            message: "登录失败，请稍后重试",
            type: "warning",
          });
          console.log("error", error);
          return;
        });
    },
  },
};
</script>