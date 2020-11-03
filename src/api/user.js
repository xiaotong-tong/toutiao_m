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
