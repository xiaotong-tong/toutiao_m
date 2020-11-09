<template>
<div class="search-result-container">
  <van-list
    v-model="loading"
    :finished="finished"
    finished-text="没有更多了"
    @load="onLoad"
  >
    <van-cell v-for="(item) in list" :key="item.art_id" :title="item.title" />
  </van-list>
</div>
</template>

<script>
import { getSearchResult } from '@/api/search'

export default {
  name: 'searchResult',
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      page: 1,
      error: false
    }
  },
  methods: {
    async onLoad () {
      // 异步更新数据
      console.log(this.searchText)
      try {
        const { data } = await getSearchResult({
          page: this.page,
          per_page: 10,
          q: this.searchText
        })
        this.list.push(...data.data.results)
        this.loading = false
        if (data.data.results.length) {
          this.page++
        } else {
          this.finished = true
        }
      } catch (e) {
        this.$toast('获取数据失败')
        this.error = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
