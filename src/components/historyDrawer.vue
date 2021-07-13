<!--
 * @Author: mount_potato
 * @Date: 2021-07-04 10:10:38
 * @LastEditTime: 2021-07-13 18:53:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \proto\src\components\historyDrawer.vue
-->

<template>
<div>
        <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"/>

        <div v-if="this.historyList.length==0">
            <img class="empty-img" src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/654ccaba5539d708dfc76ccbf96a774c.png" style="width:20%;margin-top:10%;">
            <p>还没有搜索历史噢，快去探索吧!</p>
        </div>



        <div v-else>
            
            <el-container>
                <el-main class="left-img">
                    <img class="image" 
                        src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/f8cc5e654d8f69d1353e2a4833dd3a38.jpg" 
                        style="float:left; margin-left:330px;margin-top:50px; width:35%;height:450px;" >
                </el-main>

                <el-aside class="right-timeline">
                    <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                        <el-timeline :reverse="reverse" class="timeline">
                            <el-timeline-item
                                v-for="(item, index) in historyList"
                                :key="index"
                                
                                placement="top"
                                :icon="item.icon"
                                :color="item.color">
                                <el-card class="history-card" 
                                        shadow="hover"
                                        @click.native="searchCardClick(item)">
                                    <p class="search-content">{{item.content}}</p>
                                    <br>
                                    <p class="time-content">{{item.time}}</p>
                                    <el-button class="delhis-button" 
                                                type="text"
                                                
                                                icon="el-icon-error" 
                                                @click="delButtonClick(item)"
                                                circle></el-button>
                                </el-card>
                            </el-timeline-item>
                        </el-timeline>
                    </ul>
                    <div class="drawer-footer">
                        <el-button class="clear-button" type="primary" icon="el-icon-delete-solid" @click="clearHistory()">清空</el-button>
                        <!-- <el-button class="cancel-button" @click="drawer=false">取消</el-button> -->
                    </div>
                </el-aside>
                
            </el-container>
            
        </div>
    <!-- </el-drawer> -->

</div>
</template>



<script>
export default {
    mounted(){
        if(localStorage.getItem('localHistory')!==null){
            let temp=localStorage.getItem('localHistory').split('|');
            temp=temp.filter((i)=>{return i!=""});
            this.historyList=[];
            console.log(temp)

            for(let i=0;i<temp.length;i++){
                let tempList=temp[i].split(" ");
                this.historyList.push(
                    {   
                        id:i,
                        time:tempList[0]+"  "+tempList[1],
                        content:tempList[2] ,
                        icon:"el-icon-time",
                        color:'#0bbd87',
                    }
                );
            }
            
        }
        this.count=this.historyList.length;
    },
    data() {
        return {
            historyList:[],
            count:0,
            drawer: true,
            direction: 'ltr',
        };
    },
    methods: {
        handleClose(done) {
            done();
        },
        load(){
            this.count+=2;
        },
        delButtonClick(item){
            console.log(item.id);
            let localHistory=localStorage.getItem('localHistory');
            let temp=localHistory.split("|");
            temp.splice(item.id,1);
            this.historyList.splice(item.id,1);
            

            for(let i=0;i<this.historyList.length;i++){
                this.historyList[i].id=i;
            }
            console.log(this.historyList)
            localHistory=temp.join('|');
            
            localStorage.setItem('localHistory',localHistory);  //存入本地
            
        },
        searchCardClick(item){
            //TODO:添加根据item页面内容跳转的逻辑
            console.log(item);
        },
        clearHistory(){
            this.$confirm('确认要清空搜索记录吗?', ' ', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    localStorage.removeItem('localHistory') // 清空搜索历史
                    this.historyList=[];
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消清空'
                    });     

                });
        }

    }
}
</script>

<style scooped>
.infinite-list{
    height:470px;
}

.right-timeline{
    height:100%
}

.image{
    animation: fadeIn;
    animation-duration: 1s;
}

.clear-button{
    
    margin-left:15%;
    width:240px;
    background-color: black;
    animation: fadeIn;
    animation-duration: 1s;
}
/* .cancel-button{
    width:200px;
} */

.time-content{
    margin-top:-8px;
    /* float:left; */

}

.timeline{
    margin-top:20px;
    /* display: block; */
    float:right;
    margin-right:5%;
    animation: fadeIn;
    animation-duration: 1s;
}

.left-img{
    width:10%;
}

.delhis-button{
    color:dimgrey;
    float:right;
    margin-top:-19px;
    margin-right:-15px;
    
}

.delhis-button:hover{
    color:rgb(21, 27, 27);
}

.delhis-button:focus{
    color:dimgrey;
}



.history-card{
    margin-top:9px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 15px;
    border: 3px solid #000000;
    cursor:pointer;
    width:220px;
}

.search-content{
    font-size:14px;
    margin-top:1px;
    font-weight: bold;
    /* float:left; */
    font-family:"PingFang SC";
}

.drawer-footer{
    margin-bottom: 1px;
    float:left;
    /* padding: 10px 22px; */
    /* box-sizing: border-box; */
}
</style>