<template>
    <div class="customerOrder">
        <div class="customerOrderTitle">
            <p class="titleText">用户订单</p>
        </div>
        <div class="customerOrderList">
            <el-select class="select" v-model="sortOrder" placeholder="默认顺序" @change="sortOrderChange">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-tabs class="tabs" v-model="customerOrderStation">
                <el-tab-pane v-for="(tabPane,index) in tabPanes" :key="index" :label="tabPane.label" :name="tabPane.name">
                    <OrderCardList v-if="selectCustomerOrder.length > 0" :orderList="selectCustomerOrder" :canReport="true"/>
                    <el-empty v-else :image="emptyImgUrl" :image-size="350" description="您还没有预订过房源，点击「开始探索」开启下一段旅程吧">
                        <el-button type="primary">
                            <a href="/" class="link">开始探索</a>
                        </el-button>
                    </el-empty>
                </el-tab-pane>
            </el-tabs>
        </div>
        <div class="aside">
            <el-button type="text" @click="dialogVisible = true">历史足迹地图</el-button>
        </div>
        <div class="myDialog">
            <el-dialog :visible.sync="dialogVisible" width="1000px">
                <FootPrintMap :footPrintInfos="footPrintInfos"/>
            </el-dialog>
        </div>
    </div>
</template>

<style scoped>
.customerOrder{
    width: 1000px;
    margin: 0 auto;
    position: relative;
}
.customerOrderTitle{
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
.customerOrderList{
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
.aside{
    width: 275px;
    right: 25px;
    top: 50px;
    position: absolute;
}
.myDialog>>>.el-dialog__body{
    padding: 0px;
}
.myDialog>>>.el-dialog__header{
    padding: 0px;
}

</style>

<script>
import OrderCardList from '@/components/OrderCardList.vue'
import FootPrintMap from '@/components/FootPrintMap.vue'

export default{
    name: 'customerOrder',
    components: {
        OrderCardList,
        FootPrintMap
    },
    data() {
        return {
            sortOrder: '',
            customerOrderStation: 'whole',
            dialogVisible: false,
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
            customerOrderList: [{
                    orderId:'1',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼同济大学友园20楼同济大学友园20楼同济大学友园20楼',
                    stayProvince:'上海市',
                    stayCity:'嘉定区',
                    stayLocation:'曹安公路4800号',
                    startTime: '2021-06-02 00:00',
                    endTime: '2021-08-01 00:00',
                    totalCost:2000,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 5,
                    commentText:'很棒的住宿体验',
                    reportState: 0,
                    reportReason: '',
                    reportReply: ''
                },{
                    orderId:'2',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海市',
                    stayCity:'嘉定区',
                    stayLocation:'曹安公路4800号',
                    startTime: '2021-06-03 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:500,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 5,
                    commentText:'很棒的住宿体验',
                    reportState: 1,
                    reportReason: '欸，我就是举报，就是玩儿。',
                    reportReply: ''
                },{
                    orderId:'3',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海市',
                    stayCity:'嘉定区',
                    stayLocation:'曹安公路4800号',
                    startTime: '2021-06-04 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:1000,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 0,
                    commentText:'',
                    reportState: 2,
                    reportReason: '欸，我就是举报，就是玩儿。',
                    reportReply: '你吼辣么大声音干什么嘛'
                },{
                    orderId:'4',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海市',
                    stayCity:'嘉定区',
                    stayLocation:'曹安公路4800号',
                    startTime: '2021-06-01 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:1500,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 0,
                    commentText:'',
                    reportState: 0,
                    reportReason: '',
                    reportReply: ''
                },{
                    orderId:'5',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海市',
                    stayCity:'杨浦区',
                    stayLocation:'曹安公路4800号',
                    startTime: '2021-06-02 00:00',
                    endTime: '2021-08-01 00:00',
                    totalCost:2000,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 5,
                    commentText:'很棒的住宿体验',
                    reportState: 0,
                    reportReason: '',
                    reportReply: ''
                },{
                    orderId:'6',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海市',
                    stayCity:'杨浦区',
                    stayLocation:'曹安公路4800号',
                    startTime: '2021-06-03 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:500,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 5,
                    commentText:'很棒的住宿体验',
                    reportState: 0,
                    reportReason: '',
                    reportReply: ''
                },{
                    orderId:'7',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海市',
                    stayCity:'嘉定区',
                    stayLocation:'曹安公路4800号',
                    startTime: '2021-06-04 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:1000,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 0,
                    commentText:'',
                    reportState: 0,
                    reportReason: '',
                    reportReply: ''
                },{
                    orderId:'8',
                    stayImg: [
                        require("../assets/order/房子1.png"),
                        require("../assets/order/房子2.png"),
                        require("../assets/order/房子3.png")
                    ],
                    stayURL: 'url',
                    stayName: '同济大学友园20楼',
                    stayProvince:'上海市',
                    stayCity:'嘉定区',
                    stayLocation:'曹安公路4800号',
                    startTime: '2021-06-01 00:00',
                    endTime: '2021-07-01 00:00',
                    totalCost:1500,
                    name: '张三',
                    photo: require("../assets/order/头像.png"),
                    accountUrl: 'url',
                    commentStars: 0,
                    commentText:'',
                    reportState: 0,
                    reportReason: '',
                    reportReply: ''
                }],
            emptyImgUrl:require("../assets/order/暂无订单.png"),
        }
    },
    methods: {
        sortOrderChange(val){
            var order = val=='startTime'?-1:1;
            this.customerOrderList.sort((a,b)=>{return a[val]<b[val]?order:-order;});
        },
    },
    computed:{
        selectCustomerOrder: function(){
            var date = this.$moment(new Date()).format('YYYY-MM-DD HH:mm');
            var station = this.customerOrderStation;
            return this.customerOrderList.filter(function(order){
                if(station=='whole')
                    return true;
                else if(station=='underway')
                    return order.startTime <= date && order.endTime >= date;
                else if(station=='pending')
                    return order.startTime > date;
                else
                    return order.endTime  < date;
        })
      },
      footPrintInfos: function(){
            var infos = new Array();
            for(var i = 0; i < this.customerOrderList.length;++i)
            {
                var province = this.customerOrderList[i].stayProvince;
                var city = this.customerOrderList[i].stayCity;
                var day = this.$moment(this.customerOrderList[i].endTime).diff(this.$moment(this.customerOrderList[i].startTime),'day');
                var target = infos.find((info)=>info.province==province&&info.city==city);
                if(target)
                {
                    target.times += 1;
                    target.days += this.$moment(day);
                }
                else
                {
                    infos.push({
                        province: province,
                        city: city,
                        times: 1,
                        days: day
                    })
                }
            }
            return infos;
        }
    }
}
</script>
