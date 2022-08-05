<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道" center>
      <van-button round size="small" class="edit-btn" @click="isEdit = !isEdit">
        {{ isEdit ? '完成' : '编辑' }}
      </van-button>
    </van-cell>

    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item,index) in myChannel"
        :key="item.id"
        :text="item.name"
        :class="['my-channel', { active: item.name === '推荐' }]"
        @click="changeActive(index,item)"
      >
        <template #icon>
          <van-icon name="cross" v-show="isEdit && item.name != '推荐'" />
        </template>
      </van-grid-item>
    </van-grid>

    <!-- 推荐频道 -->
    <van-cell title="推荐频道" center> </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        :text="item.name"
        icon="plus"
        class="rem-channels"
        @click="$emit('add-channel',item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel as getAllChannelApi } from '@/api'
export default {
  props: {
    myChannel: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  created() {
    this.getAllChannel()
  },
  methods: {
    async getAllChannel() {
      const { data } = await getAllChannelApi()
      console.log(data)
      this.allChannels = data.data.channels
    },
    changeActive(index,item){
      if(this.isEdit){
        //删除我的频道
        if(item.name === '推荐') return
        this.$emit('del-channel',item.id)
      } else {
        //1.关闭弹窗
        this.$parent.$parent.show = false 
        //2.切换tab active
        this.$emit('change-active',index)
      }
    }
  },
  computed: {
    recommendChannels() {
      //所有频道减去我的频道
      //减-->筛选
      //如果aItem在我的频道数组里出现了,过滤掉
      // return this.allChannels.filter((aItem) => {
      //   const results = !!this.myChannel.find((mItem) => aItem.id === mItem.id)
      //   if (results) {
      //     return false
      //   } else {
      //     return true
      //   }
      // })
      return this.allChannels.filter((aItem) =>
        !this.myChannel.find((mItem) => aItem.id === mItem.id)
      )
    }
  }
}
</script>

<style scoped lang="less">
.active {
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;

  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }

  :deep(.van-grid-item__content) {
    background-color: #eee;
  }

  .rem-channels {
    :deep(.van-grid-item__content) {
      flex-direction: row;
      align-items: center;
    }
    :deep(.van-grid-item__icon) {
      font-size: 35px;
    }
    :deep(.van-grid-item__icon + .van-grid-item__text) {
      margin-top: 2px;
    }
  }

  :deep(.my-channel) {
    position: relative;

    .van-grid-item__icon-wrapper {
      position: unset;
    }
    .van-icon-cross {
      position: absolute;
      right: 0;
      top: 0;
      font-size: 30px;
      transform: translate(40%, -45%);
      border: 2px solid #000;
      border-radius: 50%;
      z-index: 300;
    }
  }
}
</style>
