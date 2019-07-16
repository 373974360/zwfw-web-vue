<template>
  <div class="pretrial-table">
    <el-table :data="data" stripe border style="width: 100%">
      <!--<el-table-column type="index" label="序号" width="70" align="center"></el-table-column>-->
      <el-table-column prop="workNo" label="办件编号" width="100" align="center"></el-table-column>
      <el-table-column prop="itemName" label="预审事项" width="200" align="center">
        <template scope="scope">
          <router-link :to="{path: `/guide/detail/${scope.row.itemId}`}">{{scope.row.itemName}}</router-link>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" :formatter="formatDate" label="提交时间" width="120" align="center"></el-table-column>
      <el-table-column prop="status" :formatter="formatStatus" label="审核状态" width="100" align="center">
        <!--<template slot-scope="scope">
          {{scope.row.status | enums('PreauditStatusEnum')}}
        </template>-->
      </el-table-column>
      <el-table-column prop="preauditOption" label="审核意见" align="center"></el-table-column>
      <el-table-column prop="operateTime" :formatter="formatDate" label="审核时间" width="120" align="center"></el-table-column>
      <!--<el-table-column label="交件方式" align="center" v-if="showDelivery">
        <template scope="scope">
          <el-tooltip effect="dark" placement="top" content="点击修改">
            <el-button type="text" @click="handleHandType(scope.row)">
              <span v-if="scope.row.handTypeInfo">{{scope.row.handTypeInfo.handType | enums('HandTypeEnum')}}</span>
              <span v-else>未设置</span>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column label="取件方式" align="center" v-if="showDelivery">
        <template scope="scope">
          <el-tooltip effect="dark" placement="top" content="点击修改">
            <el-button type="text" @click="handleTakeType(scope.row)">
              <span v-if="scope.row.takeTypeInfo">{{scope.row.takeTypeInfo.takeType | enums('TakeTypeEnum')}}</span>
              <span v-else>未设置</span>
            </el-button>
          </el-tooltip>
        </template>
      </el-table-column>-->
      <el-table-column label="操作" width="120" align="center" v-if="showDelivery">
        <template scope="scope">
          <el-button v-if="scope.row.status === 2" type="text" @click="handleUpdate(scope.row.id)">修改</el-button>
          <el-button v-if="scope.row.status === 3 && (!scope.row.handTypeInfo || [11,21,31,51].includes(scope.row.handTypeInfo.handStatus))"
                     type="text" @click="handleHandType(scope.row)">
            {{scope.row.handTypeInfo ? '修改交件方式' : '选择交件方式'}}
          </el-button>
          <el-button v-if="scope.row.status === 3 && (!scope.row.handTypeInfo || !scope.row.handTypeInfo.handTime) && (!scope.row.takeTypeInfo || [11,21,31].includes(scope.row.takeTypeInfo.takeStatus))"
                     type="text" @click="handleTakeType(scope.row)">
            {{scope.row.takeTypeInfo ? '修改取件方式' : '选择取件方式'}}
          </el-button>
          <el-button v-if="scope.row.handTypeInfo && [21, 51].includes(scope.row.handTypeInfo.handStatus)" type="text"
                     @click="showResvCode(scope.row)">
            查看开箱码
          </el-button>
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
      showDelivery: Boolean,
      onHandType: {
        type: Function,
        default: function () {
          return null
        }
      },
      onTakeType: {
        type: Function,
        default: function () {
          return null
        }
      },
      onResvCode: {
        type: Function,
        default: function () {
          return null
        }
      }
    },
    methods: {
      handleUpdate(id) {
        // this.$router.push({path: `/guide/pretrial/id/${id}`})
        window.location.href = '/web/api/sso/redirect?url=/guide/pretrial/id/' + id
      },
      formatStatus(row, column, cellValue) {
        return enums(cellValue, 'PreauditStatusEnum')
      },
      formatDate(row, column, cellValue) {
        return date(cellValue, 'YYYY-MM-DD HH:mm')
      },
      handleHandType(row) {
        this.onHandType(row)
      },
      handleTakeType(row) {
        this.onTakeType(row)
      },
      showResvCode(row) {
        this.onResvCode(row)
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
  .el-button+.el-button {
    margin-left: 0;
  }
</style>
