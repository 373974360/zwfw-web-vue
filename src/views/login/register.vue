<template>
  <div class="register-container">
    <el-form class="register-form" ref="registerForm" :model="registerForm" :rules="registerRules" autoComplete="on" label-position="left">
      <div class="title">会员注册</div>
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
          <span class="input-tip"><span class="remind">*</span>请输入姓名</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">身份证号：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="name">
            <el-input type="text" v-model="registerForm.idCard" autoComplete="on" placeholder=""/>
            <span class="svg-container"><icon-svg iconClass="wrong"/></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span class="remind">*</span>请填写本人身份证号作为登录账号</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">登录密码：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="name">
            <el-input type="password" v-model="registerForm.password" autoComplete="on" placeholder=""/>
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
          <el-form-item prop="name">
            <el-input type="password" v-model="registerForm.confirmPass" autoComplete="on" placeholder=""/>
            <span class="svg-container"><icon-svg iconClass="wrong"/></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span class="remind">*</span>确认密码</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">手机号码：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="name">
            <el-input type="text" v-model="registerForm.mobilePhone" autoComplete="on" placeholder=""/>
            <span class="svg-container"><icon-svg iconClass="wrong"/></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span class="remind">*</span>请输入有效的手机号码</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">验证码：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="name">
            <el-input type="text" v-model="registerForm.captcha" autoComplete="on" placeholder=""/>
            <span class="svg-container"><icon-svg iconClass="wrong"/></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-button type="primary">获取验证码</el-button>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">联系地址：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="name">
            <el-input type="text" v-model="registerForm.address" autoComplete="on" placeholder=""/>
            <span class="svg-container"><icon-svg iconClass="wrong"/></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span class="remind">*</span>请填写联系地址</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">电子邮箱：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="name">
            <el-input type="text" v-model="registerForm.email" autoComplete="on" placeholder=""/>
            <span class="svg-container"><icon-svg iconClass="wrong"/></span>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span class="remind">*</span>请输入有效的电子邮箱</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="10" align="center">
          <el-checkbox></el-checkbox>&nbsp;我已经阅读并接受<el-button type="text">《用户服务协议》</el-button>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6"></el-col>
        <el-col :span="10" align="center">
          <el-button type="primary">注册</el-button>
          <el-button type="primary">重置</el-button>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
  import {validEmail, validMobiles} from '../../utils/validate'

  export default {
    name: 'register',
    data() {
      const validateEmail = (rule, value, callback) => {
        if (!validEmail(value)) {
          callback(new Error('电子邮箱格式不正确，请重新输入'))
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
      return {
        registerForm: {
          name: '',
          idCard: '',
          password: '',
          confirmPass: '',
          mobilePhone: '',
          captcha: '',
          address: '',
          email: ''
        },
        registerRules: {
          name: [{required: true, trigger: 'blur'}],
          idCard: [{required: true, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur'}],
          confirmPass: [{required: true, trigger: 'blur'}],
          mobilePhone: [{required: true, trigger: 'blur', validator: validateMobiles}],
          captcha: [{required: true, trigger: 'blur'}],
          address: [{required: true, trigger: 'blur'}],
          email: [{trigger: 'blur', validator: validateEmail}]
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss">
  .register-container {
    width: 1156px;
    margin: 0 auto;
    padding: 12px;
    border: 1px solid #e5e5e5;
    background: #ffffff;
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
  }
</style>
