<!--
 * @Author: mount_potato
 * @Date: 2021-07-04 10:10:38
 * @LastEditTime: 2021-07-13 00:16:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \proto\src\components\historyDrawer.vue
-->

<template>
<div>
    <!-- <el-drawer
        title="搜索记录"
        :visible.sync="drawer"
        :direction="direction"
        :before-close="handleClose"> -->

        <div v-if="this.historyList.length==0">
            <el-image
                style="width: 100%; height: 80%"
                :src="'https://gitee.com/mount-potato/markdown-img-hosting/raw/master/pic/20210704222026.png'"
                :fit="'cover'"></el-image>
        </div>

        <div v-else>
            <ul class="infinite-list" v-infinite-scroll="load" style="overflow:auto">
                <el-timeline :reverse="reverse" class="timeline">
                    <el-timeline-item
                        v-for="(item, index) in historyList"
                        :key="index"
                        :timestamp="item.time"
                        placement="top"
                        :icon="item.icon"
                        :color="item.color">
                        <el-card class="history-card" 
                                shadow="hover"
                                @click.native="searchCardClick(item)">
                            <p class="search-content">{{item.content}}</p>
                            <el-button class="delhis-button" 
                                        type="text"
                                        size="medium"
                                        icon="el-icon-error" 
                                        @click="delButtonClick(item)"
                                        circle></el-button>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>
            </ul>
            <div class="drawer-footer">
                <el-button class="clear-button" type="primary" @click="clearHistory()">清空</el-button>
                <el-button class="cancel-button" @click="drawer=false">取消</el-button>
            </div>
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
                        content:tempList[2],
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
.clear-button{
    width:200px;
}
.cancel-button{
    width:200px;
}

.timeline{
    float:"left";
}

.delhis-button{
    color:dimgrey;
    float:right;
    margin-top:-9px;
    
}

.delhis-button:hover{
    color:rgb(21, 27, 27);
}

.delhis-button:focus{
    color:dimgrey;
}



.history-card{
    background-color: rgba(255, 255, 255, 1);
    border-radius: 15px;
    border: 3px solid #000000;
    cursor:pointer;
}

.search-content{
    font-size:14px;
    margin-top:1px;
    font-weight: bold;
    float:left;
    font-family:"PingFang SC";
}

.drawer-footer{
    position:fixed;
    margin-bottom: 1px;
    border-top: 30px solid white;
    padding: 10px 22px;
    box-sizing: border-box;
}
</style>