/*
和房东有关的api接口
*/

import request from '@/utils/request'

export function hostLogin(data) {
    /*
    房东登录
    */
  
    let param = new URLSearchParams(data)
  
    return request({
      url: '/login/host',
      method: 'post',
      data:param
    })
  }

  
export function hostRegister(data){
  /*
  房东注册账号
  */
 let param=new URLSearchParams(data)

 return request({
   url:'/register/host',
   method:'post',
   data:param
 })
}



export function phoneUnique(data){
  /*
  检验房东手机号是否被注册过
  未被注册过，则返回true
  */
  let param=new URLSearchParams(data)

  return request({
    url:'/host/phone',
    method:'post',
    data:param
  })
}