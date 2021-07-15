<template>
    <div class="hostOrder ">
        <div class="hostOrderTitle">
            <p class="titleText">房东订单</p>
        </div>
        <div class="hostOrderList">
            <el-select class="select" v-model="sortOrder" placeholder="默认顺序" @change="sortOrderChange">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-tabs class="tabs" v-model="hostOrderStation">
                <el-tab-pane v-for="(tabPane,index) in tabPanes" :key="index" :label="tabPane.label" :name="tabPane.name">
                    <OrderCardList v-if="selectHostOrderList.length > 0" :orderList="selectHostOrderList" :isCustomer="false"/>
                    <el-empty v-else :image="emptyImgUrl" :image-size="350" description="暂时还没有人预订您的房源，点击[擦亮]来获取更多曝光吧">
                        <el-button type="primary">
                            <a href="/" class="link">擦亮</a>
                        </el-button>
                    </el-empty>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<style scoped>

.hostOrder{
    width: 650px;
    margin: 0 auto;
    position: relative;
    
 
}
.hostOrderTitle{
    width: 650px;
    height: 80px;
    top:60px;
    left:20px;
    position: absolute;
    line-height: 0px;
    text-align: left;
}
.titleText{
    font-size: 40px;
}
.hostOrderList{
    width: 650px;
    top:155px;
    left:20px;
    position: absolute;
}
.select{
    width:105px;
    float:right;
    line-height:30px;
}
.tabs{
    float:left;
    width:545px;
}
.link{
    text-decoration:none;
    color: white;
}
</style>

<script>
import { GetHostOrderInfo } from '@/api/order';
import OrderCardList from '@/components/OrderCardList.vue'

export default{
    name: 'HostOrder',
    components: {
        OrderCardList
    },
    data() {
        return {
            sortOrder: '',
            hostOrderStation: 'whole',
            options: [{
                value: 'startTime',
                label: '时间顺序'
            },{
                value: 'endTime',
                label: '时间逆序'
            },{
                value: 'totalCost',
                label: '大额优先'
            }],
            tabPanes: [{
                label: '全部订单',
                name: 'whole'
            },{
                label: '正在进行的订单',
                name: 'underway'
            },{
                label: '待办的订单',
                name: 'pending'
            },{
                label: '已完成的订单',
                name: 'completed'
            }],
            hostOrderList: [],
            emptyImgUrl:require("../assets/order/暂无订单.png"),
        }
    },
    created:function(){
        GetHostOrderInfo().then(response=>{
            this.hostOrderList=response.data.hostOrderList; 
            this.hostOrderList.forEach((order)=>{
                order.startTime=order.startTime.substring(0,16).replace('T',' ');
                order.endTime=order.endTime.substring(0,16).replace('T',' ');
            })
        }).catch(()=>{
            console.log("fail");
            this.$message.error("错误:数据库连接错误");
        })
    },
    methods: {
        sortOrderChange(val){
            var order = val=='startTime'?-1:1;
            this.hostOrderList.sort((a,b)=>{return a[val]<b[val]?order:-order;});
        },
    },
    computed:{
      selectHostOrderList: function(){
        var date = this.$moment(new Date()).format('YYYY-MM-DD HH:mm');
        var station = this.hostOrderStation;     
        return this.hostOrderList.filter(function(order){
            if(station=='whole')
                return true;
            else if(station=='underway')
                return order.startTime <= date && order.endTime >= date;
            else if(station=='pending')
                return order.startTime > date;
            else
                return order.endTime  < date;
        })
      }
    }
}
</script>
