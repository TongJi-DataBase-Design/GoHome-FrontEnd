<template>
  <div>
    <div id="header">
      <div
        style="display: inline-block;  margin-left: 40px"
      >
        icon
      </div>
      <h2 style="display: inline-block; margin-left: 40px">房源和房客</h2>
    </div>
    <el-progress
      :show-text="false"
      type="line"
      :stroke-width="20"
      :percentage="20"
      color="blue"
    ></el-progress>

    <div id="mymain">
      <div id="workspace" >
        <el-alert
            style="padding: 20px 10px 20px 150px;width:600px;height:50px"
            v-show="show" 
            type="warning"
        title="请选择一种类型！"
        :closable="false"
        show-icon >
        </el-alert>
        
        <h1 style="margin-bottom: 50px">您打算出租的是什么类型的房子</h1>
        <h2>房源类型</h2>
        <el-radio-group v-model="stayType" size="medium">
        <el-row v-for="r in rowNums" :key="r" :gutter="20">
          <el-col :span="6"
            ><el-radio-button  :ref="rowItems * (r - 1)"  style="width:120px" :label="typeList[rowItems * (r - 1)]">
            </el-radio-button></el-col
          >
          <el-col :span="6"
            ><el-radio-button :ref="rowItems * (r - 1)+1" v-if="rowItems * (r - 1) + 1<typeList.length" :label="typeList[rowItems * (r - 1) + 1]" style="width:120px">
            </el-radio-button></el-col
          >
          <el-col :span="6"
            ><el-radio-button :ref="rowItems * (r - 1)+2" v-if="rowItems * (r - 1) + 2<typeList.length" :label="typeList[rowItems * (r - 1) + 2]"  style="width:120px">
            </el-radio-button></el-col
          >
          <el-col :span="6"
            ><el-radio-button  :ref="rowItems * (r - 1)+3" v-if="rowItems * (r - 1)+3 <typeList.length" :label="typeList[rowItems * (r - 1)+ 3]" style="width:120px">
            </el-radio-button></el-col
          >
        </el-row>
        </el-radio-group>
      </div>

      <div style="display:inline-block;">
        <el-card id="help" class="box-card">
          <i class="el-icon-s-opportunity" style="font-size:2em;color:orange"></i>
          <h3>选择房源类别</h3>
          <p>
            选择准确的房源类别有助于房客了解隐私保障程度、住房风格和服务水平。
          </p>
        </el-card>
      </div>

      <div style="border-top:1px solid #000;background-color:white" id="footer">
        <el-button type="text" style="margin-top:10px;color:#63aaf1;font-weight:bolder" @click="backPage">返回</el-button>
        <el-button style="margin-top:10px;color:white;float:right;display:inline-block;margin-right:10px;background-color:#63aaf1" @click="nextPage">下一个</el-button>
      </div>
    </div>

    


  </div>
</template>

<style >
#header {
  text-align: left;
  height: 60px;
  background-color: white;
}

#help{
  width:300px;
  height:300px;
  margin-top:30%;
  text-align: left;
  color: #909399;
}

#workspace{
  text-align: left;
  display: inline-block;
  float:left;
  padding: 20px 10px 20px 150px;
  background-color: white;
  width: 600px;
  height: 480px;
  margin-left:0;
     overflow:auto;

}

#footer {
  float:left;
  display: absolute;
  padding: 0 10px 0 150px;
  background-color: white;
  width: 600px;
  height: 80px;
  text-align: left;
}

#mymain {
  height: 600px;
  right: 0 !important;
  background-color: #b2d2f1;
}

.el-row {
  margin-bottom: 20px;
}

.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}

.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}

.el-divider {
    background-color: black;
    position: absolute;
    width:600px;
    bottom:10px
}
</style>

<script>
export default {
  data: function () {
    return {
      rowItems: 4, // 每行放置按钮数量
      typeList: ['a','b','c','d','e','f','g'], // 房源类型列表（db获取）
      stayType:'', // 此房源类型

      show:false,
    };
  },

  mounted(){
    // 若浏览器已存储信息
    if(localStorage.getItem('typeList')){
      try {
        console.log('从浏览器获取房源类型列表');
        this.typeList = JSON.parse(localStorage.getItem('typeList'));
      } catch(e) {
        localStorage.removeItem('typeList');
      }
    }
    else{
      //@todo 调用api获取房源类型信息并存储到本地
      console.log('数据库加载房源类型列表');
    }

    if(localStorage.getItem('stayType')){
      try {
        console.log('从浏览器获取房源类型');
        this.stayType = JSON.parse(localStorage.getItem('stayType'));
        //@todo 初始化对应按钮被选中
      } catch(e) {
        console.log(e);
        localStorage.removeItem('stayType');
      }
    }
  },

  
  computed: {
    rowNums: function () {
      return Math.ceil(this.typeList.length / this.rowItems);
    },
  },

  methods:{
    nextPage:function(){
      if(!this.stayType){
        console.log('未选择类型！');
        this.show=true;
        return ;
      }

      const parsed = JSON.stringify(this.stayType);
      localStorage.setItem('stayType', parsed);
      this.$router.push('/become-a-host/roomInfo');
    },

    backPage(){
      this.$router.go(-1);
    }
  }
};
</script>
