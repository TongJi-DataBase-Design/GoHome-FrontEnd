// 和订单有关的api

import request from '@/utils/request'

export function addOrder(data){
    // let param = new URLSearchParams(data);
    return request({
        url: '/order/addOrder',
        method: 'post',
        data: data,
    })
}