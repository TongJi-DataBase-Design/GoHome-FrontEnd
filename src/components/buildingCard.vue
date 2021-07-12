
<template>
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <!-- 引入动画 -->
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>        
        
        <!-- 房源图片组信息-->
        <div class="cardImage" >
            <!--在每个房源照片上加一个收藏信息-->
                   
            <el-carousel trigger="click" height="150px" indicator-position="none">
                <div class="heart" v-if="isLike" v-on:click="StayDelCollection()">
                <el-image :src="hearts[0]" fit="fill"></el-image>
                </div>
                <div class="heart" v-else v-on:click="StayCollection()">
                <el-image :src="hearts[1]" fit="fill"></el-image>
                </div> 
                <el-carousel-item v-for="(stayPhoto,index) in stayPhotos" :key="index">
                                                    
                    <el-image :src="stayPhoto" fit="fill"></el-image>
                </el-carousel-item>
            </el-carousel>          
        </div> 
          
        <div style="padding: 0.5px;">
            <!-- 小标签，用于卡片内部字体 -->
            <div class="small-label" >{{stayDescribe}}</div>
            <!-- 价格标签 -->
            <div class="price-label" >￥{{stayPrice}}</div>
            <br>
            <br>
            <!-- 房源标题 -->
            <div class="stay-title">222{{stayName}}</div>
            <br>
            <br>           
            <!-- 标签列表，这里只放三个 -->
            <div class="label-list"> 
                <span class="small-label" style="float:left; padding:1px 6px;margin-top:6px">标签:</span>                       
                <el-tag  :color="labelColor[index]" v-for="(stayLabel,index) in stayLabels" :key="index" effect="dark" :hit="true">
                {{stayLabel}}
                </el-tag>
            </div>
            <!-- 房主头像 -->
            <el-avatar :src="hostAvatar" style="float:right;margin:10px"></el-avatar>
            <br>
            <br>
            <div style="display:inline-block; float:left">
                <!-- 评分栏 -->
                <el-rate class="rate-bar"
                    v-model="stayScore"
                    disabled
                    show-score
                    text-color="#ff9900"
                    score-template="{value}">
                </el-rate>           
                <!-- 分隔线 -->
                <el-divider direction="vertical" class="rate-divide"></el-divider>
                <!-- 评论数 -->
                <div class="small-label">{{stayCommentNum}}条评论</div>
                <div class="bottom clearfix">            
                </div>
            </div>
            
        </div>
    </el-card>
</template>

<script>
//引用组件
import CollectionDialog from "@/components/collectionDialog.vue"
import {DeleteFavoriteStay} from "@/api/favorite.js"
export default {

    components:{
        CollectionDialog
    },
    props:{
        'stayID':{
            type:Number
        },
        "stayName":{
            type:String
        },
        "stayDescribe":{
            type:String
        },
        "stayLabels":{
            type:Array
        },
        "stayPrice":{
            type:Number
        },
        "stayPhotos":{
            type:Array,
            default:[
            'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
            'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
            'https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg',
            'https://fuss10.elemecdn.com/1/34/19aa98b1fcb2781c4fba33d850549jpeg.jpeg',
            'https://fuss10.elemecdn.com/0/6f/e35ff375812e6b0020b6b4e8f9583jpeg.jpeg',
            'https://fuss10.elemecdn.com/9/bb/e27858e973f5d7d3904835f46abbdjpeg.jpeg',
            'https://fuss10.elemecdn.com/d/e6/c4d93a3805b3ce3f323f7974e6f78jpeg.jpeg',
            'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
            'https://fuss10.elemecdn.com/2/11/6535bcfb26e4c79b48ddde44f4b6fjpeg.jpeg']
        },
        "hostAvatar":{
            type:String,
            default:"https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
        },
        "stayCommentNum":{
            type:Number
        },
        "stayScore":{
            type:Number
        },
        "stayPosition":{
            type:Array
        },
        "isLike":{
            type:Boolean,
            default:false
        },
        "dialogVisible":{
            type:Boolean,
            default:false
        }
        
    },

    data() {
        return {                        
            hearts:[
                'https://z3.ax1x.com/2021/07/11/W9W78g.png','https://z3.ax1x.com/2021/07/11/W9WH2Q.png'
            ],
            labelColor:["#77C9D4","#57BC90","#015249"],
                
        }
    },
    methods:{
        //添加房源至收藏夹;
        StayCollection(){
            //向上传递参数 房源ID与dialogvisible参数.           
            this.$emit('changeDialogVisible',true);
            this.$emit('getCurrentStay',this.stayID);                              
        },
        StayDelCollection(){
            //调用API从收藏夹中删除该内容;
            let flag=true;
            if(flag){
                this.$emit('changeLike',this.stayID,false);
            }
        },
    },
}
</script>

<style scoped>
@import url('../assets/css/font.css');

/* 小标签 */
.small-label{
    font-size: 10px;
    color: #999;
    display:flex;
    padding:6px 6px;
    float:left;
    font-family:"FZHeiBJW","Lato-Bold";
    margin:1px;
    word-wrap: break-word;
    word-break: normal;
}

/* 标签 */
.el-tag{
    float:left;
    white-space: pre-line;
    word-break: break-all;
    margin-right:10px;
    font-family: "FZHeiBJW";
}

/* 房源名字 */
.stay-title{
    font-size:18px;
    padding: 1px 6px;
    font-weight: bold;
    text-align: left;
    display:block;
    float:left;
    font-family:"PingFang SC","Lato-Bold";
    flex: 1;  
    height: auto;
    width: 400px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
}

/* 标签列表 */
.label-list{
    
    padding:1px 6px;
    margin:1px 6px;
}

/* 评分栏 */
.rate-bar{
    position:relative;
    float:left;
    padding:1px 6px;
    margin:3px;
    bottom: 0px;
}
.el-rate{
    font-family: 'Lato-Bold';
}
/* 评分栏与评论数的分隔符 */
.rate-divide{
    margin:6px;
    float:left;
    color:black
}

/* 价格label */
.price-label{
    font-size:20px;
    padding: 1px 6px;
    font-weight: bold;
    text-align: left;
    display:block;
    float:right;
    margin-top:10px;
    margin-right:10px;
    font-family:"Lato-Bold";
    flex: 1;  

}


.bottom {
    margin-top: 12px;
    line-height: 12px;
}

.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}

.clearfix:after {
    clear: both
}

/* 卡片 */
.el-card{
    background-color: rgba(246, 248, 248, 0.918);
    border-radius: 15px;
    width: 700px;
    cursor: pointer;
    animation: fadeInLeft;
    animation-duration: 1.5s;
    margin-bottom:25px;
    display:block;
    box-shadow: rgb(204, 219, 232) 3px 3px 6px 0px inset, rgba(255, 255, 255, 0.5) -3px -3px 6px 1px inset;
    
}
.el-card.is-hover-shadow:hover {
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px,
     rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
}

.el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
}

.cardImage{
    width: 250px;
    height: 150px;  
    display: inline;
    float: left;
    margin:auto;
    opacity: 0.8;
}
.heart{
    position: absolute;
    z-index: 999;
    right: 10px;
    top: 10px;
    width: 30px;
    height: 30px;
}
</style>