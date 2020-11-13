<template>
<div class="user-profile-container">
  <van-nav-bar
    title="个人信息"
    left-arrow
    @click-left="$router.back()"
  />
  <input type="file" ref="file" hidden @change="onFileChange">
  <van-cell title="头像" is-link @click="$refs.file.click()">
    <van-image
      class="avatar"
      round
      fit="cover"
      :src="user.photo"
    />
  </van-cell>
  <van-cell title="昵称" is-link :value="user.name" @click="isUpdataNameShow = true"/>
  <van-cell title="性别" is-link :value="user.gender === 0 ? '男' : '女'" @click="isUpdataGenderShow = true" />
  <van-cell title="生日" is-link :value="user.birthday" @click="isUpdataBirthdayShow = true" />

  <van-popup v-model="isUpdataNameShow" position="bottom" :style="{ height: '100%' }">
    <updata-name v-if="isUpdataNameShow" @close="isUpdataNameShow = false" v-model="user.name"></updata-name>
  </van-popup>
  <van-popup v-model="isUpdataGenderShow" position="bottom">
    <updata-gender v-if="isUpdataGenderShow" @close="isUpdataGenderShow = false" v-model="user.gender"></updata-gender>
  </van-popup>
  <van-popup v-model="isUpdataBirthdayShow" position="bottom">
    <updata-birthday v-if="isUpdataBirthdayShow" @close="isUpdataBirthdayShow = false" v-model="user.birthday"></updata-birthday>
  </van-popup>
  <van-popup v-model="isUpdataPhotoShow" position="bottom" class="imgpopup">
    <updata-photo v-if="isUpdataPhotoShow" @close="isUpdataPhotoShow = false" :src="img"></updata-photo>
  </van-popup>
</div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import updataName from '@/views/userProfile/components/updataName'
import updataGender from '@/views/userProfile/components/updataGender'
import updataBirthday from '@/views/userProfile/components/updataBirthday'
import updataPhoto from '@/views/userProfile/components/updataPhoto'
export default {
  name: 'userProfile',
  data () {
    return {
      user: {},
      isUpdataNameShow: false,
      isUpdataGenderShow: false,
      isUpdataBirthdayShow: false,
      isUpdataPhotoShow: false,
      img: null
    }
  },
  components: {
    updataName,
    updataGender,
    updataBirthday,
    updataPhoto
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    async loadUserProfile () {
      try {
        const { data } = await getUserProfile()
        this.user = data.data
      } catch (e) {
      }
    },
    onFileChange () {
      const file = this.$refs.file.files[0]
      this.img = window.URL.createObjectURL(file)
      this.isUpdataPhotoShow = true
      this.$refs.file.value = ''
    }
  }
}
</script>

<style lang="scss" scoped>
.user-profile-container {
  .avatar {
    width: 60px;
    height: 60px;
  }
  .van-popup {
    background: #f5f7f9;
  }
  .imgpopup {
    height: 100%;
  }
}
</style>
