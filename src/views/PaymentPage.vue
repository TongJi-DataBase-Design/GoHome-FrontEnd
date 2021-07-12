<template>
  <div>
<!--    <el-container style="">-->
<!--      <el-aside width="60%" style="padding: 0px;">-->
        <div class="title" >
          <el-link :underline="false" style="height: 30px; float: left;">
            <el-image src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/7d754360eef21afdb2980c794875d420.png" alt="返回" style="height: 30px; width: 30px; float:left;"></el-image>
          </el-link>
          <span style="float: left;">确认并支付</span>
        </div>
        <br/>
        <div style="">
          <el-card >
            <div slot="header" >
              <h2 style="margin: 10px;">您的行程</h2>
            </div>
            <div>

              <h3 style=" vertical-align: middle; height: 25px;">
                <el-image src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/edf24647e3ffa658b15a77e849ba566b.png" style="width: 25px; height: 25px; float:left;  vertical-align: middle;"></el-image>
                <span style="vertical-align: middle; float: left;">日期</span>
                <span style="float: right;">
                  <el-link @click="handleChangeDateOpen">编辑</el-link>
                </span>
              </h3>
              <span style="float: left;">{{this.bookDate[0]}}-{{this.bookDate[1]}}</span>
              <br>
              <el-dialog
                  title="入住时间"
                  :visible.sync="changeDateDialogVisible"
                  width="40%">
                <!-- :before-close="handleClose" <span>这是一段信息</span>-->
                <span style="float: left;">日期</span>
                <el-date-picker
                    v-model="changedDate"
                    value-format="yyyy-MM-dd"
                    type="daterange"
                    :editable="false"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions">
                </el-date-picker>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="changeDateDialogVisible = false;">取 消</el-button>
                  <el-button type="primary" @click="handleSubmit(0)">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            <div>
              <h3 style="vertical-align: middle; height: 25px;">
                <el-image src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/529df86b2cffba7b2c207cac3aae3f2b.png" style="width: 25px; height: 25px; float:left;  vertical-align: middle;"></el-image>
                <span style="vertical-align: middle; float: left;">人数</span>
                <span style="float: right;">
                  <el-link @click="handleChangeNumOpen">编辑</el-link>
                </span>
              </h3>
              <el-dialog
                  title="房客人数"
                  :visible.sync="changeNumDialogVisible"
                  width="30%">
<!-- :before-close="handleClose" <span>这是一段信息</span>-->
                  <span style="float: left;">房客人数</span>
                  <el-input-number v-model="changedPeopleNum" :min="1" :max="roomInfo.roomCapacity" label="人数" size="small" style="float: right;"></el-input-number>
                <span slot="footer" class="dialog-footer">
                  <el-button @click="changeNumDialogVisible = false;">取 消</el-button>
                  <el-button type="primary" @click="handleSubmit(1)">确 定</el-button>
                </span>
              </el-dialog>
              <span style="float: left;">{{peopleNum}}位房客</span>
            </div>
          </el-card>

<!--          价格详情-->
          <el-card class="detail">
            <div slot="header" class="detail-header">
              <el-image :src="roomInfo.roomImage" :alt="roomInfo.roomImage" style="height: 80px; width: 120px; position: relative; left: -400px;"></el-image>
              <span></span>
            </div>
          </el-card>
        </div>
<!--      </el-aside>-->
<!--      <el-main>Main</el-main>-->
<!--    </el-container>-->
  </div>

</template>

<script>
import room from '@/assets/roominfo.json'
let room1 = room.data;
export default {
  name: "PaymentPage",
  data() {
    return{
      peopleNum: 2,
      changeNumDialogVisible: false,
      changeDateDialogVisible: false,
      changedPeopleNum: 0,
      changedDate: new Date(),
      bookDate: new Date,
      roomInfo: room1,
    }
  },
  methods: {
    handleSubmit(type){
      if(type===1){
      // 修改人数
      this.peopleNum = this.changedPeopleNum;
      this.changeNumDialogVisible = false;
      }
      else if(type===0){
        // 修改日期
        console.log(this.changedDate)
        this.changeDateDialogVisible = false;
        this.bookDate[0] = this.changedDate[0];
        this.bookDate[1] = this.changedDate[1];
      }
    },
    handleChangeNumOpen(){
      this.changeNumDialogVisible = true;
      this.changedPeopleNum = this.peopleNum;
      // console.log("hehe")
    },
    handleChangeDateOpen(){
      this.changeDateDialogVisible = true;
      this.changedDate[0] = this.$route.query.startDate;
      this.changedDate[1] = this.$route.query.endDate;
      // console.log(this.changedDate)
      console.log(this.roomInfo.unavailable);
    }
  },
  computed: {
    pickerOptions(){
      let that = this;
      return{
        disabledDate(time) {
          const today =new Date().toLocaleTimeString();
          // 禁用今天之前的日期
          let disable=time<new Date(today);
          // 禁用后端返回的禁止日期
          that.roomInfo.unavailable.forEach((item) =>　{
            disable =
                disable || (time.getTime() > new Date(item.startDate).getTime() -8.64e7 &&
                time.getTime() < new Date(item.endDate).getTime());
          });
          return disable;
        }
      }
    }
  },
  created() {
    this.changedDate[0]  = this.$route.query.startDate;
    this.bookDate[0] = this.$route.query.startDate;
    this.changedDate[1] = this.$route.query.endDate;
    this.bookDate[1] = this.$route.query.endDate;
    console.log(this.changedDate[0]);
  }
}
</script>

<style scoped>
.title{
  display: inline-block;
  float: left;
  margin-left: 10%;
  width: 100%;
}

.el-card>>>.el-card__header{
  padding: 0px !important;
  height:50px;
  margin: 8px;
}

.detail >>> .el-card__header{
  height: 150px;
}
</style>