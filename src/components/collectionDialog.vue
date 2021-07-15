<template>
    <div id="collectionDialog">
        
        <el-dialog 
            title="您的心愿单" 
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            class="dialogStyle"
            >
            <el-image src="https://z3.ax1x.com/2021/07/13/WEEqvn.png" fit="fill" style="position:absolute;
            left:0px; bottom:0px; border-radius:15px; opacity:20%"></el-image>
            <el-divider><i class="el-icon-star-off"></i></el-divider>
            <h3 v-if="!hasLogin" style="margin-top:10%;font-size: xx-large;">
                您尚未登录，请先登录
            </h3>
            <div v-for="(favorite,index) in showFavorites" :key="index">
                <div style="height:64px; margin:5px" v-on:click="clickFavorites(favorite)">
                    <el-card class="imgStyle">
                        <el-image :src="favorite.imgurl" fit="fill"></el-image>
                    </el-card>
                    <div style="display:block; float:left; width:320px">
                        <div class="nameStyle">{{favorite.name}}</div>             
                        <div class="infoStyle" v-if="favorite.totalStay > 0">共有{{favorite.totalStay}}个房源</div>
                        <div class="infoStyle" v-else>未添加房源</div>
                    </div>
                </div>
            </div>
            
            <span slot="footer" class="dialog-footer">
                <el-pagination
                    layout="prev, pager, next"
                    :total="totalStays" :page-size="pageSize" @current-change="currentChangeHandle" :current-page="currentPage"
                    style="position:absolute; bottom:10px; left:163px"    
                >
                </el-pagination>
            </span>
        </el-dialog>
    </div>
</template>


<script>
import {GetFavorite,InsertFavoriteStay} from "@/api/favorite.js"
export default {
    data() {
      return {
          favorites:[],  //收藏夹列表.
          showFavorites:[], //供展示的收藏夹列表，数量不会超过pageSize.
          totalStays: 0,    //页码对应的总数量.
          pageSize: 5,      //页面大小
          currentPage: 1,   //当前页码
          hasLogin:true, //是否已登录
      };
    },
    methods: {
        handleClose(done) {
            this.$emit('insertFavorite',false);
        },
        clickFavorites(favorite){
            
            let favID=favorite.favoriteId;
            
            //调用API 将房源ID,收藏夹,token传递API;
            InsertFavoriteStay(favID,this.stayID);

            this.$emit('insertFavorite',true);
        },
        currentChangeHandle(val){
            this.currentPage=val;
            let start=(this.currentPage-1)*this.pageSize;
            let end=start+this.pageSize;
            this.showFavorites=this.favorites.slice(start,end);
        }
    },
    props:{
        "dialogVisible":{
            Type:Boolean,
            default:false
        },
        "stayID":{
            Type:Number
        }
    },
    created() {

        let that=this;

        //判断登录状态
        let token=localStorage.getItem('Authorization');
        if (token === null || token === ''){
            this.hasLogin=false;
            return;
        }

        GetFavorite().then(response=>{
            that.favorites=response.data.favoriteList;
            that.totalStays=that.favorites.length;   
            console.log('favorites为',that.favorites);
            let start=(that.currentPage-1)*that.pageSize;
            let end=start+that.pageSize;
            for(let i=0;i<that.totalStays;i++){
                if(that.favorites[i].imgurl == null){
                    that.favorites[i].imgurl="https://z3.ax1x.com/2021/07/13/WE1Vl8.png";
                }
            }
            that.showFavorites=that.favorites.slice(start,end);         
        }).catch(error=>{
            this.$message.error("加载数据失败，请稍后重试");
        })
       
        
    },
}
</script>

<style scoped>
@import url("../assets/css/font.css");
.dialogStyle >>> .el-dialog{
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
     rgba(255, 255, 255, 0.08) 0px 1px 0px inset !important;
    border-radius: 10px !important;
    height:530px;
}
.dialogStyle >>>.el-dialog__title{
    font-size:22px;
    font-family: "FZHEIBJW";
}
.dialogStyle >>>.el-dialog__body{
    padding: 10px 10px 10px 10px !important;
    

}
.dialogStyle >>>.el-dialog__footer{
    text-align: center;
}
.el-card >>>.el-card__body{
    padding :0px !important;
}
.el-card{
    width: 64px;
    height: 64px;
    float: left ;
    display: block;  
}
.nameStyle{
    font-size: 18px;
    padding:3px 3px;
    font-family:"FZFWZhu";
    margin:1px;
    word-wrap: break-word;
    text-align: left;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 320px;
}
.infoStyle{
    font-size: 10px;
    color: #999;
    padding:3px 3px;
    font-family:"Lato-Bold","FZHeiBJW";
    margin:1px;
    word-wrap: break-word;
    text-align: left;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 320px;
}

</style>
