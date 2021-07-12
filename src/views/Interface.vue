<template>
  <div id="app">
    <el-container>
      <el-aside>
        <el-menu default-active="examine" id="menu" @select="selectOperation">
          <el-menu-item index="examine">
            <i class="el-icon-s-home"></i>
            <span slot="title">房源审核</span>
          </el-menu-item>
          <el-menu-item index="report">
            <i class="el-icon-warning"></i>
            <span slot="title">举报审核</span>
          </el-menu-item>
          <el-menu-item index="near">
            <i class="el-icon-office-building"></i>
            <span slot="title">周边信息管理</span>
          </el-menu-item>
          <el-menu-item index="info">
            <i class="el-icon-user"></i>
            <span slot="title">管理员信息</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#menu {
  text-align: left;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

<script lang="ts">
export default {
  mounted: function () {
    this.$router.replace("examine");
  },
  methods: {
    selectOperation: function (index) {
      if (index === "examine") {
        this.$router.replace("examine");
      }
      if (index === "report") {
        this.$router.replace("report");
      }
      if (index === "near") {
        this.$router.replace("near");
      }
      if (index === "info") {
        this.$router.replace("information");
      }
    },
  },
};
</script>