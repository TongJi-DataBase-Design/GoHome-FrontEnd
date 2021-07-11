<template>
<el-container>
  <el-aside width="60%">
    <div class="title">
    <el-link :underline="underline" style="height: 30px;">
      <el-image src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/7d754360eef21afdb2980c794875d420.png" alt="返回" style="height: 30px; width: 30px; float:left;"></el-image>
    </el-link>
      <span style="">确认并支付</span>
    </div>
    <div>

    <el-card>

    </el-card>
    </div>
  </el-aside>
  <el-main>Main</el-main>
</el-container>
</template>

<script>
export default {
  name: "PaymentPage",
  data() {
    return{
      underline: false,
    }
  }
}
</script>

<style scoped>
.title{
  display: inline-block;
  float: left;
  margin-left: 10%;
}
</style>