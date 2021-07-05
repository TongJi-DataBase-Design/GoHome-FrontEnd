<template>
<div>
<!--  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
  <el-card class="box-card" shadow="hover">
    <div slot="header" class="clearfix">
      <span>房间{{room.id}}</span>
<!--      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
    </div>
    <div>
      <img :src="room.roomImage" :alt="room.roomImage" width="800px">
      <div>
      <span>房间面积{{room.area}}m<sup>2</sup></span>

      </div>
      <div>
      <span>独享卫生间{{room.bathroom}}个</span>

      </div>
      <div>

      <span>最多{{room.roomCapacity}}人</span>
      </div>
      <div>
      <span>价格:{{room.price}}/晚</span>

      </div>
      <div class="icon">
       <img src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/20210704144703.png" width="20px" height="20px"/>
      </div>
      <div class="info" v-for="bed in room.beds">
        {{bed.bedType}} {{bed.num}}张
      </div>
    </div>
    <div class="block">
<!--      <span class="demonstration">默认</span>-->
      <el-date-picker
          v-model="value1"
          value-format="yyyy-MM-dd"
          type="daterange"
          :editable="false"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions">
      </el-date-picker>
    </div>
    <div class="book-button">  <el-button type="primary" @click="handleBook">开始预定</el-button></div>
  </el-card></div>
</template>

<script>
export default {
  name: "rooms",
  props: {
    room:Object,
  },
  data() {
      return{
      value1: new Date()
      }
  },
  methods: {
    handleBook: function(){
      console.log(this.room.id);
      console.log(this.value1);
    },

  },
  computed: {
    pickerOptions(){
      let that = this;
      // let that=this;
      // let maxDate=Date.parse(that.room.maxDate);
      // let minDate=Date.parse(that.room.minDate);
      return{
        disabledDate(time) {
          const today =new Date().toLocaleTimeString();
          // 禁用今天之前的日期
          let disable=time<new Date(today);
          // 禁用后端返回的禁止日期
          that.room.unavailable.forEach((item) =>　{
            disable =
                disable || (time.getTime() > new Date(item.startDate).getTime() -8.64e7 &&
                time.getTime() < new Date(item.endDate).getTime());
          });
          return disable;
        }
      }
    }}
}
</script>

<style scoped>
.box-card{
  width: 100%;
}
</style>