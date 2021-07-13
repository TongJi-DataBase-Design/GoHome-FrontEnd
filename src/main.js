import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//+引入组件库及相关样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'


//让Vue使用ElementUI
Vue.use(ElementUI)

import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
Vue.prototype.$moment = moment;//赋值使用


import axios from 'axios'//引入axios
Vue.prototype.$axios = axios;//把axios挂载到vue上

import '../node_modules/echarts/map/js/province/beijing.js' // 引入北京地图数据
import '../node_modules/echarts/map/js/province/fujian.js' // 引入福建地图数据
import '../node_modules/echarts/map/js/province/anhui.js' // 引入安徽地图数据
import '../node_modules/echarts/map/js/province/xinjiang.js' // 引入新疆地图数据
import '../node_modules/echarts/map/js/province/xizang.js' // 引入西藏地图数据

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
