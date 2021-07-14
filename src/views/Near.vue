<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <el-row>
      <el-col :span="16"
        ><el-input v-model="search" placeholder="请输入内容"></el-input
      ></el-col>
      <el-col :span="3" :offset="1"
        ><el-button type="primary" plain @click="cliSearch"
          >搜索</el-button
        ></el-col
      >
      <el-col :span="3"
        ><el-button type="primary" @click="getInfo" plain
          >添加周边信息</el-button
        ></el-col
      >
    </el-row>
    <el-row>
      <el-table :data="tableData" stripe="true" style="width: 100%">
        <template slot="empty">
          <el-image
            src="https://ftp.bmp.ovh/imgs/2021/07/7adcb34eb3a4d222.png"
          ></el-image>
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
      <div class="block" align="center">
        <el-pagination
          layout="prev, pager, next"
          :total="totalPage"
          @current-change="changePage"
        >
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<style scoped>
.el-table {
  animation: fadeIn;
  animation-duration: 1s;
}
</style>

<script>
import { allNear, nearNum, searchNear } from "@/api/admin";
export default {
  created: function () {
    nearNum()
      .then((response) => {
        this.totalPage = response.data.totalNum;
      })
      .catch((error) => {
        this.$message({
          message: error,
          type: "warning",
        });
        return;
      });
    allNear()
      .then((response) => {
        this.showTable(response.data.nearbyList);
        // this.tableData = [];
        // for (let i = 0; i < data.length; i++) {
        //   let now = response.data.nearbyList;
        //   let temp = {
        //     nearbyId: "",
        //     nearbyName: "",
        //     nearbyType: "",
        //     nearbyPop: "",
        //     nearbyAdd: "",
        //   };
        //   temp.nearbyId = now[i].nearbyId;
        //   temp.nearbyName = now[i].nearbyName;
        //   temp.nearbyType = now[i].nearbyType;
        //   temp.nearbyPop = now[i].nearbyPopularity;
        //   temp.nearbyAdd = now[i].nearbyDetailedAdd;
        //   this.tableData.push(temp);
        // }
      })
      .catch((error) => {
        this.$message({
          message: error,
          type: "warning",
        });
        return;
      });
  },
  data() {
    return {
      totalPage: "",
      tableData: [],
      search: "",
    };
  },
  methods: {
    getInfo: function () {
      this.$router.push({
        name: "nearInfo",
        params: { isUpdate: true, nearbyId: "" },
      });
    },
    modify: function (row) {
      this.$router.push({
        name: "nearInfo",
        params: { isUpdate: false, nearby: row },
      });
    },
    cliSearch: function () {
      searchNear(this.search)
        .then((response) => {
          this.showTable(response.data.nearbyList);
          // this.tableData = [];
          // for (let i = 0; i < response.data.nearbyList.length; i++) {
          //   let now = response.data.nearbyList;
          //   let temp = {
          //     nearbyId: "",
          //     nearbyName: "",
          //     nearbyType: "",
          //     nearbyPop: "",
          //     nearbyAdd: "",
          //   };
          //   temp.nearbyId = now[i].nearbyId;
          //   temp.nearbyName = now[i].nearbyName;
          //   temp.nearbyType = now[i].nearbyType;
          //   temp.nearbyPop = now[i].nearbyPopularity;
          //   temp.nearbyAdd = now[i].nearbyDetailedAdd;
          //   this.tableData.push(temp);
          //}
        })
        .catch((error) => {
          this.$message({
            message: error,
            type: "warning",
          });
          return;
        });
    },
    showTable: function (data) {
      this.tableData = [];
      for (let i = 0; i < data.length; i++) {
        let temp = {
          nearbyId: "",
          nearbyName: "",
          nearbyType: "",
          nearbyPop: "",
          nearbyAdd: "",
        };
        temp.nearbyId = data[i].nearbyId;
        temp.nearbyName = data[i].nearbyName;
        temp.nearbyType = data[i].nearbyType;
        temp.nearbyPop = data[i].nearbyPopularity;
        temp.nearbyAdd = data[i].nearbyDetailedAdd;
        this.tableData.push(temp);
      }
    },
  },
};
</script>
