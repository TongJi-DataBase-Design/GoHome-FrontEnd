/*
 * @Author: your name
 * @Date: 2021-07-05 19:12:01
 * @LastEditTime: 2021-07-06 00:22:43
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\api\customer.js
 */

/*
和顾客有关的api接口
*/

import request from '@/utils/request'

export function customerLogin(data) {
  /*
  顾客登录
  */

  let param = new URLSearchParams(data)
console.log("吃什么");
  return request({
    url: '/login/customer',
    method: 'post',
    data:param
  })
}

export function customerRegister(data){
  /*
  顾客注册账号
  */
 let param=new URLSearchParams(data)

 return request({
   url:'/register/customer',
   method:'post',
   data:param
 })
}



export function phoneUnique(data){
  /*
  检验顾客手机号是否被注册过
  未被注册过，则返回true
  */
  let param=new URLSearchParams(data)

  return request({
    url:'/customer/phone',
    method:'post',
    data:param
  })
}

export function getFavorite() {
  return request({
    url: '/CustomerFavorite',
    method: 'get',
  })
}

export function testToken() {
  /*
  返回当前登录的用户的创建时间
  */
  return request({
    url: '/customer/createtime',
    method: 'get'
  })
}