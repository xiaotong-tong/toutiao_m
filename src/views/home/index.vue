<template>
  <div class="home_container">
    <van-nav-bar fixed>
      <van-button type="info" slot="title" class="search-btn" icon="search" size="small" round>
        搜索
      </van-button>
    </van-nav-bar>
    <van-tabs v-model="active" animated swipeable title-inactive-color="#777" title-active-color="#333">
      <van-tab :title="item.name" v-for="item in channel" :key="item.id">
        <article-list :channel="item"></article-list>
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="hamburger_btn" @click="showChannelPopup = true">
        <i class="toutiao toutiao-gengduo"></i>
      </div>
    </van-tabs>
    <van-popup v-model="showChannelPopup" position="bottom" :style="{ height: '100%' }"  closeable close-icon-position="top-left">
      <article-edit :channels="channel" :active="active" @changeActive="changeAct"></article-edit>
    </van-popup>
  </div>
</template>

<script>
import { getUserChannelList } from '@/api/user'
import articleList from './components/articleList'
import articleEdit from '@/views/home/components/articleEdit'
export default {
  name: 'home',
  data () {
    return {
      active: 0,
      channel: [],
      showChannelPopup: false
    }
  },
  methods: {
    async getUserChannels () {
      try {
        const { data } = await getUserChannelList()
        console.log(data)
        this.channel = data.data.channels
      } catch (e) {
        this.$toast('获取频道列表失败')
      }
    },
    changeAct (index) {
      this.active = index
    }
  },
  created () {
    this.getUserChannels()
  },
  components: {
    articleList,
    articleEdit
  }
}
</script>

<style scoped lang='scss'>
.home_container {
  padding-bottom: 100px;
  padding-top: 174px;
}
/deep/ .van-nav-bar__title {
  max-width: unset;
}

.search-btn {
  width: 555px;
  height: 64px;
  border: none;
  background-color: #5babfb;
  font-size: 28px;

  .van-icon {
    font-size: 32px;
    color: #fff;
  }
}

/deep/.van-tabs {
  .van-tabs__wrap {
    position: fixed;
    top: 92px;
    z-index: 2;
    height: 82px;
    width: 100%;
  }
  .van-tab {
    min-width: 200px;
    border-right: thin solid #ddd;
    font-size: 30px;
  }
  .van-tabs__line {
    width: 31px;
    height: 6px;
    background-color: #3af;
    border-radius: 50%;
  }
  .hamburger_btn {
    position: fixed;
    right: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 66px;
    height: 82px;
    opacity: 0.902;
    background:#fff url("~@/assets/gradient-gray-line.png") no-repeat 0 0/contain;
    i.toutiao {
      font-size: 33px;
    }
  }
  .placeholder {
    flex: 0 0 66px;
    height: 82px;
  }
  .van-tabs__content {
    min-height: 75vh;
  }
}
</style>
