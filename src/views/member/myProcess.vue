<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">我的办件</div>
    </div>
    <div class="data-bg">
      <div class="data-tool">
        <div class="search-container">
          <el-input type="text" v-model="keywords" placeholder="请输入办件名称进行检索" @keyup.enter.native="reloadPage"></el-input>
          <el-button typ="primary" size="small" @click="reloadPage">检&nbsp;&nbsp;索</el-button>
        </div>
        <div class="checkbox-container">
          <el-checkbox-group v-model="checkList" @change="reloadPage">
            <el-checkbox label="10">在办</el-checkbox>
            <el-checkbox label="15">办结</el-checkbox>
            <el-checkbox label="99">不予受理</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
      <process-table :data="processData"></process-table>
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
  import { ProcessTable } from './table'
  import { getMyProcessPage } from '../../api/member/process'

  export default {
    components: {
      ProcessTable
    },
    data() {
      return {
        keywords: '',
        checkList: [],
        processData: [],
        page: 1,
        pageSize: 10,
        total: 0
      }
    },
    computed: {
    },
    created() {
      this.loadPage()
    },
    methods: {
      loadPage() {
        getMyProcessPage(this.page, this.pageSize, this.keywords, this.checkList).then(response => {
          if (response.httpCode == 200) {
            this.processData = response.data.list
            this.total = response.data.total
          }
        })
      },
      reloadPage() {
        this.page = 1
        this.loadPage()
      },
      handleSizeChange(pageSize) {
        this.pageSize = pageSize
        this.page = 1
        this.loadPage()
      },
      handleCurrentChange(page) {
        this.page = page
        this.loadPage()
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
    }
    .data-bg {
      padding: 16px;
      min-height: 100px;
      overflow: hidden;
      .data-tool {
        height: 30px;
        overflow: hidden;
        margin-bottom: 15px;
        .search-container {
          float: right;
          .el-input {
            width: 180px;
            height: 28px;
            margin: 1px 0;
            input {
              height: 28px;
              line-height: 29px;
            }
          }
          .el-button {
            background: #f38d0a;
            color: #ffffff;
            border: none;
          }
        }
        .checkbox-container {
          float: right;
          height: 30px;
          line-height: 30px;
          margin-right: 20px;
          .el-checkbox__label {
            font-size: 14px;
            font-weight: normal;
          }
        }
      }
      .page-container {
        text-align: center;
        margin-top: 16px;
      }
    }
  }
</style>
