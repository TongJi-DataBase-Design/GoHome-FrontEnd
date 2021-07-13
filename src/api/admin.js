import request from '@/utils/request'


export function allStay(data=1) {
    console.log("传递的数据为",data);
    return request({
      url: '/administrator/examineStay',
      method: 'get',
      params:{pageNum:data} 
    })
}

export function adLogin(data){
  let param = new URLSearchParams(data)
  return request({
    url:'/login/administrator',
    method:'post',
    data:param
  })
}