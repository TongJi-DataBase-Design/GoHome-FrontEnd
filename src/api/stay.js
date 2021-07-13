/*
和房源有关的api

*/

import request from '@/utils/request'

export function getStayTypeList(){
    return request({
        url:'/stay/type',
        method:'get'
    })
};

export function postStayInfo(data){
    let param=new URLSearchParams(data);
    return request({
        url:'/stay/infos',
        method:'post',
        data:param,
    })
}

export function putStayInfo(data){
    let param=new URLSearchParams(data);
    return request({
        url:'/stay/infos',
        method:'put',
        data:param,
    })
}

export function getStayDetails(data){
    let param = new URLSearchParams(data);
    return request({
        url: '/stay/getStayDetails',
        method: 'get',
        data: param,
    })
}

export function getComments(data){
    let param = new URLSearchParams(data);
    return request({
        url: '/stay/getComments',
        method: 'get',
        data: param,
    })
}

export function getPrice(data){
    let param = new URLSearchParams(data);
    return request({
        url: '/stay/getPrice',
        method: 'get',
        data: param,
    })
}

export function postOrder(data){
    let param = new URLSearchParams(data);
    return request({
        url: '/stay/addOrder',
        method: 'post',
        data: param,
    })
}