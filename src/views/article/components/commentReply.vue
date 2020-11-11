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
</div>
</template>

<script>
import componentInfo from '@/views/article/components/componentInfo'
import commentList from '@/views/article/components/commentList'
export default {
  name: 'commentReply',
  data () {
    return {
      list: []
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
    commentList
  }
}
</script>

<style lang="scss" scoped>
.comment-reply-container {
  .van-icon-cross {
    color: #fff;
  }
}
</style>
