<template>
  <el-form class="retrieve-form" ref="retrieveForm" :model="retrieveForm" :rules="retrieveRules" autoComplete="on" label-position="left">
    <el-row>
      <el-col :span="6">
        <span class="input-label">身份证号：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="name">
          <el-input type="text" v-model="retrieveForm.idCard" autoComplete="on" placeholder=""/>
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
        <el-form-item prop="name">
          <el-input type="text" v-model="retrieveForm.captcha" autoComplete="on" placeholder=""/>
          <span class="svg-container"><icon-svg iconClass="wrong"/></span>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-button type="primary">获取验证码</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="6">
        <span class="input-label">登录密码：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="name">
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
        <el-form-item prop="name">
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
        <el-button type="primary">提交</el-button>
        <el-button type="primary">重置</el-button>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
  </el-form>
</template>

<script>
  export default {
    name: 'retrieve',
    data() {
      return {
        retrieveForm: {
          idCard: '',
          password: '',
          confirmPass: '',
          captcha: '',
        },
        retrieveRules: {
          idCard: [{required: true, trigger: 'blur'}],
          password: [{required: true, trigger: 'blur'}],
          confirmPass: [{required: true, trigger: 'blur'}],
          captcha: [{required: true, trigger: 'blur'}]
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
