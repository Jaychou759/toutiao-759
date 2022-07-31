<template>
  <div>
    <!-- 头部区域 -->
    <header>
      <div class="login" v-if="isLogin">登录后的盒子</div>
      <div class="logout" v-else>未登录盒子</div>
    </header>

    <!-- 中间 -->
    <main>收藏/历史/消息通知/小智同学</main>

    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout">退出</button>
    </footer>
  </div>
</template>

<script>
export default {
  computed: {
    isLogin() {
      //在前面加俩感叹号,是为了把this.$store.state.tokenObj.token转成布尔值,有的话就true,没有的话就false
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      // 清除token
      // 传空对象过去,就相当于清空了
      this.$store.commit('SET_TOKEN',{})
    }
  }
}
</script>

<style></style>
