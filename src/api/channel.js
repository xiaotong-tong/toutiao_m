import request from '@/utibs/request'

export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}
