<template>
  <div>
    <!--页头-->
    <div id="header">
      <div style="display: inline-block; margin-left: 40px">icon</div>
      <h2 style="display: inline-block; margin-left: 40px">房源和房客</h2>
    </div>

    <!--进度条-->
    <el-progress
      :show-text="false"
      :stroke-width="20"
      :percentage="29"
    ></el-progress>

    <!--主体部分-->
    <div id="mymain">
      <!--主功能区-->
      <div id="workspace">
        <h2 style="margin-bottom: 20px">您的房源可以住几位房客？</h2>
        <i style="display:inline-block;font-size:1.4em;color:#0f68ba" class="iconfont icon-tixing"></i>
        <p style="display:inline-block;margin-left:5px">请确保您准备了足够的床位，让所有房客都能舒适入住。</p>
        <div id="input-number" style="margin-top:20px">
            <strong style="margin-right:20px">最多可容纳房客人数</strong>
            <el-input-number size="small" v-model="maxTenantNum"  :min="1"  label="最多可容纳房客人数"></el-input-number>
        </div>

        <div id="drop-down-menu" style="margin-top:20px">
            <strong style="margin-right:20px">有几个卧室？</strong>
            <el-input-number v-model="temp"  @change="handleCommand" size="small" :min="1" :max="maxTenantNum" label="卧室数量"></el-input-number>
        </div>

        

        <div style="margin-top:30px">
            <i style="display:inline-block;font-size:1.4em;color:#1296db" class="iconfont icon-jiajiabaojie-tubiao-"></i>
            <strong>
            <p style="display:inline-block;margin-left:5px">房间信息</p>
            </strong>
            <el-collapse >
                <el-collapse-item v-for="r in roomNum" :key="r" :title="'卧室   '+r" >                    
                    <!--房间面积-->
                    <div>
                        <strong style="margin-right:20px">面积</strong>
                        <el-input  type="text"  :id="r"  v-model="roomInfo[r-1]['roomArea']" oninput="value=value.replace(/[^0-9.]/g,'')" size="small" placeholder="面积">
                            <i slot="suffix" >m2</i>
                        </el-input>
                        
                    </div>

                    <!--房间价格-->
                    <div>
                        <strong style="margin-right:20px">价格</strong>
                        <el-input  :id="r"  v-model="roomInfo[r-1]['price']" oninput="value=value.replace(/[^0-9.]/g,'')" size="small" placeholder="价格">
                        <i slot="suffix" class="iconfont icon-renminbi"></i>
                        </el-input>
                    </div>

                    <!--房间卫生间数量-->
                    <div id="input-number" style="margin-top:20px;margin-bottom:20px">
                        <i style="display:inline-block;font-size:1.2em;color:#62C4E6" class="iconfont icon-xilian"></i>
                        <strong style="display:inline-block;margin-left:5px;margin-right:20px">卫生间数量</strong>
                        <el-input-number :id="r" v-model="roomInfo[r-1]['bathNum']"  :min="0" :max="10"  size="small" ></el-input-number>
                    </div>

                    <!---床型信息-->
                    <div> 
                        <i style="display:inline-block;font-size:1.2em;color:#2D6179" class="iconfont icon-icon-test"></i>
                        <strong style="display:inline-block;margin-left:5px;">床型</strong>
                        <el-row :gutter="20">
                            <el-col :span="6">
                                <small>1米宽单人床</small>
                                <el-input-number size="small" v-model="roomInfo[r-1]['bedTypes']['1米宽单人床']" :min="0" :max="10"></el-input-number>
                            </el-col>    
                            <el-col :span="6">
                                <small style="margin-right:10px" >1.4米宽双人床</small>
                                <el-input-number size="small" v-model="roomInfo[r-1]['bedTypes']['1.4米宽双人床']" :min="0" :max="10"></el-input-number>
                            </el-col>  
                            <el-col :span="6">
                                <small style="margin-right:20px">1.8米宽双人床</small>
                                <el-input-number size="small" v-model="roomInfo[r-1]['bedTypes']['1.8米宽双人床']" :min="0" :max="10"></el-input-number>
                            </el-col>  
                        </el-row>        
                        <el-row :gutter="20" style="margin-top:2%">
                            <el-col :span="6">
                                
                                <small >婴儿床</small>
                                <el-input-number size="small" v-model="roomInfo[r-1]['bedTypes']['婴儿床']" :min="0" :max="10"></el-input-number>
                                
                            </el-col>    
                            <el-col :span="6">
                                <small style="margin-right:10px" >吊床</small>
                                <el-input-number size="small" v-model="roomInfo[r-1]['bedTypes']['吊床']" :min="0" :max="10"></el-input-number>
                            </el-col>  
                            <el-col :span="6">
                                <small style="margin-right:20px">地板床</small>
                                <el-input-number size="small" v-model="roomInfo[r-1]['bedTypes']['地板床']" :min="0" :max="10"></el-input-number>
                            </el-col>  
                        </el-row>                                     
                    </div>

                </el-collapse-item>
            </el-collapse>
            
        </div>

      </div>

      <div style="display:inline-block;">
        <el-card id="help" class="box-card">
          <i class="el-icon-s-opportunity" style="font-size:2em;color:orange"></i>
          <h3>填写房间信息</h3>
          <p>
            精确详细地填写房间信息，能让房客对房源有更清晰的认知。
          </p>
        </el-card>
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
@import "https:////at.alicdn.com/t/font_2665282_l5ecvxo8w5r.css";

