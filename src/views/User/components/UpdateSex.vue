<template>
  <div>
    <van-picker
      title="更新性别"
      show-toolbar
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
      @change="onChange"
      :default-index="value"
    />
  </div>
</template>

<script>
import { editUserInfo } from '@/api'
export default {
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女'],
      localGender: this.value
    }
  },
  methods: {
    onChange(picker, value, index) {
      this.localGender = index
    },
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true
      })

      try {
        await editUserInfo({
          gender: this.localGender
        })

        this.$emit('close')
        this.$emit('updateSex', this.localGender)

        this.$toast.success('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
