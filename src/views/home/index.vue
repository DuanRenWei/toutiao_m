<template>
  <div class="home-container">
    <van-nav-bar class="page-nav-bar" fixed>
      <template #title>
        <van-button
          class="search_btn"
          type="info"
          size="mini"
          round
          icon="search"
          >搜索</van-button
        >
      </template>
    </van-nav-bar>

    <!-- tabbar -->
    <van-tabs v-model="active" class="toutiao-tabbar" animated border swipeable>
      <van-tab :title="navbar.title" v-for="navbar in navbars" :key="navbar.id">
        <article-list :nav="navbar" />
      </van-tab>

      <template #nav-right>
        <div class="placeholder"></div>
        <div class="hamburg_button">
          <i class="toutiao icon-gengduo"></i>
        </div>
      </template>
    </van-tabs>
    <!-- tabbar -->
  </div>
</template>

<script>
import { getAllCategory } from '@/api/home.js'
import ArticleList from './components/article-list.vue'
export default {
  name: 'HomeIndex',
  components: {
    ArticleList
  },
  created () {
    this.loadCategory()
  },
  data () {
    return {
      active: 0,
      navbars: []
    }
  },
  methods: {
    async loadCategory () {
      const {
        data: { data }
      } = await getAllCategory()
      this.navbars = data
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  padding-top: 88px;
  padding-bottom: 50px;
  .page-nav-bar {
    /deep/ .van-nav-bar__title {
      max-width: unset !important;
      .search_btn {
        width: 278px;
        height: 32px;
        border: none;
        color: #fff;
        .van-icon {
          font-size: 16px;
        }
        .van-button__text {
          font-size: 14px;
        }
      }
    }
  }
  .toutiao-tabbar {
    /deep/ .van-tabs__wrap {
      position: fixed;
      top: 46px;
      left: 0;
      width: 100%;
      z-index: 1;
      height: 42px;
    }
    /deep/ .van-tabs__nav {
      padding: 0;
      .van-tabs__line {
        width: 16px;
        bottom: 4px;
        background-color: #3296fa;
      }
      .placeholder {
        width: 33px;
        height: 41px;
        flex-shrink: 0;
      }
      .hamburg_button {
        position: fixed;
        right: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 33px;
        height: 41px;
        background-color: #ffffff;
        opacity: 0.9;
        i.toutiao {
          font-size: 17px;
          color: #333333;
        }
        &::before {
          position: absolute;
          left: 0;
          content: '';
          width: 1px;
          height: 29px;
          background: url(~@/assets/images/gradient-gray-line.png);
          background-size: contain;
        }
      }
    }
  }
}
</style>
