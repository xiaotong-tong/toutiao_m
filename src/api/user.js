import request from '@/utibs/request'

export const login = data => {
  return request({
    url: 'app/v1_0/authorizations',
    method: 'post',
    data
  })
}
export const sendSms = data => {
  return request({
    url: '/app/v1_0/sms/codes/' + data,
    method: 'get'
  })
}
export const getUserInfo = () => {
  return request({
    url: '/app/v1_0/user',
    method: 'get'
  })
}
export const getUserChannelList = () => {
  return request({
    url: '/app/v1_0/user/channels',
    method: 'get'
  })
}
export const addFollowUser = (target) => {
  return request({
    url: '/app/v1_0/user/followings',
    method: 'post',
    data: {
      target
    }
  })
}
export const delFollowUser = (target) => {
  return request({
    url: '/app/v1_0/user/followings/' + target,
    method: 'delete'
  })
}
export const getUserProfile = () => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'get'
  })
}
export const updataUserProfile = (data) => {
  return request({
    url: '/app/v1_0/user/profile',
    method: 'patch',
    data
  })
}
