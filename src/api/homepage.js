/*
 * @Author: 陈垲昕
 * @Date: 2021-07-09 18:39:56
 * @LastEditTime: 2021-07-11 21:12:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\api\homepage.js
 */


import request from '@/utils/request'
import axios from 'axios'

export function GetHighestScoreList() {
    return request({
      url: '/Stay/getStayByScore',
      method: 'get',
    })
}


export function GetCheapestList() {
    return request({
      url: 'Stay/getStayByPrice',
      method: 'get',
    })
}

export function GetHottestList() {
    return request({
      url: '/Stay/getStayByHot',
      method: 'get',
    })
}