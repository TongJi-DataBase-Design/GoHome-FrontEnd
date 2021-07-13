<template>
  <div>
    <el-row>
      <el-col :span="16"
        ><el-input v-model="input" placeholder="请输入内容"></el-input
      ></el-col>
      <el-col :span="3" :offset="1"
        ><el-button type="primary">搜索</el-button></el-col
      >
      <el-col :span="3"
        ><el-button type="primary" @click="getInfo"
          >添加周边信息</el-button
        ></el-col
      >
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe="true" style="width: 100%">
        <template slot="empty">
           <el-image src="https://ftp.bmp.ovh/imgs/2021/07/7adcb34eb3a4d222.png"></el-image>
           <p>现在没有周边信息哦~</p>
        </template>
        <el-table-column prop="nearbyId" label="周边信息ID" width="200">
        </el-table-column>
        <el-table-column prop="nearbyName" label="周边名称" width="200">
        </el-table-column>
        <el-table-column prop="nearbyType" label="周边类别" width="200">
        </el-table-column>
        <el-table-column prop="nearbyPop" label="周边热度" width="200">
        </el-table-column>
        <el-table-column prop="nearbyAdd" label="周边详细地址" width="250">
        </el-table-column>
        <el-table-column label="修改">
          <template slot-scope="scope">
            <el-button plain @click="modify(scope.row)">修改</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div class="block" style="center">
        <el-pagination layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>


<script>
import { allNear } from "@/api/admin";
export default {
  created:function(){
    allNear().then((response)=>{
      console.log(response);
    }).catch((error) => {
        this.$message({
          message: error,
          type: "warning",
        });
        return;})
  },
  data() {
    return {
      // tableData: [
      //   {
      //     nearbyId: "2016-05-02",
      //     nearbyName: "王小虎",
      //     nearbyType: "上海市普陀区金沙江路 1518 弄",
      //     nearbyPop: 11,
      //     nearbyAdd: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     nearbyId: "2016-05-02",
      //     nearbyName: "王小虎",
      //     nearbyType: "上海市普陀区金沙江路 1518 弄",
      //     nearbyPop: 12,
      //     nearbyAdd: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     nearbyId: "2016-05-02",
      //     nearbyName: "王小虎",
      //     nearbyType: "上海市普陀区金沙江路 1518 弄",
      //     nearbyPop: 13,
      //     nearbyAdd: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     nearbyId: "2016-05-02",
      //     nearbyName: "王小虎",
      //     nearbyType: "上海市普陀区金沙江路 1518 弄",
      //     nearbyPop: 14,
      //     nearbyAdd: "上海市普陀区金沙江路 1518 弄",
      //   },
      //   {
      //     nearbyId: "2016-05-02",
      //     nearbyName: "王小虎",
      //     nearbyType: "上海市普陀区金沙江路 1518 弄",
      //     nearbyPop: 15,
      //     nearbyAdd: "上海市普陀区金沙江路 1518 弄",
      //   },
      // ],
      tableData:[],
    };
  },
  methods: {
    getInfo: function () {
      this.$router.push("nearInformation");
    },
    modify: function (row) {
      this.$router.push({ name: "nearInfo", params: { nearby: row } });
    },
  },
};
</script>
