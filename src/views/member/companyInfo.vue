<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">修改企业信息</div>
    </div>
    <div class="data-bg">
      <el-form class="companyInfo-form" ref="companyInfoForm" :model="companyInfoForm" :rules="companyInfoRules"
               autoComplete="on" label-position="left">
        <el-row>
          <el-col :span="6">
            <span class="input-label">手机号码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="mobilephone">
              <el-input type="text" :disabled="true" v-model="companyInfoForm.mobilephone"/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>注册时的手机号码</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">验证码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="verifyCode">
              <el-input type="text" v-model="companyInfoForm.verifyCode" autoComplete="on"/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" :disabled="sendBtn.disabled" @click.native.prevent="getVerifyCode">{{sendBtn.text}}</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">企业名称：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="company.name" :rules="companyInfoRules.companyName">
              <el-input type="text" v-model="companyInfoForm.company.name" autoComplete="on"/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写企业名称</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">统一社会信用代码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="company.unifyCode" :rules="companyInfoRules.companyUnifyCode">
              <el-input type="text" v-model="companyInfoForm.company.unifyCode" autoComplete="on" placeholder=""/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写统一社会信用代码</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">企业法人：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="company.legalPerson" :rules="companyInfoRules.companyLegalPerson">
              <el-input type="text" v-model="companyInfoForm.company.legalPerson" autoComplete="on" placeholder=""/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写企业法人姓名</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">法人身份证：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="company.legalPersonCard" :rules="companyInfoRules.companyLegalPersonCard">
              <el-input type="text" v-model="companyInfoForm.company.legalPersonCard" autoComplete="on" placeholder=""/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请输入有效证件号码</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">企业注册地址：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="company.address" :rules="companyInfoRules.companyAddress">
              <el-input type="text" v-model="companyInfoForm.company.address" autoComplete="on" placeholder=""/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写企业注册地址</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6"></el-col>
          <el-col :span="10" align="center">
            <el-button type="primary" :loading="loading" @click.native.prevent="handleSubmit">提交</el-button>
          </el-col>
          <el-col :span="8"></el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { copyProperties } from '../../utils'
  import { isIdCardNo } from '../../utils/validate'
  import { getPhoneVerifyCode, validatePhoneVerifyCode } from '../../api/login'
  import { updateCompanyInfo } from '../../api/member/member'

  export default {
    data() {
      const validatePhoneCaptcha = (rule, value, callback) => {
        validatePhoneVerifyCode(value).then(response => {
          console.log('validatePhoneVerifyCode:', response)
          if (response.httpCode != 200) {
            callback(new Error('验证码不正确'))
          }
          callback()
        }).catch(error => {
          callback(new Error(error))
        })
      }
      const validateIdCard = (rule, value, callback) => {
        if (!isIdCardNo(value)) {
          callback(new Error('身份证格式不正确，请重新输入'))
        }
        callback()
      }
      return {
        sendBtn: {
          text: '获取验证码',
          second: undefined,
          disabled: false
        },
        resendFun: undefined,
        loading: false,
        companyInfoForm: {
          id: undefined,
          mobilephone: undefined,
          verifyCode: undefined,
          company: {
            id: undefined,
            name: undefined,
            unifyCode: undefined,
            legalPerson: undefined,
            legalPersonCard: undefined,
            address: undefined
          }
        },
        companyInfoRules: {
          verifyCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {validator: validatePhoneCaptcha, trigger: 'blur'}
          ],
          companyName: [
            {required: true, message: '企业名称不能为空', trigger: 'blur'}
          ],
          companyUnifyCode: [
            {required: true, message: '统一社会信用代码不能为空', trigger: 'blur'}
          ],
          companyLegalPerson: [
            {required: true, message: '企业法人不能为空', trigger: 'blur'}
          ],
          companyLegalPersonCard: [
            {required: true, message: '法人身份证号不能为空', trigger: 'blur'},
            {validator: validateIdCard, trigger: 'blur'}
          ],
          companyAddress: [
            {required: true, message: '企业地址不能为空', trigger: 'blur'}
          ]
        },
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    created() {
      copyProperties(this.user, this.companyInfoForm)
    },
    methods: {
      handleSubmit() {
        this.$refs.companyInfoForm.validate(valid => {
          if (valid) {
            this.loading = true
            updateCompanyInfo(this.companyInfoForm).then(response => {
              console.log('updateCompanyInfo:', response)
              this.loading = false
              if (response.httpCode != 200) {
                this.$message.error('信息修改失败！')
              } else {
                this.$message.success('信息修改成功！')
                location.reload()
              }
            }).catch(error => {
              this.loading = false
              this.$message.error(error)
            })
          }
        })
      },
      getVerifyCode() {
        this.sendBtn.disabled = true
        getPhoneVerifyCode(this.companyInfoForm.mobilephone).then(response => {
          console.log('getPhoneVerifyCode:', response)
          this.sendBtn.second = 60
          this.sendBtn.text = `重新发送(${this.sendBtn.second})`
          this.resendFun = setInterval(this.changeSendBtn, 1000)
          if (response.httpCode == 200) {
            this.$message.success('短信已发送，请注意查看')
          } else {
            this.$message.error('短信发送失败，请重新获取')
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
      .companyInfo-form {
        font-size: 14px;
        .el-row {
          margin-bottom: 15px;
          .el-col {
            min-height: 1px;
          }
        }
        input {
          border: 0px;
          background: transparent;
          height: 34px;
          padding: 3px 12px;
        }
        .el-form-item {
          border: 1px solid #cccccc;
          background: #ffffff;
          border-radius: 4px;
          margin: 0 25px;
          .el-form-item__content {
            line-height: 34px;
          }
        }
        .el-input {
          display: inline-block;
          width: 70%;
        }
        .title {
          font-size: 25px;
          color: #4bb2fc;
          text-align: center;
          margin: 20px auto;
        }
        .svg-container {
          color: #c03639;
          display: inline-block;
          float: right;
          padding: 0 12px;
        }
        .input-label {
          display: block;
          float: right;
          color: #2b2b2b;
        }
        .input-tip {
          line-height: 40px;
          font-size: 12px;
          color: #8c8f91;
          span {
            color: red;
            font-weight: bold;
          }
        }
      }
    }
  }
</style>
