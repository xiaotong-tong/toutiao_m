<template>
  <van-button
    class="follow-btn"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    v-if="articleInfo.is_followed"
    :loading="btnloading"
    @click="onFollow"
  >关注</van-button>
  <van-button
    class="follow-btn"
    round
    size="small"
    v-else
    @click="onFollow"
    :loading="btnloading"
  >已关注</van-button>
</template>

<script>
import { addFollowUser, delFollowUser } from '@/api/user'
export default {
  name: 'followUser',
  props: {
    articleInfo: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      btnloading: false
    }
  },
  methods: {
    async onFollow () {
      this.btnloading = true
      try {
        if (this.articleInfo.is_followed) {
          await delFollowUser(this.articleInfo.aut_id)
        } else {
          await addFollowUser(this.articleInfo.aut_id)
        }
        // this.articleInfo.is_followed = !this.articleInfo.is_followed
        this.$emit('followChange', !this.articleInfo.is_followed)
      } catch (e) {
        if (e.response.status === 400) {
          this.$toast('不能关注自己呀')
        }
      }
      this.btnloading = false
    }
  }
}
</script>

<style scoped>

</style>
