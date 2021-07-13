<template>
  <div>
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
            <div v-if="scope.row.state === 'warning'">
              <el-button :type="scope.row.state" plain disabled
                >未完成</el-button
              >
            </div>
            <div v-if="scope.row.state === 'danger'">
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
        <el-pagination layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </el-row>
  </div>
</template>

<style>
.el-pagination {
  text-align: center;
}
</style>

<style scoped>
.el-table {
  cursor: pointer;
}
</style>

<script>
import { allReport } from "@/api/admin";
export default {
  created: function () {
    // allReport()
    //   .then((response) => {
    //     console.log(response);
    //     this.tableData = [];
    //     for (let i = 0; i < response.data.reportList.length; i++) {
    //       let temp = {
    //         orderId: "",
    //         reporterId: "",
    //         stayId: "",
    //         state: "",
    //       };
    //       temp.orderId = response.data.reportList[i].stayId;
    //       temp.reporterId = response.data.reportList[i].hostId;
    //       temp.stayId = response.data.reportList[i].stayCity;
    //       temp.state = "danger";
    //       this.tableData.push(temp);
    //     }
    //   })
    //   .catch((error) => {
    //     this.$message({
    //       message: error,
    //       type: "warning",
    //     });
    //     console.log("error", error);
    //     return;
    //   });
  },
  data() {
    return {
      tableData: [],
    };
  },
  methods: {
    getInfo: function (row) {
      console.log(row);
      this.$router.push({
        name: "reportInfo",
        params: { orderId: row.orderId },
      });
    },
  },
};
</script>
