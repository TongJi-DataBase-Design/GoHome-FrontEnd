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
export default {
  data() {
    return {
      tableData: [
        {
          orderId: "2016-05-02",
          reporterId: "王小虎",
          stayId: "上海市普陀区金沙江路 1518 弄",
          state: "success",
        },
        {
          orderId: "2016-05-02",
          reporterId: "王小虎",
          stayId: "上海市普陀区金沙江路 1518 弄",
          state: "warning",
        },
        {
          orderId: "2016-05-02",
          reporterId: "王小虎",
          stayId: "上海市普陀区金沙江路 1518 弄",
          state: "success",
        },
        {
          orderId: "2016-05-02",
          reporterId: "王小虎",
          stayId: "上海市普陀区金沙江路 1518 弄",
          state: "success",
        },
        {
          orderId: "2016-05-02",
          reporterId: "王小虎",
          stayId: "上海市普陀区金沙江路 1518 弄",
          state: "danger",
        },
      ],
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
