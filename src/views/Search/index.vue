<template>
  <div>
    <!-- 搜索框 -->
    <form action="/">
      <van-search
        v-model.trim="keywords"
        show-action
        placeholder="请输入搜索关键词"
        background="#3296fa"
        class="search"
        @search="onSearch"
        @focus="onSearchFocus"
        @cancel="$router.back()"
      >
      </van-search>
    </form>


    <!-- 搜索历史/建议/结果 -->
    <!-- <SearchHistory></SearchHistory>
    <SearchSuggestion></SearchSuggestion>
    <SearchResult></SearchResult> -->

    <component :is="componentName" :keywords="keywords"></component>
  </div>
</template>

<script>
import SearchHistory from './components/SearchHistory.vue'
import SearchSuggestion from './components/SearchSuggestion.vue'
import SearchResult from './components/SearchResult.vue'
export default {
  name: 'Search',
  data() {
    return {
      keywords: '',
      //用于记录用户是否搜索了
      isShowSearchResult:false
    }
  },
  methods: {
    onSearch() {
      console.log('正在搜索')
      this.isShowSearchResult = true
    },
    onSearchFocus(){
        //如果keywords为'' 显示搜索历史
        //如果keywords有值,显示搜索建议
        this.isShowSearchResult = false
    }
  },
  computed:{
    componentName(){
        //如果输入的是空字符串那么渲染搜索历史
        if(this.keywords === '') {
            return 'SearchHistory'
        }
        // 当isShowSearchResult为true的时候，说明用户按下搜索键，那么渲染搜索结果
        if (this.isShowSearchResult) {
            return 'SearchResult'
        }
        // 既不现实搜索历史，也不显示搜索结果
        return 'SearchSuggestion'
    }
  },
  components:{SearchHistory,SearchSuggestion,SearchResult}
}
</script>

<style scoped lang="less">
.search {
  .van-search__action {
    color: #fff;
  }
}
</style>
