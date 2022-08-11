<template>
  <div>
    <van-nav-bar
      :title="
        replyItem.reply_count > 0
          ? `${replyItem.reply_count}条回复`
          : '暂无回复'
      "
      left-arrow
      @click-left="$emit('close')"
    />

    <div class="scroll">
      <comment-item :comment="replyItem"></comment-item>

      <van-cell title="全部回复" class="allReply"></van-cell>
      <comment :articleId="replyItem.com_id" type="c"></comment>
    </div>

    <div class="comment-btn">
      <van-button
        class="btn"
        round
        size="small"
        @click="isShowComment = true"
        >发布评论</van-button
      >
    </div>

    <!-- 发布回复评论弹出层 -->
    <van-popup v-model="isShowComment" position="bottom">
      <comment-pop :articleId="articleId" :target="replyItem.com_id"></comment-pop>
    </van-popup>
  </div>
</template>

<script>
import CommentItem from './CommentItem.vue'
import Comment from './Comment.vue'
import CommentPop from './CommentPop.vue'
export default {
  props: {
    replyItem: {
      type: Object,
      required: true
    },
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  created(){
    this.$EventBus.$on('publish-comment', (val) => {
      this.replyItem.reply_count++
    })
  },
  data() {
    return {
      isShowComment: false
    }
  },
  mounted() {
    console.log(this.replyItem)
  },
  components: { CommentItem, Comment, CommentPop }
}
</script>

<style scoped lang="less">
.allReply {
  text-align: center;
}

.scroll {
  position: fixed;
  top: 90px;
  bottom: 88px;
  left: 0;
  right: 0;
  overflow-y: auto;
}

.comment-btn {
  height: 88px;
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #fff;
  border-top: 1px solid #ccc;

  .btn {
    width: 60%;
  }
}
</style>
