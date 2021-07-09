/*
 * @Author: 陈垲昕
 * @Date: 2021-07-09 18:39:56
 * @LastEditTime: 2021-07-09 18:41:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Project-Front-End\src\api\homepage.js
 */


import request from '@/utils/request'
import axios from 'axios'

export function GetHighestScoreList() {
    return request({
      url: '/CustomerFavorite',
      method: 'get',
    })
}


export function GetCheapestList() {
    return request({
      url: '/CustomerFavorite',
      method: 'get',
    })
}

export function GetHottestList() {
    return request({
      url: '/CustomerFavorite',
      method: 'get',
    })
}