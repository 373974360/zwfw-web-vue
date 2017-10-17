<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">修改密码</div>
    </div>
    <div class="data-bg">
      <el-form class="changePw-form" ref="changePwForm" :model="changePwForm" :rules="changePwRules"
               autoComplete="on" label-position="left">
        <el-row>
          <el-col :span="6">
            <span class="input-label">手机号码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="mobilephone">
              <el-input type="text" readonly v-model="changePwForm.mobilephone"></el-input>
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
              <el-input type="text" v-model="changePwForm.verifyCode" autoComplete="on"></el-input>
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
              <el-input type="password" v-model="changePwForm.password" autoComplete="on"></el-input>
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
            <el-form-item prop="confirmPass">
              <el-input type="password" v-model="changePwForm.confirmPass" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>确认密码</span>
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
  import { getPhoneVerifyCode, validatePhoneVerifyCode } from '../../api/login'
  import { getDetailInfo, updatePassword } from '../../api/member/member'

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
      const validatePassword = (rule, value, callback) => {
        if (this.changePwForm.confirmPass) {
          this.$refs.changePwForm.validateField('confirmPass')
        }
        callback()
      }
      const validateConfirmPass = (rule, value, callback) => {
        if (this.changePwForm.password && this.changePwForm.confirmPass
          && this.changePwForm.password != this.changePwForm.confirmPass) {
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
        changePwForm: {
          mobilephone: undefined,
          verifyCode: undefined,
          password: undefined,
          confirmPass: undefined
        },
        changePwRules: {
          verifyCode: [
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
    computed: {
      ...mapGetters([])
    },
    created() {
      getDetailInfo().then(response => {
        this.changePwForm.mobilephone = response.data.mobilephone
      })
    },
    methods: {
      handleSubmit() {
        this.$refs.changePwForm.validate(valid => {
          if (valid) {
            this.loading = true
            updatePassword(this.changePwForm).then(response => {
              this.loading = false
              if (response.httpCode != 200) {
                this.$message.error(response.msg)
              } else {
                this.$message.success('密码修改成功！')
                this.$router.push({path: '/member'})
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
        getPhoneVerifyCode(this.changePwForm.mobilephone).then(response => {
          this.sendBtn.second = 60
          this.sendBtn.text = `重新发送(${this.sendBtn.second})`
          this.resendFun = setInterval(this.changeSendBtn, 1000)
          if (response.httpCode == 200) {
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
      .changePw-form {
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
        input[readonly] {
          background: #eef1f6;
          opacity: 1;
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
