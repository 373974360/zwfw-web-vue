import { doLogin, doLogout, refreshToken } from "../../api/login"
import { getMyProfile } from "../../api/member/member"
import { getToken, setToken, removeToken } from "../../utils/auth"

const user = {
  state: {
    token: getToken(),
    id: '',
    type: '',
    name: '',
    personId: ''
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
    }
  },
  actions: {
    DoLogin({commit}, loginInfo) {
      return new Promise((resolve, reject) => {
        doLogin(loginInfo).then(response => {
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
            resolve()
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    //刷新token
    RefreshToken({commit}){
      return new Promise((resolve, reject) => {
        refreshToken().then(response => {
          const data = response.data;
          setToken(data);
          commit('SET_TOKEN', data);
          resolve();
        }).catch(error => {
          reject(error);
        });
      });
    },

    DoLogout({commit}) {
      return new Promise((resolve, reject) => {
        /*doLogout().then(() => {*/
          removeToken()
          commit('SET_TOKEN', undefined)
          resolve()
        /*}).catch(error => {
          reject(error)
        })*/
      })
    }
  }
}

export default user
