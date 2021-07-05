<!--
 * @Author: mount_potato
 * @Date: 2021-06-09 22:57:13
 * @LastEditTime: 2021-07-05 20:45:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \proto\src\views\favorites.vue
-->


<template>
    <div>
        <!-- 引入动画 -->
        <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>
        <!-- 心愿单标题与按钮 -->
        <el-row style="margin-bottom:20px;">
            <el-col float="left" span='20' offset='2' > 
                <h2 class="favor-main-title">心愿单</h2>
                <el-button type="primary" class="create-button" icon="el-icon-folder-add" @click="add_new">创建新的心愿单</el-button>
            </el-col>        
        </el-row>

        <el-divider></el-divider>
        <!-- 收藏夹列表 -->
        <el-row :gutter='30'>
            <el-col :span="6" v-for='(item,index) in favorite_list'
                                :key='item.id' 
                                :offset=" index %3==0 ? 2 : 1 "  
                                style="margin-bottom:40px;" >
                <el-card :body-style="{ padding: '0px' }" shadow="hover"  @click.native="jump_to_oneFav(item)">
                    <img src="https://a0.muscache.com/im/pictures/dc802edc-0036-4b3b-bee4-0e8dfad0db74.jpg?aki_policy=xx_large" class="image">
                    <div style="padding: 14px;">
                        <div class="top-clearfix">
                            <span class="time">共有{{ item.totalStay }}个房源</span>
                        </div>
                        <span class="favor-title">{{item.name}}</span>
                        <div class="bottom clearfix">
                        
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import { getFavorite,InsertFavorite } from '@/api/favorite';
export default {


    created:function(){
        getFavorite().then(response=>{
            console.log(response);
            this.favorite_list=response.data.favoriteList;
            console.log(this.favorite_list);
        })
    },

    methods:{
        add_new(){
            // const h=this.$createElement;
            // this.$msgbox({
            //     title:创建新的心愿单
            // })
            this.$prompt('新收藏夹名字', '新建收藏夹', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            inputPlaceholder:"不超过10个字",
            inputValidator(value){
                if(value==undefined){
                    return '名字不能为空'
                }else if(value.length==0){
                    return '名字不能为空'
                }else if(!value.match('^[a-zA-Z0-9_\u4e00-\u9fa5]+$')){
                    return '不支持特殊字符'
                }else if(value.length>10){
                    return '请输入不超过10个字的名字'
                }
            },
            inputErrorMessage: '格式不正确',
            center: true
            }).then(({ value }) => {
                this.$message({
                    type: 'success',
                    message: '新的收藏夹名字是: ' + value
                });

                //插入
                InsertFavorite({name:value}).then(response=>{
                    console.log(response);
                    getFavorite().then(response=>{
                        console.log("get");
                        this.favorite_list=response.data.favoriteList;
                        console.log(this.favorite_list)
                    });
                });

            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });       
            });
        },
        jump_to_oneFav(item){
            let n=item.name;
            let id=item.id;
            //通过路由的path+query传值，待改
            this.$router.push({
                path: '/oneFavPage',
                query: {
                    favName: n,
                    favID:id,
                }
            })
        }
    },

    data() {
    return {
        favorite_list: [
            // {
            //     id:1,
            //     name:"上海",
            //     count:13,
            // },
            // {
            //     id:2,
            //     name:"那里",
            //     count:12,
            // },
            // {
            //     id:3,
            //     name:"南京",
            //     count:11,
            // },
            // {
            //     id:4,
            //     name:"添加",
            //     count:1,
            // },
            // {
            //     id:5,
            //     name:"同济",
            //     count:4,
            // },
            // {
            //     id:6,
            //     name:"前往",
            //     count:15,
            // },
            // {
            //     id:7,
            //     name:"都是",
            //     count:123,
            // },
        ],
        currentDate: new Date(),  
    };
  }
  
}
</script>

<style scoped>
.time {
    
    font-size: 13px;
    color: #999;
    text-align: left;
    float:left;
    padding:3px;
}

.favor-main-title{
    font-size: 30px;
    float:left;
    text-align: left;
    font-weight: bold;
    font-family:"PingFang SC";

    animation: fadeInDown;
    animation-duration: 1s;
}


.create-button{
    float:right;
    background-color: black;
    margin-top:40px;
    animation: fadeInDown;
    animation-duration: 1s;
}
.create-button:hover{
    background-color: rgba(0, 0, 0, 0.205);
    /* margin-top:-0.1px; */
}

.create-button:focus{
    background-color: black;
}

.bottom {
    margin-top: 15px;
    line-height: 12px;
}

.button {
    padding: 0;
    float: right;
}

.image {
    height: 80%;
    width: 100%;
    width: 400px;
    height: 200px;  
    display:block;
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

.el-divider{
    animation: fadeInDown;
    animation-duration: 1s;
}

.el-card{
    background-color: rgba(245, 248, 248, 0.918);
    border-radius: 15px;
    height: 100%;
    width: 100%;
    vertical-align: top;
    cursor:pointer;

    animation: fadeInLeft;
    animation-duration: 1.5s;
}

.el-card:hover{
    box-shadow: 0 10px 10px 0 rgba(0, 0, 0, 0.8), 0 6px 20px 0 rgba(0, 0, 0, 0.79);

}

.el-card-define {
  min-height: 100%;
  height: 100%;
}
.el-card-define >>> .el-card__body {
  height: 100%;
}


.favor-title{

    float:right;
    font-size:20px;
    font-weight: bold;
    font-family:"PingFang SC";
    margin-top:10px;
}

</style>

<style>
    .el-message-box{
        width: 350px;
    }
</style>
