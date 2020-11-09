import request from '@/utibs/request'

export const getChannels = params => {
  return request({
    url: '/app/v1_1/articles',
    method: 'get',
    params
  })
}
export const getArticleByID = id => {
  return request({
    url: `/app/v1_0/articles/${id}`,
    method: 'get'
  })
}
