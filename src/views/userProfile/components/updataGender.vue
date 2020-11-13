<template>
<div class="gender_name">
  <van-picker
    title="标题"
    show-toolbar
    :columns="columns"
    @confirm="onConfirm"
    @cancel="$emit('close')"
    @change="onChange"
    :default-index="gender"
  />
</div>
</template>

<script>
import { updataUserProfile } from '@/api/user'

export default {
  name: 'genderName',
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      gender: this.value,
      columns: ['男', '女']
    }
  },
  methods: {
    async onConfirm (value, index) {
      try {
        const gender = this.gender
        await updataUserProfile({
          gender: gender
        })
        this.$emit('input', gender)
        this.$emit('close')
        this.$toast.success('更新成功')
      } catch (e) {
        this.$toast.fail('更新失败')
      }
    },
    onChange (picker, value, index) {
      this.gender = index
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
