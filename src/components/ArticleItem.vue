<template>
  <!-- 每一篇文章 -->

  <!-- 没有图片 -->
  <van-cell
    v-if="articleInfo.cover.type === 0"
    :title="articleInfo.title"
    :to="`/article/${articleInfo.art_id}`"
  >
    <template #label>
      <span>{{ articleInfo.aut_name }}</span>
      &nbsp;
      <span>{{ articleInfo.comm_count }}评论</span>
      &nbsp;
      <span>{{ articleInfo.pubdate | relativeTime }}</span>
    </template>
  </van-cell>

  <!-- 一张图片 -->
  <van-cell
    v-else-if="articleInfo.cover.type === 1"
    :title="articleInfo.title"
    :to="`/article/${articleInfo.art_id}`"
  >
    <van-image width="100" height="100" :src="articleInfo.cover.images[0]" />
    <template #label>
      <span>{{ articleInfo.aut_name }}</span>
      &nbsp;
      <span>{{ articleInfo.comm_count }}评论</span>
      &nbsp;
      <span>{{ articleInfo.pubdate | relativeTime }}</span>
    </template>
  </van-cell>

  <!-- 三张图片 -->
  <van-cell
    v-else
    :title="articleInfo.title"
    :to="`/article/${articleInfo.art_id}`"
  >
    <van-image
      v-for="(item, index) in articleInfo.cover.images"
      :key="index"
      width="100"
      height="100"
      :src="item"
    />
    <template #label>
      <span>{{ articleInfo.aut_name }}</span>
      &nbsp;
      <span>{{ articleInfo.comm_count }}评论</span>
      &nbsp;
      <span>{{ articleInfo.pubdate | relativeTime }}</span>
    </template>
  </van-cell>
</template>

<script>
export default {
  props: {
    articleInfo: {
      type: Object,
      //   对象和数组的默认值，必须用函数返回
      default: () => ({})
    }
  },
  computed: {
    // label() {
    //   const art = this.articleInfo
    //   return `${art.aut_name} ${art.comm_count}评论 ${art.pubdate | relativeTime}`
    // }
  }
}
</script>

<style></style>
