<template>
<div class="article-item">
  <van-cell :to="'/article/' + article.art_id">
    <span slot="title" class="title">{{article.title}}</span>
    <div class="pics" v-if="article.cover.type === 3" slot="label">
      <van-image class="picsimg" v-for="(item, i) in article.cover.images" :key="i" :src="item"/>
    </div>
    <span slot="label" class="label">
      <span>{{ article.aut_name }}</span>
      <span>{{ article.comm_count }}评论</span>
      <span>{{ article.pubdate | relativeTime }}</span>
    </span>
    <van-image class="simpleimg" slot="default" fit="cover" :src="article.cover.images[0]" v-if="article.cover.type === 1"/>
  </van-cell>
</div>
</template>

<script>
export default {
  props: ['article'],
  name: 'articleItem'
}
</script>

<style lang="scss" scoped>
.article-item {
  .title {
    font-size: 32px;
    color: #333;
  }
  .label {
    span {
      font-size: 24px;
      margin-right: 10px;
      color: #ccc;
    }
  }
  .simpleimg {
    width: 232px;
    height: 146px;
  }
  .van-cell__title {
    flex: unset;
    margin-right: 20px;
  }
  .pics {
    display: flex;
  }
  .picsimg {
    flex: 1 0 100px;
    height: 146px;
    margin-right: 10px;
  }
}
</style>
