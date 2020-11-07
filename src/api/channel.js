import request from '@/utibs/request'

export const getAllChannels = () => {
  return request({
    url: '/app/v1_0/channels',
    method: 'get'
  })
}
export const addUserAllChannels = (channel) => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [channel]
    }
  })
}
export const delUserAllChannels = (channelID) => {
  return request({
    url: '/app/v1_0/user/channels/' + channelID,
    method: 'DELETE'
  })
}
