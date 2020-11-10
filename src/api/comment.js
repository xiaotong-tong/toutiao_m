import request from '@/utibs/request'

export const getCommentList = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'get',
    params
  })
}
