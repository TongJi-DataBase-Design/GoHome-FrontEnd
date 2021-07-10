/*
 * @Author: your name
 * @Date: 2021-07-05 20:16:52
 * @LastEditTime: 2021-07-10 18:50:23
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


export function GetFavoriteStay(params){
  return request({
    url: '/FavoriteStay',
    method: 'get',
    params:{favoriteId:params}
  })
}


export function DeleteFavoriteStay(data1,data2) {
  return request({  
    url: '/FavoriteStay',
    method: 'delete',
    params:{favoriteId:data1,stayid:data2}
  })
}


// export function InsertFavoriteStay(data) {
//   let param=new URLSearchParams(data)
  
//   return request({  
//     url: '/FavoriteStay',
//     method: 'post',
//     data:param
//   })
// }





// 还没有调通
// !调通了但返回false
// export function DeleteFavorite(params) {
//   console.log("https://8.136.17.54:6001/api/CustomerFavorite",params);
//   return new Promise((resolve, reject) => {
//       axios.delete("https://8.136.17.54:6001/api/CustomerFavorite", params)
//           .then(res => {
//               console.log(res);
//               resolve(res.data);
//               Loading.service(true).close();
//           })
//           .catch(err => {
//               reject(err.data)
//               Loading.service(true).close();
//               // console.log("dead");
//           })
//   });
// }




// export function DeleteOneFavorite(favid){

//   var params= new URLSearchParams({favoriteId:favid});
//   // params.append({favoriteId:favid});
//   // console.log(params);
//   this.axios.defaults.headers.common["token"]=this.token;
//   this.axios.delete(
//       'https://8.136.17.54:6001/api/CustomerFavorite',
//       {params:{favoriteId:favid},data:params}
//   ).then(function(response){
//     console.log(response);
//     let all=document.cookie;
//     console.log("cookie:",all);
//   }).catch(function(response){
//     console.log(response);
//     console.log("failed");
//   });

// }