<template>
  <div>
    <!--页头-->
    <div id="header">
      <div style="display:inline-block;background-image:red;margin-left:40px">icon</div>        
      <h2 style="display:inline-block;margin-left:40px">section title</h2>
    </div>
    <!--进度条-->
    <el-progress
      :show-text="false"
      :stroke-width="20"
      :percentage="20"
    ></el-progress>

    <!--主体部分-->
        <div id="mymain" >
      <!--主功能区-->
      <div id="workspace">
          <el-alert
            style="padding: 20px 10px 20px 150px;width:600px;height:50px"
            v-show="show" 
        @close="close"
        title="需要填写以下内容才能继续"
        type="warning"
        show-icon >
        </el-alert>
        <h1>你的房源位于什么地方？</h1>

        <!--省市区-->
        <div id="province" style="margin-top:5%">
            <small style="display:block; margin-bottom:10px">省市区</small>
            <el-autocomplete
                class="inline-input"
                v-model="prov"
                :fetch-suggestions="querySearch"
                placeholder="请输入内容"
                @select="handleSelect"
            ></el-autocomplete>
        </div>

        <!--详细地址--->
        <div id="detailAddr" style="margin-top:5%">
            <small style="display:block; margin-bottom:10px">详细地址(必填)</small>
            <el-input v-model="road" style="width:50%" placeholder="详细地址"></el-input>
            <small style="display:block;color:#778899">具体到小区名称或房源所在的街道名称及编号，例如「津塘路 2 号」或「嘉华小区」</small>
        </div>

        <!--单元楼--->
        <div id="detailAddr" style="margin-top:5%">
            <small style="display:block; margin-bottom:10px">楼号、单元号及房号（必填）</small>
            <el-input v-model="floor" style="width:50%" placeholder="楼号、单元号及房号"></el-input>
            <small style="display:block;color:#778899">例如「 1 号楼 1 单元 1201 室」</small>
        </div>

      </div>

      <!--页尾-->
      <div style="border-top:1px solid #000;" id="footer">
        <el-button type="text" style="margin-top:10px;color:#63aaf1;font-weight:bolder" @click="backPage">返回</el-button>
        <el-button style="margin-top:10px;color:white;float:right;display:inline-block;margin-right:10px;background-color:#63aaf1" @click="nextPage">下一个</el-button>
      </div>
    </div>

  </div>
</template>

<style scoped>
#header {
  text-align: left;
  height: 60px;
  background-color: white;
}

#workspace {
  display: absolute;
  padding: 20px 10px 20px 150px;
  background-color: white;
  width: 600px;
  height: 480px;
  text-align: left;
}
#footer {
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
</style>

<script>
export default {
    data:function(){
        return {
            provinces:[], // 省市列表
            prov:'', //房源所处省市区 一级
            road:'', //二级
            floor:'', //三级

            show:false, // 提示信息
        }
    },

    methods: {
      querySearch(queryString, cb) {
        let provs = this.provinces;
        let results = queryString ? provs.filter(this.createFilter(queryString)) : provs;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (provs) => {
          return (provs.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        // @todo 需要中国省市区json文件
        return [
          { "value": "三全鲜食（北新泾店）", "address": "长宁区新渔路144号" },
          { "value": "Hot honey 首尔炸鸡（仙霞路）", "address": "上海市长宁区淞虹路661号" },
          { "value": "新旺角茶餐厅", "address": "上海市普陀区真北路988号创邑金沙谷6号楼113" },
          { "value": "泷千家(天山西路店)", "address": "天山西路438号" },
          { "value": "胖仙女纸杯蛋糕（上海凌空店）", "address": "上海市长宁区金钟路968号1幢18号楼一层商铺18-101" },
          { "value": "贡茶", "address": "上海市长宁区金钟路633号" },
          { "value": "豪大大香鸡排超级奶爸", "address": "上海市嘉定区曹安公路曹安路1685号" },
          { "value": "茶芝兰（奶茶，手抓饼）", "address": "上海市普陀区同普路1435号" },
          { "value": "十二泷町", "address": "上海市北翟路1444弄81号B幢-107" },
          { "value": "星移浓缩咖啡", "address": "上海市嘉定区新郁路817号" },
          { "value": "阿姨奶茶/豪大大", "address": "嘉定区曹安路1611号" },
          { "value": "新麦甜四季甜品炸鸡", "address": "嘉定区曹安公路2383弄55号" },
          { "value": "Monica摩托主题咖啡店", "address": "嘉定区江桥镇曹安公路2409号1F，2383弄62号1F" },
          { "value": "浮生若茶（凌空soho店）", "address": "上海长宁区金钟路968号9号楼地下一层" },
          { "value": "NONO JUICE  鲜榨果汁", "address": "上海市长宁区天山西路119号" },
          { "value": "CoCo都可(北新泾店）", "address": "上海市长宁区仙霞西路" },
 
        ];
      },
      handleSelect(item) {
        console.log(item);
      },

      close:function(){
        this.show=false;
    },

    nextPage:function(){
        console.log(this.prov);
        if(this.prov==''|this.road==''|this.floor==''){
            console.log('信息不完整！');
            this.show=true;
            return ;
        }
        else{
          const parsed = JSON.stringify(this.prov);
          localStorage.setItem('prov', parsed);
            
          const parsed2 = JSON.stringify(this.road);
          localStorage.setItem('road', parsed2);

          const parsed3 = JSON.stringify(this.floor);
          localStorage.setItem('floor', parsed3);
            
          this.$router.push('/become-a-host/addrSucc');
        }
    },

    backPage:function(){
      this.$router.go(-1);
    }
    },
    mounted() {
      this.provinces = this.loadAll();

      if(localStorage.getItem('prov')){
        try{
          console.log('prov');
          this.prov=localStorage.getItem('prov');
        }catch(e){
          localStorage.removeItem('prov');
        }
      }

      if(localStorage.getItem('road')){
        try{
          console.log('road');
          this.road=localStorage.getItem('road');
        }catch(e){
          localStorage.removeItem('road');
        }
      }

      if(localStorage.getItem('floor')){
        try{
          console.log('floor');
          this.floor=localStorage.getItem('floor');
        }catch(e){
          localStorage.removeItem('floor');
        }
      }
    },

    
}
</script>