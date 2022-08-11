import request from '@/utils/request'

/**
 * 获取评论列表
 * @param {*} params 
 * @returns 
 */
export const getComment = (params) => {
    return request({
      url: '/v1_0/comments',
      params
    })
}

/**
 * 评论点赞
 * @param {*} target 点赞的评论id
 * @returns 
 */
export const addLikeComment = (target) => {
  return request({
    url: '/v1_0/comment/likings',
    method: 'POST',
    data: {
      target
    }
  })
}
  


/**
 * 取消评论点赞
 * @param {*} target 要取消点赞的评论i
 * @returns 
 */
export const cancelLikeComment = (target) => {
  return request({
    url: `/v1_0/comment/likings/${target}`,
    method: 'DELETE',
  })
}
  
/**
 * 对文章评论
 * @param {*} data 
 * @returns 
 */

export const commentArticle = (data) => {
  return request({
    url: '/v1_0/comments',
    method: 'POST',
    data
  })
}

