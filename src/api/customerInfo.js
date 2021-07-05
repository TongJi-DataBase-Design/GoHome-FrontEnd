/*
和顾客信息有关的api接口
*/
import request from '@/utils/request'

export function getCustomerInfo(data) {
    /*
    检验顾客账号是否存在
    */

    //一定要用这个格式
    let param = new URLSearchParams(data)

    return request({
        url: '/customer/details',
        method: 'get',
        data:param
    })
}





export function testToken() {
    /*
    返回当前登录的用户的创建时间
    */
    return request({
        url: '/customer/createtime',
        method: 'get'
    })
}