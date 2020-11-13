<template>
<div class="updata_photo">
  <img class="img" :src="src" alt="" ref="img">
  <div class="btnwrap">
    <span @click="$emit('close')">取消</span>
    <span>完成</span>
  </div>
</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
export default {
  name: 'updataphoto',
  props: {
    src: {
      type: [String, Object],
      required: true
    }
  },
  data () {
    return {
      cropper: null
    }
  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {})
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 100%;
}
.btnwrap {
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 80px;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: space-between;
}
</style>
