import request from '@/utils/request'

export function adLogin(data){
  let param = new URLSearchParams(data)
  return request({
    url:'/login/administrator',
    method:'post',
    data:param
  })
}

export function allStay(data=1) {
  return request({
    url: '/administrator/examineStay',
    method: 'get',
    params:{pageNum:data}
  })
}

export function stayNum() {
  return request({
    url: '/administrator/examineStay/all',
    method: 'get',
  })
}

export function stay(data) {
  return request({
    url: '/administrator/examineStay/one',
    method: 'get',
    params:{stayId:data} 
  })
}

export function stayResult(data){
  let param = new URLSearchParams(data)
  return request({
    url:'/administrator/examineStay/result',
    method:'post',
    data:param
  })
}


export function allReport(data=1) {
  return request({
    url: '/administrator/examineReport',
    method: 'get',
    params:{pageNum:data} 
  })
}

export function allNear(data=1) {
  return request({
    url: '/administrator/nearby',
    method: 'get',
    params:{pageNum:data} 
  })
}