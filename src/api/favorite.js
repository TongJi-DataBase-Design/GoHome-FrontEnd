/*
 * @Author: your name
 * @Date: 2021-07-05 20:16:52
 * @LastEditTime: 2021-07-09 18:58:46
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

// export function DeleteFavorite(params) {
//   // let param=new URLSearchParams(data)
  
//   return request({  
//     url: '/CustomerFavorite',
//     method: 'delete',
//     // data:param
//     data:params
//   })
// }

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
    data:data
  })
}

export function InsertFavoriteStay(data) {
  let param=new URLSearchParams(data)
  
  return request({  
    url: '/FavoriteStay',
    method: 'post',
    data:param
  })
}



// 还没有调通
// !调通了但返回false
export function DeleteFavorite(url, params) {
  console.log(url,params);
  return new Promise((resolve, reject) => {
      axios.delete(url, params)
          .then(res => {
              console.log(res);
              resolve(res.data);
              Loading.service(true).close();
          })
          .catch(err => {
              reject(err.data)
              Loading.service(true).close();
              // console.log("dead");
          })
  });
}



// export function getFavoriteImage(data){
  
// }

