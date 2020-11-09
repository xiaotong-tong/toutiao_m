<template>
<div class="search-suggestion-container">
  <van-cell icon="search" v-for="(item,i) in suggestionList" :key="i" @click="cellClick(item)">
    <div slot="title" v-html="htmlText(item)"></div>
  </van-cell>
</div>
</template>

<script>
import { getSuggestions } from '@/api/search'
import { debounce } from 'lodash'
export default {
  name: 'searchSuggestion',
  data () {
    return {
      suggestionList: []
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      handler: debounce(function (val) {
        this.loadSuggestions(val)
      }, 200),
      immediate: true
    }
  },
  methods: {
    async loadSuggestions (q) {
      try {
        const { data } = await getSuggestions(q)
        this.suggestionList = data.data.options
      } catch (err) {
      }
    },
    htmlText (text) {
      const exp = new RegExp(this.searchText, 'ig')
      const str = `<span class="active">${this.searchText}</span>`
      return text.replace(exp, str)
    },
    cellClick (val) {
      this.$emit('search', val)
    }
  }
}
</script>

<style scoped lang="scss">
.search-suggestion-container {
  /deep/.active {
    color: #3697fa;
  }
}
</style>
