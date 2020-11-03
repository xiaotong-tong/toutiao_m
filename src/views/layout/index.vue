<template>
<div class="layout_container">
  <router-view></router-view>
  <van-tabbar route>
    <van-tabbar-item to="/home">
      <i slot="icon" class="toutiao toutiao-shouye"></i>
      <span class="text">首页</span>
    </van-tabbar-item>
    <van-tabbar-item to="/qa">
      <i slot="icon" class="toutiao toutiao-shouye"></i>
      <span class="text">问答</span>
    </van-tabbar-item>
    <van-tabbar-item to="/video">
      <i slot="icon" class="toutiao toutiao-shouye"></i>
      <span class="text">视频</span>
    </van-tabbar-item>
    <van-tabbar-item to="my">
      <i slot="icon" class="toutiao toutiao-shouye"></i>
      <span class="text">{{ $store.state.user ? '我的' : '未登录' }}</span>
    </van-tabbar-item>
  </van-tabbar>
</div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang="scss">
.van-tabbar {
  .toutiao {
    font-size: 40px;
  }
  .text {
    font-size: 20px;
  }
}
</style>
