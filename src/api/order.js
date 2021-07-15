import request from '@/utils/request'


export function GetHostOrderInfo() {
    return request({
        url: '/order/HostOrderInfo',
        method: 'get'
    })
}

export function GetCustomerOrderInfo() {
    return request({
        url: '/order/CustomerOrderInfo',
        method: 'get'
    })
}

export function AddCustomerComment(data1,data2,data3) {
    let param=new URLSearchParams({orderId:data1,commentStars:data2,commentText:data3})
    return request({
        url: '/order/addCustomerComment',
        method: 'post',
        data: param
    })
}

export function AddHostComment(data1,data2,data3) {
    let param=new URLSearchParams({orderId:data1,commentStars:data2,commentText:data3})
    return request({
        url: '/order/addHostComment',
        method: 'post',
        data: param
    })
}

export function ReportCustomerOrder(data1,data2) {
    let param=new URLSearchParams({orderId:data1,reportReason:data2})
    return request({
        url: '/order/reportCustomerOrder',
        method: 'post',
        data: param
    })
}

export function addOrder(data){
    let param = new URLSearchParams(data);
    return request({
        url: '/order/addOrder',
        method: 'post',
        data: param,
    })
}