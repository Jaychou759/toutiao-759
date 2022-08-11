<template>
    <van-icon
      :color="value ? '#ffa500' : '#777'"
      :name="value ? 'star' : 'star-o'"
      @click="onCollect"
    />
</template>

<script>
import { collectArticle, cancelCollect } from '@/api'
export default {
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    },
    value: {
      type: Boolean,
      required: true
    }
  },
  methods:{
    async onCollect(){
        try {
            if(this.value) {
                //已收藏,取消收藏
                await cancelCollect(this.articleId)
            } else {
                //没有收藏,添加收藏
                await collectArticle(this.articleId)
            }

            //更新视图
            this.$emit('input',!this.value)
            this.$toast.success(!this.value ? '收藏成功' : '取消收藏')
        } catch (e) {
            this.$toast.fail('操作失败,请重试')
        }
    }
  }
}
</script>

<style scoped lang="less">
.collected {
    .van-icon {
        color:#ffa500
    }
}
</style>
