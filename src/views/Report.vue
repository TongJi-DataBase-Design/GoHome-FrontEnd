<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <el-row>
      <el-table
        :data="tableData"
        stripe="true"
        highlight-current-row="true"
        style="width: 100%"
        @row-dblclick="getInfo"
      >
        <template slot="empty">
          <el-image
            src="https://ftp.bmp.ovh/imgs/2021/07/7adcb34eb3a4d222.png"
          ></el-image>
          <p>现在没有需要审核的用户举报哦~</p>
        </template>
        <el-table-column prop="orderId" label="订单ID" width="250">
        </el-table-column>
        <el-table-column prop="reporterId" label="举报人ID" width="250">
        </el-table-column>
        <el-table-column prop="stayId" label="举报房源ID" width="250">
        </el-table-column>
        <el-table-column prop="state" label="活动状态">
          <template slot-scope="scope">
            <div v-if="scope.row.state === 'success'">
              <el-button :type="scope.row.state" plain disabled
                >已通过</el-button
              >
            </div>
            <div v-else-if="scope.row.state === 'warning'">
              <el-button :type="scope.row.state" plain disabled
                >未完成</el-button
              >
            </div>
            <div v-else-if="scope.row.state === 'danger'">
              <el-button :type="scope.row.state" plain disabled
                >未审核</el-button
              >
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <div class="block" style="center">
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
.el-pagination {
  text-align: center;
}
.el-table {
  cursor: pointer;
  animation: fadeIn;
  animation-duration: 1s;
}
</style>

<script>
import { allReport, reportNum } from "@/api/admin";
export default {
  created: function () {
    reportNum()
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
    allReport()
      .then((response) => {
        this.showTable(response.data.reportList);
        // this.tableData = [];
        // for (let i = 0; i < response.data.reportList.length; i++) {
        //   let temp = {
        //     orderId: "",
        //     reporterId: "",
        //     stayId: "",
        //     state: "",
        //   };
        //   temp.orderId = response.data.reportList[i].reportId;
        //   temp.reporterId = response.data.reportList[i].reporterId;
        //   temp.stayId = response.data.reportList[i].stayId;
        //   temp.state = "danger";
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
    };
  },
  methods: {
    getInfo: function (row) {
      this.$router.push({
        name: "reportInfo",
        params: { orderId: row.orderId },
      });
    },
    showTable: function (data) {
      this.tableData = [];
      for (let i = 0; i < data.length; i++) {
        let temp = {
          orderId: "",
          reporterId: "",
          stayId: "",
          state: "",
        };
        temp.orderId = data[i].reportId;
        temp.reporterId = data[i].reporterId;
        temp.stayId = data[i].stayId;
        temp.state = "danger";
        this.tableData.push(temp);
      }
    },
    changePage: function (curPage) {
      allReport(curPage)
        .then((response) => {
          this.showTable(response.data.reportList);
        })
        .catch((error) => {
          this.$message({
            message: error,
            type: "warning",
          });
          return;
        });
    },
  },
};
</script>
