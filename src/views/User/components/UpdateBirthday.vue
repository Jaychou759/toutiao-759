<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$parent.$parent.isShowBirthday = false"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { editUserInfo } from '@/api'
import dayjs from 'dayjs'
export default {
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  methods: {
    async onConfirm() {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true
      })

      try {
        const currentDate = dayjs(this.currentDate).format('YYYY-MM-DD')
        await editUserInfo({
          birthday: currentDate
        })
        this.$emit('updateBirthday', currentDate)

        this.$parent.$parent.isShowBirthday = false

        this.$toast.success('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style></style>
