<template>
  <van-button
    round
    size="small"
    v-if="userFollow"
    @click="onFollow"
    :loading="followLoading"
    loading-type="spinner"
    >已关注</van-button
  >
  <van-button
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-else
    @click="onFollow"
    :loading="followLoading"
    loading-type="spinner"
    >关注</van-button
  >
</template>

<script>
import { addFollows, delFollows } from '@/api'
export default {
  props: {
    articleDetailsId: {
      type: [Number, String, Object],
      required: true
    },
    userFollow: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      followLoading: false
    }
  },
  methods: {
    async onFollow() {
      this.followLoading = true //展示关注按钮的loaging状态
      try {
        if (this.userFollow) {
          //已关注,取消关注
          await delFollows(this.articleDetailsId)
        } else {
          //没关注,添加关注
          await addFollows(this.articleDetailsId)
        }
        //更新视图状态
        this.$emit('update-follow',!this.userFollow)

        this.$toast.success(!this.userFollow ? '关注成功' : '取消关注')
      } catch (e) {
        let message = '操作失败,请重试'
        if (e.response && e.response.status === 400) {
          message = '不能关注自己哦~'
        }
        this.$toast.fail(message)
      }
      this.followLoading = false //关闭关注按钮的loaging状态
    }
  }
}
</script>

<style></style>
