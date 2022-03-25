<template>
  <div class="layout-container">
    <router-view />
    <van-tabbar route>
      <van-tabbar-item
      v-for="(tabbar, index) in tabbars"
      :key="index"
      :to="tabbar.path"
      >
      <template #icon>
        <i :class="tabbar.icon"></i>
      </template>
      {{tabbar.title}}
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'LayoutIndex',
  computed: {
    ...mapGetters(['users'])
  },
  data () {
    return {
      tabbars: [
        {
          path: '/',
          icon: 'toutiao icon-shouye',
          title: '首页'
        },
        {
          path: '/qs',
          icon: 'toutiao icon-wenda',
          title: '问答'
        },
        {
          path: '/video',
          icon: 'toutiao icon-shipin',
          title: '视频'
        },
        {
          path: '/my',
          icon: 'toutiao icon-wode',
          title: '我的'
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped></style>
