<template>
  <div class="article-list-container">
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh" :success-duration="1500"  :success-text="pullRefreshSuccText">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
    >
      <article-item v-for="item in list" :key="item.id" :item="item" />
      <!-- <van-cell v-for="item in list" :key="item.id" :title="item.title" /> -->
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleLists } from '@/api/home.js'
import ArticleItem from '@/components/article/article-item.vue'
export default {
  name: 'ArticleList',
  components: { ArticleItem },
  props: {
    nav: {
      type: Object,
      required: true,
      default: () => ({})
    }
  },
  data () {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      isLoading: false,
      page: 1,
      limit: 4,
      pullRefreshSuccText: '刷新成功'
    }
  },
  methods: {
    // 上拉加载更多
    async onLoad () {
      try {
        const { rows, count } = await this.loadArticle()
        this.list.push(...rows)
        this.loading = false
        // 数据加载完成
        if (this.list.length === count) {
          this.finished = true
        } else {
          this.page++
        }
      } catch (error) {
        this.loading = false
        this.error = true
      }
    },
    // 下拉刷新
    async onRefresh () {
      try {
        const { rows, count } = await this.loadArticle()
        this.list.unshift(...rows)
        this.isLoading = false
        this.pullRefreshSuccText = `成功刷新${count}条数据`
      } catch (error) {
        this.pullRefreshSuccText = '刷新失败'
        this.isLoading = false
      }
    },
    // 请求后端数据
    async loadArticle (params) {
      const {
        data: {
          data: { rows, count }
        }
      } = await getArticleLists({
        cate_id: this.nav.id,
        page: this.page,
        limit: this.limit,
        ...params
      })
      return { rows, count }
    }
  }
}
</script>

<style lang="less" scoped>
.article-list-container {
  height: 79vh;
  overflow-y: auto;
}
</style>
