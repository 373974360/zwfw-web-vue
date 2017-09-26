import { doLogin, getInfo, doLogout } from "../../api/login"
import { getToken, setToken, removeToken } from "../../utils/auth"

const user = {
  state: {
    token: getToken(),
    user: '',
    id: '',
    type: '',
    name: '',
    companyId: '',
    resourceUrl: 'http://zwfw.itl.gov.cn:8080'
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_TYPE: (state, type) => {
      state.type = type
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_COMPANYID: (state, companyId) => {
      state.companyId = companyId
    }
  },
  actions: {
    DoLogin({commit}, loginInfo) {
      return new Promise((resolve, reject) => {
        doLogin(loginInfo).then(response => {
          console.log('doLogin: ', response)
          if (response.httpCode != 200) {
            reject(response.msg)
          } else {
            const data = response.data
            setToken(data.id)
            commit('SET_TOKEN', data.id)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          console.log('getInfo: ', response)
          if (response.httpCode == 200) {
            const data = response.data
            commit('SET_USER', data)
            commit('SET_ID', data.id)
            commit('SET_TYPE', data.type)
            commit('SET_NAME', data.name)
            commit('SET_COMPANYID', data.companyId)
            resolve()
          } else {
            removeToken()
            commit('SET_Token', '')
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    DoLogout({commit}) {
      return new Promise((resolve, reject) => {
        doLogout().then(() => {
          removeToken()
          commit('SET_Token', '')
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
