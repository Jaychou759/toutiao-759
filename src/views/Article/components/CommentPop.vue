<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-button class="post-btn" @click="onPublish" :disabled="!message.length"
      >发布</van-button
    >
  </div>
</template>

<script>
import { commentArticle } from '@/api'
export default {
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    articleId: {
      type: [Number, String],
      default:null,
    }
  },
  data() {
    return {
      message: ''
    }
  },
  methods: {
    async onPublish() {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true
      })
      try {
        const { data } = await commentArticle({
          target: this.target,
          content: this.message,
          art_id: this.articleId
        })
        // console.log(data)
        this.message = ''
        this.$EventBus.$emit('publish-comment', data.data.new_obj)
        this.$parent.$parent.isShowComment = false
        this.$toast.success('发布成功!')
      } catch (e) {
        this.$toast.fail('发布失败!')
      }
    }
  }
}
</script>

<style scoped lang="less">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;

  .post-field {
    background-color: #f5f7f9;
  }

  .post-btn {
    width: 150px;
    border: none;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
