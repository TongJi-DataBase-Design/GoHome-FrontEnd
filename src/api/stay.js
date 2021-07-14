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
    return request({
        url: '/stay/getStayDetails',
        method: 'get',
        params: data,
    })
}

export function getComments(stayId){
    // console.log(stayId);
    return request({
        url: '/stay/getComments',
        method: 'get',
        params: {stayId: stayId},
    })
}

export function getPrice(data){
    return request({
        url: '/stay/getPrice',
        method: 'get',
        params: data,
    })
}

