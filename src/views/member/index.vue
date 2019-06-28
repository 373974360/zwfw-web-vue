<template>
  <div class="my-item">
    <div class="data-box">
      <div class="label-bg">
        <div class="label">我的办件</div>
        <div class="more"><router-link :to="{path: '/member/process'}">更多></router-link></div>
      </div>
      <div class="data-bg">
        <process-table :data="processData" :take-type="changeTakeType" :post-code="getPostCode"></process-table>
      </div>
    </div>
    <div class="data-box">
      <div class="label-bg">
        <div class="label">我的预审</div>
        <div class="more"><router-link :to="{path: '/member/pretrial'}">更多></router-link></div>
      </div>
      <div class="data-bg">
        <pretrial-table :data="pretrialData"></pretrial-table>
      </div>
    </div>
    <div class="data-box">
      <div class="label-bg">
        <div class="label">我的收藏</div>
        <div class="more"><router-link :to="{path: '/member/collection'}">更多></router-link></div>
      </div>
      <div class="data-bg">
        <collection-table :data="collectionData" :handle-remove="removeFavorite"></collection-table>
      </div>
    </div>

    <el-dialog title="提示" :visible.sync="dialogTipVisible" :close-on-click-modal="false" class="dialog">
      <div v-loading="dialogLoading">
        <p style="font-size: 18px; text-indent: 2em; margin-top: 0"><b>请选择获取方式：</b></p>
        <p style="padding-left: 20%">
          <el-button type="text" size="large" @click="handleSendPostCode">直接将取件码发送至手机</el-button>
        </p>
        <p style="padding-left: 20%">
          <el-button type="text" size="large" @click="handleValidateInfo">验证个人信息在线查看取件码</el-button>
        </p>
      </div>
    </el-dialog>

    <el-dialog title="信息验证" :visible.sync="dialogVisible" :close-on-click-modal="false" class="dialog"
               :before-close="resetValidateInfoForm">
      <el-form ref="validateInfoForm" :model="validateInfo" :rules="validateInfoRules"
               class="form" v-loading="dialogFormLoading">
        <el-row>
          <el-col :span="6">
            <span class="input-label">验证码：</span>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="verifyCode">
              <el-input type="text" v-model="validateInfo.verifyCode"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-button type="primary" :disabled="sendBtn.disabled" @click.native.prevent="getVerifyCode">{{sendBtn.text}}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="12" align="center">
            <el-button type="primary" @click.native.prevent="handleSubmit">提交</el-button>
          </el-col>
          <el-col :span="6"></el-col>
        </el-row>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
  import { ProcessTable, PretrialTable, CollectionTable } from './table'
  import { mapGetters } from 'vuex'
  import { getMemberProfile, getPhoneVerifyCodeLogged, validateMemberInfo } from '../../api/member/member'
  import { getMyProcessPage, sendPostCode } from '../../api/member/process'
  import { delFavorite } from '../../api/member/favorite'
  import { getPretrialPage } from '../../api/member/pretrial'

  export default {
    components: {
      ProcessTable, PretrialTable, CollectionTable
    },
    data() {
      return {
        memberId: undefined,
        pretrialData: [],
        collectionData: [],
        processData: [],
        dialogVisible: false,
        dialogTipVisible: false,
        dialogLoading: false,
        dialogFormLoading: false,
        currentRow: undefined,
        validateInfo: {
          verifyCode: undefined,
          random: undefined,
          member: {}
        },
        validateInfoRules: {
          verifyCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'}
          ]
        },
        sendBtn: {
          text: '获取验证码',
          second: undefined,
          disabled: false
        }
      }
    },
    computed: {
      ...mapGetters([
        'id'
      ])
    },
    created() {
      this.init()
    },
    methods: {
      init() {
        getMemberProfile().then(response => {
          if (response.status == 200) {
            this.memberId = response.data.infoInformation.userId;
            getPretrialPage(1, 5, null, null, this.memberId).then(response => {
              this.pretrialData = response.data.records;
            })
            // this.pretrialData = response.data.pretrialList
            // this.collectionData = response.data.favoriteList
            // this.processData = response.data.processList
          } else {
            this.$message.error('数据加载失败')
          }
        }).catch(error => {
          this.$message.error('未登录，请重新登录！')
          setTimeout(function () {
            window.location.href = 'http://localhost:8765/web/api/sso/login'
          }, 1000);
        })
      },
      changeTakeType(row) {},
      getPostCode(row) {
        this.currentRow = row;
        this.dialogTipVisible = true;
      },
      handleSendPostCode() {
        this.dialogTipVisible = false;
        this.dialogLoading = true;
        sendPostCode(this.currentRow.processNumber).then(response => {
          if (response.httpCode === 200) {
            this.$message.success('取件码已发送至您的手机，请注意查收');
          } else {
            this.$message.error(response.msg || '短信发送失败，请重试');
          }
          this.dialogLoading = false;
        })
      },
      handleValidateInfo() {
        this.dialogVisible = true;
      },
      handleSubmit() {
        this.$refs.validateInfoForm.validate(valid => {
          if (valid) {
            this.dialogFormLoading = true;
            validateMemberInfo(this.validateInfo).then(response => {
              this.dialogFormLoading = false;
              if (response.httpCode === 200) {
                this.dialogTipVisible = false;
                this.resetValidateInfoForm();
                const h = this.$createElement;
                this.$msgbox({
                  title: '取件码',
                  message: h('p', { style: 'text-align: center' }, [
                    h('b', { style: 'font-size: 24px' }, this.currentRow.takeTypeInfo.mailboxInfo.openCode)
                  ]),
                  confirmButtonText: '确定'
                })
              } else {
                this.$message.error(response.msg || '信息验证不通过')
              }
            })
          }
        })
      },
      resetValidateInfoForm() {
        this.dialogVisible = false;
        this.resetValidateInfoTemp();
        this.$refs.validateInfoForm.resetFields();
      },
      resetValidateInfoTemp() {
        this.validateInfo.verifyCode = undefined;
        this.validateInfo.member = {}
      },
      getVerifyCode() {
        this.sendBtn.disabled = true;
        this.validateInfo.random = Math.random();
        getPhoneVerifyCodeLogged(this.validateInfo.random).then(response => {
          this.sendBtn.second = 60
          this.sendBtn.text = `重新发送(${this.sendBtn.second})`
          this.resendFun = setInterval(this.changeSendBtn, 1000)
          if (response.httpCode === 200) {
            this.$message.success('短信已发送，请注意查看')
          } else {
            this.$message.error(response.msg)
          }
        }).catch(err => {
          this.sendBtn.disabled = false
          this.$message.error(err)
        })
      },
      changeSendBtn() {
        this.sendBtn.second -= 1
        this.sendBtn.text = `重新发送(${this.sendBtn.second})`
        if (this.sendBtn.second <= 0) {
          this.sendBtn.disabled = false
          this.sendBtn.text = "获取验证码"
          clearInterval(this.resendFun)
        }
      },
      removeFavorite(row) {
        delFavorite(row.id).then(response => {
          if (response.httpCode == 200) {
            this.init()
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .my-item {
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
        .more {
          float: right;
          height: 40px;
          line-height: 40px;
          font-size: 12px;
        }
      }
      .data-bg {
        padding: 16px;
        min-height: 100px;
        overflow: hidden;
      }
    }
    .dialog {
      top: 20%;
      left: 20%;
      width: 60%;
      .form {
        font-size: 14px;
        .el-row {
          margin-bottom: 15px;
          .el-col {
            min-height: 1px;
          }
        }
        .el-form-item {
          margin: 0 25px;
          input {
            border: 1px solid #cccccc;
            background: #ffffff;
            border-radius: 4px;
            height: 34px;
            padding: 6px 12px;
          }
          input[readonly], input[disabled] {
            background: #eef1f6;
            opacity: 1;
          }
        }
        .input-label {
          display: block;
          float: right;
          color: #2b2b2b;
        }
      }
    }
  }
</style>
