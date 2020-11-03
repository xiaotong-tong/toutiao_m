<template>
  <div class="my_container">
    <div class="login_box" v-if="user">
      <div class="userinfo">
        <van-image
          :src="userInfo.photo"
          fit="cover"
          class="avatar"
          round
        />
        <span class="username">{{ userInfo.intro }}</span>
        <van-button round type="default" class="edit-user">编辑资料</van-button>
      </div>
      <div class="bottom">
        <div class="item">
          <span>{{ userInfo.art_count }}</span>
          <i>头条</i>
        </div>
        <div class="item">
          <span>{{ userInfo.follow_count }}</span>
          <i>关注</i>
        </div>
        <div class="item">
          <span>{{ userInfo.fans_count }}</span>
          <i>粉丝</i>
        </div>
        <div class="item">
          <span>{{ userInfo.like_count }}</span>
          <i>获赞</i>
        </div>
      </div>
    </div>
    <div class="notlogin_box" v-else>
      <div class="login_btn" @click="$router.push('/login')">
        <img src="~@/assets/mobile.png" alt="" class="mobile_img">
        <span class="login_text">登陆 / 注册</span>
      </div>
    </div>
    <van-grid :column-num="2">
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="shoucangtext">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="shoucangtext">历史</span>
      </van-grid-item>
    </van-grid>
    <van-cell title="消息通知" class="cell_btn" is-link />
    <van-cell title="小智同学" class="cell_btn" is-link />
    <van-cell title="退出登录" class="logout_btn" v-if="user" clickable @click="logout"></van-cell>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'

export default {
  name: 'my',
  data () {
    return {
      userInfo: {}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    logout () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          this.$store.commit('setUser', null)
        })
        .catch(() => {
          // on cancel
        })
    },
    async getUser () {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取用户信息失败')
      }
    }
  },
  created () {
    if (this.user) {
      this.getUser()
    }
  }
}
</script>

<style scoped lang="scss">
.notlogin_box {
  height: 361px;
  background-image: url("~@/assets/banner.png");
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    .mobile_img {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    .login_text {
      font-size: 22px;
      color: #fff;
    }
  }
}
.login_box {
  position: relative;
  height: 361px;
  padding-top: 120px;
  background-image: url("~@/assets/banner.png");
  background-size: cover;
  .userinfo {
    padding: 0 30px;
    .avatar {
      width: 132px;
      height: 132px;
      border-radius: 50%;
      vertical-align: middle;
    }
    .username {
      color: #fff;
      font-size: 30px;
      margin-left: 30px;
    }
    .edit-user {
      width: 116px;
      height: 33px;
      padding: 0;
      margin-top: 51px;
      float: right;
      color: #666;
      font-size: 20px;
    }
  }
  .bottom {
    position: absolute;
    bottom: 50px;
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
    .item {
      display: flex;
      flex-direction: column;
      align-items: center;
      color: #fff;
      span {
        font-size: 36px;
      }
      i {
        font-size: 22px;
        font-style: normal;
      }
    }
  }
}
.toutiao-shoucang {
  color: #eb5253;
  width: 45px;
  height: 45px;
}
.toutiao-lishi {
  @extend .toutiao-shoucang;
  color: #ff9d1d;
}
.shoucangtext {
  font-size: 28px;
}
.logout_btn {
  margin-top: 10px;
  font-size: 30px;
  text-align: center;
  color: #d86262;
}
.cell_btn {
  font-size: 30px;
  color: #333;
}
</style>
