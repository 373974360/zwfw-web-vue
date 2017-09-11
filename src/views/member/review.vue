<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">我的预审</div>
    </div>
    <div class="data-bg">
      <div class="data-tool">
        <div class="search-container">
          <el-input type="text" v-model="keywords" placeholder="请输入办件名称进行检索"></el-input>
          <el-button typ="primary" size="small">检&nbsp;&nbsp;索</el-button>
        </div>
        <div class="checkbox-container">
          <el-checkbox v-model="draft">草稿</el-checkbox>
          <el-checkbox v-model="todo">待审</el-checkbox>
          <el-checkbox v-model="not">未通过</el-checkbox>
          <el-checkbox v-model="done">通过</el-checkbox>
        </div>
      </div>
      <review-table></review-table>
    </div>
  </div>
</template>

<script>
  import { ReviewTable } from './table'

  export default {
    name: 'review',
    components: {
      ReviewTable
    },
    data() {
      return {
        keywords: '',
        draft: '',
        todo: '',
        not: '',
        done: ''
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
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
      .data-tool {
        height: 30px;
        overflow: hidden;
        margin-bottom: 15px;
        .search-container {
          float: right;
          .el-input {
            width: 180px;
            height: 28px;
            margin: 1px 0;
            input {
              height: 28px;
              line-height: 29px;
            }
          }
          .el-button {
            background: #f38d0a;
            color: #ffffff;
            border: none;
          }
        }
        .checkbox-container {
          float: right;
          height: 30px;
          line-height: 30px;
          margin-right: 20px;
          .el-checkbox__label {
            font-size: 14px;
            font-weight: normal;
          }
        }
      }
    }
  }
</style>
