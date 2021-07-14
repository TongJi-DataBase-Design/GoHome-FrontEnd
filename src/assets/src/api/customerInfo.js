/*
和顾客信息有关的api接口
*/
import request from '@/utils/request'

export function getCustomerInfo(data) {
    /*
    检验顾客账号是否存在
    */

    //一定要用这个格式

    return request({
        url: '/customer/details',
        method: 'get',
        params:data
    })
}

export function  uploadAvatar(data){
    return request({
        url:'/customer/avatar',
        method:'get',
        params:data
    })

}

export function uploadBasicInfo(data)
{
    return request({
        url: '/customer/basicinfo',
        method: 'get',
        params:data
    })
}
