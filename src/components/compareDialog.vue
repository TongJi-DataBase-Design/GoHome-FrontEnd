<template>
    <div id="compareDialog">
        <el-dialog
            title="对比" 
            :visible.sync="dialogVisible"
            width="30%"
            :before-close="handleClose"
            class="dialogStyle"
            >
            <el-divider><i class="el-icon-warning-outline"></i></el-divider>

            <!--分割，左右各占一半-->
            <el-container>
                <el-main>
                    我是a
                    
                </el-main>
                <el-main>
                    我是b
                </el-main>
            </el-container>

            <span slot="footer" class="dialog-footer">
                <el-pagination>
                    
                </el-pagination>
            </span>
        </el-dialog>
    </div>
</template>

<script>
export default{
    props:{
        "dialogVisible":{
            Type:Boolean,
            default:false
        },
    },
}
</script>


<style scoped>
@import url("../assets/css/font.css");
.dialogStyle >>> .el-dialog{
    box-shadow: rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px,
        rgba(255, 255, 255, 0.08) 0px 1px 0px inset !important;
    border-radius: 10px !important;
    max-height:530px;
}
.dialogStyle >>>.el-dialog__title{
    font-size:22px;
    font-family: "FZHEIBJW";
}
.dialogStyle >>>.el-dialog__body{
    padding: 10px 10px 10px 10px !important;

}
.dialogStyle >>>.el-dialog__footer{
    text-align: center;
}
.el-card >>>.el-card__body{
    padding :0px !important;
}
.el-card{
    width: 64px;
    height: 64px;
    float: left ;
    display: block;  
}
.nameStyle{
    font-size: 18px;
    padding:3px 3px;
    font-family:"FZFWZhu";
    margin:1px;
    word-wrap: break-word;
    text-align: left;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 320px;
}
.infoStyle{
    font-size: 10px;
    color: #999;
    padding:3px 3px;
    font-family:"Lato-Bold","FZHeiBJW";
    margin:1px;
    word-wrap: break-word;
    text-align: left;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    width: 320px;
}
    
</style>
    