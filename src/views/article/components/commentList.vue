<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
      :immediate-check="false"
    >
<!--      <van-cell v-for="(item, i) in list" :key="i" :title="item.content"/>-->
      <component-info v-for="(item, i) in list" :key="i" :itemInfo="item" @isReplyShow="$emit('isReplyShow', $event)"></component-info>
    </van-list>
  </div>
</template>

<script>
import { getCommentList } from '@/api/comment'
import componentInfo from '@/views/article/components/componentInfo'
export default {
  name: 'commentList',
  data () {
    return {
      loading: false,
      finished: false,
      offset: null,
      totalCount: 0,
      error: false
    }
  },
  props: {
    art_id: {
      type: [Number, String, Object],
      required: true
    },
    list: {
      type: Array,
      default: function () {
        return []
      }
    },
    type: {
      type: String,
      validator (value) {
        return ['a', 'c'].includes(value)
      },
      default: 'a'
    }
  },
  methods: {
    // 137825
    async onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getCommentList({
          type: this.type,
          source: this.art_id.toString(),
          offset: this.offset,
          limit: 10
        })
        this.list.push(...data.data.results)
        this.totalCount = data.data.total_count
        this.$emit('getTotal', this.totalCount)
        this.loading = false
        if (data.data.results.length) {
          this.offset = data.data.last_id
        } else {
          this.finished = true
        }
      } catch (e) {
        this.error = true
        this.loading = false
      }
    }
  },
  created () {
    this.loading = true
    this.onLoad()
  },
  components: {
    componentInfo
  }
}
</script>

<style scoped>

</style>
