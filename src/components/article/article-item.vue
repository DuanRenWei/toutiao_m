<template>
  <van-cell class="article-item">
    <template #title>
      <h4 class="van-multi-ellipsis--l2">{{ item.title }}</h4>
    </template>

    <template #extra v-if="item.pic">
      <van-image fit="cover" :src="item.pic" />
    </template>

    <template #label>
      <div class="item-bottom">
        <span>{{ item.user.username }}</span>
        <span>78评论</span>
        <span>{{ item.created_at }}</span>
      </div>
    </template>
  </van-cell>
</template>

<script>
export default {
  name: 'ArticleItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.article-item {
  align-items: center;
  .van-image {
    flex:unset;
    margin-left: 13px;
    width: 116px;
    height: 73px;
  }
  .item-bottom {
    span {
      font-size: 12px;
      &:not(:last-child) {
        margin-right: 10px;
      }
    }
  }
}
</style>
