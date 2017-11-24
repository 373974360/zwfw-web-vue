<template>
  <el-form class="register-form" ref="registerForm" :model="registerForm" :rules="registerRules" autoComplete="on" label-position="left">
    <div class="title">会员注册</div>
    <el-row>
      <el-col :span="6">
        <span class="input-label">会员类型：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="type">
          <el-radio class="radio" v-model="registerForm.type" :label="memberType.nature">个人会员</el-radio>
          <el-radio class="radio" v-model="registerForm.type" :label="memberType.legal">企业会员</el-radio>
        </el-form-item>
      </el-col>
      <el-col :span="8"></el-col>
    </el-row>
    <!-- 个人会员信息 -->
    <div v-show="registerForm.type === memberType.nature">
      <el-row>
        <el-col :span="6">
          <span class="input-label">姓名：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="naturePerson.name" :rules="registerRules.name">
            <el-input type="text" v-model="registerForm.naturePerson.name" autoComplete="on"></el-input>
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
          <el-form-item prop="naturePerson.idcard" :rules="registerRules.idCard">
            <el-input type="text" v-model="registerForm.naturePerson.idcard" autoComplete="on" @blur="handleIdCard"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写本人身份证号</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">性别：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="naturePerson.gender">
            <el-radio class="radio" disabled v-model="registerForm.naturePerson.gender" :label="gender.male">男</el-radio>
            <el-radio class="radio" disabled v-model="registerForm.naturePerson.gender" :label="gender.female">女</el-radio>
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">出生日期：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="naturePerson.birthday">
            <el-date-picker disabled v-model="registerForm.naturePerson.birthday" type="date" placeholder="请选择日期"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">照片：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="naturePerson.photo">
            <el-upload class="avatar-uploader" name="uploadFile" :action="uploadUrl" :show-file-list="false"
                       :on-success="handleSuccess" :before-upload="beforeUpload">
              <img v-if="registerForm.naturePerson.photo" :src="registerForm.naturePerson.photo" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              <div slot="tip" class="el-upload__tip">只能上传jpg文件，且不超过2MB</div>
            </el-upload>
          </el-form-item>
        </el-col>
        <el-col :span="8"></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">民族：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="naturePerson.nation" :rules="registerRules.nation">
            <el-input type="text" v-model="registerForm.naturePerson.nation" autoComplete="on"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写民族</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">联系地址：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="naturePerson.address" :rules="registerRules.address">
            <el-input type="text" v-model="registerForm.naturePerson.address" autoComplete="on"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写联系地址</span>
        </el-col>
      </el-row>
    </div>
    <!-- 企业会员信息 -->
    <div v-show="registerForm.type === memberType.legal">
      <el-row>
        <el-col :span="6">
          <span class="input-label">机构名称：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="legalPerson.companyName" :rules="registerRules.companyName">
            <el-input type="text" v-model="registerForm.legalPerson.companyName" autoComplete="on"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写机构名称</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">统一社会信用代码：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="legalPerson.companyCode" :rules="registerRules.companyCode">
            <el-input type="text" v-model="registerForm.legalPerson.companyCode" autoComplete="on"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写统一社会信用代码</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">机构代码：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="legalPerson.agencyCode" :rules="registerRules.agencyCode">
            <el-input type="text" v-model="registerForm.legalPerson.agencyCode" autoComplete="on"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写机构代码</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">机构类型：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="legalPerson.companyType">
            <el-input type="text" v-model="registerForm.legalPerson.companyType" autoComplete="on"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写机构类型</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">法定代表人：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="legalPerson.legalPerson" :rules="registerRules.legalPerson">
            <el-input type="text" v-model="registerForm.legalPerson.legalPerson" autoComplete="on"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写法定代表人姓名</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">法人身份证：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="legalPerson.idcard" :rules="registerRules.legalPersonCard">
            <el-input type="text" v-model="registerForm.legalPerson.idcard" autoComplete="on"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写法人身份证号</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">注册地址：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="legalPerson.registerPlace" :rules="registerRules.registerPlace">
            <el-input type="text" v-model="registerForm.legalPerson.registerPlace" autoComplete="on"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请填写企业注册地址</span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span class="input-label">注册日期：</span>
        </el-col>
        <el-col :span="10">
          <el-form-item prop="legalPerson.registerDate" :rules="registerRules.registerDate">
            <el-date-picker :editable="false" v-model="registerForm.legalPerson.registerDate" type="date" placeholder="请选择日期" @change="formatDate"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <span class="input-tip"><span>*</span>请选择企业注册日期</span>
        </el-col>
      </el-row>
    </div>

    <el-row>
      <el-col :span="6">
        <span class="input-label">联系电话：</span>
      </el-col>
      <el-col :span="10">
        <el-form-item prop="mobilephone">
          <el-input type="text" v-model="registerForm.mobilephone" autoComplete="on"></el-input>
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
          <el-input type="text" v-model="registerForm.verifyCode" autoComplete="on"></el-input>
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
          <el-input type="password" v-model="registerForm.password" autoComplete="on"></el-input>
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
          <el-input type="password" v-model="registerForm.confirmPass" autoComplete="on"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <span class="input-tip"><span>*</span>确认密码</span>
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
  import { date } from '../../filters'
  import { isChinese, isIdCardNo, validEmail, validMobiles, checkSocialCreditCode } from '../../utils/validate'
  import { isUserExist, getPhoneVerifyCode, validateVerifyCode, doRegister } from '../../api/login'

  export default {
    name: 'register',
    data() {
      const validateName = (rule, value, callback) => {
        if (this.registerForm.type === this.memberType.nature) {
          if (!value.trim()) {
            callback(new Error('姓名不能为空'))
          } else if (!isChinese(value)) {
            callback(new Error('姓名必须为中文'))
          }
        }
        callback()
      }
      const validateNatureIdCard = (rule, value, callback) => {
        if (this.registerForm.type === this.memberType.nature) {
          if (!value.trim()) {
            callback(new Error('身份证号码不能为空'))
          } else if (!isIdCardNo(value)) {
            callback(new Error('身份证格式不正确，请重新输入'))
          } else {
            isUserExist(value).then(response => {
              if (response.httpCode === 200 && response.data) {
                callback(new Error('身份证号码已存在，请重新输入'))
              }
              callback()
            }).catch(error => {
              callback(new Error(error))
            })
          }
        } else {
          callback()
        }
      }
      const validateLegalIdCard = (rule, value, callback) => {
        if (this.registerForm.type === this.memberType.legal) {
          if (!value.trim()) {
            callback(new Error('法人身份证不能为空'))
          } else if (!isIdCardNo(value)) {
            callback(new Error('身份证格式不正确，请重新输入'))
          }
        }
        callback()
      }
      const validateCompanyCode = (rule, value, callback) => {
        if (this.registerForm.type === this.memberType.legal) {
          if (!value.trim()) {
            callback(new Error('统一社会信用代码不能为空'))
          } else if (!checkSocialCreditCode(value)) {
            callback(new Error('不是有效的统一社会信用代码，请重新输入'))
          } else {
            isUserExist(value).then(response => {
              if (response.httpCode === 200 && response.data) {
                callback(new Error('统一社会信用代码已存在，请重新输入'))
              }
              callback()
            }).catch(error => {
              callback(new Error(error))
            })
          }
        } else {
          callback()
        }
      }
      const validatePassword = (rule, value, callback) => {
        if (this.registerForm.confirmPass) {
          this.$refs.registerForm.validateField('confirmPass')
        }
        callback()
      }
      const validateConfirmPass = (rule, value, callback) => {
        if (this.registerForm.password && this.registerForm.confirmPass
          && this.registerForm.password != this.registerForm.confirmPass) {
          callback(new Error('两次密码输入不同，请重新输入'))
        }
        callback()
      }
      const validateMobiles = (rule, value, callback) => {
        if (!validMobiles(value)) {
          callback(new Error('手机号码不正确，请重新填写'))
        } else {
          if (this.registerForm.type === this.memberType.nature) {
            this.registerForm.naturePerson.phone = value
          } else {
            this.registerForm.legalPerson.phone = value
          }
          callback()
        }
      }
      const validatePhoneCaptcha = (rule, value, callback) => {
        validateVerifyCode(value, this.registerForm.random).then(response => {
          if (response.httpCode !== 200) {
            callback(new Error('验证码不正确'))
          }
          callback()
        }).catch(error => {
          callback(new Error(error))
        })
      }
      const validateNatureNotEmpty = (rule, value, callback) => {
        if (this.registerForm.type === this.memberType.nature && !value.trim()) {
          callback(new Error(rule.message))
        }
        callback()
      }
      const validateLegalNotEmpty = (rule, value, callback) => {
        if (this.registerForm.type === this.memberType.legal && !value.trim()) {
          callback(new Error(rule.message))
        }
        callback()
      }
      const validateDate = (rule, value, callback) => {
        if (this.registerForm.type === this.memberType.legal && !value) {
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
        memberType: this.$store.state.app.memberType,
        gender: this.$store.state.app.gender,
        loading: false,
        uploadUrl: '/api/common/upload',
        registerForm: {
          type: this.$store.state.app.memberType.nature,
          password: '',
          confirmPass: '',
          mobilephone: '',
          verifyCode: '',
          random: '',
          agree: false,
          naturePerson: {
            name: '',
            idcard: '',
            gender: this.$store.state.app.gender.male,
            nation: '',
            birthday: '',
            address: '',
            photo: '',
            phone: ''
          },
          legalPerson: {
            companyCode: '',
            agencyCode: '',
            companyName: '',
            companyType: '',
            legalPerson: '',
            idcard: '',
            phone: '',
            registerPlace: '',
            registerDate: ''
          }
        },
        registerRules: {
          name: [
            {validator: validateName, trigger: 'blur'}
          ],
          idCard: [
            {validator: validateNatureIdCard, trigger: 'blur'}
          ],
          nation: [
            {validator: validateNatureNotEmpty, message: '民族不能为空', trigger: 'blur'}
          ],
          address: [
            {validator: validateNatureNotEmpty, message: '联系地址不能为空', trigger: 'blur'}
          ],
          companyName: [
            {validator: validateLegalNotEmpty, message: '机构名称不能为空', trigger: 'blur'}
          ],
          agencyCode: [
            {validator: validateLegalNotEmpty, message: '机构代码不能为空', trigger: 'blur'}
          ],
          companyCode: [
            {validator: validateCompanyCode, trigger: 'blur'}
          ],
          legalPerson: [
            {validator: validateLegalNotEmpty, message: '法定代表人不能为空', trigger: 'blur'}
          ],
          legalPersonCard: [
            {validator: validateLegalIdCard, trigger: 'blur'}
          ],
          registerPlace: [
            {validator: validateLegalNotEmpty, message: '注册地址不能为空', trigger: 'blur'}
          ],
          registerDate: [
            {validator: validateDate, message: '注册日期不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '登录密码不能为空', trigger: 'blur'},
            {min: 6, max: 16, message: '密码只能6-16位', trigger: 'blur'},
            {validator: validatePassword, trigger: 'blur'}
          ],
          confirmPass: [
            {required: true, message: '确认密码不能为空', trigger: 'blur'},
            {validator: validateConfirmPass, trigger: 'blur'}
          ],
          mobilephone: [
            {required: true, message: '手机号码不能为空', trigger: 'blur'},
            {validator: validateMobiles, trigger: 'blur'}
          ],
          verifyCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {validator: validatePhoneCaptcha, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleIdCard() {
        let idCard = this.registerForm.naturePerson.idcard
        this.registerForm.naturePerson.birthday = `${idCard.substring(6, 10)}-${idCard.substring(10, 12)}-${idCard.substring(12, 14)}`;
        if (parseInt(idCard.substr(16, 1)) % 2 === 1) {
          this.registerForm.naturePerson.gender = this.gender.male
        } else {
          this.registerForm.naturePerson.gender = this.gender.female
        }
      },
      handleSuccess(response, file, fileList) {
        this.registerForm.naturePerson.photo = response.url
      },
      beforeUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      formatDate() {
        this.registerForm.legalPerson.registerDate = date(this.registerForm.legalPerson.registerDate, 'YYYY-MM-DD')
      },
      handleRegister() {
        this.$refs.registerForm.validate(valid => {
          if (valid) {
            if (this.registerForm.agree) {
              this.loading = true
              doRegister(this.registerForm).then(response => {
                this.loading = false
                if (response.httpCode != 200) {
                  this.$message.error(response.msg)
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
        this.registerForm.random = Math.random()
        let _this = this
        this.$refs.registerForm.validateField('mobilephone', function (error) {
          if (!error) {
            _this.sendBtn.disabled = true
            getPhoneVerifyCode(_this.registerForm.mobilephone, _this.registerForm.random).then(response => {
              _this.sendBtn.second = 60
              _this.sendBtn.text = `重新发送(${_this.sendBtn.second})`
              _this.resendFun = setInterval(_this.changeSendBtn, 1000)
              if (response.httpCode == 200) {
                _this.$message.success('短信已发送，请注意查看')
              } else {
                _this.$message.error(response.msg)
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
    .el-form-item {
      margin: 0 25px;
      input {
        border: 1px solid #cccccc;
        border-radius: 4px;
        background: #ffffff;
        height: 34px;
        padding: 6px 12px;
      }
      .avatar-uploader {
        .el-upload {
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .el-upload:hover {
          border-color: #20a0ff;
        }
        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          width: 178px;
          height: 178px;
          line-height: 178px;
          text-align: center;
        }
        .avatar {
          width: 178px;
          height: 178px;
          display: block;
        }
      }
    }
    .title {
      font-size: 25px;
      color: #4bb2fc;
      text-align: center;
      margin: 20px auto;
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
