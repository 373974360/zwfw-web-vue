<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
    <el-table-column prop="itemName" label="预审事项" width="240" align="center"></el-table-column>
    <el-table-column prop="subTime" label="提交时间" width="110" align="center"></el-table-column>
    <el-table-column prop="checkStatus" label="审核状态" width="100" align="center"></el-table-column>
    <el-table-column prop="checkIdea" label="审核意见" width="150" align="center"></el-table-column>
    <el-table-column prop="checkTime" label="审核时间" width="110" align="center"></el-table-column>
    <el-table-column label="操作" width="100" align="center">
      <template scope="scope">
        <el-button type="text">修改</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  export default {
    name: 'review-table',
    data() {
      return {
        tableData: [
          {itemName: 'ceshi', subTime: '2017-11-11 20:06', checkStatus: '复核', checkIdea: '同意', checkTime: '2027-09-08 10:36'}
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
