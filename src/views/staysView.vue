<template>
  <div class="staysView">
    <el-container>
      
      <el-container>
        <el-aside style="width : 50%">        
          <el-container>
            <el-header>
              
              <el-autocomplete
                class="inline-input"
                prefix-icon="el-icon-search"
                v-model="state1"
                :fetch-suggestions="querySearch" :select-when-unmatched = "true"
                placeholder="请输入内容"
                @select="handleSelect"
                style="width:600px"
              >                                          
              </el-autocomplete>
                                                 
            </el-header>
            <el-main>
              <!--收藏隐藏的弹窗界面-->
              <CollectionDialog v-bind:dialogVisible="dialogVisible" :stayID="curStayID"
                @insertFavorite="finishInserted"></CollectionDialog>
              <!--房源卡片信息-->
              <div v-for="(stay,index) in stays" :key="index">
                <BuildingCard
                v-bind:stayID="stay.stayID" :stayName="stay.stayName" :stayDescribe="stay.stayDescribe"
                :stayLabels="stay.stayLabels" :stayPrice="stay.stayPrice" :stayPhotos="stay.stayPhotos"
                :hostAvatar="stay.hostAvatar" :stayCommentNum="stay.stayCommentNum" :stayScore="stay.stayScore"
                :stayPosition="stay.stayPosition" :isLike="stay.isLike" :dialogVisible="dialogVisible"
                @changeDialogVisible="changeDialogVisible" @changeLike="changeLike" @getCurrentStay="getCurrentStay"
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
          <BuildingMap v-bind:centerPosition="centerPosition"></BuildingMap>
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

export default {
  name: 'staysView',
  components: {
    BuildingCard,
    BuildingMap,
    CollectionDialog
  },
  data(){
    return{
      searchSuggections: [],
      state1: '',
      centerPosition:[121.473701,31.230416],
      stays:[],
      totalStays:25,
      pageSize:5,
      currentPage:1,
      dialogVisible:false,
      curStayID:-1,
    };
  },
  methods: {
      //-------------------------------------------搜索与地图定位部分代码--------------------
      //搜索框查询;
      querySearch(queryString, cb) {
        var searchSuggections = this.searchSuggections;
        var results = queryString ? searchSuggections.filter(this.createFilter(queryString)) : searchSuggections;
        // 调用 callback 返回建议列表的数据
        cb(results);
      },
      createFilter(queryString) {
        return (searchSuggections) => {
          return (searchSuggections.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
        };
      },
      loadAll() {
        return [
         {value:"上海新天地"},
         {value:"天津"},
         {value:"上海外滩"}
        ];
      },
      handleSelect(item) {
        let address=item.value
        //更换中心坐标;
        this.getPosition(address)
        //根据中心坐标处理卡片信息;
        this.stays=this.loadStays()
      },
      //输入地址描述，编码设置相应的地图中心的地理经纬信息
      getPosition:function(address){
        
        let self=this;
        AMap.plugin('AMap.Geocoder', function() {
          var geocoder = new AMap.Geocoder({
            // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
            city:'全国'
          })
          geocoder.getLocation(address , function(status, result) {
            if (status === 'complete' && result.info === 'OK') {

              let c=result.geocodes[0].location;
              let position=[c.lng,c.lat];                       
              self.centerPosition=position;
              return true;            
            }
            else{
              console.log("检索失败");
              return false;
            }
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



      //加载中心点附近25处房源卡片信息,根据页码返回相应组房源信息
      loadStays:function(){
        //调用API,
        //let tmpStay=getStays(this.centerPosition);
        let tmpStay=[{
          stayID:1,
          stayName:"宝庆路洋房",
          stayDescribe:"整套独栋房·1室1卫1床",
          stayLabels:["超赞房东","自助入住","可以做饭"],
          stayPrice:148,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:17,
          stayScore:5.0,
          stayPosition:[121.473701,31.230416],
          isLike:true
        },
        {
          stayID:2,
          stayName:"江苏路地铁站暖粉大双人床公寓",
          stayDescribe:"整套普通公寓·1室1卫1床",
          stayLabels:["超赞房东","自助入住","近地铁站"],
          stayPrice:258,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:106,
          stayScore:4.7,
          stayPosition:[121.473701,31.230416],
          isLike:true
        },
        {
          stayID:3,
          stayName:"网红酒吧北欧简约风一居室",
          stayDescribe:"整套普通公寓·1室1卫2床",
          stayLabels:["超赞房东","自助入住","灵活退改"],
          stayPrice:199,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:18,
          stayScore:4.5,
          stayPosition:[121.473701,31.230416],
          isLike:false
        },
        {
          stayID:4,
          stayName:"要多市中心有多市中心，环贸零距离",
          stayDescribe:"合住房间·1室1卫1床",
          stayLabels:["超赞房东","自助入住","灵活退改"],
          stayPrice:150,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:199,
          stayScore:4.8,
          stayPosition:[121.473701,31.230416],
          isLike:false
        },
        {
          stayID:5,
          stayName:"老洋房亭子间",
          stayDescribe:"整套公寓·1室1卫1床",
          stayLabels:["超赞房东","自助入住","灵活退改"],
          stayPrice:264,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:38,
          stayScore:4.9,
          stayPosition:[121.473701,31.230416],
          isLike:false
        }
        ]
        if(this.currentPage==2){
          tmpStay=[{
          stayID:6,
          stayName:"零距离人民广场|老弄堂小阁楼",
          stayDescribe:"整套LOFT·1室1卫1床",
          stayLabels:["超赞房东","自助入住","可以做饭"],
          stayPrice:256,
          stayPhotos:[ 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',],
          hostAvatar:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
          stayCommentNum:30,
          stayScore:5.0,
          stayPosition:[121.473701,31.230416],
          isLike:false
        }]
        }
        return tmpStay;
      },
      //在加载数据的过程中，页码发生变化时，做的相应处理
      currentChangeHandle:function(val){
        this.currentPage=val;
        this.stays=[]
        //调用获得数据的API,根据当前的页码返回相应的数据.
        this.stays=this.loadStays();
      }
  },
  mounted() {
    this.searchSuggections = this.loadAll();
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
</style>