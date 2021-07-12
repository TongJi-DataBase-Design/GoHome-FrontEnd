/*
 * @Author: your name
 * @Date: 2021-07-05 20:16:52
 * @LastEditTime: 2021-07-12 09:17:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\api\favorite.js
 */

import request from '@/utils/request'
import axios from 'axios'

export function GetFavorite() {
  return request({
    url: '/CustomerFavorite',
    method: 'get',
  })
}
  

export function InsertFavorite(data) {
  let param=new URLSearchParams(data)
  
  return request({  
    url: '/CustomerFavorite',
    method: 'post',
    data:param
  })
}

export function DeleteFavorite(data) {

  return request({  
    url: '/CustomerFavorite',
    method: 'delete',
    params:{favoriteId:data}
  })
}

export function GetFavoriteImage(data){
  return request({  
    url: '/CustomerFavorite/image',
    method: 'get',
    data:data
  })
}


export function GetFavoriteStay(data){
  return request({
    url: '/FavoriteStay',
    method: 'get',
    params:{favoriteId:data}
  })
}


export function DeleteFavoriteStay(data1,data2) {
  return request({  
    url: '/FavoriteStay',
    method: 'delete',
    params:{favoriteId:data1,stayid:data2}
  })
}
export function InsertFavoriteStay(data1,data2) {
  let param=new URLSearchParams({favoriteId:data1,stayId:data2})
  return request({  
    url: '/FavoriteStay',
    method: 'post',
    data:param
  })
}

export function DeleteFavoriteStayByView(data1){
  return request({  
    url: '/FavoriteStay/stay',
    method: 'delete',
    params:{stayID:data1}
  }) 
  
}
