<template>
  <van-cell class="comment-item">
    <van-image
      slot="icon"
      class="avatar"
      round
      fit="cover"
      :src="itemInfo.aut_photo"
    />
    <div slot="title" class="title-wrap">
      <div class="user-name">{{itemInfo.aut_name}}</div>
      <van-button
        class="like-btn"
        :loading="benloading"
        :icon="itemInfo.is_liking ? 'good-job' : 'good-job-o'"
        @click="likeBtnClick"
      >{{itemInfo.like_count ? itemInfo.like_count : '赞'}}</van-button>
    </div>

    <div slot="label">
      <p class="comment-content">{{itemInfo.content}}</p>
      <div class="bottom-info">
        <span class="comment-pubdate">{{itemInfo.pubdate | relativeTime}}</span>
        <van-button class="reply-btn" round @click="$emit('isReplyShow', itemInfo)">回复 {{itemInfo.reply_count}}</van-button>
      </div>
    </div>
  </van-cell>
</template>

<script>
import { addLikeComment, delLikeComment } from '@/api/comment'

export default {
  name: 'componentInfo',
  data () {
    return {
      benloading: false
    }
  },
  props: {
    itemInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    async likeBtnClick () {
      this.benloading = true
      try {
        if (this.itemInfo.is_liking) {
          await delLikeComment(this.itemInfo.com_id)
          this.itemInfo.like_count--
        } else {
          await addLikeComment(this.itemInfo.com_id)
          this.itemInfo.like_count++
        }
        this.itemInfo.is_liking = !this.itemInfo.is_liking
      } catch (e) {
        this.$toast('点赞失败')
      }
      this.benloading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.comment-item {
  .avatar {
    width: 72px;
    height: 72px;
    margin-right: 25px;
  }
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .user-name {
      color: #406599;
      font-size: 26px;
    }
  }
  .comment-content {
    font-size: 32px;
    color: #222222;
    word-break: break-all;
    text-align: justify;
  }
  .comment-pubdate {
    font-size: 19px;
    color: #222;
    margin-right: 25px;
  }
  .bottom-info {
    display: flex;
    align-items: center;
  }
  .reply-btn {
    width: 135px;
    height: 48px;
    line-height: 48px;
    font-size: 21px;
    color: #222;
  }
  .like-btn {
    height: 30px;
    padding: 0;
    border: none;
    font-size: 19px;
    line-height: 30px;
    margin-right: 7px;
    .van-icon {
      font-size: 30px;
    }
  }
  /deep/.van-button--normal {
    padding: 0;
  }
  /deep/.van-icon-good-job {
    color: #eb5253;
  }
}
</style>
