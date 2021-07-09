<!--
 * @Author: your name
 * @Date: 2021-07-02 15:36:30
 * @LastEditTime: 2021-07-09 20:10:54
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
                    <el-button type="primary" class="delete-button" icon="el-icon-delete-solid" @click="delete_fav">删除心愿单</el-button>
                </el-col>        
            </el-row>
        </div>
        <el-divider></el-divider>
        <el-row :gutter='30'>
            <el-col :span="12" v-for='(item,index) in 7'
                                :key='item.id' 
                                :offset=" index %1==0 ? 6 : 1 "  
                                style="margin-bottom:40px;" >
            
            <stay-card  :money="300.00" 
                        :comment_num="10" 
                        :rate="3.7" 
                        :stay_name="'dasdjkhsa'"
                        @deleteStay="delete_stay"
                        ></stay-card>
            </el-col>
        </el-row>
        
        


  </div>
</template>

<script>
    import staycard from '../components/stayCard.vue'
    import { DeleteFavorite,deletefn,GetFavoriteStay } from '@/api/favorite';

    export default {
        
        created(){
            //传入的收藏夹名字
            this.favorName=this.$route.query.favName;;
            this.favorID=this.$route.query.favID;
            console.log(this.favorID);
            //!获取房源列表
            GetFavoriteStay({favoriteId:this.favorID}).then(response=>{
                this.stayList=response.data.stayList;
                console.log(this.stayList);
            });
        },
        components:{
            'stay-card':staycard,
        },
        methods:{
            
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
                    DeleteFavorite('http://8.136.17.54:6001/api/CustomerFavorite',{favoriteId:parseInt(this.favorID)});
                    // DeleteFavorite({favoriteId:this.favorID}).then(response=>{console.log("delete",response)});


                    this.$router.push({path:'/favoritesPage'});  
                }).catch(() => {
                    this.$message({ 
                        type: 'info',
                        message: '已取消删除'
                    });     
            });
            },

            delete_stay(){
                this.$confirm('确认要删除该房源吗?', ' ', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {

                    this.$router.push({path:'/oneFavPage'});  
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

.top-info{
    /* background-image: url("https://exp.cdn-hotels.com/hotels/27000000/26760000/26755400/26755341/39c3085f_z.jpg?impolicy=fcrop&w=1000&h=666&q=medium"); */
    /* background-color:rgba(0,0,0,0.9); */
    animation: fadeInDown;
    animation-duration: 1s;
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
    /* margin-top:-5px; */
}

.return-button:focus{
    background-color: black;
}


</style>