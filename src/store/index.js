import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    Authorization:localStorage.getItem('Authorization')?localStorage.getItem('Authorization') : '',
    userName:localStorage.getItem('userName')?localStorage.getItem('userName'):'',
    userAvatar:localStorage.getItem('userAvatar')?localStorage.getItem('userAvatar'):'',
  },
  mutations: {
    changeLogin(state,user){
      state.Authorization=user.Authorization
      state.userName=user.userName
      state.userAvatar=user.userAvatar
      localStorage.setItem('Authorization',user.Authorization)
      localStorage.setItem('userName',user.userName)
      localStorage.setItem('userAvatar',user.userAvatar)
    },
    delLogin(state){
      console.log('delete token')
      state.Authorization=''
      state.userName=''
      state.userAvatar=''
      localStorage.removeItem('Authorization')
      localStorage.removeItem('userName')
      localStorage.removeItem('userAvatar')
    },
  },
  actions: {
  },
  modules: {
  }
})
