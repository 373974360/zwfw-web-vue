<template>
  <el-form class="retrieve-form" ref="retrieveForm" :model="retrieveForm" :rules="retrieveRules" autoComplete="on" label-position="left">
    <el-row>
      <el-col :span="6">
        <span class="input-label">身份证号：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="account">
          <el-input type="text" v-model="retrieveForm.account" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span class="remind">*</span>请填写注册时填写的身份证号</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">验证码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="captcha">
          <el-input type="text" v-model="retrieveForm.captcha" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" :disabled="sendBtn.disabled" @click.native.prevent="getVerifyCode">{{sendBtn.text}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">登录密码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="password">
          <el-input type="password" v-model="retrieveForm.password" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span class="remind">*</span>密码可由数字或字母组成，6-16个字符，区分大小写</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">确认密码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="confirmPass">
          <el-input type="password" v-model="retrieveForm.confirmPass" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span class="remind">*</span>确认密码</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="10" align="center">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleSubmit">提交</el-button>
        <el-button type="primary" @click.native.prevent="resetForm">重置</el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </el-form>
</template>

<script>
  import { isIdCardNo } from '../../utils/validate'
  import { isUserExist, validatePhoneVerifyCode, getPwVerifyCode, retrievePw } from '../../api/login'

  export default {
    name: 'retrieve',
    data() {
      const validateIdCard = (rule, value, callback) => {
        if (!isIdCardNo(value)) {
          callback(new Error('身份证格式不正确，请重新输入'))
        } else {
          isUserExist(value).then(response => {
            console.log('isUserExist:', response)
            if (response.httpCode == 200 && !response.data) {
              callback(new Error('用户不存在'))
            }
            callback()
          }).catch(error => {
            console.log(error)
            callback(new Error(error))
          })
        }
      }
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
      const validatePassword = (rule, value, callback) => {
        if (this.retrieveForm.confirmPass) {
          this.$refs.retrieveForm.validateField('confirmPass')
        }
        callback()
      }
      const validateConfirmPass = (rule, value, callback) => {
        if (this.retrieveForm.password && this.retrieveForm.confirmPass
          && this.retrieveForm.password != this.retrieveForm.confirmPass) {
          callback(new Error('两次密码输入不同，请重新输入'))
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
        retrieveForm: {
          account: undefined,
          captcha: undefined,
          password: undefined,
          confirmPass: undefined

        },
        retrieveRules: {
          account: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'},
            {validator: validateIdCard, trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {validator: validatePhoneCaptcha, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '登录密码不能为空', trigger: 'blur'},
            {min: 6, max: 16, message: '密码只能6-16位', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          confirmPass: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: validateConfirmPass, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit() {
        this.$refs.retrieveForm.validate(valid => {
          if (valid) {
            this.loading = true
            retrievePw(this.retrieveForm).then(response => {
              console.log('retrievePw:', response)
              this.loading = false
              if (response.httpCode != 200) {
                this.$message.error('密码修改失败！')
              } else {
                this.$message.success('密码修改成功！')
                this.$router.push({path: '/login'})
              }
            }).catch(error => {
              this.loading = false
              this.$message.error(error)
            })
          }
        })
      },
      resetForm() {
        this.$refs.retrieveForm.resetFields()
      },
      getVerifyCode() {
        let _this = this
        this.$refs.retrieveForm.validateField('account', function (error) {
          if (!error) {
            _this.sendBtn.disabled = true
            getPwVerifyCode(_this.retrieveForm.account).then(response => {
              console.log('getPwVerifyCode:', response)
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
  .retrieve-form {
    font-size: 14px;
    padding-top: 20px;
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
      width: 50%;
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
</style>
