<template>
  <el-form class="register-form" ref="registerForm" :model="registerForm" :rules="registerRules" autoComplete="on" label-position="left">
    <div class="title">会员注册</div>
    <el-row>
      <el-col :span="6">
        <span class="input-label">会员类型：</span>
      </el-col>
      <el-col :span="10">
        <div class="el-form-item-radio">
          <el-radio class="radio" v-model="registerForm.type" label="1">个人会员</el-radio>
          <el-radio class="radio" v-model="registerForm.type" label="2">企业会员</el-radio>
        </div>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">姓名：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="name">
          <el-input type="text" v-model="registerForm.name" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请输入姓名</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">身份证号：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="loginName">
          <el-input type="text" v-model="registerForm.loginName" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请填写本人身份证号作为登录账号</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">性别：</span>
      </el-col>
      <el-col :span="10">
        <div class="el-form-item-radio">
          <el-radio class="radio" v-model="registerForm.gender" label="1">男</el-radio>
          <el-radio class="radio" v-model="registerForm.gender" label="0">女</el-radio>
        </div>
      </el-col>
      <el-col :span="8">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">登录密码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="password">
          <el-input type="password" v-model="registerForm.password" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>密码可由数字或字母组成，6-16个字符，区分大小写</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">确认密码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="password2">
          <el-input type="password" v-model="registerForm.password2" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>确认密码</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">手机号码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="mobilephone">
          <el-input type="text" v-model="registerForm.mobilephone" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
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
          <el-input type="text" v-model="registerForm.verifyCode" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-button type="primary" :disabled="sendBtn.disabled" @click.native.prevent="getVerifyCode">{{sendBtn.text}}</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">联系地址：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="address">
          <el-input type="text" v-model="registerForm.address" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请填写联系地址</span>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">电子邮箱：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="email">
          <el-input type="text" v-model="registerForm.email" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip">请输入有效的电子邮箱</span>
      </el-col>
    </el-row>
    <el-row v-show="registerForm.type == 1">
      <el-col :span="6">
        <span class="input-label">QQ号码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="qq">
          <el-input type="text" v-model="registerForm.qq" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip">请填写QQ号码</span>
      </el-col>
    </el-row>
    <el-row v-show="registerForm.type == 1">
      <el-col :span="6">
        <span class="input-label">微信号码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="wechat">
          <el-input type="text" v-model="registerForm.wechat" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip">请填写微信号码</span>
      </el-col>
    </el-row>
    <el-row v-show="registerForm.type == 1">
      <el-col :span="6">
        <span class="input-label">固定电话：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="tellphone">
          <el-input type="text" v-model="registerForm.tellphone" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip">请填写固定电话</span>
      </el-col>
    </el-row>
    <el-row v-show="registerForm.type == 2">
      <el-col :span="6">
        <span class="input-label">企业名称：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="company.name" :rules="registerRules.companyName">
          <el-input type="text" v-model="registerForm.company.name" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请填写企业名称</span>
      </el-col>
    </el-row>
    <el-row v-show="registerForm.type == 2">
      <el-col :span="6">
        <span class="input-label">统一社会信用代码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="company.unifyCode" :rules="registerRules.companyUnifyCode">
          <el-input type="text" v-model="registerForm.company.unifyCode" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请填写统一社会信用代码</span>
      </el-col>
    </el-row>
    <el-row v-show="registerForm.type == 2">
      <el-col :span="6">
        <span class="input-label">企业法人：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="company.legalPerson" :rules="registerRules.companyLegalPerson">
          <el-input type="text" v-model="registerForm.company.legalPerson" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请填写企业法人姓名</span>
      </el-col>
    </el-row>
    <el-row v-show="registerForm.type == 2">
      <el-col :span="6">
        <span class="input-label">法人身份证：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="company.legalPersonCard" :rules="registerRules.companyLegalPersonCard">
          <el-input type="text" v-model="registerForm.company.legalPersonCard" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>请输入有效证件号码</span>
      </el-col>
    </el-row>
    <el-row v-show="registerForm.type == 2">
      <el-col :span="6">
        <span class="input-label">企业注册地址：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="company.address" :rules="registerRules.companyAddress">
          <el-input type="text" v-model="registerForm.company.address" autoComplete="on" placeholder=""/>
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
        <el-checkbox v-model="registerForm.agree"></el-checkbox>&nbsp;我已经阅读并接受<el-button type="text">《用户服务协议》</el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <el-row>
      <el-col :span="6"></el-col>
      <el-col :span="10" align="center">
        <el-button type="primary" :loading="loading" @click.native.prevent="handleRegister">注册</el-button>
        <el-button type="primary" @click.native.prevent="resetForm">重置</el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </el-form>
</template>

