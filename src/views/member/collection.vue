<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">我的收藏</div>
    </div>
    <div class="data-bg"><collection-table></collection-table></div>
  </div>
</template>

<script>
  import { CollectionTable } from './table'

  export default {
    components: {
      CollectionTable
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
    }
    .data-bg {
      padding: 16px;
      min-height: 100px;
      overflow: hidden;
    }
  }
</style>
