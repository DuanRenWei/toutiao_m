<template>
  <div class="my-container">
    <!-- 未登录 -->
    <div class="my-header no-login" v-if="!users">
      <div class="no-login-wrapper" @click="$router.push({ name: 'login' })">
        <div class="phone-pic"></div>
        <span class="text">登录/注册</span>
      </div>
    </div>
    <!-- /未登录 -->

    <!-- 已登录 -->
    <div class="my-header login" v-else>
      <div class="top">
        <div class="user-info">
          <van-image
            class="user-pic"
            fit="cover"
            round
            lazy-load
            src="https://img01.yzcdn.cn/vant/cat.jpeg"
          />
          <h4 v-if="userInfo">{{userInfo.username}}</h4>
        </div>
        <div class="user-edit">
          <van-button type="default" size="mini" round>编辑资料</van-button>
        </div>
      </div>
      <div class="bottom">
        <ul>
          <li>
            <span>100</span>
            <span>头条</span>
          </li>
          <li>
            <span>200</span>
            <span>关注</span>
          </li>
          <li>
            <span>300</span>
            <span>粉丝</span>
          </li>
          <li>
            <span>600</span>
            <span>获赞</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- /已登录 -->

    <!-- 收藏/历史 -->
    <van-grid :column-num="2" clickable class="history">
      <van-grid-item text="收藏">
        <template #icon>
          <i class="toutiao icon-shoucang"></i>
        </template>
      </van-grid-item>
      <van-grid-item text="历史">
        <template #icon>
          <i class="toutiao icon-lishi"></i>
        </template>
      </van-grid-item>
    </van-grid>
    <!-- /收藏/历史 -->

    <!-- 消息面板 -->
    <van-cell-group class="msg-group">
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
    </van-cell-group>
    <!-- /消息面板 -->

    <!-- 退出登录 -->
    <van-cell class="logout" @click="logout" v-if="users" center title="退出登录" />
    <!-- /退出登录 -->
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { logout as apiLogout, getUserInfo } from '@/api/user.js'
export default {
  name: 'MyIndex',
  created () {
    if (this.users) {
      this.getUser()
    }
  },
  data () {
    return {
      userInfo: null
    }
  },
  computed: {
    ...mapGetters(['users'])
  },
  methods: {
    ...mapMutations('user', ['setToken']),
    // 获取用户信息
    async getUser () {
      const { data: { data } } = await getUserInfo()
      this.userInfo = data
    },
    // 退出登录
    async logout () {
      this.$dialog.confirm({
        title: '确认退出吗？'
      })
        .then(async () => {
          await apiLogout()
          this.setToken(null)
          this.$toast.success('退出成功！')
        })
        .catch(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
.my-container {
  .my-header {
    height: 200px;
    background-color: #3296fa;
    background-image: url('~@/assets/images/banner.png');
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    // 未登录样式
    .no-login-wrapper {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 10px;
      .phone-pic {
        width: 66px;
        height: 66px;
        background-color: #fff;
        border-radius: 50%;
        background: url('~@/assets/images/mobile.png') no-repeat;
        background-size: contain;
        margin-bottom: 8px;
      }
      .text {
        color: #fff;
        font-size: 14px;
        letter-spacing: 4px;
      }
    }
    // 已登录样式
    &.login {
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      padding: 0 16px 0;
      .top {
        width: 100%;
        flex: 1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .user-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          .user-pic {
            width: 66px;
            height: 66px;
            border: 2px solid #fff;
            margin-right: 10px;
          }
          h4 {
            font-size: 14px;
            color: #fff;
          }
        }
      }
      .bottom {
        width: 100%;
        flex: 1;
        display: flex;
        align-items: center;
        ul {
          width: 100%;
          display: flex;
          li {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: #fff;
            font-size: 12px;
            span {
              &:first-child {
                font-size: 18px;
                margin-bottom: 10px;
              }
            }
          }
        }
      }
    }
  }
  .history {
    .van-grid-item__icon-wrapper {
      margin-bottom: 8px;
    }
    .toutiao {
      font-size: 20px;
    }
    .icon-shoucang {
      color: #eb5253;
    }
    .icon-lishi {
      color: #ff9d1d;
    }
  }
  .msg-group {
    margin: 10px 0;
  }
  .logout {
    text-align: center;
  }
}
</style>
