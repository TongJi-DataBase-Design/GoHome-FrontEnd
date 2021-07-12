import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存储token
    Authorization:localStorage.getItem('Authorization')?localStorage.getItem('Authorization') : '',
    userName:localStorage.getItem('userName')?localStorage.getItem('userName'):'',
    userAvatar:localStorage.getItem('userAvatar')?localStorage.getItem('userAvatar'):'',
    userIdentity:localStorage.getItem('userIdentity')?localStorage.getItem('userIdentity'):'',
    rememberPhone:localStorage.getItem('rememberPhone')?localStorage.getItem('rememberPhone'):'',
    rememberPassword:localStorage.getItem('rememberPassword')?localStorage.getItem('rememberPassword'):'',
  },
  mutations: {
    //修改token，并把token存入localStorage
    changeLogin(state,user){
      state.Authorization=user.Authorization
      state.userName=user.userName
      state.userAvatar=user.userAvatar
      state.userIdentity=user.userIdentity //登录身份
      localStorage.setItem('Authorization',user.Authorization)
      localStorage.setItem('userName',user.userName)
      localStorage.setItem('userAvatar',user.userAvatar)
      localStorage.setItem('userIdentity',user.userIdentity)
    },
    rememberLogin(state,user){
      /*
      "记住我"功能
      */
      state.rememberPhone=user.rememberPhone
      state.rememberPassword=user.rememberPassword
      localStorage.setItem('rememberPhone',user.rememberPhone)
      localStorage.setItem('rememberPassword',user.rememberPassword)
    },
    delRemember(state){
      /*
      取消"记住我"功能
      */
      state.rememberPhone=''
      state.rememberPassword=''
      localStorage.removeItem('rememberPhone')
      localStorage.removeItem('rememberPassword')
    },
    //删除token
    delLogin(state){
      console.log('delete token')
      state.Authorization=''
      state.userName=''
      state.userAvatar=''
      state.userIdentity=''
      localStorage.removeItem('Authorization')
      localStorage.removeItem('userName')
      localStorage.removeItem('userAvatar')
      localStorage.removeItem('userIdentity')
    },
    SET_NAME:(state,name)=>{
      state.userName=name
    },
    SET_AVATAR:(state,avatar)=>{
      state.userAvatar=avatar
    }
  },
  actions: {
  },
  modules: {
  }
})
