import request from '@/utils/request'


export function allStay(data) {
    let param = new URLSearchParams(data)

    return request({
      url: '/administrator/examineStay',
      method: 'get',
      params:{pageNum:param}
    })
}