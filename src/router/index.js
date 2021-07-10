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
  
  //房源注册路由
  {
    path:"/become-a-host/type",
    component:()=>
      import("../views/become-a-host/type.vue")
  },
  {
    path:"/become-a-host/roomInfo",
    component:()=>
      import("../views/become-a-host/roomInfo.vue")
  },
  {
    path:"/become-a-host/facilityInfo",
    component:()=>
      import("../views/become-a-host/facilityInfo.vue")
  },
  {
    path:"/become-a-host/addrInfo",
    component:()=>
      import("../views/become-a-host/addrInfo.vue")
  },
  
  {
    path:"/become-a-host/disInfo",
    component:()=>
      import("../views/become-a-host/disInfo.vue")
  },
  {
    path:"/become-a-host/stayInfo",
    component:()=>
      import("../views/become-a-host/stayInfo.vue")
  },
  {
    path:"/become-a-host/commit",
    component:()=>
      import("../views/become-a-host/commit.vue")
  },
  {
    path:"/become-a-host/roomImg",
    component:()=>
      import("../views/become-a-host/roomImg.vue")
  },

  {
    path:"/become-a-host/stayCategory",
    component:()=>
      import("../views/stayCategory.vue")
  },

  
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

