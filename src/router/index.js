import Vue from 'vue'
import VueRouter from 'vue-router'
import staysView from '../views/staysView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'staysView',
    component: staysView
  },
    
]

const router = new VueRouter({
  routes
})

export default router
