import Vue from 'vue'
import VueRouter from 'vue-router'
import UserInfoPage from '../views/UserInfoPage.vue'
import UserInfoBlock from "../components/UserInfoBlock";
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'UserInfoPage',
    component: UserInfoPage
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path:'/components',
    name:UserInfoBlock,
    component: UserInfoBlock
  }
]

const router = new VueRouter({
  routes
})

export default router
