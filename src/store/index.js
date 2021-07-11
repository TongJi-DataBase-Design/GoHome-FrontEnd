
import Vue from 'vue'
import Vuex, { Store } from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //存储token
    Authorization:localStorage.getItem('Authorization')?localStorage.getItem('Authorization') : '',
    userName:localStorage.getItem('userName')?localStorage.getItem('userName'):'',
    userAvatar:localStorage.getItem('userAvatar')?localStorage.getItem('userAvatar'):'',
    userIdentity:localStorage.getItem('userIdentity')?localStorage.getItem('userIdentity'):'',
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
