<template>
  <van-icon
    :color="value === 1 ? 'hotpink' : ''"
    :name="value === 1 ? 'good-job' : 'good-job-o'"
    @click="onLike"
  />
</template>

<script>
import {likeArticle,cancelLike} from '@/api'
export default {
  props: {
    likeArticleId: {
      type: [Number, String, Object],
      required: true
    },
    value: {
      type: Number,
      required: true
    }
  },
  methods:{
    async onLike(){
        try {
            let status = -1
            if(this.value === 1){
                await cancelLike(this.likeArticleId)
            } else {
                await likeArticle(this.likeArticleId)
                status = 1
            }

            this.$emit('input',status)
            this.$toast.success(status === 1 ? '点赞成功' : '取消点赞')
        } catch (e) {
            this.$toast.fail('操作失败,请重试')
        }
    }
  }
}
</script>

<style></style>
