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



export function hostPhoneUnique(data){
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

export function changeHostPassword(data){
  /*
  修改房东账号密码
  返回修改状态
  */
  let param=new URLSearchParams(data)

  return request({
    url:'/host/changepassword',
    method:'post',
    data:param
  })
}

export function getHostPageInfo(data){
    /*获取房东的基本信息*/
    console.log("成功进入获取房东信息")
    return request({
        url: '/Host/hostInfo',
        method: 'get',
        params:data
    })
}


export function updateHostNickName(data) {
    /*
    房东更改昵称
    */

    let param = new URLSearchParams(data)

    return request({
        url: '/Host/hostNickName',
        method: 'put',
        data:param
    })
}


export function updateHostAvatar(data) {
    /*
    房东更改昵称
    */

    let param = new URLSearchParams(data)

    return request({
        url: '/Host/hostAvatar',
        method: 'put',
        data:param
    })
}

export function DeleteStay(data) {
    console.log("进入删除房源的调用")
    return request({
        url: '/Stay/delStayById',
        method: 'delete',
        params:{stayId:data}
    })
}

export function getAllStayData(data){
    /*获取房东的基本信息*/
    console.log("成功进入获取房源所有信息")
    return request({
        url: '/stay/infos',
        method: 'get',
        params:data
    })
}