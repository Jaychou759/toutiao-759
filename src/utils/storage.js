//封装本地存储
//用class类 特性:封装 继承 多态
class Storage {
  // 获取本地存储的值
  get(key) {
    //getItem(key:string):string
    //JSON.parse() 只能转化JSON格式的字符串
    const value = localStorage.getItem(key)

    // 如果说value本身是个字符串的话 那么就不需要JSON.parse 比如：JSON.parse("12323ad") 这个时候就会报错
    //如果是JSON格式的,parse一下
    //不是JSON,直接返回
    try {
      return JSON.parse(value)
    } catch {
      return value
    }
  }

  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    //value不是对象
    localStorage.setItem(key, value)
  }

  remove(key) {
    localStorage.removeItem(key)
  }
}

export default new Storage()
