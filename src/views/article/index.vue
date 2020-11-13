<template>
  <div class="article-container markdown-body" ref="articleRefs">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click-left="$router.back()"></van-nav-bar>

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="loading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>

      <!-- 加载完成-文章详情 -->
      <div class="article-detail" v-else-if="articleInfo.title">
        <!-- 文章标题 -->
        <h1 class="article-title">{{ articleInfo.title }}</h1>

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image
            class="avatar"
            slot="icon"
            round
            fit="cover"
            :src="articleInfo.aut_photo"
          />
          <div slot="title" class="user-name">{{ articleInfo.aut_name }}</div>
          <div slot="label" class="publish-date">{{ articleInfo.pubdate | relativeTime }}</div>
          <follow-user :articleInfo="articleInfo" @followChange="followUpdata"></follow-user>
        </van-cell>

        <!-- 文章内容 -->
        <div class="article-content" v-html="articleInfo.content"></div>
        <van-divider>正文结束</van-divider>
<!--        评论组件 -->
        <comment-list :art_id="articleInfo.art_id" @getTotal="getTotalCount" :list="list" @isReplyShow="onReplyShow"></comment-list>
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click="popupShow = true">写评论</van-button>
          <van-icon name="comment-o" :info="totalCount" color="#777" />
          <!--      收藏 -->
          <collect-article v-model="articleInfo.is_collected" :art_id="articleInfo.art_id"></collect-article>
          <good-job-article v-model="articleInfo.attitude" :art_id="articleInfo.art_id"></good-job-article>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <van-popup v-model="popupShow" v-if="popupShow" position="bottom" >
          <comment-post :target="articleInfo.art_id" @postSuccess="postSuccessChange"></comment-post>
        </van-popup>
      </div>
      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="status">
        <van-icon name="failure" />
        <p class="text">该资源不存在或已删除！</p>
      </div>

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure" />
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn">点击重试</van-button>
      </div>
    </div>
    <van-popup v-model="replyShow" v-if="replyShow" position="bottom" :style="{ height: '100%' }">
      <comment-reply @replyClose="replyShow = false" :comment="comment"></comment-reply>
    </van-popup>
  </div>
</template>

<script>
import { getArticleByID } from '@/api/atricle'
import { ImagePreview } from 'vant'
import followUser from '@/components/followUser'
import collectArticle from '@/components/collectArticle'
import commentList from '@/views/article/components/commentList'
import goodJobArticle from '@/components/goodJobArticle'
import commentPost from '@/views/article/components/commentPost'
import commentReply from '@/views/article/components/commentReply'
export default {
  name: 'ArticleIndex',
  data () {
    return {
      articleInfo: {},
      loading: true,
      status: 0,
      totalCount: 0,
      popupShow: false,
      list: [],
      replyShow: false,
      comment: {}
    }
  },
  provide () {
    return {
      articleID: this.articleID
    }
  },
  props: ['articleID'],
  methods: {
    async getArticleInfo () {
      this.loading = true
      try {
        const { data } = await getArticleByID(this.articleID)
        this.articleInfo = data.data
      } catch (e) {
        if (e.response.status === 404) {
          this.status = 404
        }
      }
      setTimeout(() => {
        this.previewImg()
      }, 0)
      this.loading = false
    },
    previewImg () {
      const imgNodes = this.$refs.articleRefs.querySelectorAll('img')
      const images = []
      imgNodes.forEach((item, i) => {
        images.push(item.src)
        item.onclick = () => {
          ImagePreview({
            images,
            startPosition: i,
            closeable: true
          })
        }
      })
    },
    followUpdata (val) {
      this.articleInfo.is_followed = val
    },
    getTotalCount (val) {
      this.totalCount = val
    },
    postSuccessChange (val) {
      this.popupShow = false
      this.list.unshift(val)
    },
    onReplyShow (comment) {
      this.replyShow = true
      this.comment = comment
    }
  },
  created () {
    this.getArticleInfo()
  },
  components: {
    followUser,
    collectArticle,
    commentList,
    goodJobArticle,
    commentPost,
    commentReply
  }
}
</script>

<style scoped lang="scss">
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
    .van-icon {
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
    .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
</style>
