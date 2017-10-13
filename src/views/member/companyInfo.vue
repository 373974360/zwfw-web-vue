<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">修改资料</div>
    </div>
    <div class="data-bg">
      <el-form class="companyInfo-form" ref="companyInfoForm" :model="companyInfoForm" :rules="companyInfoRules"
               autoComplete="on" label-position="left">
        <el-row>
          <el-col :span="6">
            <span class="input-label">机构名称：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="legalPerson.companyName" :rules="companyInfoRules.companyName">
              <el-input type="text" v-model="companyInfoForm.legalPerson.companyName" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写机构名称</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">统一社会信用代码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="legalPerson.companyCode" :rules="companyInfoRules.companyCode">
              <el-input disabled type="text" v-model="companyInfoForm.legalPerson.companyCode" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>统一社会信用代码不可修改</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">机构代码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="legalPerson.agencyCode" :rules="companyInfoRules.agencyCode">
              <el-input type="text" v-model="companyInfoForm.legalPerson.agencyCode" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写机构代码</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">机构类型：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="legalPerson.companyType">
              <el-input type="text" v-model="companyInfoForm.legalPerson.companyType" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写机构类型</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">法定代表人：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="legalPerson.legalPerson" :rules="companyInfoRules.legalPerson">
              <el-input type="text" v-model="companyInfoForm.legalPerson.legalPerson" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写法定代表人姓名</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">法人身份证：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="legalPerson.idcard" :rules="companyInfoRules.legalPersonCard">
              <el-input type="text" v-model="companyInfoForm.legalPerson.idcard" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写法人身份证号</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">注册地址：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="legalPerson.registerPlace" :rules="companyInfoRules.registerPlace">
              <el-input type="text" v-model="companyInfoForm.legalPerson.registerPlace" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写企业注册地址</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">注册日期：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="legalPerson.registerDate" :rules="companyInfoRules.registerDate">
              <el-date-picker v-model="companyInfoForm.legalPerson.registerDate" type="date" placeholder="请选择日期" @change="formatDate"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请选择企业注册日期</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">联系电话：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="legalPerson.phone" :rules="companyInfoRules.phone">
              <el-input type="text" v-model="companyInfoForm.legalPerson.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请输入有效的手机号码</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">验证码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="verifyCode">
              <el-input type="text" v-model="companyInfoForm.verifyCode" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" :disabled="sendBtn.disabled" @click.native.prevent="getVerifyCode">{{sendBtn.text}}</el-button>
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
  import { date } from '../../filters'
  import { isIdCardNo, validMobiles } from '../../utils/validate'
  import { getPhoneVerifyCode, validatePhoneVerifyCode } from '../../api/login'
  import { getDetailInfo, updateCompanyInfo } from '../../api/member/member'

  export default {
    data() {
      const validatePhoneCaptcha = (rule, value, callback) => {
        validatePhoneVerifyCode(value).then(response => {
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
      const validateMobiles = (rule, value, callback) => {
        if (!validMobiles(value)) {
          callback(new Error('手机号码格式不正确，请重新填写'))
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
          verifyCode: undefined,
          legalPerson: {
            id: undefined,
            companyCode: undefined,
            agencyCode: undefined,
            companyName: undefined,
            companyType: undefined,
            legalPerson: undefined,
            idcard: undefined,
            phone: undefined,
            registerPlace: undefined,
            registerDate: undefined
          }
        },
        companyInfoRules: {
          companyName: [
            {required: true, message: '机构名称不能为空', trigger: 'blur'}
          ],
          agencyCode: [
            {required: true, message: '机构代码不能为空', trigger: 'blur'}
          ],
          legalPerson: [
            {required: true, message: '法定代表人不能为空', trigger: 'blur'}
          ],
          legalPersonCard: [
            {required: true, message: '法人身份证不能为空', trigger: 'blur'},
            {validator: validateIdCard, trigger: 'blur'}
          ],
          registerPlace: [
            {required: true, message: '注册地址不能为空', trigger: 'blur'}
          ],
          registerDate: [
            {required: true, message: '注册日期不能为空', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            {validator: validateMobiles, trigger: 'blur'}
          ],
          verifyCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {validator: validatePhoneCaptcha, trigger: 'blur'}
          ]
        },
      }
    },
    computed: {
      ...mapGetters([])
    },
    created() {
      getDetailInfo().then(response => {
        copyProperties(response.data, this.companyInfoForm)
      })
    },
    methods: {
      formatDate() {
        this.companyInfoForm.legalPerson.registerDate = date(this.companyInfoForm.legalPerson.registerDate, 'YYYY-MM-DD')
      },
      handleSubmit() {
        this.$refs.companyInfoForm.validate(valid => {
          if (valid) {
            this.loading = true
            updateCompanyInfo(this.companyInfoForm).then(response => {
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
        let _this = this
        this.$refs.companyInfoForm.validateField('legalPerson.phone', function (error) {
          if (!error) {
            _this.sendBtn.disabled = true
            getPhoneVerifyCode(_this.companyInfoForm.legalPerson.phone).then(response => {
              _this.sendBtn.second = 60
              _this.sendBtn.text = `重新发送(${_this.sendBtn.second})`
              _this.resendFun = setInterval(_this.changeSendBtn, 1000)
              if (response.httpCode == 200) {
                _this.$message.success('短信已发送，请注意查看')
              } else {
                _this.$message.error('短信发送失败，请重新获取')
              }
            }).catch(err => {
              this.sendBtn.disabled = false
              _this.$message.error(err)
            })
          }
        });
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
