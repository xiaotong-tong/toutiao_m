<template>
<div class="updata_name">
  <van-nav-bar
    class="name_navbar"
    title="修改昵称"
    left-text="取消"
    right-text="完成"
    @click-left="$emit('close')"
    @click-right="onConfirm"
  />
  <div class="field_wrap">
    <van-field
      v-model="localName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</div>
</template>

<script>
import { updataUserProfile } from '@/api/user'

export default {
  name: 'updataName',
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      localName: this.value
    }
  },
  methods: {
    async onConfirm () {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const localName = this.localName
        if (!localName.length) {
          this.$toast('昵称不能为空')
          return
        }
        await updataUserProfile({
          name: localName
        })
        this.$emit('input', localName)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (e) {
        if (e.response.status === 409) {
          this.$toast.fail('用户名已存在')
        } else {
          this.$toast.fail('更新失败')
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.updata_name {
  .name_navbar {
    background: #fff;
    /deep/.van-nav-bar__title {
      color: #000;
    }
  }
  .field_wrap {
    padding: 20px;
  }
}
</style>
