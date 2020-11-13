<template>
<div class="comment-reply-container">
  <van-nav-bar>
    <span slot="title" v-if="comment.reply_count">{{comment.reply_count}}条回复</span>
    <span slot="title" v-else>暂无回复</span>
    <van-icon name="cross" slot="left" style="color: #fff;" @click="$emit('replyClose')" />
  </van-nav-bar>
  <component-info :item-info="comment"></component-info>
<!--  全部回复 -->
  <van-cell title="全部回复"></van-cell>
  <comment-list :art_id="comment.com_id" :type="'c'" :list="list"></comment-list>
  <van-button class="postReplybtn" @click="replyShow = true">写评论</van-button>
  <van-popup v-model="replyShow" position="bottom">
    <comment-post></comment-post>
  </van-popup>
</div>
</template>

<script>
import componentInfo from '@/views/article/components/componentInfo'
import commentList from '@/views/article/components/commentList'
import commentPost from '@/views/article/components/commentPost'
export default {
  name: 'commentReply',
  data () {
    return {
      list: [],
      replyShow: false
    }
  },
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    componentInfo,
    commentList,
    commentPost
  }
}
</script>

<style lang="scss" scoped>
.comment-reply-container {
  .van-icon-cross {
    color: #fff;
  }
  .postReplybtn {
    height: 90px;
    width: 100%;
    position: fixed;
    bottom: 0;
    border-top: 1px solid #ccc;
    font-size: 24px;
  }
}
</style>
