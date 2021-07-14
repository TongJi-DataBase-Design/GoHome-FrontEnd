import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

//+引入组件库及相关样式
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入字体
import './assets/css/font.css'

//引入高德地图API
import VueAMap from 'vue-amap'
//让Vue使用高德地图API
Vue.use(VueAMap)
VueAMap.initAMapApiLoader({
  key: 'fc84f0a345af3253026ce42aca67894b',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch',
   'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor',
   'AMap.Geocoder', 'AMap.Geolocation'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4',
  uiVersion: '1.0.11'
});

//让Vue使用ElementUI
Vue.use(ElementUI)

import moment from 'moment'; //导入模块
moment.locale('zh-cn'); //设置语言 或 moment.lang('zh-cn'); 
Vue.prototype.$moment = moment;//赋值使用

import { VueJsonp } from 'vue-jsonp'    // 网上很多博客引用不加{}，会报错
Vue.use(VueJsonp)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
