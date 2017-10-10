<template>
  <div class="app-wrapper">
    <top></top>
    <navbar></navbar>
    <div class="login">
      <div class="login-bg">
        <div class="login-container">
          <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules" autoComplete="on" label-position="left">
            <div class="title">用户登录</div>
            <el-form-item prop="account">
              <span class="svg-container"><icon-svg iconClass="user"/></span>
              <el-input type="text" v-model="loginForm.account" autoComplete="on" placeholder="身份证号"/>
            </el-form-item>
            <el-form-item prop="password">
              <span class="svg-container"><icon-svg iconClass="password"/></span>
              <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                        placeholder="请输入密码"/>
            </el-form-item>
            <el-row>
              <el-col :span="12">
                <el-form-item prop="captcha">
                  <span class="svg-container"><icon-svg iconClass="captcha"/></span>
                  <el-input type="text" @keyup.enter.native="handleLogin" v-model="loginForm.captcha" placeholder="验证码"/>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <img class="captcha" :src="imgUrl" @click.self="changeVerifyCode">
                <span class="captcha2" @click.self="changeVerifyCode">换一张</span>
              </el-col>
            </el-row>
            <el-checkbox v-model="loginForm.autoLogin">下次自动登录</el-checkbox>
            <el-button type="primary" style="width: 100%" :loading="loading" @click.native.prevent="handleLogin">登&nbsp;录</el-button>
            <div class="forget">
              <router-link :to="{path: '/retrieve'}">忘记密码？</router-link>
            </div>
            <div class="sign-up">
              <router-link :to="{path: '/register'}">立即注册账号</router-link>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import { Top, Foot, Navbar } from '../layout'
  import { isIdCardNo } from '../../utils/validate'
  import { validateVerifyCode } from '../../api/login'

  export default {
    name: 'login',
    components: {
      Top, Foot, Navbar
    },
    data() {
      const validateIdCard = (rule, value, callback) => {
        if (!isIdCardNo(value)) {
          callback(new Error('身份证号码格式不正确'))
        } else {
          callback()
        }
      }
      const validateCaptcha = (rule, value, callback) => {
        validateVerifyCode(value).then(response => {
          console.log('validateVerifyCode: ', response)
          if (response.httpCode !== 200) {
            callback(new Error(response.msg))
          }
          callback()
        }).catch(error => {
          callback(new Error(error))
        })
      }
      return {
        loginForm: {
          account: '342601199311014355',
          password: undefined,
          captcha: undefined,
          autoLogin: false,
        },
        loginRules: {
          account: [
            {required: true, message: '用户名不能为空', trigger: 'blur'},
            {validator: validateIdCard, trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ],
          captcha: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {min: 4, max: 4, message: '验证码为4位', trigger: 'blur'},
            {validator: validateCaptcha, trigger: 'blur'}
          ]
        },
        imgUrl: '',
        loading: false
      }
    },
    methods: {
      handleLogin() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('DoLogin', this.loginForm).then(() => {
              this.$message.success('登录成功')
              this.loading = false
              this.$router.push({path: '/member'})
            }).catch(err => {
              this.loading = false
              this.$message.error(err)
              this.loginForm.verifyCode = ''
              this.changeVerifyCode();
            })
          }
        })
      },
      changeVerifyCode() {
        this.imgUrl = process.env.ZWFW_API + '/web/common/getVerifyCode?' + Math.random()
      }
    },
    created() {
      this.changeVerifyCode();
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  @import "../../styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .login {
      height: 550px;
      background: url(../../assets/img/b1.png) top center no-repeat #2d92da;
      .login-bg {
        width: 1156px;
        height: 550px;
        position: relative;
        top: -15px;
        margin: 0 auto;
        clear: both;
        overflow: hidden;
        .login-container {
          width: 340px;
          height: 421px;
          overflow: hidden;
          position: absolute;
          top: 64px;
          right: 46px;
          background-color: #d9ecf9;
          .login-form {
            margin: 0 35px;
            input:-webkit-autofill {
              -webkit-box-shadow: 0 0 0px 1000px #e0e1e2 inset !important;
              -webkit-text-fill-color: #000000 !important;
            }
            input {
              background: transparent;
              border: 0px;
              border-radius: 4px;
              height: 38px;
              line-height: 38px;
              font-size: 16px;
              color: #000;
            }
            .el-input {
              display: inline-block;
              width: 74%;
              vertical-align: middle;
            }
            .svg-icon {
              width: 1.5em !important;
              height: 1.5em !important;
            }
            .el-form-item {
              border: 1px solid #97a8be;
              background: #ffffff;
              border-radius: 5px;
            }
            .el-checkbox {
              margin-bottom: 10px;
              .el-checkbox__label {
                font-size: 12px;
                color: #48576a;
                font-weight: normal;
              }
            }
            .el-button {
              font-size: 16px;
            }
            .title {
              height: 82px;
              line-height: 82px;
              font-size: 20px;
              color: #2e5ebe;
            }
            .svg-container {
              line-height: 16px;
              padding: 1px 5px 1px 13px;
              color: #889aa4;
              vertical-align: middle;
              width: 30px;
              display: inline-block;
              &_login {
                font-size: 20px;
              }
            }
            .captcha {
              width: 75px;
              height: 35px;
              float: left;
              margin: 3px 6px 3px 6px;
              cursor: pointer;
            }
            .captcha2 {
              line-height: 55px;
              color: #99a9bf;
              font-size: 14px;
              cursor: pointer;
            }
            .forget {
              height: 16px;
              margin: 10px 0 10px 0;
              text-align: right;
              font-size: 14px;
              color: #1e8bd8;
            }
            .sign-up {
              border-top: 1px solid #bfcbd9;
              text-align: center;
              height: 48px;
              line-height: 48px;
              color: #1e8bd8;
            }
          }
        }
      }
    }
  }
</style>
