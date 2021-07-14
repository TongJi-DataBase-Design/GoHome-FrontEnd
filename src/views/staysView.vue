<template>
  <div class="staysView">
    <el-container>
  
      <el-container>
        <el-aside style="width : 50%">        
          <el-container>
            <el-header style="padding: 20px;">
               <el-select v-model="selectMethod" placeholder="请选择" style="margin-right:15px;" class="dialogInput">
                  <el-option
                    v-for="(item,index) in options"
                    :key="index"
                    :label="item.label"
                    :value="item.value">
                  </el-option>
                </el-select>
                <el-button icon="el-icon-refresh" circle @click="selectClick()"></el-button>
            </el-header>
            <el-main>
              <!--对比隐藏的弹窗界面-->
              <compareDialog 
              v-bind:dialogVisible="compareDialogVisible"
              :stayPhoto1="stayPhoto1"
              :stayPhoto2="stayPhoto2"
              :stayScore1="stayScore1"
              :stayScore2="stayScore2"
              :stayName1="stayName1"
              :stayName2="stayName2"
              :stayDescribe1="stayDescribe1"
              :stayDescribe2="stayDescribe2"
              :stayPrice1="stayPrice1"
              :stayPrice2="stayPrice2"
              @closeCompareDialog="closeCompareDialog" 
              ></compareDialog>
              <!--收藏隐藏的弹窗界面-->
              <CollectionDialog 
              v-bind:dialogVisible="dialogVisible" 
              :stayID="curStayID"
                @insertFavorite="finishInserted"></CollectionDialog>
              <!--房源卡片信息-->
              <div v-for="(stay,index) in showStays" :key="index">
                <BuildingCard
                v-bind:stayID="stay.stayID" :stayName="stay.stayName" :stayDescribe="stay.stayDescribe"
                :stayLabels="stay.stayLabels" :stayPrice="stay.stayPrice" :stayPhotos="stay.stayPhotos"
                :hostAvatar="stay.hostAvatar" :stayCommentNum="stay.stayCommentNum" :stayScore="stay.stayScore"
                :stayPosition="stay.stayPosition" 
                :isLike="stay.isLike" 
                :isCompared="stay.isCompared"
                :dialogVisible="dialogVisible"
                @changeDialogVisible="changeDialogVisible" 
                @changeLike="changeLike" 
                @getCurrentStay="getCurrentStay"
                
                @addCurCompareID="addCurCompareID"
                @removeCurCompareID="removeCurCompareID"
                ></BuildingCard>
              </div>             
            </el-main>
            <el-footer>
              <el-pagination
                layout="prev, pager, next"
                :total="totalStays" :page-size="pageSize" @current-change="currentChangeHandle" :current-page="currentPage">
              </el-pagination>
            </el-footer>
          </el-container>
        </el-aside>
        <el-main id="mapContainer" style="position:fixed; right:10px">
          <BuildingMap ref="StayMap" v-bind:centerPosition="centerPosition" :loadingOK="loadingOK"
          @changeDialogVisible="changeDialogVisible" @changeLike="changeLike" @getCurrentStay="getCurrentStay"
          @changeCard="updateStaysView"></BuildingMap>
        </el-main> 
      </el-container>
     
      
    </el-container>

    
  </div>
</template>

<script>
// @ is an alias to /src
import BuildingCard from '@/components/buildingCard.vue'
import BuildingMap from '@/components/buildingMap.vue'
import CollectionDialog from '@/components/collectionDialog.vue'
import compareDialog from '@/components/compareDialog.vue'

import {GetDetailedStay,GetStaysByName} from '@/api/staysView.js'

