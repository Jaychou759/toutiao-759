<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="登录" />

    <!-- 表单/收集手机号和密码 -->
    <!-- 输入框:van-field包括密码框,文本框,文本域 -->
    <van-form @submit="onSubmit" ref="form">
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
        <template #button>
          <van-button
            size="mini"
            type="info"
            round
            color="#eee"
            class="code-btn"
            v-if="isShowCode"
            native-type="button"
            @click="sendCode"
            >发送验证码</van-button
          >
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            v-else
            @finish="isShowCode = true"
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getCodeAPI } from '@/api'
import { mobileRules, codeRules } from './rules'
//为什么点击发送验证码,触发了submit事件
// - form表单中,如果说有任意的button,都会触发submit事件

//token干什么的?
// - 用户唯一标识

// 结构赋值
//  - 数组 const [a,b] = ['你好','hello'] 拥有命名权
//  - 对象 const { name,age } = {name:'张三',age:18} 没有命名权
//  - 对象的连续解构赋值 : 一层层的来const { friend:{ name } } = {name:'张三',friend:{ name:'李四' }}
//  - 对象结构赋值当中的命名 const { friend:{ name:person } } = {name:'张三',friend:{ name:'李四' }}

export default {
  data() {
    return {
      mobile: '',
      code: '',
      mobileRules: mobileRules,
      codeRules: codeRules,
      isShowCode: true
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      this.loading()
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
      try {
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        this.$store.commit('SET_TOKEN', token)
        //跳转到profile页面
        this.$router.push('/profile')
        this.$toast.success('登录成功')
        // console.log(data)
      } catch (e) {
        console.log(e)
        const status = e.response.status
        let message = '请重新登录'

        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      //1.验证手机号
      this.$refs.form.validate('mobile').then(async () => {
        this.loading()
        try {
          //2.发送请求
          const res = await getCodeAPI(this.mobile)
          this.$toast.success('发送验证码成功')
          //3.显示倒计时
          this.isShowCode = false
        } catch (e) {
          console.log(e)
          const status = e.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = e.response.data.message
          }

          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
//穿透样式
//:deep(穿透的类名)
.van-nav-bar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

.van-button--info {
  background-color: #6db4fb;
  border: 0;
}

.toutiao {
  font-size: 40px;
}

:deep(.code-btn) {
  &.van-button__text {
    color: #a9929b;
  }

  &.van-button--mini {
    padding: 0 0.2rem;
  }
}
</style>
