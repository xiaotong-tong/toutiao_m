import request from '@/utibs/request'

export const getChannels = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params
  })
}
