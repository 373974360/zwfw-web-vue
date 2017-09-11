<template>
  <div>
    <div class="data-box">
      <div class="label-bg">
        <div class="label">我的办件</div>
        <div class="more"><router-link :to="{path: '/member/transaction'}">更多></router-link></div>
      </div>
      <div class="data-bg"><transaction-table></transaction-table></div>
    </div>
    <div class="data-box">
      <div class="label-bg">
        <div class="label">我的预审</div>
        <div class="more"><router-link :to="{path: '/member/review'}">更多></router-link></div>
      </div>
      <div class="data-bg"><review-table></review-table></div>
    </div>
    <div class="data-box">
      <div class="label-bg">
        <div class="label">我的收藏</div>
        <div class="more"><router-link :to="{path: '/member/collection'}">更多></router-link></div>
      </div>
      <div class="data-bg"><collection-table></collection-table></div>
    </div>
  </div>
</template>

<script>
  import { TransactionTable, ReviewTable, CollectionTable } from './table'

  export default {
    components: {
      TransactionTable, ReviewTable, CollectionTable
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .data-box {
    border: 1px solid #e1e2e4;
    margin-bottom: 18px;
    color: #2b2b2b;
    overflow: hidden;
    .label-bg {
      height: 40px;
      padding: 0 16px;
      background: #ededf0;
      .label {
        float: left;
        height: 40px;
        line-height: 40px;
        font-size: 16px;
      }
      .more {
        float: right;
        height: 40px;
        line-height: 40px;
        font-size: 12px;
      }
    }
    .data-bg {
      padding: 16px;
      min-height: 100px;
      overflow: hidden;
    }
  }
</style>
