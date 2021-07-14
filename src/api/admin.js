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

export function reportNum() {
  return request({
    url: 'administrator/examineReport/all',
    method: 'get',
  })
}

export function report(data) {
  return request({
    url: '/administrator/examineReport/one',
    method: 'get',
    params:{reportId:data} 
  })
}



export function reportResult(data){
  let param = new URLSearchParams(data)
  return request({
    url:'/administrator/examineReport/result',
    method:'post',
    data:param
  })
}


export function allNear(data=1) {
  return request({
    url: '/administrator/nearby',
    method: 'get',
    params:{pageNum:data} 
  })
}

export function nearNum() {
  return request({
    url: '/administrator/nearby/all',
    method: 'get',
  })
}

export function addNear(data){
  let param = new URLSearchParams(data)
  return request({
    url:'/administrator/near/update',
    method:'post',
    data:param
  })
}

export function changeNear(data){
  let param = new URLSearchParams(data)
  return request({
    url:'/administrator/near/modify',
    method:'put',
    data:param
  })
}

export function searchNear(data) {
  return request({
    url: '/administrator/nearby/search',
    method: 'get',
    params:{search:data} 
  })
}