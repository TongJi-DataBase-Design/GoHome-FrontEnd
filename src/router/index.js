import Vue from 'vue'
import VueRouter from 'vue-router'
// import { component } from 'vue/types/umd'
import Home from '../views/Home.vue'
import { MessageBox, Message } from 'element-ui'

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
  //收藏夹页面路由
  {
    path:'/favoritesPage',
    name:'favoritesPage',
    component: () => import( '../views/favoritesPage.vue')
  },
  //单收藏夹内房源集合路由
  {
    path:'/oneFavPage',
    name:'oneFavPage',
    component: () => import( '../views/oneFavPage.vue')
  },
  //历史记录路由
  {
    path:'/historyDrawer',
    name:'historyDrawer',
    component: () => import( '../components/historyDrawer.vue')
  },
  //主页路由
  {
    path:'/home',
    name:'home',
    component:()=>import('../views/Home.vue')
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
  || to.path==='/hostRegister'
  || to.path==='/license'
  || to.path==='/historyDrawer'
  ) {
    next();
  } else {
    let token = localStorage.getItem('Authorization');
 
    if (token === null || token === '') {
      if (to.path === '/forgetPassword'  
      || to.path==='/register'
      ) {
        
        next();
      }
      else{
        Message({
          message: '您需要先进行登录操作',
          type: 'warning'
        });
        //打开登录界面
        startLogin();
        //前往首页
        next({path: '/'});
      }

    } else {
      //登录状态下无法进入的页面
      if (to.path === '/forgetPassword'  
      || to.path==='/register'
      ) {
        Message({
          message: '请先退出登录',
          type: 'warning'
        });
        //前往首页
        console.log('hi');
        next({path: '/'});
      }
      else{
        next();
      }
      
    }
  }
});

export default router