<template>
<div class="search-container">
  <form action="/">
    <van-search
      v-model="searchText"
      show-action
      placeholder="请输入搜索关键词"
      background="#3296fa"
      @search="onSearch"
      @cancel="onCancel"
      @focus="onFocus"
    />
  </form>
  <!--  搜索结果-->
  <search-result v-if="showVisible" :searchText="searchText"></search-result>
<!--  搜索建议-->
  <search-suggestion v-else-if="searchText" :searchText="searchText" @search="onSearch"></search-suggestion>
  <!--  搜索历史-->
  <search-history  v-else @search="onSearch" :searchHistory="searchHistories" @clearAllHistory="searchHistories = []"></search-history>
</div>
</template>

<script>
import searchHistory from '@/views/search/components/searchHistory'
import searchResult from '@/views/search/components/searchResult'
import searchSuggestion from '@/views/search/components/searchSuggestion'
import { setItem, getItem } from '@/utibs/storage'

export default {
  name: 'search',
  data () {
    return {
      searchText: '',
      showVisible: false,
      searchHistories: getItem('searchHistories') || []
    }
  },
  watch: {
    searchHistories (val) {
      setItem('searchHistories', val)
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
      this.showVisible = true
      this.searchText = val
      this.searchHistories.unshift(val)
      this.searchHistories = [...new Set(this.searchHistories)]
      /* const i = this.searchHistories.findIndex(item => item === val)
      if (i === -1) {
        this.searchHistories.unshift(val)
      } else {
        this.searchHistories.splice(i, 1)
        this.searchHistories.unshift(val)
      } */
    },
    onCancel () {
      this.$router.back()
    },
    onFocus () {
      this.showVisible = false
    }
  },
  components: {
    searchSuggestion,
    searchResult,
    searchHistory
  }
}
</script>

<style lang="scss" scoped>
.search-container {
  padding-top: 100px;
  .van-search__action {
    color: #fff
  }
  .van-search {
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 9;
  }
}
</style>
