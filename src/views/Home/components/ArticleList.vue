<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        :finished="isFinished"
        finished-text="没有更多文章了~"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <article-item
          v-for="item in articleList"
          :key="item.art_id"
          :articleInfo="item"
        ></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticlesAPI } from '@/api'
import ArticleItem from '@/components/ArticleItem'
export default {
  data() {
    return {
      articleList: [],
      loading: false,
      pre_timestamp: '',
      isFinished: false,
      error: false,
      refreshing: false
    }
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  created() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticlesAPI(this.id, +new Date())
        // console.log(data)
        this.articleList = data.data.results
        //保存下一页的时间戳
        this.pre_timestamp = data.data.pre_timestamp
      } catch (e) {
        //提示刷新重新获取
        this.$toast.fail('请刷新重新获取文章')
      }
    },
    //加载下一页文章
    async loadNextPageArticle() {
      try {
        //测试加载失败
        // if (Math.random() < 0.5) {
        //   console.log(a)
        // }
        //1.发送请求
        const { data } = await getArticlesAPI(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        //判断是否加载完成
        if (data.data.pre_timestamp === null) {
          this.isFinished = true
        }
        //2.存储数据
        if ((this.refreshing)) {
          this.articleList.unshift(...data.data.results)
        }
        this.articleList.push(...data.data.results)

        //3.更新时间戳
        this.pre_timestamp = timestamp
      } catch (e) {
        this.error = true
      } finally {
        //finally无论成功失败最后都会执行
        //4.更新loading
        this.loading = false
        this.refreshing = false
      }
    }
  },
  components: { ArticleItem }
}
</script>

<style></style>
