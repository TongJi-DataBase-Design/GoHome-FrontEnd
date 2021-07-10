/*
和房东有关的api接口
*/

import request from '@/utils/request'

export function customerLogin(data) {
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