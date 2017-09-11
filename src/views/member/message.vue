<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">我的消息</div>
      <div class="read"><el-button size="small">全部标为已读</el-button></div>
    </div>
    <div class="data-bg">
      <el-table :data="tableData" stripe border style="width: 100%">
        <el-table-column prop="title" label="标题" width="100" align="center"></el-table-column>
        <el-table-column prop="content" label="消息内容" width="600" align="center"></el-table-column>
        <el-table-column prop="time" label="消息时间" width="180" align="center"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import { CollectionTable } from './table'

  export default {
    name: 'message',
    components: {
      CollectionTable
    },
    data() {
      return {
        tableData: [
          {title: '系统消息', content: '欢迎注册！', time: '2017-09-08 15:35'}
        ]
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
      .read {
        height: 40px;
        line-height: 38px;
      }
      .el-button {
        background: #ededf0;
        margin-left: 10px;
      }
    }
    .data-bg {
      padding: 16px;
      min-height: 100px;
      overflow: hidden;
      .el-table {
        th {
          font-weight: normal;
        }
      }
    }
  }
</style>
