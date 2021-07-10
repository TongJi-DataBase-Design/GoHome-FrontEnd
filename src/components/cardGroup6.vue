<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-09 16:46:21
 * @LastEditTime: 2021-07-10 21:02:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\cardGroup6.vue
-->

<template>
    <div class="six col-sm-2" id="six-width" >
        <router-link :to="'/product/' + info.id" class="main">
            <img :src="info.stayPhotos[0]">
            <div class="characteristic">{{ info.stayDescribe }}</div>
            <div class="stay-name">{{ info.stayName }}</div>
            <!-- <div class="six-color" :style="{ background: colors[info.color]}"></div> -->
            <div class="stay-cost">¥ {{ info.stayPrice }}起</div>
            <!-- <div class="six-add-cart" @click.prevent="handleCart">加入购物车</div> -->
        </router-link>
    </div>
</template>
<script>
    export default {
        props: {
            info: Object
        },
        data () {
            return {
                
            }
        },
        methods: {
            handleCart () {
                this.$store.commit('addCart', this.info.id);
            }
        }
    };
</script>
<style scoped>
    .six{
        padding: 0px;
        float: left;
    }
    .six img{
        height:20px;
        /* height:237px; */
    }
    .main{
        display: block;
        margin: 8px;
        width:200px;
        height:300px;
        border: 1px solid #dddee1;
        border-radius: 13px;
        overflow: hidden;
        background: #fff;
        /* text-align: center; */
        position: relative;
    }
    .main:hover{
        text-decoration: none;
    }
    .main img{
        width: 202px;
        height:202px;
        padding-bottom: 8px;
        object-fit:cover;
    }
    .characteristic{
        font-size: 12px !important;
        line-height: 1.33333em !important;
        font-weight: 800 !important;
        color: rgb(113, 78, 51)
    }
    .stay-name{
        font-size: 16px;
        font-weight: 800;
        line-height: 1.375;
        color: #484848 !important;
        color: #222;
    }
    .main:hover h4{
        color: #0070c9;
    }
    .six-color{
        display: block;
        width: 16px;
        height: 16px;
        border: 1px solid #dddee1;
        border-radius: 50%;
        margin: 6px auto;
    }
    .stay-cost{
        color: #484848 !important;
        margin-top: 6px;
        font-size: 14px !important;
        line-height: 1.28571em !important;
        font-weight: 400 !important;
    }
    .cart{
        display: none;
        padding: 4px 8px;
        background: #2d8cf0;
        color: #fff;
        font-size: 12px;
        border-radius: 3px;
        cursor: pointer;
        position: absolute;
        top: 5px;
        right: 5px;
    }
    .main:hover .cart{
        display: inline-block;
    }
</style>