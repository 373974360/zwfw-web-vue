<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">修改个人信息</div>
    </div>
    <div class="data-bg">
      <el-form class="personInfo-form" ref="personInfoForm" :model="personInfoForm" :rules="personInfoRules"
               autoComplete="on" label-position="left">
        <el-row>
          <el-col :span="6">
            <span class="input-label">姓名：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="name">
              <el-input type="text" v-model="personInfoForm.name" autoComplete="on" placeholder=""/>
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
              <el-input type="text" :disabled="true" v-model="personInfoForm.loginName" autoComplete="on" placeholder=""/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>身份证号不可修改</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">性别：</span>
          </el-col>
          <el-col :span="10">
            <div class="el-form-item-radio">
              <el-radio class="radio" v-model="personInfoForm.gender" label="1">男</el-radio>
              <el-radio class="radio" v-model="personInfoForm.gender" label="0">女</el-radio>
            </div>
          </el-col>
          <el-col :span="8">
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">手机号码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="mobilephone">
              <el-input type="text" v-model="personInfoForm.mobilephone" autoComplete="on" placeholder=""/>
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
              <el-input type="text" v-model="personInfoForm.verifyCode" autoComplete="on" placeholder=""/>
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
              <el-input type="text" v-model="personInfoForm.address" autoComplete="on" placeholder=""/>
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
              <el-input type="text" v-model="personInfoForm.email" autoComplete="on" placeholder=""/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip">请输入有效的电子邮箱</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">QQ号码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="qq">
              <el-input type="text" v-model="personInfoForm.qq" autoComplete="on" placeholder=""/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip">请填写QQ号码</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">微信号码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="wechat">
              <el-input type="text" v-model="personInfoForm.wechat" autoComplete="on" placeholder=""/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip">请填写微信号码</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">固定电话：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="tellphone">
              <el-input type="text" v-model="personInfoForm.tellphone" autoComplete="on" placeholder=""/>
              <span class="svg-container"><icon-svg iconClass="wrong"/></span>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip">请填写固定电话</span>
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
  import { isChinese, validEmail, validMobiles } from '../../utils/validate'
  import { getPhoneVerifyCode, validatePhoneVerifyCode } from '../../api/login'
  import { updatePersonInfo } from '../../api/member/member'

  export default {
    data() {
      const validateName = (rule, value, callback) => {
        if (!isChinese(value)) {
          callback(new Error('姓名必须为中文'))
        } else {
          callback()
        }
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
      return {
        sendBtn: {
          text: '获取验证码',
          second: undefined,
          disabled: false
        },
        resendFun: undefined,
        loading: false,
        personInfoForm: {
          id: undefined,
          type: undefined,
          name: undefined,
          loginName: undefined,
          gender: undefined,
          mobilephone: undefined,
          verifyCode: undefined,
          address: undefined,
          email: undefined,
          qq: undefined,
          wechat: undefined,
          tellphone: undefined,
        },
        personInfoRules: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
            {validator: validateName, trigger: 'blur'}
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
          ]
        }
      }
    },
    computed: {
      ...mapGetters([
        'user'
      ])
    },
    created() {
      this.personInfoForm.id = this.user.id
      this.personInfoForm.type = this.user.type
      this.personInfoForm.name = this.user.name
      this.personInfoForm.loginName = this.user.loginName
      this.personInfoForm.gender = this.user.gender
      this.personInfoForm.mobilephone = this.user.mobilephone
      this.personInfoForm.address = this.user.address
      this.personInfoForm.email = this.user.email
      this.personInfoForm.qq = this.user.qq
      this.personInfoForm.wechat = this.user.wechat
      this.personInfoForm.tellphone = this.user.tellphone
    },
    methods: {
      handleSubmit() {
        this.$refs.personInfoForm.validate(valid => {
          if (valid) {
            this.loading = true
            updatePersonInfo(this.personInfoForm).then(response => {
              console.log('updatePersonInfo:', response)
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
        this.$refs.personInfoForm.validateField('mobilephone', function (error) {
          if (!error) {
            _this.sendBtn.disabled = true
            getPhoneVerifyCode(_this.personInfoForm.mobilephone).then(response => {
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
      .personInfo-form {
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
