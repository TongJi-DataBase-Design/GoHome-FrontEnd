<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-02 15:36:30
 * @LastEditTime: 2021-07-13 15:02:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \proto\src\components\oneFavPage.vue
-->
<template>
  <div>
      <!-- 引入动画 -->
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <div class="top-info">
        <!-- 心愿单标题与按钮 -->

            
            <el-row style="margin-bottom:20px;">
                <el-col float="left" span='20' offset='2' > 
                    <h2 class="title">{{this.favorName}}</h2>
                    <el-button type="primary" class="return-button" icon="el-icon-caret-left" @click="return_fav">返回收藏夹</el-button>
                    <el-button type="primary" v-if="this.favorName!='默认收藏夹'" class="delete-button" icon="el-icon-delete-solid" @click="delete_fav">删除心愿单</el-button>
                </el-col>        
            </el-row>
        </div>
        <el-divider></el-divider>
        <br>
        <div v-if="stayList.length==0">
                <img class="empty-img" src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/283dd5de830e60c82cf9ecc9362e8779.png">
                <p>收藏夹内还没有房源哦，快去探索吧!</p>
        </div>
        <el-row :gutter='30' class="main">
            <el-col :span="12" v-for='(item,index) in this.stayList'
                                :key='item.stayId' 
                                :offset=" index %1==0 ? 6 : 1 "  
                                style="margin-bottom:40px;" >
            
            <stay-card  :money="item.stayMinPrice" 
                        :rate="item.stayRate"
                        :comment_num="item.commentNum"
                        :stay_id='item.stayId'
                        :label1="item.stayHasFacility"
                        :label2="item.stayHasWashroom"
                        :label3="item.stayHasPath"
                        :hostImg="item.hostAvatar"
                        :stayImg="item.stayPhoto"
                        :stay_characteristic="item.stayCharacteristic"
                        :stay_name="item.stayName.slice(0,18)+'...'"
                        @deleteStay="delete_stay"
                        @click.native="on_card_clicked(item.stayId)"
                        ></stay-card>
            </el-col>
        </el-row>
        
        


  </div>
</template>

<script>
    import staycard from '../components/stayCard.vue'
    import { DeleteFavorite,DeleteFavoriteStay,GetFavoriteStay } from '@/api/favorite';

    export default {
        
        created(){
            //传入的收藏夹名字
            this.favorName=this.$route.query.favName;;
            this.favorID=this.$route.query.favID;
            console.log(this.favorID);

            GetFavoriteStay(this.favorID).then(response=>{
                this.stayList=response.data.stayList;
                console.log(this.stayList);
            }).catch(error=>{
                console.log("fail");
                this.$message.error("错误:数据库连接错误");
            });
        },
        components:{
            'stay-card':staycard,
        },
        methods:{
            
            on_card_clicked(id){
                console.log("yes",id);
                //TODO:对接尚丙奇页面，注释去掉
                // this.$router.push({path:"/StayInfo",query:{stayId:id}});
            },

            return_fav(){
                this.$router.push({path:'/favoritesPage'});  
            },

            delete_fav(){
                this.$confirm('确认要删除该收藏夹吗?', ' ', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //!删除该收藏夹
                    DeleteFavorite(this.favorID).catch(error=>{
                        console.log("fail");
                        this.$message.error("错误:数据库连接错误");
                    });
                    this.$message({
                        type: 'success',
                        message: '删除成功，2秒后退出该页面'
                    })
                    setTimeout(()=>{this.$router.push({path:'/favoritesPage'})},2000)
                    // this.$router.push({path:'/favoritesPage'});  
                }).catch(() => {
                    this.$message({ 
                        type: 'info',
                        message: '已取消删除'
                    });     
            });
            },

            delete_stay(stayid){
                this.$confirm('确认要删除该房源吗?', ' ', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    
                    DeleteFavoriteStay(parseInt(this.favorID),stayid).catch(error=>{
                        console.log("fail");
                        this.$message.error("错误:数据库连接错误");
                    });

                    this.$message({
                        type: 'success',
                        message: '删除成功,将在2秒后刷新页面'
                    });

                    GetFavoriteStay(this.favorID).then(response=>{
                        this.stayList=response.data.stayList;
                        console.log(this.stayList);
                    }).catch(error=>{
                        console.log("fail");
                        this.$message.error("错误:数据库连接错误");
                    });

                    
                        
                    setTimeout(()=>{this.$router.go(0)},2000)

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });     

                });
            },
        },
        data(){
            return{
                favorName:"默认收藏夹",
                favorID:0,
                stayList:[],
            }
        }
    }
</script>

<style scoped>

.main{
    position: relative;  
    background-image: url("https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/54f92b3c36beba9690ebddaf3bc80ac8.png");
    background-attachment:fixed;
    top: 0;
    left: 0;
    width:100%;
    height:100%;

    animation: fadeIn;
    animation-duration: 2s;
}

.top-info{

    animation: fadeInDown;
    animation-duration: 1s;
}

.empty-img{
    width:200px;
    height:200px;
}

.title {
    font-size: 30px;
    float:left;
    text-align: left;
    font-weight: bold;
    font-family:"PingFang SC";
}
.delete-button{
    float:right;
    background-color: black;
    margin-top:40px;
    animation: fadeInDown;
    animation-duration: 1s;
}
.delete-button:hover{
    background-color: rgba(0, 0, 0, 0.205);
    /* margin-top:-5px; */
}

.delete-button:focus{
    background-color: black;
}

.return-button{
    float:right;
    background-color: black;
    margin-top: 40px;
    margin-left:10px;
    animation: fadeInDown;
    animation-duration: 1s;
}
.return-button:hover{
    background-color: rgba(0, 0, 0, 0.205);
}

.return-button:focus{
    background-color: black;
}


</style>