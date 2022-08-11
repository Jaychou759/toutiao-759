<template>
  <div class="search-history">
    <van-cell title="搜索历史" center>
      <div v-if="isDeleteShow">
        <span @click="$emit('delAll')">全部删除</span>
        &nbsp;&nbsp;
        <span @click="isDeleteShow = false">完成</span>
      </div>
      <van-icon name="delete-o" v-else @click="isDeleteShow = true"/>
    </van-cell>

    <van-cell
      :title="item"
      v-for="(item, index) in searchHistoryList"
      :key="index"
      @click="deleteHistory(index,item)"
    >
      <van-icon name="close" v-show="isDeleteShow" />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    searchHistoryList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isDeleteShow: false
    }
  },
  methods:{
    deleteHistory(index,item){
      if(this.isDeleteShow) {
        this.searchHistoryList.splice(index,1)
      } else {
        this.$emit('search',item)
      }
    }
  }
}
</script>

<style scoped lang="less">
.search-history {
  .van-icon {
    color: #969799;
  }
}
</style>
