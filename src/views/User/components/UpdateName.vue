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
      v-model.trim="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="11"
      placeholder="请输入新的昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import {editUserInfo} from '@/api'
export default {
  props:{
    name:{
      type:String,
      required:true,
    }
  },
  data(){
    return {
      message:this.name
    }
  },
  created(){
    this.onUpdateName()
  },
  methods:{
    async onUpdateName(){
      const {data} = await editUserInfo({
        name:this.message
      })

      this.$emit('updateName',this.message)

      this.$emit('close')
    }
  }
}
</script>

<style></style>
