<template>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check="false"
    >
      <!-- <van-cell
        v-for="(item, index) in commentList"
        :key="index"
        :title="item.content"
      /> -->
      <comment-item
        v-for="(item, index) in commentList"
        :key="index"
        :comment="item"
        @reply-comment="$emit('reply-comment',$event)"
      ></comment-item>
    </van-list>
</template>

<script>
import { getComment } from '@/api'
import CommentItem from './CommentItem.vue'
export default {
  props: {
    articleId: {
      type: [Number, String],
      required: true
    },
    type:{
      type:String,
      default:'a',
      validator(val){
        return ['a','c'].includes(val)
      }
    },
  },
  data() {
    return {
      loading: false,
      finished: false,
      offset: null,
      limit: 10,
      commentList: [],
      error: false
    }
  },
  created() {
    this.loading = true
    this.onLoad()
    this.$EventBus.$on('publish-comment', (val) => {
      if(this.type == 'a'){
          this.commentList.unshift(val)
      }
    })
  },
  mounted() {
    // console.log(this.articleId)
    
  },
  methods: {
    async onLoad() {
      try {
        const { data } = await getComment({
          type: this.type,
          source: this.articleId,
          offset: this.offset,
          limit: this.limit
        })
        // console.log(data)
        //将数据添加到列表中
        const { results } = data.data
        this.commentList.push(...results)
        this.$emit('commentCount', data.data.total_count)
        //判断是否还有数据
        if (results.length) {
          //有就更新获取下一页的数据页码
          this.offset = data.data.last_id
        } else {
          //没有就将finished设置为结束
          this.finished = true
        }
      } catch (e) {
        this.error = true
      } finally {
        this.loading = false
      }
    }
  },
  components: { CommentItem }
}
</script>

<style></style>
