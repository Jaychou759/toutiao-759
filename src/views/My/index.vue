<template>
  <div class="my">
    <!-- 头部区域 -->
    <header>
      <!-- 登录的盒子 -->
      <div class="login" v-if="isLogin">
        <div class="login-top">
          <div class="login-top-user">
            <img :src="userInfo.photo" />
            <span>{{ userInfo.name }}</span>
          </div>
          <button>编辑资料</button>
        </div>

        <div class="login-bottom">
          <div class="data-item">
            <span class="count">{{ userInfo.art_count }}</span>
            <span class="text">头条</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.follow_count }}</span>
            <span class="text">关注</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.fans_count }}</span>
            <span class="text">粉丝</span>
          </div>
          <div class="data-item">
            <span class="count">{{ userInfo.like_count }}</span>
            <span class="text">获赞</span>
          </div>
        </div>
      </div>

      <!-- 未登录的盒子 -->
      <div class="logout" v-else>
        <div class="logout-icon" @click="goLogin('login')">
          <img src="@/assets/images/mobile.png" />
          <span>登录 / 注册</span>
        </div>
      </div>
    </header>

    <!-- 中间 -->
    <main>
      <!-- 收藏/历史 -->
      <div class="middle-top">
        <van-grid :column-num="2">
          <van-grid-item>
            <i class="toutiao toutiao-shoucang"></i>
            <span>收 藏</span>
          </van-grid-item>
          <van-grid-item>
            <i class="toutiao toutiao-lishi"></i>
            <span>历 史</span>
          </van-grid-item>
        </van-grid>
      </div>

      <!-- 消息通知/小智同学 -->
      <div class="middle-bottom">
        <van-cell-group>
          <van-cell title="消息通知" center>
            <template #right-icon>
              <van-icon name="arrow" />
            </template>
          </van-cell>
          <van-cell title="小智同学" center>
            <template #right-icon>
              <van-icon name="arrow" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </main>

    <!-- 底部 -->
    <footer>
      <button v-if="isLogin" @click="logout" class="btn">退出登录</button>
    </footer>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
export default {
  data() {
    return {
      userInfo: {}
    }
  },
  created() {
    this.getUserInfoAPI()
  },
  computed: {
    isLogin() {
      //在前面加俩感叹号,是为了把this.$store.state.tokenObj.token转成布尔值,有的话就true,没有的话就false
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    logout() {
      this.$dialog
        .confirm({
          title: '黑马头条',
          message: '是否确认退出该账号?'
        })
        .then(() => {
          // 清除token
          // 传空对象过去,就相当于清空了
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    goLogin(name) {
      this.$router.push({
        name: name
      })
    },
    async getUserInfoAPI() {
      try {
        const res = await getUserInfo()
        console.log(res)
        this.userInfo = res.data.data
        // this.$toast.success('登录成功')
      } catch (e) {
        const status = e.response.status
        let message = '获取数据失败,请稍后重试'
        if (status === 400) {
          message = e.response.data.message
        }
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style scoped lang="less">
.my {
  height: 100%;
  background-color: #f5f7f9;
}
.logout {
  position: relative;
  width: 100%;
  height: 401px;
  background-color: #3296fa;
  background: url('@/assets/images/banner.png') no-repeat 0 0;
  background-size: cover;
  .logout-icon {
    position: absolute;
    top: 50%;
    margin-top: -100px;
    width: 100%;
    height: 5.33333rem;
    display: flex;
    flex-direction: column;
    // justify-items: center;
    align-items: center;
    // justify-content: center;
    // justify-content: space-around;
    img {
      width: 132px;
      height: 132px;
      background-color: #ffffff;
      border: solid 2px #ffffff;
      border-radius: 50%;
    }
    span {
      margin-top: 10px;
      font-size: 28px;
      color: #ffffff;
    }
  }
}

.middle-top .toutiao-shoucang {
  font-size: 45px;
  color: #eb5253;
}

.middle-top .toutiao-lishi {
  font-size: 45px;
  color: #ff9d1d;
}

.middle-top span {
  font-size: 28px;
  color: #333;
  margin-top: 10px;
}

.middle-bottom {
  margin-top: 10px;
  .van-cell {
    font-size: 30px;
    color: #333;
  }
  .van-icon-arrow:before {
    font-size: 30px;
    color: #9f9f9f;
  }
}

.login {
  width: 100%;
  height: 401px;
  background-color: #3296fa;
  background: url('@/assets/images/banner.png') no-repeat 0 0;
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.btn {
  margin-top: 10px;
  width: 100%;
  height: 104px;
  background-color: white;
  border: 0;
  color: #d86262;
  font-size: 30px;
}

.login-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 80px;
  .login-top-user {
    display: flex;
    align-items: center;
    margin-left: 30px;
    img {
      width: 132px;
      height: 132px;
      margin-right: 15px;
      background-color: #ffffff;
      border: solid 2px #ffffff;
      border-radius: 50%;
    }
    span {
      font-size: 30px;
      color: #ffffff;
    }
  }
  button {
    width: 120px;
    height: 33px;
    margin-right: 33px;
    background-color: #ffffff;
    border-radius: 16px;
    font-size: 20px;
    color: #666;
    border: 0;
  }
}

.login-bottom {
  display: flex;
  .data-item {
    flex: 1;
    height: 130px;
    background-color: #3e9cfa;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .count {
      font-size: 36px;
      color: #fff;
    }
    .text {
      font-size: 23px;
      color: #fff;
    }
  }
}
</style>
