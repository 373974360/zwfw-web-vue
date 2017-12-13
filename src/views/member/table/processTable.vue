<template>
  <div class="process-table">
    <el-table :data="data" stripe border style="width: 100%">
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="processNumber" label="办件编号" width="150" align="center">
        <template scope="scope">
          <router-link :to="{path: `/member/processDetail/${scope.row.id}`}" title="点击查看办件详情">
            {{scope.row.processNumber}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="itemName" label="办件名称" width="240" align="center">
        <template scope="scope">
          <router-link :to="{path: `/guide/detail/${scope.row.itemId}`}">
            {{scope.row.itemName}}
          </router-link>
        </template>
      </el-table-column>
      <el-table-column prop="startItemTime" :formatter="formatDate" label="申报日期" width="150" align="center"></el-table-column>
      <el-table-column label="当前状态" width="120" align="center">
        <template scope="scope">
          <span v-if="scope.row.status === 15">
            {{scope.row.status | enums('ItemProcessStatus')}} | {{scope.row.takeTypeInfo.flagTakeCert | enums('TakeStatus')}}
          </span>
          <span v-else>{{scope.row.status | enums('ItemProcessStatus')}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button v-if="scope.row.status === 10" type="text" @click="handleTakeType(scope.row)">修改取件方式</el-button>
          <el-button v-else-if="scope.row.takeTypeInfo.flagTakeCert === 4" type="text" @click="handlePostCode(scope.row)">获取取件码</el-button>
          <el-button v-else type="text" @click="handleShowDetail(scope.row)">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { date, enums } from '../../../filters'

  export default {
    props: {
      data: Array,
      takeType: Function,
      postCode: Function
    },
    methods: {
      formatStatus(row, column, cellValue) {
        return enums(cellValue, 'ItemProcessStatus')
      },
      formatDate(row, column, cellValue) {
        return date(cellValue, 'YYYY-MM-DD HH:mm')
      },
      handleTakeType(row) {
        this.takeType(row)
      },
      handlePostCode(row) {
        this.postCode(row)
      },
      handleShowDetail(row) {
        this.$router.push({path: `/member/processDetail/${row.id}`});
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
