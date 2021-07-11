<template>
  <el-row style="height: 100%">
    <el-col :span="14">
<!---->
    </el-col>

    <el-col :span="1" style="height: 100%">
      <el-divider direction="vertical" class="el-divider--vertical">test</el-divider>
    </el-col>
    <el-col :span="8">
      <el-image class="pic1 "  src="https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704141706551.png"></el-image>
      <br><br>
      <el-image  class="picstyle"   src=" https://joes-bucket.oss-cn-shanghai.aliyuncs.com/img/image-20210704142220234.png"></el-image>

    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "HostInfoMessage"
}
</script>

<style scoped>
.box-card{
  width: 550px;
  height:550px;
  border-radius: 15px;
  border-width: 3px;
  border-color: #7b7b7b;
  background-color: rgba(246, 248, 248, 0.918);
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 1s;
}
.Mybutton
{
  width: 150px;
  height: 50px;
  border-color: #929292;
  border-radius:15px;
  border-width: 3px;
  box-shadow: 5px 5px 8px #888888;
  font-family: "PingFang SC";
  font-size: medium;
  font-weight: bold;
  color: #7b7b7b;
  animation: fadeInDown;
  animation-duration: 1s;

}
.bigFontSize
{
  font-family: "PingFang SC";
  font-size: 30px;
  font-weight: bold;
  animation: fadeInDown;
  animation-duration: 1s;


}
.smallgretfontsize
{
  font-weight: bold;
  font-size:medium;
  font-family: "PingFang SC";
  color: #747474;
  animation: fadeInDown;
  animation-duration: 1s;
}
.el-divider--vertical{
  height:80%;
  margin-top: 100px;
  width: 2px;
  animation: fadeInDown;
  animation-duration: 1s;
}

</style>