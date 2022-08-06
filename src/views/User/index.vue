<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar
      title="个人信息"
      left-arrow
      @click-left="$router.back()"
      class="navbar"
    />

    <!-- 用户信息 -->
    <!-- input:file的属性 -->
    <!-- accept:显示file选择的文件后缀名,hidden:隐藏input:file -->
    <!-- el.click() -->
    <van-cell title="头像" is-link @click="$refs.file.click()">
      <van-image width="0.8rem" height="0.8rem" :src="userInfo.photo" round />
      <!-- 用户选择文件的表单 -->
      <input type="file" hidden ref="file" @change="selectPhoto" />
    </van-cell>
    <van-cell title="昵称" is-link @click="isShowName = true">
      <span>{{ userInfo.name }}</span>
    </van-cell>
    <van-cell title="性别" is-link @click="isShowSex = true">
      <span>{{ userInfo.gender === 0 ? '男' : '女' }}</span>
    </van-cell>
    <van-cell title="生日" is-link>
      <span>{{ userInfo.birthday }}</span>
    </van-cell>
    <!-- 头像的弹层 -->
    <van-popup
      class="avator-popup"
      v-model="isShowAvator"
      :style="{ height: '100%', width: '100%' }"
      closeable
      position="bottom"
    >
      <update-avator :photo="photo" v-if="isShowAvator" @update-avator="userInfo.photo = $event"></update-avator>
    </van-popup>

    <!-- 昵称弹层 -->
    <van-popup
      class="name-popup"
      v-model="isShowName"
      :style="{ height: '100%', width: '100%' }"
      position="bottom"
    >
      <update-name
        @close="isShowName = false"
        :name="userInfo.name"
        @updateName="userInfo.name = $event"
      ></update-name>
    </van-popup>

    <!-- 性别弹层 -->
    <van-popup
      class="sex-popup"
      v-model="isShowSex"
      :style="{ height: '25%', width: '100%' }"
       position="bottom"
    >
      <update-sex></update-sex>
    </van-popup>
  </div>
</template>

<script>
import { getUser } from '@/api'
import UpdateAvator from './components/UpdateAvator.vue'
import UpdateName from './components/UpdateName.vue'
import UpdateSex from './components/UpdateSex.vue'
import {resolveToBase64} from '@/utils/index'
export default {
  data() {
    return {
      userInfo: {},
      isShowAvator: false,
      isShowName: false,
      isShowSex:false,
      photo:''
    }
  },
  created() {
    this.getUserAPI()
  },
  methods: {
    async getUserAPI() {
      try {
        const { data } = await getUser()
        // console.log(data)
        this.userInfo = data.data
      } catch (e) {
        this.$toast.fail('获取用户信息失败,请刷新')
      }
    },
    async selectPhoto(e) {
      //1.获取用户选择的图片和文件对象
      //-e.target 触发事件的元素
      //-file.files 伪数组,存储的用户选择所有的文件对象
      const file = e.target.files[0]

      //2.把file文件对象处理成img标签可识别的url
      // URL.createObjectURL(file对象) --> img标签可识别的url
      // const url = window.URL.createObjectURL(file)

      //base64
      // const fr = new FileReader()
      // fr.readAsDataURL(file)

      // fr.onload = (e) => {
      //   this.photo = e.target.result
      // }
      const url = await resolveToBase64(file)

      this.photo = url
      //4.清空value,让用户可以选择同一张照片
      e.target.value = ''

      //展示弹层组件
      this.isShowAvator = true
    }
  },
  components: { UpdateAvator, UpdateName ,UpdateSex}
}
</script>

<style scoped lang="less">
:deep(.navbar) {
  background-color: #3296fa;

  .van-nav-bar__title {
    color: #fff;
  }

  .van-icon {
    color: #fff;
  }
}

.avator-popup {
  background-color: #000;
}
</style>
