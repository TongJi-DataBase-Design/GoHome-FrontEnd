<template>
  <div>
    <el-row>
      <el-table
        :data="tableData"
        stripe="true"
        style="width: 100%"
        @row-dblclick="getInfo"
      >
        <el-table-column prop="stayId" label="房源ID" width="250">
        </el-table-column>
        <el-table-column prop="hostId" label="房主ID" width="250">
        </el-table-column>
        <el-table-column prop="hostCity" label="房源城市" width="250">
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
        <el-pagination layout="prev, pager, next" :total="totalPage">
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
import {allStay} from '@/api/examine'

export default {
  created:function(){
    allStay(0).then(response=>{
      console.log(response.data);
    }).catch((error)=>{
      this.$message({
            message: error,
            type: 'warning'
          });
        console.log('error',error)
        return;
    })
  },
  data() {
    return {
      tableData: [
        {
          stayId: "123456",
          hostId: "546123",
          hostCity: "上海市",
          state: "success",
        },
        {
          stayId: "123456",
          hostId: "546123",
          hostCity: "上海市",
          state: "warning",
        },
        {
          stayId: "123456",
          hostId: "546123",
          hostCity: "上海市",
          state: "danger",
        },
        {
          stayId: "123456",
          hostId: "245we",
          hostCity: "上海市",
          state: "warning",
        },
        {
          stayId: "123456",
          hostId: "12423",
          hostCity: "上海市",
          state: "warning",
        },
      ],
      totalPage: 1000,
    };
  },
  methods: {
    getInfo: function (row) {
      this.$router.push({
        name: "examineInfo",
        params: { stayId: row.stayId },
      });
    },
  },
};
</script>
