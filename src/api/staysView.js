/*
 * @Author: wly
 * @Date: 2021-07-12 19:21:01
 * @LastEditTime: 2021-07-12 19:21:01
 * @LastEditors: wly
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\api\staysView.js
 */


import request from '@/utils/request'


/*
 * 得到范围内的房源的坐标与价格
 */
export function GetStaysPosition(wlng,slat,elng,nlat) {
    let param=new URLSearchParams({westLng:wlng,southLat:slat,eastLng:elng,northLat:nlat});
    return request({
      url: '/stay/getPositions',
      method: 'get',
      params:param
    })
}
/*
 * 获得房源详细信息
 */
export function GetDetailedStay(stayID){
  let param=new URLSearchParams({StayId:stayID});
  return request({
    url:'/stay/getDetailedStay',
    method:'get',
    params:param
  })
}

/*
 * 获得房源粗略信息
 */
export function GetRoughStay(stayID){
  let param=new URLSearchParams({StayId:stayID});
  return request({
    url:'/stay/getRoughStay',
    method:'get',
    params:param
  })
}