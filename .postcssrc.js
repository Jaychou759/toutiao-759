module.exports = {
    plugins: {
      // 'autoprefixer': {
      //   browsers: ['Android >= 4.0', 'iOS >= 8']
      // },
      'postcss-pxtorem': {
        //根节点的rem大小
        //rootValue:37.5

        //如果是vant的文件 37.5转
        //如果不是75

        // rootValue ({ file }) {
        //   return file.indexOf('vant') !== -1 ? 37.5 : 75
        // },
        rootValue: ({file}) => (/vant/i.test(file)? 37.5 : 75),

        //哪些属性需要转成rem
        propList: ['*']
      }
    }
  }