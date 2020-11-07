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
    />
  </form>
  <!--  搜索结果-->
  <search-result v-if="showVisible"></search-result>
<!--  搜索建议-->
  <search-suggestion v-else-if="searchText" :searchText="searchText"></search-suggestion>
  <!--  搜索历史-->
  <search-history  v-else></search-history>
</div>
</template>

<script>
import searchHistory from '@/views/search/components/searchHistory'
import searchResult from '@/views/search/components/searchResult'
import searchSuggestion from '@/views/search/components/searchSuggestion'
export default {
  name: 'search',
  data () {
    return {
      searchText: '',
      showVisible: false
    }
  },
  methods: {
    onSearch (val) {
      console.log(val)
      this.showVisible = true
    },
    onCancel () {
      this.$router.back()
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
  .van-search__action {
    color: #fff
  }
}
</style>
