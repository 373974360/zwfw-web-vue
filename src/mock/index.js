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

export default Mock
