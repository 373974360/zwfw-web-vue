<template>
  <el-table :data="data" stripe border style="width: 100%">
    <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
    <el-table-column prop="itemName" label="事项名称" width="460" align="center"></el-table-column>
    <el-table-column prop="createTime" label="收藏时间" width="180" align="center"></el-table-column>
    <el-table-column label="操作" width="160" align="center">
      <template scope="scope">
        <el-button type="text" @click="removeFavorite(scope.row.itemId)">取消收藏</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
  import { getAllFavorites, delFavorite } from '../../../api/guide'

  export default {
    name: 'collection-table',
    props: {
      data: Array
    },
    methods: {
      removeFavorite(itemId) {
        delFavorite(itemId).then(response => {
          if (response.status == 200) {
//            todo
          }
        })
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
