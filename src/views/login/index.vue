<template>
  <div class="login">
    <div class="login-bg">
      <div class="login-container">
        <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules" autoComplete="on" label-position="left">
          <div class="title">用户登录</div>
          <el-form-item prop="username">
            <span class="svg-container"><icon-svg iconClass="user"/></span>
            <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="身份证号"/>
          </el-form-item>
          <el-form-item prop="password">
            <span class="svg-container"><icon-svg iconClass="password"/></span>
            <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                      autoComplete="on" placeholder="请输入密码"/>
          </el-form-item>
          <el-row>
            <el-col :span="12">
              <el-form-item prop="captcha">
                <span class="svg-container"><icon-svg iconClass="captcha"/></span>
                <el-input name="captcha" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.captcha" placeholder="验证码"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <img class="captcha" :src="loginForm.imgUrl" @click.self="changeCaptcha">
              <span class="captcha2" @click.self="changeCaptcha">换一张</span>
            </el-col>
          </el-row>
          <el-checkbox v-model="loginForm.autoLogin">下次自动登录</el-checkbox>
          <el-button type="primary" style="width: 100%" :loading="loading" @click.native.prevent="handleLogin">登&nbsp;录</el-button>
          <div class="forget">
            <el-button type="text" @click="retrieve">忘记密码？</el-button>
          </div>
          <div class="sign-up">
            <el-button type="text" @click="signUp">立即注册账号</el-button>
          </div>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'login',
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          captcha: '',
          imgUrl: '',
          autoLogin: false
        },
        loginRules: {
          username: [{required: true, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur'}],
          captcha: [{required: true, trigger: 'blur'}]
        },
        loading: false
      }
    },
    methods: {
      handleLogin() {

      },
      changeCaptcha() {

      },
      signUp() {
        this.$router.push({path: '/register'})
      },
      retrieve() {
        this.$router.push({path: '/retrieve'});
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .login {
    height: 550px;
    width: 100%;
    overflow: hidden;
    position: relative;
    top: -15px;
    .login-bg {
      width: 1156px;
      height: 550px;
      position: relative;
      margin: 0 auto;
      clear: both;
      overflow: hidden;
      .login-container {
        width: 340px;
        height: 421px;
        overflow: hidden;
        position: absolute;
        top: 54px;
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
            line-height:82px;
            font-size:20px;
            color:#2e5ebe;
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
            height: 20px;
            margin: 10px 0 10px 0;
            text-align: right;
            .el-button {
              padding: 0;
              font-size: 14px;
            }
          }
          .sign-up {
            border-top: 1px solid #bfcbd9;
            text-align: center;
            height: 44px;
            line-height: 44px;
          }
        }
      }
    }
  }
</style>
