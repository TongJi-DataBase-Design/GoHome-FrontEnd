<template>
  <div class="reportInfo">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
    />
    <el-row :gutter="20">
      <el-form :label-position="right" label-width="80px">
        <el-form-item label="订单ID">
          <el-col :span="5">
            <el-input v-model="orderId" disabled></el-input>
          </el-col>
        </el-form-item>
        <el-form-item label="举报时间">
          <el-col :span="5">
            <el-input v-model="reportTime" disabled></el-input> </el-col
        ></el-form-item>
        <el-form-item label="举报原因">
          <el-col :span="10">
            <el-input v-model="reportReason" disabled></el-input> </el-col
        ></el-form-item>
      </el-form>
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column prop="hostId" label="房东ID" width="180">
        </el-table-column>
        <el-table-column prop="stayId" label="房源ID"> </el-table-column>
        <el-table-column prop="hostCre" label="房东信誉分"> </el-table-column>
        <el-table-column label="是否封禁">
          <template slot-scope="scope">
            <el-button
              ref="btn"
              :type="scope.row.state"
              @click="clickBan(scope.row)"
              >{{ ban }}</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="3" :offset="5">
        <el-button type="success" @click="complete">审核完毕</el-button>
      </el-col>
      <el-col :span="3" :offset="5">
        <el-button type="info" @click="save">返回</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.reportInfo {
  text-align: center;
}
.el-row {
  margin-bottom: 20px;
}
</style>

<script>
import { report, reportResult } from "@/api/admin";
export default {
  created: function () {
    let id = this.$route.params.orderId;
    this.orderId = id;
    report(id)
      .then((response) => {
        this.reportTime = response.data.reportTime;
        this.reportReason = reponse.data.reportReason;
        this.tableData.hostId = response.data.hostId;
        this.tableData.stayId = response.data.stayId;
        this.tableData.state = response.data.hostCredit;
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
      orderId: "",
      reportTime: "",
      reportReason: "",
      tableData: [
        {
          hostId: "",
          stayId: "",
          hostCre: "",
          state: "danger",
        },
      ],
    };
  },
  methods: {
    clickBan: function (info) {
      if (info.state == "danger") {
        info.state = "info";
        this.$refs.btn.$el.innerText = "取消封禁";
      } else {
        info.state = "danger";
        this.$refs.btn.$el.innerText = "封禁用户";
      }
    },
    complete: function () {
      this.$confirm("确定要提交审核结果吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "success",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "提交成功!",
          });
          let state = this.$refs.btn.$el.innerText;
          console.log(state);
          let ban = false;
          if(state=="取消封禁"){
            ban=true;
          }
          else{
            ban=false;
          }
          let param = {
            reportId: this.orderId,
            isBan: ban,
          };
          reportResult(param)
            .then((response) => {
              this.$router.replace("report");
            })
            .catch((error) => {
              this.$message({
                message: error,
                type: "warning",
              });
              return;
            });
        })
        .catch(() => {});
    },
  },
};
</script>
