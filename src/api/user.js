import request from '@/utils/request'
import store from '@/store'
//axios做了封装,post请求 自动加Content-Type	 	application/json
//params 查询参数传参: 'baseURL+/v1_0/authorizations?name=张三'
//data请求体传参:请求体当中携带

/**
 * 登录API
 * @param {String} mobile 手机号
 * @param {String} code 验证码
 * @returns Promise
 */

export const login = (mobile, code) => {
  return request({
    url: '/v1_0/authorizations',
    method: 'POST',
    data: { mobile, code }
  })
}

/**
 * 发送验证码
 * @param {String} mobile 手机号
 * @returns Promise
 */

export const getCodeAPI = (mobile) => {
  return request({
    url: `/v1_0/sms/codes/${mobile}`
  })
}

/**
 * 获取用户自己信息
 * @returns
 */
export const getUserInfo = () => {
  return request({
    url: '/v1_0/user',
    headers: {
      Authorization: 'Bearer ' + store.state.tokenObj.token
    }
  })
}

/**
 * 获取用户个人资料
 * @returns
 */
export const getUser = () => {
  return request({
    url: '/v1_0/user/profile'
  })
}

export const editUserInfo = (data) => {
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}

// 修改用户图片
// 如果说的传的是对象，axios会默认的将对象转化称为json 并且默认的会加上content-type:application/json
// 如果说后端需要的数据是multipart/form-data，那么也就是说后端需要的是表单数据
// 表单数据的处理
// const fm = new FormData()
// fm.append(表单的name,表单项)

export const uploadAvator = (file) => {
  const fm = new FormData()
  fm.append('photo', file)
  return request({
    url: '/v1_0/user/photo',
    method: 'PATCH',
    data: fm
  })
}


/**
 * 关注用户
 * @param {*} target 用户id
 * @returns 
 */

export const addFollows = (target) => {
  return request({
    url: '/v1_0/user/followings',
    method: 'POST',
    data: {
      target
    }
  })
}

/**
 * 取消关注
 * @param {*} target 用户id
 * @returns 
 */
export const delFollows = (target) => {
  return request({
    url: `/v1_0/user/followings/${target}`,
    method: 'DELETE',
  })
}