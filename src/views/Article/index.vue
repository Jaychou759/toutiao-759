<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      title="黑马头条"
      @click-left="$router.back()"
    ></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isLoading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleDetails.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleDetails.title }}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleDetails.aut_photo"
          />
          <div slot="title" class="user-name">
            {{ articleDetails.aut_name }}
          </div>
          <div slot="label" class="publish-date">
            {{ articleDetails.pubdate }}
          </div>
          <!-- <van-button
            class="follow-btn"
            round
            size="small"
            v-if="articleDetails.is_followed"
            @click="onFollow"
            :loading="followLoading"
            loading-type="spinner"
            >已关注</van-button
          >
          <van-button
            class="follow-btn"
            type="info"
            color="#3296fa"
            round
            size="small"
            icon="plus"
            v-else
            @click="onFollow"
            :loading="followLoading"
            loading-type="spinner"
            >关注</van-button
          > -->
          <follow-user
            class="follow-btn"
            :articleDetailsId="articleDetails.aut_id"
            :userFollow="articleDetails.is_followed"
            @update-follow="articleDetails.is_followed = $event"
          ></follow-user>
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div
          class="article-content markdown-body"
          v-html="articleDetails.content"
          ref="article-content"
        ></div>
        <van-divider>正文结束</van-divider>

        <!-- 评论列表 -->
        <comment
          :articleId="articleId"
          @commentCount="totalCommentCount = $event"
          @reply-comment="onReplyPop"
        ></comment>

        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button
            class="comment-btn"
            type="default"
            round
            size="small"
            @click="isShowComment = true"
            >写评论</van-button
          >
          <van-icon name="comment-o" :info="totalCommentCount" color="#777" />
          <!-- <van-icon color="#777" name="star-o" /> -->
          <collect-article
            :articleId="articleDetails.art_id"
            v-model="articleDetails.is_collected"
          ></collect-article>
          <like-article
            :likeArticleId="articleDetails.art_id"
            v-model="articleDetails.attitude"
          ></like-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->

        <!-- 评论弹出层 -->
        <van-popup v-model="isShowComment" position="bottom">
          <comment-pop :target="articleDetails.art_id"></comment-pop>
        </van-popup>
      </div>
      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errStatus === 404">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleIdAPI"
          >点击重试</van-button
        >
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>

    <!-- 回复评论弹出层 -->
    <van-popup
      v-model="isShowReply"
      position="bottom"
      :style="{ height: '100%' }"
    >
      <reply-pop
        v-if="isShowReply"
        :replyItem="replyItem"
        @close="isShowReply = false"
        :articleId="articleId"
      ></reply-pop>
    </van-popup>
  </div>
</template>

<script>
import { ImagePreview } from 'vant'
import { getArticleId } from '@/api'
import FollowUser from '@/components/FollowUser'
import CollectArticle from '@/components/CollectArticle.vue'
import LikeArticle from '@/components/LikeArticle.vue'
import Comment from './components/Comment.vue'
import CommentPop from './components/CommentPop.vue'
import ReplyPop from './components/ReplyPop.vue'
export default {
  props: {
    articleId: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      articleDetails: {},
      isLoading: true,
      errStatus: 0,
      totalCommentCount: 0,
      isShowComment: false,
      isShowReply: false,
      replyItem: {}
    }
  },
  created() {
    this.getArticleIdAPI()
  },
  methods: {
    async getArticleIdAPI() {
      this.isLoading = true
      try {
        const { data } = await getArticleId(this.articleId)
        // console.log(data)
        this.articleDetails = data.data

        //初始化图片预览,根据v-if展现,这里视图更新不是立即的,所以要延迟一会
        setTimeout(() => {
          this.previewImage()
        }, 0)
      } catch (e) {
        if (e.response && e.response.status === 404) {
          this.errStatus = 404
        }
      } finally {
        this.isLoading = false
      }
    },
    previewImage() {
      //得到所有的 img 节点
      const articleContent = this.$refs['article-content']
      const imgs = articleContent.querySelectorAll('img')
      const images = []
      imgs.forEach((img, index) => {
        images.push(img.src)

        //给每个img注册点击事件,在处理函数中调用预览
        img.onclick = () => {
          ImagePreview({
            //预览的图片地址数组
            images,
            //起始位置,从0开始
            startPosition: index
          })
        }
      })
    },
    onReplyPop(item) {
      // console.log(item)
      this.replyItem = item
      this.isShowReply = true
    }
  },
  components: {
    FollowUser,
    CollectArticle,
    LikeArticle,
    Comment,
    CommentPop,
    ReplyPop
  }
}
</script>

<style scoped lang="less">
@import '../../style/github-markdown.css';

.article-container {
  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 88px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;
      /deep/ p {
        text-align: justify;
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    :deep(.van-icon) {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;
    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    :deep(.van-icon) {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
