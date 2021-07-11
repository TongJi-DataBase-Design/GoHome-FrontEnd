<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-09 16:44:21
 * @LastEditTime: 2021-07-11 19:40:53
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\cardGroup4.vue
-->

<template>
  <div class="four col-sm-3">
    <router-link :to="'/product/' + info.id" class="main">
      <img :src="info.stayPhotos[0]">
      <div class="characteristic">{{ info.stayDescribe }}</div>
      <div class="stay-name">{{ info.stayName }}</div>
      <div class="stay-cost">¥ {{ info.stayPrice }}起</div>
    </router-link>
  </div>
</template>
<script>
export default {
  props: {
    info: Object
  },
  data() {
    return {
    };
  },
  methods: {
    handleCart() {
      this.$store.commit("addCart", this.info.id);
    }
  }
};
</script>
<style scoped>
.four {
  padding: 0px;
  float: left;
}
.main {
  display: block;
  margin: 8px;
  margin-left:28px;
  width:300px;
  height:250px;
  border: 3px solid #dddee1;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  position: relative;
}
.main:hover {
  text-decoration: none;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px; */
  box-shadow: blue 0px 0px 0px 2px inset, rgb(255, 255, 255) 10px -10px 0px -3px, rgb(31, 193, 27) 10px -10px, rgb(255, 255, 255) 20px -20px 0px -3px, rgb(255, 85, 85) 20px -20px;
}
.main img {
  width: 100%;
  height:140px;
  padding-bottom: 8px;
}
.characteristic {

  float: left;
  margin-left:8px;

  font-size: 12px !important;
  line-height: 1.33333em !important;
  font-weight: 800 !important;
  color: rgb(113, 78, 51);
}
.stay-name {

  float: left;
  position:absolute;
  text-align: left;
  text-indent: 3px;
  letter-spacing: 0.1px;
  margin-top:22px;
  margin-left:4px;
  
  font-size: 16px;
  font-weight: 800;
  line-height: 1.375;
  color: #484848 !important;
  color: #222;
}
.main:hover h4 {
  color: #0070c9;
}
.four-color {
  display: block;
  width: 16px;
  height: 16px;
  border: 1px solid #dddee1;
  border-radius: 50%;
  margin: 6px auto;
}
.stay-cost {

  position:absolute;
  margin-left:8px;

  color: #484848 !important;
  margin-top: 70px;
  font-size: 14px !important;
  line-height: 1.28571em !important;
  font-weight: 400 !important;
}
.cart {
  display: none;
  padding: 4px 8px;
  background: #2d8cf0;
  color: #fff;
  font-size: 12px;
  border-radius: 3px;
  cursor: pointer;
  position: absolute;
  top: 5px;
  right: 5px;
}
.main:hover .cart {
  display: inline-block;
}
</style>