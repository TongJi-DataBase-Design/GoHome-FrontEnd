
<template>
    <el-card :body-style="{ padding: '0px' }" shadow="hover">
        <!-- 引入动画 -->
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <!-- 房源图片 -->
        <img src="https://a0.muscache.com/im/pictures/dc802edc-0036-4b3b-bee4-0e8dfad0db74.jpg?aki_policy=xx_large" class="image">
        <div style="padding: 0.5px;">
            <!-- 小标签，用于卡片内部字体 -->
            <div class="small-label" >{{stay_characteristic}}</div>
            <!-- 价格标签 -->
            <div class="price-label" >￥{{money}} 起</div>
            <br>
            <br>
            <!-- 房源标题 -->
            <div class="stay-title">{{stay_name}}</div>
            <br>
            <br>
            <span class="small-label" style="float:left; padding:1px 6px;margin-top:6px">标签:</span>
            <!-- 标签列表，这里只放三个 -->
            <label-list class="label-list">                        
                <el-tag
                type="info"
                v-for="(i,index) in labels"
                :key="index"
                :effect="dark">
                {{i}}
                </el-tag>
            </label-list>
            <!-- 房主头像 删除按钮 -->
            <el-button class="del-button" 
                        type="danger" 
                        icon="el-icon-delete" 
                        style="float:right;margin:16px;" 
                        @click="del_button_click()"
                        circle></el-button>
            <el-avatar class="host-avatar"
                        src="http://www.buaaer.com-www.buaaer.com/bbs/attachments/month_0708/20070828_39cb3c31e47d70ad2052uCZD0EUYvuUa.jpg.thumb.jpg"
                        style="float:right;margin:16px"></el-avatar>
            
            <br>
            <br>
            <!-- 评分栏 -->
            <el-rate class="rate-bar"
                v-model="rate"
                disabled
                show-score
                text-color="#ff9900"
                score-template="{value}">
            </el-rate>           
            <!-- 分隔线 -->
            <el-divider direction="vertical" class="rate-divide"></el-divider>
            <!-- 评论数 -->
            <div class="small-label" style="padding:1px 6px; margin:3px">{{comment_num}}条评论</div>
            <div class="bottom clearfix">
            
            </div>
        </div>
    </el-card>
</template>

<script>
export default {

    methods:{
        del_button_click(){
            // this.$parent.delete_stay();
            console.log(this.id);
            this.$emit('deleteStay',this.id);
        }
    },

    props:{
        'stay_id':Number,
        'stay_characteristic':String,
        "stay_name":String,
        'label1':Boolean,
        'label2':Boolean,
        'label3':Boolean,
        'rate': Number,
        'comment_num':Number,       
        'money':Number,
    },

    data() {
        return {
            id:this.stay_id,
            lb1:this.label1==true?"无障碍设施":"设施待完善",
            lb2:this.label2==true?"含公共卫生间":"有独卫",
            lb3:this.label3==true?"含公浴":"独立浴室",
            labels:[lb1,lb2,lb3],           
        }
    }
}
</script>

<style scoped>

/* 小标签 */
.small-label{
    font-size: 10px;
    color: #999;
    display:flex;
    padding:6px 6px;
    float:left;
    font-family:"PingFang SC";
    margin:1px;
    word-wrap: break-word;
    word-break: normal;
}

/* 标签 */
.el-tag{
    float:left;
    white-space: pre-line;
    word-break: break-all;
}

.host-avatar{
    height:40px;
    width:40px;  
    margin:10px;  
}

/* 删除按钮 */
.del-button{
    height:40px;
    width:40px;
    margin-left:10px;
}

/* 房源名字 */
.stay-title{
    font-size:20px;
    padding: 1px 6px;
    font-weight: bold;
    text-align: left;
    display:block;
    float:left;
    font-family:"PingFang SC";
    flex: 1;  
}

/* 标签列表 */
.label-list{
    padding:1px 6px;
    margin:1px 6px;
}

/* 评分栏 */
.rate-bar{
    float:left;
    padding:1px 6px;
    margin:3px;
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
    margin:13px;
    font-family:"PingFang SC";
    flex: 1;  

}


.bottom {
    margin-top: 12px;
    line-height: 12px;
}

/* 图片 */
.image {
    width: 200px;
    height: 150px;  
    display: inline;
    float: left;
    margin:auto;
    opacity: 0.8;
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
    vertical-align: top;
    width: 700px;
    cursor: pointer;
    animation: fadeInLeft;
    animation-duration: 1.5s;
}

/* 卡片悬浮阴影特效 */
.el-card:hover{
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.79);
}


</style>