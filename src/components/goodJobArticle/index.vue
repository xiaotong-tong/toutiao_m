<template>
  <div class="good-job-container">
    <van-icon
      :color="value === 1 ? '#ffa500' : '#777'"
      :name="value === 1 ? 'good-job' : 'good-job-o'"
      @click="goodJobClick"
    />
  </div>
</template>

<script>
import { addGoodJob, editGoodJob } from '@/api/atricle'

export default {
  name: 'index',
  props: {
    value: {
      type: Number,
      required: true
    },
    art_id: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async goodJobClick () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      let val = 0
      try {
        if (this.value === 1) {
          await editGoodJob(this.art_id)
        } else {
          await addGoodJob(this.art_id)
          val = 1
        }
        this.$emit('input', val)
        this.$toast.success(this.value === 1 ? '已取消点赞' : '点赞成功')
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
