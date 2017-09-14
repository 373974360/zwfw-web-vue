import Mock from 'mockjs'
import loginAPI from './login'

Mock.setup({
  timeout: '350-600'
})

//登录相关
Mock.mock(/\/web\/common\/validateVerifyCode/, 'post', loginAPI.validateVerifyCode)
Mock.mock(/\/web\/doLogin/, 'post', loginAPI.doLogin)

//注册相关
Mock.mock(/\/web\/common\/getPhoneVerifyCode/, 'post', loginAPI.getPhoneVerifyCode)
Mock.mock(/\/web\/register\/isExist/, 'post', loginAPI.isUserExist)
Mock.mock(/\/web\/common\/validatePhoneVerifyCode/, 'post', loginAPI.validatePhoneVerifyCode)
Mock.mock(/\/web\/doRegister/, 'post', loginAPI.doRegister)

export default Mock
