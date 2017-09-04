<template>
  <div name="login">
    <top></top>
    <navbar></navbar>
    <div class="login-container">
      <el-form class="login-form" ref="loginForm" :model="loginForm" :rules="loginRules" autoComplete="on" label-position="left">
        <h3>用户登录</h3>
        <el-form-item prop="username">
          <span class="svg-container"><icon-svg iconClass="user"/></span>
          <el-input name="username" type="text" v-model="loginForm.username" autoComplete="on" placeholder="身份证号"/>
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container"><icon-svg iconClass="password"/></span>
          <el-input name="password" type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password"
                    autoComplete="on" placeholder="请输入密码"/>
        </el-form-item>
        <el-form-item prop="captcha">
          <span class="svg-container"><icon-svg iconClass="captcha"/></span>
          <el-input name="captcha" type="text" @keyup.enter.native="handleLogin" v-model="loginForm.captcha" placeholder="验证码"/>
          <img class="captcha" :src="loginForm.imgUrl" @click.self="changeCaptcha">
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
    <foot></foot>
  </div>
</template>

<script>
  import {Top, Foot, Navbar} from '../layout'

  export default {
    name: 'login',
    components: {
      Top,
      Foot,
      Navbar
    },
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
          captcha: '',
          imgUrl: ''
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

      }
    }
  }
</script>
