<template>
  <div>
     <router-view></router-view>
  </div>
</template>


<style>
/* .el-main{
    background-image: url(https://www.picbed.cn/images/2021/07/12/1.jpg);
    background-size: cover;
    background-repeat: no-repeat;
}

.text {
  font-size: 14px;
}

.item {
  padding: 18px 0;
}

.box-card {
  width: 350px;
  height: 500px;
  margin: 0 auto;
}

.login{
    text-align: center;
    margin: 0 auto;
}

.el-button{
    margin: 0 auto;
    text-align: center;
} */
</style>

<script>
// export default {
//     data(){
//         return{
//             username:"",
//             password:"",
//         }
//     },
//     methods:{
//         cli_login:function(){
//             this.$router.push({path:'/interface'});
//         }
//     }
// }

import adminlogin from "@/views/AdminLogin.vue";

export default {
  name: "App",
  components: {
    adminlogin,
  },
  mounted:function(){
    this.$router.push("adminlogin");
  }
};
</script>