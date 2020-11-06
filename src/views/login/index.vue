<template>
<div>
<!--  导航栏 -->
  <van-nav-bar
    title="登录"
  ><template #left>
    <span  v-if="$store.state.routerBackFlag" @click="$router.back()" class="toutiao toutiao-guanbi" style="color: #fff"></span>
  </template>
    </van-nav-bar>
<!--  /导航栏 -->
<!--  登陆表单 -->
  <van-form @submit="onSubmit" ref="userFormRef">
    <van-field
      name="mobile"
      placeholder="请输入手机号"
      v-model="userInfo.mobile"
      :rules="userFormRules.mobile"
      type="number"
      maxlength="11">
      <i slot="left-icon" class="toutiao toutiao-shouji"></i>
    </van-field>
    <van-field
      name="code"
      placeholder="请输入验证码"
      v-model="userInfo.code"
      :rules="userFormRules.code"
      type="number"
      maxlength="6">
      <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
      <template #button>
        <van-button size="small" type="default" class="login_yzm" round native-type="button" @click="sendSms" v-if="yzmShow">发送验证码</van-button>
        <van-count-down :time="60000" format="ss s" v-else @finish="yzmShow = true" />
      </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button block type="info" native-type="submit" class="login_sub">
        登录
      </van-button>
    </div>
  </van-form>
<!--  /登陆表单 -->
</div>
</template>

<script>
import { login, sendSms } from '@/api/user'
export default {
  name: 'login',
  data () {
    return {
      userInfo: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '请输入手机号'
        }, {
          pattern: /^1\d{10}$/,
          message: '请输入正确的手机号'
        }],
        code: [{
          required: true,
          message: '请输入验证码'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码输入错误'
        }]
      },
      yzmShow: true
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '登陆中...',
        forbidClick: true
      })
      try {
        console.log(1)
        const data = await login(this.userInfo)
        this.$store.commit('setUser', data.data.data)
        this.$toast.success('登录成功')
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
        if (err.response.status === 400) {
          this.$toast.fail('验证码错误')
        } else {
          this.$toast.fail('登录失败')
        }
      }
    },
    async sendSms () {
      try {
        await this.$refs.userFormRef.validate('mobile')
      } catch (err) {
        return this.$toast.fail('请输入正确的手机号')
      }
      this.yzmShow = false
      const data = await sendSms(this.userInfo.mobile)
      console.log(data)
      if (data.status !== 200) {
        this.$toast.fail('获取验证码失败')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.toutiao {
  font-size: 38px;
  margin-right: 10px;
}
.login_yzm {
  width: 162px;
  height: 46px;
  background-color: #ededed;
  font-size: 20px;
  color: #666;
  text-align: left;
}
.login_sub {
  background: #6db4fb;
  font-size: 30px;
}
</style>
