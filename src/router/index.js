import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path:'/interface',
    name:'Inter',
    component: () => import(
      '../views/Interface.vue'),
    children: [
      {
        path: '/examine',
        name: 'Examine',
        component:() => import(
          '../views/Examine.vue')
      },
      {
        path: '/near',
        name: 'Near',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Near.vue')
      },
      {
        path:'/report',
        name:'Report',
        component: () => import(
          '../views/Report.vue')
      },
      {
        path:'/information',
        name:'Info',
        component: () => import(
          '../views/Info.vue')
      },
      {
        path:'/reportInformation',
        name:'reportInfo',
        component: () => import(
          '../components/ReportInfo.vue')
      },
      {
        path:'/examineInformation',
        name:'examineInfo',
        component: () => import(
          '../components/ExamineInfo.vue')
      },
      {
        path:'/nearInformation',
        name:'nearInfo',
        component: () => import(
          '../components/NearInfo.vue'),
      }
    ]
  },
  {
    path: '/adminlogin',
    name: 'adminlogin',
    component: () => import('../views/AdminLogin.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.path === '/adminlogin' ){
    console.log('I am here;')
    next();
  }
  else{
    let token = localStorage.getItem('Authorization');

    if (token === null || token === '') {
      next({path: '/adminlogin'});
    }
    else{
      next();
    }
  }
});

export default router
