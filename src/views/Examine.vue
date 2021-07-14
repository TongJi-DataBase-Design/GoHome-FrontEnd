<template>
  <div>
    <el-row>
      <el-table
        :data="tableData"
        stripe="true"
        style="width: 100%"
        @row-dblclick="getInfo"
      >
        <template slot="empty">
          <el-image
            src="https://ftp.bmp.ovh/imgs/2021/07/7adcb34eb3a4d222.png"
          ></el-image>
          <p>现在没有需要审核的房源哦~</p>
        </template>
        <el-table-column prop="stayId" label="房源ID" width="250">
        </el-table-column>
        <el-table-column prop="hostId" label="房主ID" width="250">
        </el-table-column>
        <el-table-column prop="stayCity" label="房源城市" width="250">
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
import { allStay, stayNum } from "@/api/admin";

export default {
  created: function () {
    stayNum()
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
    allStay()
      .then((response) => {
        this.tableData = [];
        for (let i = 0; i < response.data.examineStayList.length; i++) {
          let temp = {
            stayId: "",
            hostId: "",
            stayCity: "",
            state: "",
          };
          temp.stayId = response.data.examineStayList[i].stayId;
          temp.hostId = response.data.examineStayList[i].hostId;
          temp.stayCity = response.data.examineStayList[i].stayCity;
          temp.state = "danger";
          this.tableData.push(temp);
        }
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
      tableData: [],
      totalPage: 0,
    };
  },
  methods: {
    getInfo: function (row) {
      this.$router.push({
        name: "examineInfo",
        params: { stayId: row.stayId },
      });
    },
    showTable: function (data) {
      this.tableData = [];
      for (let i = 0; i < data.length; i++) {
        let temp = {
          stayId: "",
          hostId: "",
          stayCity: "",
          state: "",
        };
        temp.stayId = data[i].stayId;
        temp.hostId = data[i].hostId;
        temp.stayCity = data[i].stayCity;
        temp.state = "danger";
        this.tableData.push(temp);
      }
    },
    changePage: function (curPage) {
      allStay(curPage)
        .then((response) => {
          this.tableData = [];
          for (let i = 0; i < response.data.examineStayList.length; i++) {
            let temp = {
              stayId: "",
              hostId: "",
              stayCity: "",
              state: "",
            };
            temp.stayId = response.data.examineStayList[i].stayId;
            temp.hostId = response.data.examineStayList[i].hostId;
            temp.stayCity = response.data.examineStayList[i].stayCity;
            temp.state = "danger";
            this.tableData.push(temp);
          }
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
