import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import UserInfoPage from "../views/UserInfoPage";
import UserInfoMessage from "../components/UserInfoMessage";
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
    path: '/userinfopage',
    name: 'UserInfoPage',
    component: () =>import('../views/UserInfoPage.vue')
  },
  {
    path: '/hostinfopage',
    name: 'HostInfoPage',
    component: () =>import('../views/HostInfoPage.vue')
  },
  {
    path: '/',
    name: 'UserInfoMesssage',
    component: ()=>import(UserInfoMessage)
  },
  {
    path:'/favoritePage',
    name:'favoritePage',
    component: () => import( '../views/favoritesPage.vue')
  },
  {
    path:'/oneFavPage',
    name:'oneFavPage',
    component: () => import( '../views/oneFavPage.vue')
  },

  {
    path:'/historyDrawer',
    name:'historyDrawer',
    component: () => import( '../components/historyDrawer.vue')
  },
  {
    path:'/license',
    name:'License',
    component:()=>import('../views/License.vue')
  },
]

const router = new VueRouter({
  routes
})

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === '/login' 
  || to.path==='/' 
  || to.path==='/register'
  || to.path==='/license'
  ) {
    next();
  } else {
    let token = localStorage.getItem('Authorization');

    if (token === null || token === '') {
      //打开登录界面
      startLogin();
      //前往首页
      //this.$router.replace('/');

      
    } else {
      next();
    }
  }
});

export default router
