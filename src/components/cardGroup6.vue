<!--
 * @Author: 陈垲昕
 * @Date: 2021-07-09 16:46:21
 * @LastEditTime: 2021-07-12 20:12:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\components\cardGroup6.vue
-->

<template>
    
    <div class="six col-sm-2" id="six-width" >
        <router-link :to="'/product/' + info.id" class="main">
            <img :src="this.url">
            <div class="characteristic">{{ info.stayCharcateristic.slice(0,12)+(info.stayCharcateristic.length>=13?"...":"") }}</div>
            <div class="stay-name">{{ info.stayName.slice(0,26)+(info.stayName.length>=20?"...":"") }}</div>
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
                url:this.info.stayPhoto,
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
        margin: 15px;
        width:170px;
        height:348px;
        border: 3px solid #dddee1;
        max-width: 202px;
        border-radius: 5px;
        overflow: hidden;
        background: rgb(248, 248, 248,0.95);
        margin-bottom: 70px;
        position: relative;
    }
    .main:hover{
        text-decoration: none;

        box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
    }
    .main img{
        width: 99%;
        height:202px;
        padding-bottom: 8px;
        object-fit:cover;
    }
    .characteristic{
        float: left;
        margin-left:8px;
        font-size: 12px !important;
        line-height: 1.33333em !important;
        font-weight: 800 !important;
        color: rgb(113, 78, 51)
    }
    .stay-name{
        float: left;
        position:relative;
        text-align: left;
        text-indent: 3px;
        letter-spacing: 0.1px;
        margin:7px;
        font-size: 16px;
        font-weight: 780;
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
        position:absolute;
        margin-left:8px;
        color: #484848 !important;
        margin-top: 100px;
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