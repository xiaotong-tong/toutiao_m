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
export const addCollectArticle = target => {
  return request({
    url: '/app/v1_0/article/collections',
    method: 'post',
    data: {
      target
    }
  })
}
export const editCollectArticle = target => {
  return request({
    url: `/app/v1_0/article/collections/${target}`,
    method: 'delete'
  })
}
export const addGoodJob = target => {
  return request({
    url: '/app/v1_0/article/likings',
    method: 'post',
    data: {
      target
    }
  })
}
export const editGoodJob = target => {
  return request({
    url: `/app/v1_0/article/likings/${target}`,
    method: 'delete'
  })
}
