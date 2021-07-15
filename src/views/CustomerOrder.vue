<template>
    <div class="customerOrder">
        <div class="customerOrderTitle">
            <p class="titleText">用户订单</p>
        </div>
        <el-button type="text" @click="dialogVisible = true" style="float:right;width:80px;height:80px" v-loading="mapLoading">
                <i class="el-icon-map-location"></i>历史足迹
            </el-button>
        <div class="customerOrderList" v-loading="listLoading">
            <el-select class="select" v-model="sortOrder" placeholder="默认顺序" @change="sortOrderChange">
                <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value"></el-option>
            </el-select>
            <el-tabs class="tabs" v-model="customerOrderStation">
                <el-tab-pane v-for="(tabPane,index) in tabPanes" :key="index" :label="tabPane.label" :name="tabPane.name">
                    <OrderCardList v-if="selectCustomerOrder.length > 0" :orderList="selectCustomerOrder" :isCustomer="true"/>
                    <el-empty v-else :image="emptyImgUrl" :image-size="350" description="您还没有预订过房源，点击「开始探索」开启下一段旅程吧">
                        <el-button type="primary">
                            <a href="/" class="link">开始探索</a>
                        </el-button>
                    </el-empty>
                </el-tab-pane>
            </el-tabs>
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
    width: 650px;
    margin: 0 auto;
    position: relative;
}
.customerOrderTitle{
    width: 500px;
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
.customerOrderList{
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
.myDialog>>>.el-dialog__body{
    padding: 0px;
}
.myDialog>>>.el-dialog__header{
    padding: 0px;
}
.myDialog{
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
    border-radius: 20px;
}

</style>

<script>
import { GetCustomerOrderInfo } from '@/api/order';
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
            mapLoading: true,
            listLoading: true,
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
            customerOrderList: [],
            emptyImgUrl:"https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/暂无订单.png",
        }
    },
    created:function(){
        GetCustomerOrderInfo().then(response=>{
            this.customerOrderList=response.data.customerOrderList;
            this.customerOrderList.forEach((order)=>{
                order.startTime=order.startTime.substring(0,16).replace('T',' ');
                order.endTime=order.endTime.substring(0,16).replace('T',' ');
                var url='https://api.map.baidu.com/reverse_geocoding/v3/?ak=l2MUL47f5DKb6sK0nYdyzjuj46jlCM95&output=json&coordtype=wgs84ll&location=' + order.stayLatitude+','+order.stayLongitude;
                this.$jsonp(url).then((res)=>{
                    this.$set(order,'stayLocation',res.result.formatted_address);
                    this.$set(order,'stayProvince',res.result.addressComponent.province);
                    this.$set(order,'stayCity',order.stayProvince==('上海市'||'天津市'||'北京市'||'重庆市')?res.result.addressComponent.district:res.result.addressComponent.city);
                });
            });
        }).catch(()=>{
            console.log("fail");
            this.$message.error("错误:数据库连接错误");
        })
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
            this.customerOrderList.forEach((order)=>{
                var province = order.stayProvince;
                var city = order.stayCity;
                var day = this.$moment(order.endTime).diff(this.$moment(order.startTime),'day');
                var target = infos.find((info)=>info.province==province&&info.city==city);
                if(target){
                    target.times += 1;
                    target.days += this.$moment(day);
                }
                else{
                    infos.push({
                        province: province,
                        city: city,
                        times: 1,
                        days: day
                    })
                }
            })
            return infos;
        }
    },
    watch: {
        footPrintInfos: function () {
            var that = this;
            that.$nextTick(function () {
                that.listLoading=false;
                setTimeout(() => {
                    this.mapLoading=false;
                    }, 3000);
            });
        }
    },

}
</script>
