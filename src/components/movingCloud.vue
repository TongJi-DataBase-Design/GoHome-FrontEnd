<!--
移动的云控件

-->
<template>
    <div>
        <el-image
        class="clouds"
        src="https://oliver-img.oss-cn-shanghai.aliyuncs.com/img/smallLogo.png" 
        >
        </el-image>
  
    </div>
</template>
  
  
<style scoped>
.clouds{
    width:5%;
    margin-top:3%;
    /* x=0代表移回原位置 */
    transform: translateX(0);
    /* 移回也需要0.4s时间过渡 */
    transition: transform 0.4s;
}
.clouds:hover{
    /* x=-10px代表左移10px */
    transform: translateX(-10px);
    /* 0.4s完成transform移动效果*/
    transition: transform 0.4s;

}
</style>

<script>
export default {
    name: 'movingCloud'
}
</script>