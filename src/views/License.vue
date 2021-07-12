<template>
    <div style="width: 90%;margin-left: 5%;">
        <div style="margin-bottom: 3%;width: 75%;margin-left: 12%;margin-top: 3%;">
            <el-divider>
              <strong style="font-size: xx-large;">归宿平台用户使用协议</strong>
            </el-divider>
        </div>
        
        <a style="text-align: right;display: block;">更新时间：2021年7月8日</a><br>
        <b style="text-align: left;display: block;">【首页及导言】</b>
        
        <a style="text-align: left;display: block;">
            《归宿平台用户使用协议》（以下简称“本协议”）是您与归宿平台之间关于使用
        归宿平台各项服务的法律协议。“归宿平台”是指哔归宿平台的开发小组同济大学软件学院数据库项目。
本协议中与您的权益（可能）存在重大关系的条款（包括免除归宿平台责任的条款、限制您权利的条款、争议解决条款及司法管辖条款等），
请您确保您在使用归宿平台服务前已仔细阅读、充分理解并毫无保留地接受本协议所有条款。
        </a>
        <b style="text-align: left;display: block;margin-top: 1%;">【顾客使用指南】</b>
        <el-table
        ref="singleTable"
        :data="tableData"
        highlight-current-row
        style="width: 80%;left: 10%;margin-top: 1%;">
        <el-table-column
        type="index"
        width="50">
        </el-table-column>
        <el-table-column
        property="mention"
        label="注意事项"
        width="120">
        </el-table-column>
        <el-table-column
        property="description"
        label="详述">
        </el-table-column>

    </el-table>
    <b style="text-align: left;display: block;margin-top: 1%;">【房东使用指南】</b>

      <a>在设置房源可用日期的时候，一定要仔细检查，防止出问题</a>    
      <el-date-picker
          v-model="value1"
          type="date"
          placeholder="选择日期"
          style="margin-left: 10%;">
    </el-date-picker>
    <div  style="text-align: left;margin-top: 1%;">
        更多详情，欢迎在使用过程中和我们交流!
        <i class="el-icon-goblet"></i>
        祝您使用愉快！
    </div>
</div>
</template>

<script>
export default{
    data(){
        return{
            tableData: [{
                mention:'注意网络',
                description:'请在连接WIFI的状态下进入本系统，不然您可能看到一大堆Connect Error'
            }, 
            {
                mention:'需要帮助',
                description:'请通过github讨论区和我们交流'
            },
            {
                mention:'安全第一',
                description:'在订购房源的时候一定要注意其周围环境，保护好自己'
            },
            {
                mention:'数据库学习',
                description:'如果在数据库学习方面有问题，欢迎和我们以及袁老师交流，共同进步'
            }
            ],
        currentRow: null
        }
    }
}
</script>