<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
    <el-table-column prop="id" label="办件编号" width="140" align="center"></el-table-column>
    <el-table-column prop="itemName" label="办件名称" width="300" align="center"></el-table-column>
    <el-table-column prop="startItemTime" label="申报日期" width="180" align="center"></el-table-column>
    <el-table-column prop="status" label="当前状态" width="180" align="center"></el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'transaction-table',
    data() {
      return {
        tableData: []
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
