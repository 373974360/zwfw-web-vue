<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">我的预审</div>
    </div>
    <div class="data-bg">
      <div class="data-tool">
        <span class="tips">注意：未显示事项需到陕西政务服务网个人中心查看！</span>
        <div class="search-container">
          <el-input type="text" v-model="itemName" placeholder="请输入事项名称进行检索" @keyup.enter.native="reloadPage"></el-input>
          <el-button type="primary" size="small" @click="reloadPage">检&nbsp;&nbsp;索</el-button>
          <el-button type="primary" size="small" @click="resetSearch">清&nbsp;&nbsp;空</el-button>
        </div>
        <div class="search-container" style="margin-right: 10px">
          <!--<el-checkbox-group v-model="status" @change="reloadPage">
            <el-checkbox v-for="status in enums['PreauditStatusEnum']" :key="status.code" :label="status.var">{{status.value}}</el-checkbox>
          </el-checkbox-group>-->
          <el-select v-model="status" placeholder="预审状态">
            <el-option
              v-for = "o in enums['PreauditStatusEnum']"
              :label="o.value"
              :value="o.code">
            </el-option>
          </el-select>
        </div>
      </div>
      <pretrial-table :data="preauditRecordList"></pretrial-table>
      <div class="page-container">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="pageSizes"
          :page-size="pageSize"
          layout="prev, pager, next, total, sizes, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { PretrialTable } from './table'
  import { mapGetters } from 'vuex'
  import { getMemberProfile } from '../../api/member/member'
  import { getPretrialPage } from '../../api/member/pretrial'

  export default {
    components: {
      PretrialTable
    },
    data() {
      return {
        itemName: undefined,
        memberId: undefined,
        status: undefined,
        preauditRecordList: [],
        page: this.$store.state.app.page,
        pageSize: this.$store.state.app.rows,
        pageSizes: this.$store.state.app.pageSize,
        total: 0
      }
    },
    computed: {
      ...mapGetters([
        'id','enums'
      ])
    },
    created() {
      this.init()
    },
    methods: {
      resetSearch(){
        this.page = this.$store.state.app.page,
        this.pageSize = this.$store.state.app.rows,
        this.itemName = undefined,
        this.status = undefined
      },
      init() {
        getMemberProfile().then(response => {
          if (response.status == 200) {
            this.memberId = response.data.infoInformation.userId;
            this.loadPage()
          } else {
            this.$message.error('数据加载失败')
          }
        }).catch(error => {
          this.$message.error('未登录，请重新登录！')
          setTimeout(function () {
            window.location.href = '/web/api/sso/login?url=/member/pretrial'
          }, 1000);
        })
      },
      loadPage() {
        //this.memberId = this.id
        this.preauditRecordList = [];
        getPretrialPage(this.page, this.pageSize, this.itemName, this.status, this.memberId).then(response => {
          if (response.status == 200) {
            this.preauditRecordList = response.data.records;
            this.total = response.data.total;
          } else {
            this.$message.error('数据加载失败')
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
        .tips {
          font-size: 14px;
          color: red;
          height: 28px;
          line-height: 28px;
          font-weight: bold;
        }
        .search-container {
          float: right;
          .el-input {
            width: 180px;
            height: 28px;
            margin: 1px 0;
            input {
              height: 28px;
              line-height: 29px;
              font-size: 12px;
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
