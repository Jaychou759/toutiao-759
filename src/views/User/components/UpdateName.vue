<template>
  <div>
    <van-nav-bar
      title="更新昵称"
      left-arrow
      left-text="取消"
      right-text="保存"
      @click-left="$emit('close')"
      @click-right="onUpdateName"
    />

    <!-- 输入框 -->
    <van-field
      v-model="message"
      autosize
      type="textarea"
      maxlength="11"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserInfo } from '@/api'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      message: this.value
    }
  },
  methods: {
    async onUpdateName() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true
      })

      try {
        await editUserInfo({
          name: this.message
        })

        this.$emit('updateName', this.message)

        this.$emit('close')

        this.$toast.success('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
