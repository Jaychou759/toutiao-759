<template>
  <div>
    <van-cell
      icon="search"
      v-for="(item, index) in SearchSuggestionList"
      :key="index"
      @click="$emit('keyFn', item)"
    >
      <!-- 方法一 -->
      <!-- <template #title>
      <span v-html="item"></span>
      </template> -->

      <!-- 方法二 -->
      <template #title>
        <span v-html="highlightSuggestions(item)"></span>
      </template>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggestionAPI } from '@/api'
import { debounce } from 'lodash'
// 1.动态正则
// - 字面量 /aasdasd/ig
// - new RegExp(变量，'ig')

// 2.字符串的replace
// 'Auglar'.replace(/a/ig,function(match){
//   return `<span>${match}</span>`
// })
// 1.第一个参数可以是正则
// 2.第二个参数可以是函数，函数的返回值是要替换的字符串
// 3.match:正则匹配上的字符
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      SearchSuggestionList: []
    }
  },
  computed: {
    //方法一,高亮处理完,直接将highlightSuggestions放cell里循环
    // highlightSuggestions(){
    //   const reg = new RegExp(this.keywords,'ig')
    //   return this.SearchSuggestionList.map(item => {
    //     //如果item没有值得时候,用replace会报错,所以要在调接口的时候把没有值的item先筛选掉
    //     return item.replace(reg,function(match){
    //       return `<span style="color:red">${match}</span>`
    //     })
    //   })
    // }
  },
  watch: {
    // 这边不能简写的原因是当开启监听的时候 keyWords已经发生了变化，然后就导致于第一次输入的时候就不会开启
    // 所以就需要刚进来的话直接调用一次
    keywords: {
      immediate: true,
      handler() {
        this.getSearchSuggestionAPI()
      }
    }
  },
  methods: {
    //获取搜索建议
    getSearchSuggestionAPI: debounce(async function () {
      try {
        const { data } = await getSearchSuggestionAPI(this.keywords)
        console.log(data)
        //筛选掉没有值的对象
        this.SearchSuggestionList = data.data.options.filter((item) =>
          Boolean(item)
        )
      } catch (e) {
        this.$toast.fail('获取搜索建议失败')
      }
    }, 300),
    //方法二,SearchSuggestionList循环,再处理高亮
    highlightSuggestions(item) {
      const highlightStr = `<span style="color:red">${this.keywords}</span>`
      const reg = new RegExp(this.keywords, 'ig')
      return item.replace(reg, highlightStr)
    }
  }
}
</script>

<style></style>
