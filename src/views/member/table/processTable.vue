<template>
  <div class="process-table">
    <el-table :data="data" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="pretrialNumber" label="办件编号" width="140" align="center"></el-table-column>
      <el-table-column prop="itemName" label="办件名称" width="300" align="center">
        <template scope="scope">
          <router-link :to="{path: `/guide/detail/${scope.row.itemId}`}">{{scope.row.itemName}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="startItemTime" :formatter="formatDate" label="申报日期" width="180" align="center"></el-table-column>
      <el-table-column prop="status" :formatter="formatStatus" label="当前状态" width="180" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { date, processStatus } from '../../../filters'

  export default {
    props: {
      data: Array
    },
    methods: {
      formatStatus(row, column, cellValue) {
        return processStatus(cellValue)
      },
      formatDate(row, column, cellValue) {
        return date(cellValue, 'YYYY-MM-DD HH:mm')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .process-table {
    .el-table {
      th {
        font-weight: normal;
      }
    }
  }
</style>
