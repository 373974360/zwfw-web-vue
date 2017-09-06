<template>
  <div class="search">
    <levelbar></levelbar>
    <div class="search-container">
      <el-input type="text" v-model="keywords" placeholder="请输入关键字">
        <template slot="prepend"><icon-svg iconClass="search"/></template>
      </el-input>
      <el-button typ="primary" size="small">搜&nbsp;&nbsp;索</el-button>
    </div>
  </div>
</template>

<script>
  import { Levelbar } from '../layout'

  export default {
    components: {
      Levelbar
    },
    data() {
      return {
        keywords: ''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .search {
    width: 1156px;
    height: 42px;
    margin: 0 auto;
    padding-bottom: 12px;
    .levelbar {
      position: absolute;
      float: left;
    }
    .svg-icon {
      width: 1.2em !important;
      height: 1.2em !important;
    }
    .search-container {
      float: right;
      input {
        height: 28px;
        line-height: 29px;
      }
      .el-input {
        width: 170px;
        height: 28px;
        margin: 1px 0;
      }
      .el-button {
        background: #f38d0a;
        color: #ffffff;
        border: none;
      }
    }
  }
</style>
