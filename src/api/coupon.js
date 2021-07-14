import request from '@/utils/request'

export function GetCouponInfo() {
    return request({
        url: '/coupon/CouponInfo',
        method: 'get'
    })
}