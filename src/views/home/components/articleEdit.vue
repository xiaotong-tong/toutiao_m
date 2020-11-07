<template>
<div class="article-edit-container">
  <div class="my_channel">
    <van-cell title="我的频道" clfass="title">
      <van-button class="edit_btn" type="danger" round plain size="small" @click="isEdit = !isEdit">{{ isEdit ? '完成' : '编辑' }}</van-button>
    </van-cell>
    <van-grid :gutter="10" :column-num="4">
      <van-grid-item v-for="(channel, i) in channels" :key="channel.id" @click="editMychannel(i, channel)">
        <span slot="text" :class="active === i ? 'active_red' : ''">{{ channel.name }}</span>
        <van-icon name="close" slot="icon" class="close_icon" v-show="isEdit && !fixedChanges.includes(channel.id)"/>
      </van-grid-item>
    </van-grid>
  </div>
  <div class="channer_edit">
    <van-cell title="编辑频道" class="title" />
    <van-grid :gutter="10">
      <van-grid-item v-for="channel in editChannels" :key="channel.id" :text="channel.name" icon="plus" @click="addMychannels(channel)" />
    </van-grid>
  </div>
</div>
</template>

<script>
import { getAllChannels, addUserAllChannels, delUserAllChannels } from '@/api/channel'
import { mapState } from 'vuex'
import { setItem } from '@/utibs/storage'

export default {
  name: 'articleEdit',
  props: {
    channels: {
      type: Array,
      require: true
    },
    active: {
      type: Number,
      require: true
    }
  },
  data () {
    return {
      allChannels: [],
      isEdit: false,
      fixedChanges: [0]
    }
  },
  methods: {
    async loadChannels () {
      try {
        const { data } = await getAllChannels()
        this.allChannels = data.data.channels
      } catch (err) {
        this.$toast('获取频道失败')
      }
    },
    async addMychannels (channel) {
      this.channels.push(channel)
      if (this.user) {
        // 登陆状态下的数据持久化
        try {
          await addUserAllChannels({
            id: channel.id,
            seq: this.channels.length
          })
        } catch (err) {
          this.$toast('新增频道失败')
        }
      } else {
        // 未登陆状态下的数据持久化
        setItem('channels', this.channels)
      }
    },
    editMychannel (index, channel) {
      if (this.isEdit) {
        if (channel.id === 0) {
          return
        }
        const i = this.channels.findIndex(item => {
          return item.id === channel.id
        })
        this.channels.splice(i, 1)
        if (this.active >= i) {
          this.$emit('changeActive', this.active - 1)
        }
        this.removeSetStorage(channel)
      } else {
        this.$emit('changeActive', index, false)
      }
    },
    async removeSetStorage (channel) {
      if (this.user) {
        try {
          await delUserAllChannels(channel.id)
        } catch (e) {
          this.$toast('删除频道失败')
        }
      } else {
        setItem('channels', this.channels)
      }
    }
  },
  computed: {
    editChannels () {
      return this.allChannels.filter(item => {
        return !this.channels.find(channel => channel.id === item.id)
      })
    },
    ...mapState(['user'])
  },
  created () {
    this.loadChannels()
  }
}
</script>

<style lang="scss" scoped>
.article-edit-container {
  padding-top: 100px;
  .title {
    font-size: 32px;
  }
  .my_channel {
    .edit_btn {
      width: 100px;
      height: 48px;
    }
    /deep/ .van-grid-item__icon-wrapper {
      position: absolute;
      top: 0;
      right: 0;
      .close_icon {
        width: 24px;
        height: 24px;
      }
    }
    .active_red {
      color: red;
    }
  }
  /deep/ .van-grid-item__content {
    width: 160px;
    height: 86px;
    border-radius: 6px;
    background-color: #f4f5f7;
    font-size: 24px;
  }
  /deep/.channer_edit {
    .van-icon-plus {
      font-size: 30px;
      margin-right: 10px;
    }
    .van-grid-item__content {
      flex-direction: row;
      .van-grid-item__text {
        margin-top: 0;
      }
    }
  }
}
</style>