#header {
  text-align: left;
  height: 60px;
  background-color: white;
}

#workspace {
  display: inline-block;
  float:left;
  padding: 20px 10px 20px 150px;
  background-color: white;
  width: 600px;
  height: 480px;
  text-align: left;
   overflow:auto;
}


div::-webkit-scrollbar {
  width: 0;
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

#help{
  width:300px;
  height:300px;
  margin-top:30%;
  text-align: left;
  color: #909399;
}

#mymain {
  height: 600px;
  right: 0 !important;
  background-color: #b2d2f1;
}

#input{
    display: inline-block !important;
    width:50% !important;
}

</style >

<script>
export default{
    data:function(){
        return {
            maxTenantNum:1, // 最多可容纳房客数
            roomNum:1, //卧室数量
            temp:1, //暂存卧室数量

            bedTypes:[
                '1米宽单人床',
                '1.4米宽双人床',
                '1.8米宽双人床',
                '婴儿床',
                '吊床',
                '地板床'
            ], //所有床型 
            roomInfo:[{'bedTypes':{'1米宽单人床':0,'1.4米宽双人床':0,'1.8米宽双人床':0,'婴儿床':0,'吊床':0,'地板床':0},'roomArea':0,'bathNum':0,'price':0}] , //该房源各房间信息
        }
    },

    mounted(){
        if(localStorage.getItem('maxTenantNum')){
            try {
                console.log('从浏览器获取房客数');
                this.maxTenantNum = JSON.parse(localStorage.getItem('maxTenantNum'));
            } catch(e) {
                localStorage.removeItem('maxTenantNum');
            }
        }

        if(localStorage.getItem('roomNum')){
            try{
                console.log('从浏览器获取卧室数');
                this.roomNum=JSON.parse(localStorage.getItem('roomNum'));
                this.temp=this.roomNum;
            }
            catch(e){
                localStorage.removeItem('roomNum');
            }
        }

        if(localStorage.getItem('roomInfo')){
            try{
                console.log('从浏览器获取房间信息');
                this.roomInfo=JSON.parse(localStorage.getItem('roomInfo'));
            }
            catch(e){
                localStorage.removeItem('roomInfo');
            }
        }
    },

    computed:{
        // 该房源床的数量
        bedNum:function(){
            let n=0;
            for(let i=0;i<this.roomNum;i++){
                for(let index in this.roomInfo[i].bedTypes){
                    n+=this.roomInfo[i].bedTypes[index];
                }
            }
            return n;
        }
    },

    methods:{
        handleCommand:function(command) {
            console.log(this)
            if (command>this.roomNum){
                console.log('卧室数量+1');
                this.roomInfo.push({'bedTypes':{'1米宽单人床':0,'1.4米宽双人床':0,'1.8米宽双人床':0,'婴儿床':0,'吊床':0,'地板床':0},'roomArea':0,'bathNum':0,'price':0});
            }
            else{
                console.log('卧室数量-1');
                this.roomInfo.pop();
            }
        this.roomNum=command;
        console.log('卧室数量：',command);
        console.log('新的卧室添加成功：',this.roomInfo)
      },

        /* addNewBed:function(command,id){
            console.log('添加新床型的id为:',command);
            if (this.roomInfo[id-1]['bedTypes'][command]!=undefined){
                console.log('床型已存在！')
                return ;
            }
            this.hasBedTypes[id-1].push(command);
            this.roomInfo[id-1]['bedTypes'][command]=0;
            console.log(this.roomInfo[id-1]['bedTypes']);
        }, */

        /* changeBedNums:function(val,roomId,id){
            this.roomInfo[roomId-1]['bedTypes'][id]=val;
            console.log(this.roomInfo[roomId-1]['bedTypes'])
        }, */

        nextPage:function(){
            const parsed = JSON.stringify(this.maxTenantNum);
            localStorage.setItem('maxTenantNum', parsed);

            const parsed1 = JSON.stringify(this.roomNum);
            localStorage.setItem('roomNum', parsed1);

            const parsed2 = JSON.stringify(this.roomInfo);
            localStorage.setItem('roomInfo', parsed2);

            const parsed3=JSON.stringify(this.bedNum);
            localStorage.setItem('bedNum',parsed3);

            this.$router.push('/become-a-host/facilityInfo');
        },

        backPage:function(){
            this.$router.push('/become-a-host/type');
        },       
    }
}
</script>
