import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//+引入组件库及相关样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VCharts from 'v-charts'
//让Vue使用ElementUI
Vue.use(ElementUI)
Vue.use(VCharts)



import VCharts from 'v-charts'
import {VueJsonp} from 'vue-jsonp'
//让Vue使用ElementUI
Vue.use(ElementUI)
Vue.use(VCharts)
Vue.use(VueJsonp)

import AmapVue from '@amap/amap-vue';
AmapVue.config.version = '2.0'; // 默认2.0，这里可以不修改
AmapVue.config.key = '821e69bf4e5bd4478796f525da03d3f9';
AmapVue.config.plugins = [
  'AMap.ToolBar',
  'AMap.MoveAnimation',
  'AMap.Geocoder', 
  'AMap.Geolocation'
  // 在此配置你需要预加载的插件，如果不配置，在使用到的时候会自动异步加载
];
Vue.use(AmapVue);



Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')