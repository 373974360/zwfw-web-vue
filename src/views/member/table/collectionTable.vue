<template>
  <div class="collection-table">
    <el-table :data="data" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="itemName" label="事项名称" width="460" align="center"></el-table-column>
      <el-table-column prop="createTime" :formatter="formatDate" label="收藏时间" width="180" align="center"></el-table-column>
      <el-table-column label="操作" width="160" align="center">
        <template scope="scope">
          <el-button type="text" @click="onHandleRemove(scope.row)">取消收藏</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { date } from '../../../filters'

  export default {
    props: {
      data: Array,
      handleRemove: Function
    },
    methods: {
      onHandleRemove(row) {
        this.handleRemove(row)
      },
      formatDate(row, column, cellValue) {
        return date(cellValue, 'YYYY-MM-DD HH:mm')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .collection-table {
    .el-table {
      th {
        font-weight: normal;
      }
    }
  }
</style>