<script>
  import { isChinese, isIdCardNo, validEmail, validMobiles } from '../../utils/validate'
  import { isUserExist, getPhoneVerifyCode, validatePhoneVerifyCode, doRegister } from '../../api/login'

  export default {
    name: 'register',
    data() {
      const validateName = (rule, value, callback) => {
        if (!isChinese(value)) {
          callback(new Error('姓名必须为中文'))
        } else {
          callback()
        }
      }
      const validateIdCard = (rule, value, callback) => {
        if (!isIdCardNo(value)) {
          callback(new Error('身份证格式不正确，请重新输入'))
        } else {
          isUserExist(value).then(response => {
            console.log('isUserExist:', response)
            if (response.httpCode == 200 && response.data) {
              callback(new Error('身份证号码已存在，请重新输入'))
            }
            callback()
          }).catch(error => {
            console.log(error)
            callback(new Error(error))
          })
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (this.registerForm.password2) {
          this.$refs.registerForm.validateField('password2')
        }
        callback()
      }
      const validatePassword2 = (rule, value, callback) => {
        if (this.registerForm.password && this.registerForm.password2
          && this.registerForm.password != this.registerForm.password2) {
          callback(new Error('两次密码输入不同，请重新输入'))
        }
        callback()
      }
      const validateMobiles = (rule, value, callback) => {
        if (!validMobiles(value)) {
          callback(new Error('手机号码不正确，请重新填写'))
        } else {
          callback()
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
      const validateEmail = (rule, value, callback) => {
        if (value && !validEmail(value)) {
          callback(new Error('电子邮箱格式不正确，请重新输入'))
        } else {
          callback()
        }
      }
      const validateNotEmpty = (rule, value, callback) => {
        if (this.registerForm.type == 2 && !value.trim()) {
          callback(new Error(rule.message))
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
        registerForm: {
          type: '1',
          name: undefined,
          loginName: undefined,
          gender: '1',
          password: undefined,
          password2: undefined,
          mobilephone: undefined,
          verifyCode: undefined,
          address: undefined,
          email: undefined,
          qq: undefined,
          wechat: undefined,
          tellphone: undefined,
          agree: false,
          company: {
            name: undefined,
            unifyCode: undefined,
            legalPerson: undefined,
            legalPersonCard: undefined,
            address: undefined
          }
        },
        registerRules: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
            {validator: validateName, trigger: 'blur'}
          ],
          loginName: [
            {required: true, message: '身份证号不能为空', trigger: 'blur'},
            {validator: validateIdCard, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '登录密码不能为空', trigger: 'blur'},
            {min: 6, max: 16, message: '密码只能6-16位', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          password2: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: validatePassword2, trigger: 'blur'}
          ],
          mobilephone: [
            {required: true, message: '手机号码不能为空', trigger: 'blur'},
            {validator: validateMobiles, trigger: 'blur'}
          ],
          verifyCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {validator: validatePhoneCaptcha, trigger: 'blur'}
          ],
          address: [
            {required: true, message: '联系地址不能为空', trigger: 'blur'}
          ],
          email: [
            {validator: validateEmail, trigger: 'blur'}
          ],
          companyName: [
            {validator: validateNotEmpty, message: '公司名称不能为空', trigger: 'blur'}
          ],
          companyUnifyCode: [
            {validator: validateNotEmpty, message: '统一社会信用代码不能为空', trigger: 'blur'}
          ],
          companyLegalPerson: [
            {validator: validateNotEmpty, message: '企业法人不能为空', trigger: 'blur'}
          ],
          companyLegalPersonCard: [
            {validator: validateNotEmpty, message: '法人身份证不能为空', trigger: 'blur'}
          ],
          companyAddress: [
            {validator: validateNotEmpty, message: '企业注册地址不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            if (this.registerForm.agree) {
              this.loading = true
              doRegister(this.registerForm).then(response => {
                console.log('doRegister:', response)
                this.loading = false
                if (response.httpCode != 200) {
                  this.$message.error('注册失败')
                } else {
                  this.$message.success('会员注册成功！')
                  this.$router.push({path: '/login'})
                }
              }).catch(error => {
                this.loading = false
                this.$message.error(error)
              })
            } else {
              this.$message.error('必须同意协议后才能注册')
            }
          }
        })
      },
      resetForm() {
        this.$refs.registerForm.resetFields()
      },
      getVerifyCode() {
        let _this = this
        this.$refs.registerForm.validateField('mobilephone', function (error) {
          if (!error) {
            _this.sendBtn.disabled = true
            getPhoneVerifyCode(_this.registerForm.mobilephone).then(response => {
              console.log('getPhoneVerifyCode:', response)
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
  .register-form {
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
    .el-form-item-radio {
      margin: 0 25px;
      line-height: 36px;
    }
    .el-input {
      display: inline-block;
      width: 50%;
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
</style>
