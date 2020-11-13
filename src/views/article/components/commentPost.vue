<template>
  <div class="comment-post">
    <van-field
      class="post-field"
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      :placeholder="articleID"
      show-word-limit
    />
    <van-button :disabled="!message.length" class="post-btn" @click="postComment">发布</van-button>
  </div>
</template>

<script>
import { addComments } from '@/api/comment'

export default {
  name: 'CommentPost',
  data () {
    return {
      message: '',
      art_id: this.articleID
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    }
  },
  inject: {
    articleID: {
      type: [Number, String, Object],
      default: null
    }
  },
  methods: {
    async postComment () {
      this.$toast.loading({
        message: '发布中'
      })
      try {
        const { data } = await addComments({
          target: this.target,
          content: this.message,
          art_id: this.art_id ? this.art_id.toString() : null
        })
        this.message = ''
        this.$emit('postSuccess', data.data.new_obj)
        this.$toast.success('发布成功')
      } catch (e) {
        this.$toast('发送评论失败')
      }
    }
  }
}
</script>

<style scoped lang="scss">
.comment-post {
  display: flex;
  align-items: center;
  padding: 32px 0 32px 32px;
  .post-field {
    background-color: #f5f7f9;
  }
  .post-btn {
    width: 150px;
    border: none;
    padding: 0;
    color: #6ba3d8;
    &::before {
      display: none;
    }
  }
}
</style>
