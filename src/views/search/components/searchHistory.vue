<template>
<div class="search-history-container">
  <van-cell title="搜索历史">
    <div slot="default" v-if="closeVisible">
      <span @click="$emit('clearAllHistory');
      ">全部删除   </span>
      <span @click="closeVisible = !closeVisible">完成</span>
    </div>
    <van-icon name="delete" v-else @click="closeVisible = !closeVisible" />
  </van-cell>
  <van-cell :title="item" v-for="(item, i) in searchHistory" :key="i" @click="clickCell(item, i)">
    <template #right-icon>
      <van-icon name="close" v-if="closeVisible"></van-icon>
    </template>
  </van-cell>
</div>
</template>

<script>
export default {
  name: 'searchHistory',
  props: {
    searchHistory: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      closeVisible: false
    }
  },
  methods: {
    clickCell (item, i) {
      if (this.closeVisible) {
        this.searchHistory.splice(i, 1)
      } else {
        this.$emit('search', item)
      }
    }
  }
}
</script>

<style scoped>

</style>
