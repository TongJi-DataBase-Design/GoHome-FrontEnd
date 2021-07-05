
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },

  //注册账号路由
  {
    path:'/register',
    name:'Register',
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },

  {
    path:'/favoritesPage',
    name:'favoritesPage',
    component:()=>import('../views/favoritesPage.vue')
  },
  {
    path:'/stayCard',
    name:'stayCard',
    component:()=>import('../components/stayCard.vue')
  },
  {
    path:'/oneFavPage',
    name:'oneFavPage',
    component:()=>import('../views/oneFavPage.vue')
  },
  {
    path:'/historyDrawer',
    name:'historyDrawer',
    component:()=>import('../components/historyDrawer.vue')
  }
]

const router = new VueRouter({
  routes
})

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' || to.path==='/' || to.path==='/register') {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
 
    if (token === null || token === '') {
      next('/login');
    } else {
      next();
    }
  }
});

export default router
