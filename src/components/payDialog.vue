<template>
    <div id="payDialog">
        <el-dialog
            title="支付宝App扫码支付" 
            :visible.sync="orderCreated"
            width="30%"
            class="dialogStyle" 
            :before-close="handleClose"         
            >
            
            <el-divider style="margin:12px;"><el-image src=
            "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/e395e1d6dc6eff3aefee87eb763a37a7.png" style="height:'64px'; width:64px;" fit=fill></el-image></el-divider>
           <div class="qrCode">
              <VueQr ref="Qrcode"
                    v-if="orderCreated"
                    :text="payObj.text"
                    :logoSrc="payObj.logo"
                    qid="testQrId"></VueQr>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import VueQr from 'vue-qr';
export default{
    components:{
        VueQr
    },
    props:{
        orderCreated:{
            Type:Boolean,
            default:false
        },
        payObj:{
            Type:Object,
            default:{
            text: "",
            logo: "https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/biglogo.png"
            }
        },
    },
    methods:{
         handleClose(done){
            this.$emit("changeOrderCreated");
        }
    }
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
