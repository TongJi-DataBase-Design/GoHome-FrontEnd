<template>
<div>
<!--  <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>-->
  <el-card class="box-card" shadow="hover" :header-style="{}">
    <div slot="header" class="clearfix">
      <h2>
            <i class="iconfont icon-home2" id="myIcon"></i>

        <span class="infos">房间{{room.id}}</span></h2>
<!--      <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>-->
    </div>
    <div class="myInfo">
      <!--修改-->


      <el-container>
        <el-main style="width: 100px;">
          <img :src="room.roomImage" :alt="room.roomImage" width="400px" 
          style="border-radius:10px;">
        
        </el-main>
        <!--分割线-->
       
        <el-aside style="width: 40%;
        box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 2px 0px;
        ">
          
      <div style="margin:5px 0 5px 0">
        <i class='iconfont icon-mianji' id="myIcon"></i>
      <span >房间面积<strong class="myVal">{{room.area}}</strong>m<sup>2</sup></span>

      </div>
      <div style="margin:5px 0 5px 0">
      <i class='iconfont icon-wei' id="myIcon"></i>
      <span >独享卫生间<strong class="myVal">{{room.bathroom}}</strong>个</span>

      </div>
      <div style="margin:5px 0 5px 0">
      <i class='iconfont icon-ren2' id="myIcon"></i>
      <span >最多<strong class="myVal">{{room.roomCapacity}}</strong>人</span>
      </div>
      <div style="margin:5px 0 5px 0">
        <i class='iconfont icon-ziyuanldpi' id="myIcon"></i>
      <span >价格<strong class="myVal">{{room.price}}</strong>/晚</span>

      </div >
      <i class='iconfont icon-chuang2' id="myIcon"></i>
      <div  v-for="(bed, index) in room.beds" :key="index">
        {{bed.bedType}} <strong class="myVal">{{bed.num}}</strong>张
      </div>
    
    <div class="block" style="margin:10px 0 10px 0;">
<!--      <span class="demonstration">默认</span>-->
      <el-date-picker
      style="width:300px;"
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
    <div class="book-button">
      <el-button type="primary" @click="handleBook" plain>
        开始预定
      </el-button>
    </div>
        </el-aside>
    </el-container>
    </div>
      
  </el-card>
</div>
</template>

<script>
export default {
  name: "rooms",
  props: {
    room:Object,
    stayId: Number,
  },
  data() {
      return{
      value1: null
      }
  },
  methods: {
    handleBook: function(){
      // console.log(this.room.id);

      console.log(this.value1);
      if(this.value1===null){
        this.$message({
          message: '请选择入住日期',
          type: 'info',
        });
      }
      else{
        this.$router.push({path: "/PaymentPage", query: {stayId: this.stayId,
                                                         roomId: this.room.id,
                                                         startDate: this.value1[0],
                                                         endDate: this.value1[1]}});
      }
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
    }
  }
}
</script>

<style scoped>
@import  'https://at.alicdn.com/t/font_2668999_sb9ohwr9vfn.css';
.box-card{
  width: 100%;
  border-radius: 15px;
  border-width: 2px;
  border-color: #7b7b7b;
  background-color: #ffffff;
  box-shadow: 7px 7px 10px #888888;
  animation: fadeInDown;
  animation-duration: 0.5s;
  margin-top: 10px;
  margin-bottom: 10px;
}

.box-card .icons{
  display:inline-block;
  vertical-align: middle;
}

.box-card .infos{
  display:inline-block;
}


.myInfo{
  font-size:1em;
}

.myVal{
  font-size:1.2em;
  margin:0 5px 0 5px;
}

#myIcon{
  display:inline-block;
  margin-right:10px;
  color:#0f68ba;
  font-size:1.2em;
  }
.el-card >>> .el-card__header{
  padding: 8px;
}
</style>