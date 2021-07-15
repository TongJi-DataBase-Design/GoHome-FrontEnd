import Vue from 'vue'
import VueRouter from 'vue-router'
import staysView from '../views/staysView.vue'
import Home from '../views/Home.vue'
import UserInfoPage from "../views/UserInfoPage";
import UserInfoMessage from "../components/UserInfoMessage";
import { MessageBox, Message } from 'element-ui'


Vue.use(VueRouter)

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/staysView',
    name: 'staysView',
    component: staysView
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
  // 展示房源详细信息路由
  {
    path:'/StayInfo',
    name: 'Stayinfo',
    component: () => import('../views/StayInfo.vue')
  },
  // 支付界面路由
  {
    path: '/PaymentPage',
    name: 'PaymentPage',
    component: ()=> import('../views/PaymentPage.vue')
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

  
    
  //房东注册账号路由
  {
    path: '/help',
    name: 'Help',
    component: () =>import('../views/Help.vue')
  },
  {
    path: '/coupon',
    name: 'Coupon',
    component: () =>import('../views/Coupon.vue')
  },
  {
    path: '/hostOrder',
    name: 'HostOrder',
    component: () =>import('../views/HostOrder.vue')
  },

  //sbq房源信息界面路由
  // {
  //   path:'/StayInfo',
  //   name:'Stayinfo',
  //   component:()=>import("../views/StayInfo.vue")
  // }

  {
    path: '/customerOrder',
    name: 'CustomerOrder',
    component: () =>import('../views/CustomerOrder.vue')
  },

  //历史足迹路由
  {
    path: '/historyDrawer',
    name:'historyDrawer',
    component:()=>import('../views/historyDrawer.vue')
  },

  //收藏夹路由
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
]

const router = new VueRouter({
  routes
})

// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  console.log('to:',to)
  if (to.path === '/login' 
  || to.path==='/' 
  || to.path==='/hostRegister'
  || to.path==='/license'
  || to.path==='/historyDrawer'
  || to.path==='/staysView'
  || to.path==='/help'
  || to.path==='/StayInfo'
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
        console.log('to',to);
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
