import request from '@/utibs/request'

export const getCommentList = params => {
  return request({
    url: '/app/v1_0/comments',
    method: 'get',
    params
  })
}
export const addLikeComment = target => {
  return request({
    url: '/app/v1_0/comment/likings',
    method: 'post',
    data: {
      target
    }
  })
}
export const delLikeComment = target => {
  return request({
    url: '/app/v1_0/comment/likings/' + target,
    method: 'delete'
  })
}
export const addComments = data => {
  return request({
    url: '/app/v1_0/comments',
    method: 'post',
    data
  })
}
