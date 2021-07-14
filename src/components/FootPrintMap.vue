<template>
    <div id="app">
        <div id="chinaMap" ref="myEchart"></div>
        <div id="myChart"></div>
    </div>
</template>

<style scoped>
#chinaMap{
    height:800px;
    width:1000px;
}
#myChart{
    width: 100%;
}
</style>

<script>
import echarts from 'echarts';
require('../../node_modules/echarts/map/js/china') // 引入中国地图数据
require('../../node_modules/echarts/map/js/province/anhui')
require('../../node_modules/echarts/map/js/province/aomen')
require('../../node_modules/echarts/map/js/province/beijing')
require('../../node_modules/echarts/map/js/province/chongqing')
require('../../node_modules/echarts/map/js/province/fujian')
require('../../node_modules/echarts/map/js/province/gansu')
require('../../node_modules/echarts/map/js/province/guangdong')
require('../../node_modules/echarts/map/js/province/guangxi')
require('../../node_modules/echarts/map/js/province/guizhou')
require('../../node_modules/echarts/map/js/province/hainan')
require('../../node_modules/echarts/map/js/province/hebei')
require('../../node_modules/echarts/map/js/province/heilongjiang')
require('../../node_modules/echarts/map/js/province/henan')
require('../../node_modules/echarts/map/js/province/hubei')
require('../../node_modules/echarts/map/js/province/hunan')
require('../../node_modules/echarts/map/js/province/jiangsu')
require('../../node_modules/echarts/map/js/province/jiangxi')
require('../../node_modules/echarts/map/js/province/jilin')
require('../../node_modules/echarts/map/js/province/liaoning')
require('../../node_modules/echarts/map/js/province/neimenggu')
require('../../node_modules/echarts/map/js/province/ningxia')
require('../../node_modules/echarts/map/js/province/qinghai')
require('../../node_modules/echarts/map/js/province/shandong')
require('../../node_modules/echarts/map/js/province/shanghai')
require('../../node_modules/echarts/map/js/province/shanxi')
require('../../node_modules/echarts/map/js/province/shanxi1')
require('../../node_modules/echarts/map/js/province/sichuan')
require('../../node_modules/echarts/map/js/province/taiwan')
require('../../node_modules/echarts/map/js/province/tianjin')
require('../../node_modules/echarts/map/js/province/xianggang')
require('../../node_modules/echarts/map/js/province/xinjiang')
require('../../node_modules/echarts/map/js/province/xizang')
require('../../node_modules/echarts/map/js/province/yunnan')
require('../../node_modules/echarts/map/js/province/zhejiang')

export default{
    name: 'FootPrintMap',
    props: {
        footPrintInfos: Array
    },
    data(){
        return{
            keyValue:'居住次数',
            curMap:'china'
        }
    },
    methods: {
        chinamap(){
            let that = this;
            var myChart = echarts.init(document.getElementById("chinaMap"));
            window.addEventListener('resize', ()=>myChart.resize())
		    var option= {
                backgroundColor: '#87CEFA',  //设置背景颜色
                title: {
                    show:true,
                    text: (that.curMap=='china'?'中国':that.curMap),
                    subtext: this.keyValue,
                    left:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: function(data){
                        if(!isNaN(data.value) ){
                            return data.name+"："+data.value;
                        }
                    }
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    left: 'right',
                    top: 'center',
                    feature: {
                        myKeyValueChanger: {
                            show: true,
                            title: that.keyValue=='居住次数'?'居住天数':'居住次数',
                            icon: 'path//M950.4 361.6l-288-288c-12.8-12.8-32-12.8-44.8 0s-12.8 32 0 44.8l233.6 233.6L96 352c-19.2 0-32 12.8-32 32s12.8 32 32 32l832 0c12.8 0 25.6-6.4 28.8-19.2C963.2 384 960 371.2 950.4 361.6zM928 608 96 608c-12.8 0-25.6 6.4-28.8 19.2C60.8 640 64 652.8 73.6 662.4l288 288c6.4 6.4 16 9.6 22.4 9.6s16-3.2 22.4-9.6c12.8-12.8 12.8-32 0-44.8L172.8 672 928 672c19.2 0 32-12.8 32-32S947.2 608 928 608z',
                            onclick: function (){
                                that.keyValue=(that.keyValue=='居住次数'?'居住天数':'居住次数');
                                option.title.subtext=that.keyValue;
                                myChart.clear();
                                myChart.setOption(option,true);
                            }
                        },
                        dataView: {
                            readOnly:true,
                            title:'查看数据表',
                            optionToContent: function(opt){
                                var table = '<table><tbody><tr><th>'+(opt.series[0].map=='china'?'省份':'城市') + '</th><th>' +opt.series[0].name+'</th></tr>';
                                for(var i = 0; i < opt.series[0].data.length; ++i)
                                    table += '<tr><td>' + opt.series[0].data[i].name +'</td><td>' + opt.series[0].data[i].value +'</td></tr>'
                                table += '</tbody></table>';
                                return table;
                            }
                        },
                        restore: {
                            show:false
                        },
                        saveAsImage: {}
                    }
                },
                //左侧小导航图标
                visualMap: {
                    show : true,
                    x: 'left',
                    y: 'bottom',
                    splitList: [
                        {start: 2, end:20},
                        {start: 0, end: 2},
                        {start: 0, end: 0},
                    ],
                    color: ['#1E90FF', '#7FFFAA', '#F0E68C']
                },
                //配置属性
                series: [{
                    name: '数量',
                    type: 'map',
			        map: 'china', 
                    roam: false,
                    label: {
                        show: false
                    },
                    itemStyle:{
                        areaColor:'#F0E68C'
                    },
                data:this.selectInfos
                }]
            };
            myChart.setOption(option);
            myChart.getZr().on('click', params => {
                var option = myChart.getOption();
                if(!params.target && option.series[0].map!='china'){
                    option.series[0].map = 'china';
                    that.curMap='china';
                    option.title[0].text='中国';
                    option.series[0].data=that.selectInfos;
					myChart.clear();
                    myChart.setOption(option,true); 
                }
            });
	        myChart.on('click', function (chinaParam) {
                var option = myChart.getOption();
                if(option.series[0].map=='china' && !isNaN(chinaParam.value)){
                    option.series[0].map = chinaParam.name;
                    that.curMap=chinaParam.name;
                    option.title[0].text=that.curMap;
                    option.series[0].data=that.selectInfos;
					myChart.clear();
                    myChart.setOption(option,true); 
                }          
            });
        }
   },
   mounted() {
	    this.chinamap();
    },
   computed: {
        selectInfos: function() {
            var infos = new Array();
            if(this.curMap=='china')
                for(var i = 0; i < this.footPrintInfos.length;++i){
                    var province=this.footPrintInfos[i].province.substring(0,this.footPrintInfos[i].province.length-1);
                    var value=this.keyValue=='居住次数'?this.footPrintInfos[i].times:this.footPrintInfos[i].days;
                    var target=infos.find((info)=>info.name==province);
                    if(target)
                        target.value+=value;
                    else
                        infos.push({name:province,value:value});
               }
            else
                for(var i = 0; i < this.footPrintInfos.length;++i)
                    if(this.footPrintInfos[i].province.substring(0,this.footPrintInfos[i].province.length-1)==this.curMap)
                        infos.push({
                            name: this.footPrintInfos[i].city,
                            value: this.keyValue=='居住次数'?this.footPrintInfos[i].times:this.footPrintInfos[i].days
                        })
            return infos;
       }
   }
}
</script>
