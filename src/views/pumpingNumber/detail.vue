<template>
  <el-row>
    <el-col :span="4">
      <div class="left">
        <div class="typeInfo">
          <p class="p1">事项类型</p>
          <p class="p2">行政审批</p>
          <p class="p1">办理主体</p>
          <p class="p2">{{basicInfo.implAgency}}</p>
          <p class="p1">办理类型</p>
          <p class="p2">{{basicInfo.processType | dicts('bjlx')}}</p>
        </div>
      </div>
    </el-col>
    <el-col :span="20">
      <div class="right">
        <p class="title">{{basicInfo.name}}</p>
        <div class="table-container">
          <el-form :model="personInfo" :rules="personInfoRules" ref="personInfoRules" style="margin-left: 30%;" label-width="100px" class="demo-ruleForm">
            <el-form-item label="手机号" prop="phone">
              <el-input style="width: 200px;" v-model="personInfo.phone"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" :loading="loading" :disabled="disabled" @click="submitForm('personInfoRules')">立即抽号</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { getItemDetail } from '../../api/item'
  import { validMobiles } from '../../utils/validate'
  import { getNumber } from '../../api/pumpingNumber/pumpingNumber'

  export default {
    data() {

      const validateMobiles = (rule, value, callback) => {
        if (!validMobiles(value)) {
          callback(new Error('手机号码不正确，请重新填写'))
        } else {
          callback()
        }
      }
      return {
        loading: false,
        disabled: false,
        itemId: '',
        basicInfo: {},
        id: undefined,
        personInfo: {
          phone: ''
        },
        personInfoRules: {
          phone: [
            {required: true, message: '手机号码不能为空', trigger: 'blur'},
            {validator: validateMobiles, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'resourceUrl'
      ])
    },
    created() {
      this.itemId = this.$route.params.itemId
      getItemDetail(this.itemId).then(response => {
        this.basicInfo = response.data
      })
    },
    methods: {
      submitForm(formName) {
//        this.loading = true
//        getNumber(this.itemId, this.personInfo.phone).then(response => {
//          debugger
//          this.loading = false
//          if (response.status==200 && response.data!=null) {
//            this.$message.success("已成功抽号")
//          } else {
//            this.$message.error(response.msg)
//          }
//        })

        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.loading = true
            getNumber(this.itemId, this.personInfo.phone).then(response => {
              this.loading = false
              if (response.status==200 && response.data!=null) {
                this.disabled = true
                this.$message.success("已成功抽号")
              } else {
                this.$message.error(response.msg)
              }
            })
          }
        })

      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-col {
    padding: 8px;
    .left {
      text-align: center;
      font-size: 16px;
      .typeInfo {
        border: 1px solid #e5e5e5;
        p {
          margin: 0;
          line-height: 43px;
        }
        .p1 {
          color: #29588c;
          font-weight: bold;
          background: #e3e7f1;
        }
        .p2 {
          background: #f0f2f6;
        }
      }
      .el-button {
        font-size: 16px;
        margin-top: 5px;
        margin-left: 0;
        width: 100%;
        div, p {
          float: left;
        }
        p {
          margin: 0;
          line-height: 24px;
        }
        .svg-container {
          height: 24px;
          margin-left: 20px;
          margin-right: 10px;
          .svg-icon {
            width: 1.5em;
            height: 1.5em;
          }
        }
      }
      .downloadList {
        width: 100%;
        margin: 0;
        font-size: 14px;
        text-align: left;
        p {
          margin-bottom: 0;
          margin-top: 5px;
          text-indent: 22px;
          line-height: 25px;
        }
      }
    }
    .right {
      padding: 12px 0 12px 20px;
      .title {
        color: #4bb2fc;
        font-size: 25px;
        text-align: center;
        margin: 0;
      }
      .table-container {
        padding: 30px 0;
        table {
          width: 100%;
          border: 1px solid #dedede;
          border-collapse: collapse;
          font-size: 14px;
          color: #333333;
          tr {
            height: 40px;
            th {
              width: 15%;
              background: #edf1f6;
              text-align: center;
              border: 1px solid #dedede;
              font-weight: bold;
            }
            td {
              width: 35%;
              background: #ffffff;
              text-align: left;
              border: 1px solid #dedede;
              padding: 5px 20px;
            }
          }
        }
      }
      .message {
        overflow: hidden;
        font-size: 16px;
        .msg-label {
          display: inline-block;
          padding: 3px 5px;
          border-bottom: 2px solid #29588c;
          color: #29588C;
          font-weight: bold;
        }
        .msg-content {
          padding: 15px 0;
          .el-table {
            th {
              font-weight: normal;
            }
          }
          p {
            margin: 0;
            line-height: 30px;
          }
          .remind {
            color: #ff0000;
            white-space: pre-line;
          }
        }
      }
    }
  }
</style>
