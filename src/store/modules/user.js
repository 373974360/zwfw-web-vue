import { doLogin, doLogout } from "../../api/login"
import { getMyProfile } from "../../api/member/member"
import { getToken, setToken, removeToken } from "../../utils/auth"

const user = {
  state: {
    token: getToken(),
    user: {
      id: '',
      type: '',
      name: '',
      personId: ''
    },
    id: '',
    type: '',
    name: '',
    personId: '',
    /*companyId: ''*/
  },
  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
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
    SET_PERSON_ID: (state, personId) => {
      state.personId = personId
    },
    /*SET_COMPANY_ID: (state, companyId) => {
      state.companyId = companyId
    }*/
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
            setToken(data)
            commit('SET_TOKEN', data)
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    GetInfo({commit}) {
      return new Promise((resolve, reject) => {
        getMyProfile().then(response => {
          if (response.httpCode == 200) {
            const data = response.data
            commit('SET_ID', data.id)
            commit('SET_TYPE', data.type)
            commit('SET_NAME', data.name)
            commit('SET_PERSON_ID', data.personId)
            /*commit('SET_COMPANY_ID', data.companyId)*/
            resolve()
          } else {
            removeToken()
            commit('SET_Token', '')
            resolve()
          }
        }).catch(error => {
          removeToken()
          commit('SET_Token', '')
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
