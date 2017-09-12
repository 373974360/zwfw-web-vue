import axios from 'axios'
import { Message } from 'element-ui'
// import store from '../store'

//创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API,
  timeout: 5000
})

service.interceptors.response.use(
  response => {
    let code = response.status;
    /**
     * 下面的注释为通过response自定义code来标示请求状态，当code返回如下情况为权限有问题，登出并返回到登录页
     * 如通过xmlhttprequest 状态码标识 逻辑可写在下面error中
     */
    if (code !== 200) {
      if(code === 207){
        Message({
          message: "短时间内请求太过频繁，请重新刷新页面",
          type: 'error',
          duration: 5 * 1000
        });
      }else{
        Message({
          message: response.data.msg,
          type: 'error',
          duration: 5 * 1000
        });
      }
    }else{
      code = response.data.httpCode;
      if(code === 401){
        Message({
          message: "登录超时，请重新登录",
          type: 'error',
          duration: 5 * 1000
        });
        // 登出
        store.dispatch('LogOut').then(() => {
          router.push({ path: '/login' })
        });
      }
      if(code === 403){
        Message({
          message: "当前登录用户没有此权限",
          type: 'error',
          duration: 5 * 1000
        });
      }
    }
    return response.data;
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
)

export default service
