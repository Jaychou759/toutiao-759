<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录"/>

    <!-- 表单/收集手机号和密码 -->
    <!-- 输入框:van-field包括密码框,文本框,文本域 -->
    <van-form @submit="onSubmit">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
       >
        <template #left-icon>
          <span class="toutiao toutiao-shouji1"></span>
        </template>
       </van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
       >
        <template #left-icon>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
       </van-field>
  <div style="margin: 0.42rem;">
    <van-button block type="info" native-type="submit">登录</van-button>
  </div>
</van-form>
  </div>
</template>

<script>
import {login} from '@/api/user'
import {mobileRules,codeRules} from './rules'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules:mobileRules,
      codeRules:codeRules
    };
  },
  methods: {
    async onSubmit() {
      //如果表单校验不通过,这个方法不会触发

      //q1:res是什么?
      // - axios封装的对象,它把服务器返回的数据放在res.data里

      //q2:res 是什么?
      // - Promise的resolve的值

      //q3:error是什么?
      // -Promise reject的结果
      // -axios封装的error
      // -error.response.data是服务端返回的数据
      // -error.response.status 是服务端返回的状态码
      try{
        const res = await login(this.mobile,this.code)
        this.$toast.success('登录成功')
        console.log(res)
      } catch(e) {
        console.log(e)
        const status = e.response.status
        let message = '请重新登录'

        if(status === 400){
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    },
  }
}
</script>

<style scoped lang="less">
//穿透样式
//:deep(穿透的类名)
.van-nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title ){
    color:#fff
   }
}

.van-button--info {
  background-color: #6db4fb;
  border:0
}

.toutiao {
  font-size: 40px;
}
</style>