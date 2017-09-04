<template>
  <div class="register">
    <div></div>
    <div class="register-container">
      <el-form class="register-form" ref="registerForm" :model="registerForm" :rules="registerRules" autoComplete="on" label-position="left">
        <h3>会员注册</h3>
        <el-form-item prop="name">姓名：
          <el-input type="text" v-model="registerForm.name" autoComplete="on" placeholder=""/>
          <span class="">请输入姓名</span>
        </el-form-item>
        <el-form-item prop="name">身份证号：
          <el-input type="text" v-model="registerForm.idCard" autoComplete="on" placeholder=""/>
          <span class="">请填写本人身份证号作为登录账号</span>
        </el-form-item>
        <el-form-item prop="name">登录密码：
          <el-input type="password" v-model="registerForm.password" autoComplete="on" placeholder=""/>
          <span class="">密码可由数字或字母组成，6-16个字符，区分大小写</span>
        </el-form-item>
        <el-form-item prop="name">确认密码：
          <el-input type="password" v-model="registerForm.confirmPass" autoComplete="on" placeholder=""/>
          <span class="">确认密码</span>
        </el-form-item>
        <el-form-item prop="name">手机号码：
          <el-input type="text" v-model="registerForm.mobilePhone" autoComplete="on" placeholder=""/>
          <span class="">请输入有效的手机号码</span>
        </el-form-item>
        <el-form-item prop="name">验证码：
          <el-input type="text" v-model="registerForm.captcha" autoComplete="on" placeholder=""/>
          <span class=""></span>
        </el-form-item>
        <el-form-item prop="name">联系地址：
          <el-input type="text" v-model="registerForm.address" autoComplete="on" placeholder=""/>
          <span class="">请填写联系地址</span>
        </el-form-item>
        <el-form-item prop="name">电子邮箱：
          <el-input type="text" v-model="registerForm.email" autoComplete="on" placeholder=""/>
          <span class="">请输入有效的电子邮箱</span>
        </el-form-item>
        <el-form-item>
          <el-button>注册</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>
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
      };
      const validateMobiles = (rule, value, callback) => {
        if (!validMobiles(value)) {
          callback(new Error('手机号码不正确，请重新填写'))
        } else {
          callback()
        }
      };
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
