<template>
  <div class="data-box">
    <div class="label-bg">
      <div class="label">修改资料</div>
    </div>
    <div class="data-bg">
      <el-form class="personInfo-form" ref="personInfoForm" :model="personInfoForm" :rules="personInfoRules"
               autoComplete="on" label-position="left">
        <el-row>
          <el-col :span="6">
            <span class="input-label">姓名：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="naturePerson.name" :rules="personInfoRules.name">
              <el-input type="text" v-model="personInfoForm.naturePerson.name" autoComplete="on"></el-input>
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
            <el-form-item prop="naturePerson.idcard">
              <el-input readonly type="text" v-model="personInfoForm.naturePerson.idcard" autoComplete="on"></el-input>
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
            <el-form-item prop="naturePerson.gender">
              <el-radio class="radio" disabled v-model="personInfoForm.naturePerson.gender" :label="gender.male">男</el-radio>
              <el-radio class="radio" disabled v-model="personInfoForm.naturePerson.gender" :label="gender.female">女</el-radio>
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
              <el-date-picker disabled v-model="personInfoForm.naturePerson.birthday" type="date" placeholder="请选择日期"></el-date-picker>
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
              <el-upload class="avatar-uploader" action="" :on-preview="handlePreview" :on-remove="handleRemove" list-type="picture">
                <img v-if="personInfoForm.naturePerson.photo" :src="personInfoForm.naturePerson.photo" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
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
            <el-form-item prop="naturePerson.nation" :rules="personInfoRules.nation">
              <el-input type="text" v-model="personInfoForm.naturePerson.nation" autoComplete="on"></el-input>
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
            <el-form-item prop="naturePerson.address" :rules="personInfoRules.address">
              <el-input type="text" v-model="personInfoForm.naturePerson.address" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <span class="input-tip"><span>*</span>请填写联系地址</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <span class="input-label">手机号码：</span>
          </el-col>
          <el-col :span="10">
            <el-form-item prop="naturePerson.phone" :rules="personInfoRules.phone">
              <el-input type="text" v-model="personInfoForm.naturePerson.phone" autoComplete="on"></el-input>
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
              <el-input type="text" v-model="personInfoForm.verifyCode" autoComplete="on"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-button type="primary" :disabled="sendBtn.disabled" @click.native.prevent="getVerifyCode">{{sendBtn.text}}</el-button>
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
  import { copyProperties } from '../../utils'
  import { isChinese, validEmail, validMobiles } from '../../utils/validate'
  import { getPhoneVerifyCode, validateVerifyCode } from '../../api/login'
  import { getDetailInfo, updatePersonInfo } from '../../api/member/member'

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
          callback(new Error('手机号码格式不正确，请重新填写'))
        } else {
          callback()
        }
      }
      const validatePhoneCaptcha = (rule, value, callback) => {
        validateVerifyCode(value, this.personInfoForm.random).then(response => {
          if (response.httpCode !== 200) {
            callback(new Error('验证码不正确'))
          }
          callback()
        }).catch(error => {
          callback(new Error(error))
        })
      }
      return {
        sendBtn: {
          text: '获取验证码',
          second: undefined,
          disabled: false
        },
        resendFun: undefined,
        gender: this.$store.state.app.gender,
        loading: false,
        personInfoForm: {
          id: undefined,
          verifyCode: undefined,
          random: undefined,
          naturePerson: {
            id: undefined,
            name: undefined,
            idcard: undefined,
            gender: undefined,
            nation: undefined,
            birthday: undefined,
            address: undefined,
            photo: undefined,
            phone: undefined
          }
        },
        personInfoRules: {
          name: [
            {required: true, message: '姓名不能为空', trigger: 'blur'},
            {validator: validateName, trigger: 'blur'}
          ],
          nation: [
            {required: true, message: '民族不能为空', trigger: 'blur'}
          ],
          address: [
            {required: true, message: '联系地址不能为空', trigger: 'blur'}
          ],
          phone: [
            {required: true, message: '联系电话不能为空', trigger: 'blur'},
            {validator: validateMobiles, trigger: 'blur'}
          ],
          verifyCode: [
            {required: true, message: '验证码不能为空', trigger: 'blur'},
            {validator: validatePhoneCaptcha, trigger: 'blur'}
          ]
        }
      }
    },
    computed: {
      ...mapGetters([])
    },
    created() {
      getDetailInfo().then(response => {
        copyProperties(response.data, this.personInfoForm)
      })
    },
    methods: {
      handlePreview() {},
      handleRemove() {},
      handleSubmit() {
        this.$refs.personInfoForm.validate(valid => {
          if (valid) {
            this.loading = true
            updatePersonInfo(this.personInfoForm).then(response => {
              this.loading = false
              if (response.httpCode !== 200) {
                this.$message.error(response.msg)
              } else {
                this.$message.success('信息修改成功！')
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
        this.personInfoForm.random = Math.random()
        let _this = this
        this.$refs.personInfoForm.validateField('naturePerson.phone', function (error) {
          if (!error) {
            _this.sendBtn.disabled = true
            getPhoneVerifyCode(_this.personInfoForm.naturePerson.phone, this.personInfoForm.random).then(response => {
              _this.sendBtn.second = 60
              _this.sendBtn.text = `重新发送(${_this.sendBtn.second})`
              _this.resendFun = setInterval(_this.changeSendBtn, 1000)
              if (response.httpCode === 200) {
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
        .el-form-item {
          margin: 0 25px;
          input {
            border: 1px solid #cccccc;
            background: #ffffff;
            border-radius: 4px;
            height: 34px;
            padding: 6px 12px;
          }
          input[readonly], input[disabled] {
            background: #eef1f6;
            opacity: 1;
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
    }
  }
</style>
