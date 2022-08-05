<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar class="navbar">
      <template #title>
        <van-button class="search-btn" round icon="search">搜索</van-button>
      </template>
    </van-nav-bar>

    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in channelList" :key="item.id" :title="item.name">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo" @click="show = true"></span>
    </van-tabs>

    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-popup
        :myChannel="channelList"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      ></channel-popup>
    </van-popup>
  </div>
</template>

<script>
import { getMyChannel, delChannel, addChannel,setMyChannelsTolocal,getMyChannelsBylocal } from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelPopup from './components/ChannelPopup'
export default {
  name: 'Home',
  components: { ArticleList, ChannelPopup },
  data() {
    return {
      active: 0,
      channelList: [],
      show: false
    }
  },
  created() {
    this.initMyChannels()
  },
  computed:{
    isLogin(){
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    //初始化mychannels数据
    initMyChannels(){
      if(this.isLogin) {
        //用户登录了
        //-发送请求获取mychannels数据
        this.getChannel()
      } else {
        //用户未登录
        const myChannels = getMyChannelsBylocal()
        if(myChannels) {
          //-本地存储有mychannels数据,从本地拿mychannels
          this.channelList = myChannels
        } else {
          //-本地存储没有mychannels数据,获取默认的mychannels
          this.getChannel()
        }
      }
    },
    async getChannel() {
      try {
        const { data } = await getMyChannel()
        // console.log(data)
        this.channelList = data.data.channels
      } catch (e) {
        console.dir(e)
        this.$toast.fail('获取频道失败,请刷新')
      }
    },
    //删除我的频道
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidClick: true
      })
      try {
        const newChannels = this.channelList.filter((item) => item.id != id)
        if(this.isLogin) {
          //1.删除服务器的数据
          await delChannel(id)
        } else {
          setMyChannelsTolocal(newChannels)
        }
        
        
        // console.log(data)

        //2.删除页面上的数据
        this.channelList = newChannels

        this.$toast.success('删除频道成功')
      } catch (e) {
        this.$toast.fail('删除频道失败')
      }
    },

    //添加频道
    async addChannel(channel) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidClick: true
      })
      try {
        if(this.isLogin) {
          await addChannel(channel.id, this.channelList.length)
        } else {
          setMyChannelsTolocal([...this.channelList,channel])
        }
        

        this.channelList.push(channel)
        this.$toast.success('添加频道成功')
      } catch (e) {
        this.$toast.fail('添加频道失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-nav-bar {
  position: sticky;
  top: 0;
  left: 0;
}
.navbar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}

/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 70px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  position: fixed;
  top: 92px;
  right: 0;

  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('~@/assets/images/gradient-gray-line.png');
  }
}

:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
