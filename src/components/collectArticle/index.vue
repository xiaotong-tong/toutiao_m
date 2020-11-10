<template>
<div class="collect-container">
  <van-icon
    :color="value ? '#ffa500' : '#777'"
    :name="value ? 'star' : 'star-o'"
    @click="collectClick"
  />
</div>
</template>

<script>
import { addCollectArticle, editCollectArticle } from '@/api/atricle'

export default {
  name: 'index',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    art_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async collectClick () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        if (this.value) {
          await editCollectArticle(this.art_id)
        } else {
          await addCollectArticle(this.art_id)
        }
        this.$emit('input', !this.value)
        this.$toast.success(!this.value ? '收藏成功' : '已取消收藏')
      } catch (e) {
        this.$toast('操作失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.collect-container {
  .van-icon {
    font-size: 40px;
    .van-info {
      font-size: 16px;
      background-color: #e22829;
    }
  }
}
</style>
