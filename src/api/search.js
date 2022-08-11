import request from '@/utils/request'


/**
 * 获取搜索建议
 * @param {String} q 搜索关键词
 * @returns Promise
 */
export const getSearchSuggestionAPI = (q) => {
    return request({
        url: '/v1_0/suggestion',
        params: {q}
    })
}



/**
 * 获取搜索结果
 * @param {*} page 页数，不传默认为1
 * @param {*} per_page 每页数量，不传每页数量由后端决定
 * @param {*} q 搜索关键词
 * @returns Promise
 */
export const getSearchResultAPI = params => {
    return request({
        url: '/v1_0/search',
        params
    })
}