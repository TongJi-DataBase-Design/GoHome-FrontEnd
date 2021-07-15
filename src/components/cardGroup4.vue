<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-09 16:44:21
 * @LastEditTime: 2021-07-13 18:41:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\cardGroup4.vue
-->

<template>
  <div class="four col-sm-3">
    <div class="main" @click="onCardClicked">
      <img v-bind:src="this.url">
      <div class="characteristic">{{ info.stayCharcateristic.slice(0,20)+(info.stayCharcateristic.length>=20?"...":"") }}</div>
      <div class="stay-name">{{ info.stayName.slice(0,31)+(info.stayName.length>=31?"...":"") }}</div>
      <div class="stay-cost">¥ {{ info.stayPrice }}起</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    info: Object
  },
  data() {
    return {
      url:this.info.stayPhoto,
      id:this.info.id,
    };
  },
  methods: {
    handleCart() {
      this.$store.commit("addCart", this.info.id);
    },
    onCardClicked(){
      //TODO:对接尚丙奇页面，注释去掉
      console.log('id',this.id);
      console.log('info',this.info)
      this.$router.push({path:"/StayInfo",query:{stayId:this.info.stayId}});
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
  display:inline-block;
  margin: 8px;
  margin-left:28px;
  margin-bottom: 70px;
  width:260px;
  height:290px;

  border: 3px solid #000000;
  border-radius: 5px;
  overflow: hidden;
  background: rgba(255, 255, 255,1);
  position: relative;

  cursor: pointer;
}
.main:hover {
  text-decoration: none;
  /* box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px, rgb(51, 51, 51) 0px 0px 0px 3px; */
  box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}
.main img {
  width:99%;
  height:150px;
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
  margin-top:24px;
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
  margin-top: 90px;
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