export default {
   
  name: 'staysView',
  components: {
    BuildingCard,
    BuildingMap,
    CollectionDialog,
    compareDialog
  },
  data(){
    return{

      centerPosition:[121.473701,31.230416], //中心坐标
      stays:[],  //当前搜索结果下的stays数据
      showStays:[], //用于展示的stays数据
      totalStays:0, //总计房源数量
      pageSize:5, //每个页面承载的房源数量
      currentPage:1, //当前页面
      dialogVisible:false, //收藏弹窗是否显示
      curStayID:-1, //当前收藏弹窗下的房源ID

      compareDialogVisible:false,//对比弹窗是否展示
      curCompareID:[],//当前被对比的房源ID
      stayScore1:0,
      stayScore2:0,
      stayName1:'待加载',
      stayName2:'待加载',
      stayDescribe1:'待加载',
      stayDescribe2:'待加载',
      stayPrice1:0,
      stayPrice2:0,
      stayPhoto1:[],
      stayPhoto2:[],


      options: [{
          value: '1',
          label: '价格降序'
        }, {
          value: '2',
          label: '价格升序'
        }, {
          value: '3',
          label: '评分降序'
        }, {
          value: '4',
          label: '评分升序'
        }, {
          value: '5',
          label: '评论数降序'
        }],
      selectMethod:'',
      loadingOK:false
    };
  },
  methods: {
      //-------------------------------------------搜索与地图定位部分代码--------------------
      //创建View页面时候通过参数，然后加载数据与点;

      //更新markerGroup导致的左边房源卡片的更新操作;
      updateStaysView(){
        
        this.loadStaysByPos();
        setTimeout(()=>{       
          console.log(this.totalStays);
          this.totalStays=this.stays.length
          this.loadShowStaysView();
        },1000)                 
      },

      //根据路由跳转选择不同的获得房源数据的信息
      loadStaysView() {
        
        let text=this.$route.query.searchText;
        if(typeof(text) == "undefined"){
          text="上海";
        }
        let state=this.$route.query.searchValue;
        if(typeof(state) == "undefined"){
          state="2";
        }
        if(state=="2"){ //当前搜索的方式通过地址
          //更换中心坐标;
          this.getPosition(text);

          //根据中心坐标处理卡片信息;
          this.loadStaysByPos();       
          setTimeout(() => {             
            this.totalStays=this.stays.length;
          }, 100);
        }
        else{           //当前搜索的方式是通过名称
          //调用API 通过给出搜索词，然后对比房源名称的字串与这个
          this.loadStaysByName(text); 
          setTimeout(() => {             
            this.totalStays=this.stays.length;
          }, 100);    
        }
        //加载显示的房源数据
        setTimeout(() => {             
            this.loadShowStaysView();
        }, 100);         
      },


      //根据当前页码指示来加载展示房源信息
      loadShowStaysView(){
        let start=(this.currentPage-1)*this.pageSize;
        let end=start+this.pageSize;
        this.showStays=this.stays.slice(start,end);
      },


      //在加载数据的过程中，页码发生变化时，做的相应处理
      currentChangeHandle:function(val){
        this.currentPage=val;
        this.loadShowStaysView();
      },


      //输入地址描述，编码设置相应的地图中心的地理经纬信息
      getPosition(address){
        
        let self=this;
        AMap.plugin(' AMap.Geocoder', function() {
          var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city:'全国'
          })
          geocoder.getLocation(address , function(status, result) {
            if (status === 'complete' && result.info === 'OK') {

              let c=result.geocodes[0].location;
              let position=[c.lng,c.lat];                      
              self.centerPosition=position;
              self.loadingOK=true;
              return true;            
            }
            else{
              console.log("检索失败");
              self.loadingOK=true;
              return false;
            }
          })
        }) 
               
      },
      
       //加载中心点附近多处房源卡片信息,根据页码返回相应组房源信息
      loadStaysByPos(){
        //调用API,
        let staysPos=this.$refs.StayMap.markerGroups;
        this.stays=[];
        let that=this;
        for(let i=0;i<staysPos.length;i++){
          console.log(staysPos[i].stayID);
          GetDetailedStay(staysPos[i].stayID).then(response=>{
            let data=response.data.stayPositionInfo;
            let tmp={
              stayID:staysPos[i].stayID,
              stayName: data.stayName,
              stayDescribe: data.stayDescribe,
              stayLabel: data.stayLabel,
              stayPrice: data.stayPrice,
              stayPhotos: data.stayPhotos,
              hostAvatar: data.hostAvatar,
              stayCommentNum: data.stayCommentNum,
              stayScore: data.stayScore,
              stayPosition: data.stayPosition,
              isLike: data.isLike,
              isCompared:false
            };    
            that.stays.push(tmp);
          })         
        }
      },


      //通过名字加载房源信息;
      loadStaysByName:function(text){
        //调用API
        //获得数据
        let that=this;
        this.stays=[];
        setTimeout(()=>{
            GetStaysByName(text).then(response=>{
            let datas=response.data.staysDetails;
            console.log("datas",datas);
            for(let i=0;i<datas.length;i++){
              let tmp={
                stayID:datas[i].stayId,
                stayName: datas[i].stayPositionInfo.stayName,
                stayDescribe: datas[i].stayPositionInfo.stayDescribe,
                stayLabel: datas[i].stayPositionInfo.stayLabel,
                stayPrice: datas[i].stayPositionInfo.stayPrice,
                stayPhotos: datas[i].stayPositionInfo.stayPhotos,
                hostAvatar: datas[i].stayPositionInfo.hostAvatar,
                stayCommentNum: datas[i].stayPositionInfo.stayCommentNum,
                stayScore: datas[i].stayPositionInfo.stayScore,
                stayPosition: datas[i].stayPositionInfo.stayPosition,
                isLike: datas[i].stayPositionInfo.isLike,
                isCompared:false
              }
              console.log('tmp',tmp);
              that.stays.push(tmp);
              console.log(tmp);
            }; 
          })
        })
        
        
      },


      //--------------------------------------------收藏功能代码----------------------------    
      //修改收藏框的可见度
      changeDialogVisible(val){
        this.dialogVisible=val;
      },
      //修改爱心
      changeLike(stayID,val){
        
        for(let i = 0;i<this.stays.length;i++){
          if(this.stays[i].stayID==stayID){
            this.stays[i].isLike=val;
          }
        }
      },
      //完成将房源插入收藏夹后
      finishInserted(flag){
        if(flag==true){
          for(let i=0;i<this.stays.length;i++){
            if(this.stays[i].stayID==this.curStayID){
              this.stays[i].isLike=true;
            }
          }              
        }
        this.dialogVisible=false;
      },
      //得到当前收藏页面的ID
      getCurrentStay(val){
        this.curStayID=val;
      },

      //添加至对比
      addCurCompareID(val){
        this.curCompareID.push(val);
        console.log(val,'被加入对比了');
        //找到该编号
        for(let i=0;i<this.stays.length;++i){
          if(this.stays[i].stayID==val){
            this.stays[i].isCompared=true;
            break;
          }
        }

        //如果被对比房源数量达到两个，则打开对比界面
        if(this.curCompareID.length==1){
          this.$message({
            message: '已将该房源加入对比',
            type: 'success'
          });
          
        }
        else if (this.curCompareID.length==2){
          console.log('打开对比界面')
          this.compareDialogVisible=true;
          //找出两个下标
          for(let j=0;j<this.stays.length;j++){
            if(this.stays[j].stayID==this.curCompareID[0]){
              this.stayScore1=this.stays[j].stayScore;
              this.stayName1=this.stays[j].stayName;
              this.stayDescribe1=this.stays[j].stayDescribe;
              this.stayPrice1=this.stays[j].stayPrice;
              this.stayPhoto1=this.stays[j].stayPhotos;
            }
          }
          for(let j=0;j<this.stays.length;j++){
            if(this.stays[j].stayID==this.curCompareID[1]){
              this.stayScore2=this.stays[j].stayScore;
              this.stayName2=this.stays[j].stayName;
              this.stayDescribe2=this.stays[j].stayDescribe;
              this.stayPrice2=this.stays[j].stayPrice;
              this.stayPhoto2=this.stays[j].stayPhotos;
            }
          }

        }
        else{
          //选择过多，则取消之前的选择
          this.$message({
            message: '一次最多对比两个房源，已取消前面所选房源！',
            type: 'warning'
          });
          
          
          //更改对比图标
          for(let i=0;i<2;++i){
            for(let j=0;j<this.stays.length;j++){
              if(this.stays[j].stayID==this.curCompareID[i]){
                this.stays[j].isCompared=false;
              }
            }
          }
          this.curCompareID=[this.curCompareID.pop()];

        }

      },
      closeCompareDialog(){
        this.compareDialogVisible=false;
      },
      //从对比中删除
      removeCurCompareID(val){
        //找到该编号
        for(let i=0;i<this.stays.length;++i){
          if(this.stays[i].stayID==val){
            this.stays[i].isCompared=false;
            break;
          }
        }
        //从列表中找到该ID，并删除之
        for(let i=0;i<this.curCompareID.length;++i){
          if(this.curCompareID[i]==val){
            this.curCompareID.splice(i,1);
            this.$message({
              message: '已取消该房源对比',
              type: 'success'
            });
            return;
          }
        }
      },

      //对数据进行排序选择的一系列函数
      selectClick(){
        if(this.selectMethod=='1'){
          //价格降序;
          let compare=function(tmp1,tmp2){
            let x=tmp1.stayPrice;
            let y=tmp2.stayPrice;
            if(x < y){
              return 1;
            }
            else if(x == y){
              return 0;
            }
            else{
              return -1;
            }
          }
          this.stays.sort(compare);
        }
        else if(this.selectMethod == '2'){
          //价格升序;
            let compare=function(tmp1,tmp2){
              let x=tmp1.stayPrice;
              let y=tmp2.stayPrice;
              if(x > y){
                return 1;
              }
              else if(x == y){
                return 0;
              }
              else{
                return -1;
              }
            }
          this.stays.sort(compare);
        }
        else if(this.selectMethod == '3'){
          //评分降序;
            let compare=function(tmp1,tmp2){
              let x=tmp1.stayScore;
              let y=tmp2.stayScore;
              if(x < y){
                return 1;
              }
              else if(x == y){
                return 0;
              }
              else{
                return -1;
              }
            }
          this.stays.sort(compare);
        }
        else if(this.selectMethod == '4'){
          //评分升序;
            let compare=function(tmp1,tmp2){
              let x=tmp1.stayScore;
              let y=tmp2.stayScore;
              if(x > y){
                return 1;
              }
              else if(x == y){
                return 0;
              }
              else{
                return -1;
              }
            }
          this.stays.sort(compare);
        }
        else{
          //评论数量降序;
            let compare=function(tmp1,tmp2){
              let x=tmp1.stayCommentNum;
              let y=tmp2.stayCommentNum;
              if(x < y){
                return 1;
              }
              else if(x == y){
                return 0;
              }
              else{
                return -1;
              }
            }
          this.stays.sort(compare);
        }
      },
  },
  mounted() {
    setTimeout(()=>{
      this.getPosition(this.$route.query.searchText);
    },500)
  
  },
  //通过watch监听变化
  watch:{
    $route(to,from){
      console.log({"变化前的路由":from},{"变化后的路由":to});
      this.$router.go(0);
      //this.loadStaysView()
    }
  }
}
</script>


<style scoped>
  .mapContainer{
    width: 40%;
    height: 500px;   
  }
  .inline-input{
    margin-top:20px;
  }
  .dialogInput{
    border-radius: 15px;
  }
 .dialogInput >>>.el-input__inner{
    font-family: "FZHeiBJW" !important;
  }
</style>