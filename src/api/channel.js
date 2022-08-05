import request from '@/utils/request'
import storage from '@/utils/storage'
/**
 * 获取用户频道
 * @returns 
 */
export const getMyChannel = () => {
  return request({
    url: '/v1_0/user/channels',

  })
}

/**
 * 获得全部频道
 * @returns 
 */
export const getAllChannel = () => {
  return request({
    url: '/v1_0/channels',

  })
}


/**
 * 删除用户频道
 * @param {*} target 频道id
 * @returns 
 */


export const delChannel = (target) => {
  return request({
    url: `/v1_0/user/channels/${target}`,
    method:'DELETE'

  })
}

/**
 * 添加频道
 * @param {*} id 频道id
 * @param {*} seq 添加频道的索引值
 * @returns 
 */
export const addChannel = (id,seq) => {
  return request({
    url: '/v1_0/user/channels',
    method: 'PATCH',
    data: {
      channels: [{id,seq}]
    }

  })
}



const HEIMA_TOUTIAO_MY_CHANNELS = 'HEIMA_TOUTIAO_MY_CHANNELS'

export const setMyChannelsTolocal = (myChannels) => {
  storage.set(HEIMA_TOUTIAO_MY_CHANNELS,myChannels)
}

export const getMyChannelsBylocal = () => {
  return storage.get(HEIMA_TOUTIAO_MY_CHANNELS)
}