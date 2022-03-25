<template>
  <div class="login-container">
    <van-nav-bar class="page-nav-bar" title="登录" />
    <van-form @submit="submitHandler" ref="loginForm">
      <van-field
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        v-model="users.mobile"
        :rules="Rules.mobile"
        maxlength="11"
      >
        <template #left-icon>
          <i class="toutiao icon-shouji"></i>
        </template>
      </van-field>
      <van-field
        name="code"
        placeholder="请输入验证码"
        type="number"
        v-model="users.code"
        :rules="Rules.code"
        maxlength="6"
      >
        <template #left-icon>
          <i class="toutiao icon-yanzhengma"></i>
        </template>
        <template #button>
          <!-- 倒计时 -->
          <van-count-down v-if="countDownStatus" @finish="countDownStatus = false" :time="time" format="ss s" />
          <van-button
            v-else
            class="send-sms-btn"
            round
            size="small"
            type="default"
            native-type="button"
            @click="sendCodeHandler"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div class="submit-btn-wrap">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { userLogin, getCode } from './../../api/user'
import Rules from './rules'
export default {
  name: 'Login',
  created () {
    this.Rules = Rules
  },
  data () {
    return {
      users: {
        mobile: '',
        code: ''
      },
      time: 60 * 1000,
      countDownStatus: false
    }
  },
  methods: {
    ...mapMutations('user', ['setToken']),
    // 获取验证码
    async sendCodeHandler () {
      // 验证手机号格式
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (error) {
        return console.error(`手机号验证失败${error}`)
      }
      // 倒计时
      this.countDownStatus = true

      // 请求后端发送短信
      let res = null
      try {
        res = await getCode({ mobile: this.users.mobile })
      } catch (error) {
        this.countDownStatus = false
        return
      }
      this.$toast.success(`验证码发送成功！${res.data.data.code}`)
    },
    // 登录提交
    async submitHandler () {
      const { data: { data } } = await userLogin(this.users)
      this.$toast.success('登录成功！')
      // 用户信息存入vuex中
      this.setToken(data)
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
  .toutiao {
    font-size: 19px;
  }
  .send-sms-btn {
    background-color: #ededed;
    .van-button__text {
      color: #666;
    }
  }
  .submit-btn-wrap {
    margin: 27px 14px 0;
  }
}
</style>
