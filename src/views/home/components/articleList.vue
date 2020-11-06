<template>
  <div>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      :success-duration="1500"
      loading-text="数据正在赶来的路上"
      :success-text="successText"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
<!--        <van-cell v-for="(item,index) in list" :key="index" :title="item.title"/>-->
        <article-item :article="item" v-for="(item, index) in list" :key="index"></article-item>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannels } from '@/api/atricle'
import articleItem from '@/components/articleItem'
export default {
  name: 'articleList',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshing: false,
      successText: ''
    }
  },
  components: {
    'article-item': articleItem
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      try {
        const { data } = await getChannels({
          channel_id: this.channel.id,
          timestamp: this.timestamp || +new Date(),
          with_top: 0
        })
        this.list.push(...data.data.results)
        this.loading = false
        if (data.data.results.length) {
          this.timestamp = data.data.pre_timestamp
        } else {
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
    },
    async onRefresh () {
      try {
        const { data } = await getChannels({
          channel_id: this.channel.id,
          timestamp: this.timestamp || +new Date(),
          with_top: 0
        })
        this.list.unshift(...data.data.results)
        this.successText = `更新了${data.data.results.length}条数据`
        // 清空列表数据
        this.refreshing = false
      } catch (err) {
        this.successText = '加载失败'
        this.refreshing = false
      }
    }
  }
}
</script>

<style scoped>

</style>
