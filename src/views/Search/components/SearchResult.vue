<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <van-cell
        :title="item.title"
        v-for="item in searchResultList"
        :key="item.art_id"
      />
    </van-list>
  </div>
</template>

<script>
import { getSearchResultAPI } from '@/api'
export default {
  props: {
    keywords: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      loading: false,
      finished: false,
      page: 1,
      per_page: 10,
      searchResultList: [],
      error: false
    }
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getSearchResultAPI({
          page: this.page,
          per_page: this.per_page,
          q: this.keywords
        })
        console.log(data)
        const { results } = data.data
        this.searchResultList.push(...results)

        if (results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style></style>
