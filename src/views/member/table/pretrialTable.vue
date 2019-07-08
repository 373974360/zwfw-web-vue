<template>
  <div class="pretrial-table">
    <el-table :data="data" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="70" align="center"></el-table-column>
      <el-table-column prop="itemName" label="预审事项" width="200" align="center">
        <template scope="scope">
          <router-link :to="{path: `/guide/detail/${scope.row.itemId}`}">{{scope.row.itemName}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="formatDate" label="提交时间" width="110" align="center"></el-table-column>
      <el-table-column prop="workNo" label="办件编号" width="100" align="center"></el-table-column>
      <el-table-column prop="status" :formatter="formatStatus" label="审核状态" width="100" align="center">
        <!--<template slot-scope="scope">
          {{scope.row.status | enums('PreauditStatusEnum')}}
        </template>-->
      </el-table-column>
      <el-table-column prop="preauditOption" label="审核意见" width="120" align="center"></el-table-column>
      <el-table-column prop="operateTime" :formatter="formatDate" label="审核时间" width="110" align="center"></el-table-column>
      <el-table-column label="操作" width="70" align="center">
        <template scope="scope">
          <el-button type="text" :disabled="scope.row.status != 2" @click="handleUpdate(scope.row.id)">修改</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { date, enums } from '../../../filters'

  export default {
    props: {
      data: Array
    },
    methods: {
      handleUpdate(id) {
        this.$router.push({path: `/guide/pretrial/id/${id}`})
      },
      formatStatus(row, column, cellValue) {
        return enums(cellValue, 'PreauditStatusEnum')
      },
      formatDate(row, column, cellValue) {
        return date(cellValue, 'YYYY-MM-DD HH:mm')
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .pretrial-table {
    .el-table {
      th {
        font-weight: normal;
      }
    }
  }
</style>
