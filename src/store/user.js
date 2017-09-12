import { validateVerifyCode, doLogin, isUserExist, validatePhoneVerifyCode, doRegister } from "../api/login";

const user = {
  actions: {
    DoLogin({commit}, loginInfo) {
      return new Promise((resolve, reject) => {
        doLogin(loginInfo).then(response => {
          const data = response.data
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
