import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { getToken } from '@/utils/auth'


// create an axios instance
const service = axios.create({
  //baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL:'https://8.136.17.54:6001/',
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000, // request timeout
  //withCredentials: true//携带cookie
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    if (localStorage.getItem('Authorization')) {
      config.headers.Token = localStorage.getItem('Authorization');
      console.log('传递token信息')
    }
 
    return config;
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)


// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    console.log('?',res)
    // if the custom code is not 200, it is judged as an error.
    if (res.errorCode != 200) {
      Message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      //判断token是否失效
      if(res.data.token==undefined&&res.msg==='invild'){
        //清除当前token信息
        store.commit('delLogin');
        //打开登录界面
        startLogin()
  
        return Promise.reject(new Error('您尚未登录'||'Error'))
      }

      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('www') // for debug
    return Promise.reject(error)
  }
  
)

export default service