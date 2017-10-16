<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">我的消息</div>
      <div class="read"><el-button size="small">全部标为已读</el-button></div>
    </div>
    <div class="data-bg">
      <el-table :data="messageData" stripe border style="width: 100%">
        <el-table-column prop="title" label="标题" width="100" align="center"></el-table-column>
        <el-table-column prop="content" label="消息内容" width="600" align="center"></el-table-column>
        <el-table-column prop="sendTime" :formatter="formatDate" label="消息时间" width="180" align="center"></el-table-column>
      </el-table>
      <div class="page-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[5, 10, 15, 20]"
          :page-size="pageSize"
          layout="prev, pager, next, total, sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { getMyMessagePage } from '../../api/member/message'
  import { date } from '../../filters'

  export default {
    data() {
      return {
        messageData: [],
        page: 1,
        pageSize: 10,
        total: 0
      }
    },
    created() {
      this.loadPage()
    },
    methods: {
      loadPage() {
        getMyMessagePage(this.page, this.pageSize).then(response => {
          if (response.httpCode == 200) {
            this.messageData = response.data.list
            this.total = response.data.total
          }
        })
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.page = 1
        this.loadPage()
      },
      handleCurrentChange(page) {
        this.page = page
        this.loadPage()
      },
      formatDate(row, column, cellValue) {
        return date(cellValue, 'YYYY-MM-DD HH:mm')
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
      .page-container {
        text-align: center;
        margin-top: 16px;
      }
    }
  }
</style>
