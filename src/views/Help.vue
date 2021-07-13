<template>
    <div class="help">
        <div class="helpTitle">
            <p class="titleText">帮助中心</p>
        </div>
        <el-tabs class="tabs" tab-position="left">
            <el-tab-pane v-for="(helpInfo,index) in helpInfos" :key="index" :label="helpInfo.tabLabel">
                <el-collapse v-model="activeName" accordion>
                    <el-collapse-item v-for="(colInfo,index) in helpInfo.colInfos" :key="index" :title="colInfo.title" :name="colInfo.name">
                        <p>{{colInfo.content}}</p>
                    </el-collapse-item>
                </el-collapse>
            </el-tab-pane> 
        </el-tabs>
        <img class="aside" :src="solveImgUrl">
    </div>
</template>

<style scoped>
.help{
    width: 1000px;
    margin: 0 auto;
    position: relative;
}
.helpTitle{
    width: 650px;
    height: 80px;
    top: 10px;
    left: 20px;
    position: absolute;
    line-height: 0px;
    text-align: left;
}
.titleText{
    font-size: 40px;
}
.tabs{
    width: 650px;
    height: 600px;
    top: 105px;
    left: 20px;
    position: absolute;
}
.aside{
    width: 275px;
    right: 25px;
    top: 50px;
    position: absolute;
}
</style>

<script>

export default {
    name: 'Help',
    data() {
        return{
            activeName: '1',
            helpInfos: [{
                tabLabel: '用户组',
                colInfos:[{
                    title: '什么是用户组',
                    name: '1',
                    content: '解释什么是用户组'
                },{
                    title: '如何升级用户组',
                    name: '2',
                    content: '解释如何升级用户组'
                }]
            },{
                tabLabel: '房东组',
                colInfos:[{
                    title: '什么是房东组',
                    name: '1',
                    content: '解释什么是房东组'
                },{
                    title: '如何升级房东组',
                    name: '2',
                    content: '解释如何升级房东组'
                }]
            },{
                tabLabel: '礼券',
                colInfos:[{
                    title: '什么是礼券',
                    name: '1',
                    content: '解释什么是礼券'
                },
                {
                    title: '如何获得礼券',
                    name: '2',
                    content: '解释如何获得礼券'
                },{
                    title: '礼券过期',
                    name: '3',
                    content: '解释礼券过期'
                }]
            }],
            solveImgUrl:require("../assets/help/帮助.png")
        }
    }
}
</script>
