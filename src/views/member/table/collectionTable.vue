<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
    <el-table-column prop="itemName" label="事项名称" width="460" align="center"></el-table-column>
    <el-table-column prop="collectTime" label="收藏时间" width="180" align="center"></el-table-column>
    <el-table-column label="操作" width="160" align="center">
      <template scope="scope">
        <el-button type="text">取消收藏</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'collection-table',
    data() {
      return {
        tableData: [
          {itemName: 'ceshi', collectTime: '2017-09-11 13:48'}
        ]
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .el-table {
    th {
      font-weight: normal;
    }
  }
</style>
