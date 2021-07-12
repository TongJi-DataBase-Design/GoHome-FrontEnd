import Vue from 'vue'
import VueRouter from 'vue-router'
import staysView from '../views/staysView.vue'

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
    component: () => import('../views/Register.vue')
  },
  //房东注册账号路由
  {
    path:'/hostRegister',
    name:'hostRegister',
    component:()=>import('../views/hostRegister.vue')
  },
  //忘记密码路由
  {
    path:'/forgetPassword',
    name:'forgetPassword',
    component: () => import('../views/ForgetPassword.vue')
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
  || to.path==='/hostRegister'
  || to.path==='/license'
  || to.path==='/forgetPassword'
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
