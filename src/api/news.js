import request from '@/utils/request'

/**
 *获取文章
 * @param {*} channelId  频道id
 * @param {*} timestamp 请求第一页数据当前的时间戳,请求上一页传上一页的时间戳
 * @returns Promise
 */
export const getArticlesAPI = (channelId, timestamp) => {
  return request({
    url: '/v1_0/articles',
    params: {
      channel_id: channelId,
      timestamp
    }
  })
}



/**
 * 获取文章详情
 * @param {*} article_id 文章id
 * @returns 
 */

export const getArticleId = (article_id) => {
  return request({
    url: `/v1_0/articles/${article_id}`,
  })
}


/**
 * 收藏文章
 * @param {*} target 文章id
 * @returns 
 */
export const collectArticle = (target) => {
  return request({
    url: '/v1_0/article/collections',
    method: 'POST',
    data: {
      target
    }
  })
}


/**
 * 取消收藏
 * @param {*} target 文章id
 * @returns 
 */

export const cancelCollect = (target) => {
  return request({
    url: `/v1_0/article/collections/${target}`,
    method: 'DELETE',
  })
}


/**
 * 文章点赞
 * @param {*} target 文章id
 * @returns 
 */
export const likeArticle = (target) => {
  return request({
    url: '/v1_0/article/likings',
    method: 'POST',
    data: {
      target
    }
  })
}



/**
 * 取消点赞
 * @param {*} target 文章id
 * @returns 
 */

export const cancelLike = (target) => {
  return request({
    url: `/v1_0/article/likings/${target}`,
    method: 'DELETE',
  })
}