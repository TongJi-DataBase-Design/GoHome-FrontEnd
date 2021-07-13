<template>
    <div class="hostOrder">
        <div class="hostOrderTitle">
            <p class="titleText">房东订单</p>
        </div>
        <div class="hostOrderList">
            <el-select class="select" v-model="sortOrder" placeholder="默认顺序" @change="sortOrderChange">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-tabs class="tabs" v-model="hostOrderStation">
                <el-tab-pane v-for="(tabPane,index) in tabPanes" :key="index" :label="tabPane.label" :name="tabPane.name">
                    <OrderCardList v-if="selectHostOrderList.length > 0" :orderList="selectHostOrderList"/>
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
    width: 1000px;
    margin: 0 auto;
    position: relative;
}
.hostOrderTitle{
    width: 650px;
    height: 80px;
    top:10px;
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
    top:105px;
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
            hostOrderList: [{
                    orderId:'1',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼同济大学友园20楼同济大学友园20楼同济大学友园20楼',
                    stayProvince:'上海省',
                    stayCity:'上海市',
                    stayLocation:'嘉定区曹安公路4800号',
                    startTime: '2021-06-02 00:00',
                    endTime: '2021-08-01 00:00',
                    totalCost:2000,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 5,
                    commentText:'很棒的住宿体验'
                },{
                    orderId:'2',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海省',
                    stayCity:'上海市',
                    stayLocation:'嘉定区曹安公路4800号',
                    startTime: '2021-06-03 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:500,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 5,
                    commentText:'很棒的住宿体验'
                },{
                    orderId:'3',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海省',
                    stayCity:'上海市',
                    stayLocation:'嘉定区曹安公路4800号',
                    startTime: '2021-06-04 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:1000,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 0,
                    commentText:'很棒的住宿体验'
                },{
                    orderId:'4',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海省',
                    stayCity:'上海市',
                    stayLocation:'嘉定区曹安公路4800号',
                    startTime: '2021-06-01 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:1500,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 0,
                    commentText:'很棒的住宿体验'
                },{
                    orderId:'5',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海省',
                    stayCity:'上海市',
                    stayLocation:'嘉定区曹安公路4800号',
                    startTime: '2021-06-02 00:00',
                    endTime: '2021-08-01 00:00',
                    totalCost:2000,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 5,
                    commentText:'很棒的住宿体验'
                },{
                    orderId:'6',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海省',
                    stayCity:'上海市',
                    stayLocation:'嘉定区曹安公路4800号',
                    startTime: '2021-06-03 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:500,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 5,
                    commentText:'很棒的住宿体验'
                },{
                    orderId:'7',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海省',
                    stayCity:'上海市',
                    stayLocation:'嘉定区曹安公路4800号',
                    startTime: '2021-06-04 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:1000,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 0,
                    commentText:'很棒的住宿体验'
                },{
                    orderId:'8',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海省',
                    stayCity:'上海市',
                    stayLocation:'嘉定区曹安公路4800号',
                    startTime: '2021-06-01 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:1500,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 0,
                    commentText:'很棒的住宿体验'
                }],
            emptyImgUrl:require("../assets/order/暂无订单.png"),
        }
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
