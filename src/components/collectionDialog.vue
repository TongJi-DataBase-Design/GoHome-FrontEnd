<template>
    <div id="collectionDialog">
        <el-dialog
            title="您的心愿单" 
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            class="dialogStyle"
            >
            <el-divider><i class="el-icon-star-off"></i></el-divider>
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
                    :total="totalStays" :page-size="pageSize" @current-change="currentChangeHandle" :current-page="currentPage">
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
      };
    },
    methods: {
        handleClose(done) {
        this.$emit('insertFavorite',false);
        },
        clickFavorites(favorite){
            
            let favID=favorite.favoriteId;
            console.log('xxx',favID,this.stayID)
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
        GetFavorite().then(response=>{
            that.favorites=response.data.favoriteList;
            that.totalStays=that.favorites.length;   
            console.log('???',that.favorites);
            let start=(that.currentPage-1)*that.pageSize;
            let end=start+that.pageSize;
            that.showFavorites=that.favorites.slice(start,end);
            console.log("show",that.showFavorites);             
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
    max-height:530px;
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
