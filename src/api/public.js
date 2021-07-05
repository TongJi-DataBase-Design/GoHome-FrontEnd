/*
一些公用的api库
*/
import request from '@/utils/request'

export function sendMessage(data) {
    /*
    向指定手机号发送验证码
    */
    let param = new URLSearchParams(data)

    return request({
        url: '/phone/sendmessage',
        method: 'post',
        data:param
    })
} 

export function getVerifyCode(){
    /*
    生成4位随机验证码
    */
   
}