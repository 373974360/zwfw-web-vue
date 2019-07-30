import { doLogin, doLogout, refreshToken } from "../../api/login"
import { getMemberProfile } from "../../api/member/member"
import { getToken, setToken, removeToken } from "../../utils/auth"
import {Message} from 'element-ui'
import router from '../../router'

const    user = {
  state: {
    token: getToken(),
    id: '',
    name: '',
    member: {},
    memberType: ''
  },
  mutations: {
    SET_ID: (state, id) => {
      state.id = id
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_MEMBER: (state, member) => {
      state.member = member
    },
    SET_MEMBER_TYPE: (state, member) => {
      let serviceObject = undefined
      if (member.infoPerson) { // 自然人
        serviceObject = '1';
      } else if (member.infoLegal) { // 法人
        serviceObject = '2';
      }
      console.log("memberType: " + serviceObject)
      state.memberType = serviceObject
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
        getMemberProfile().then(response => {
          if (response.status == 200) {
            const data = response.data
            console.log("memberData:" + JSON.stringify(data))
            commit('SET_ID', data.infoInformation.userId)
            commit('SET_NAME', data.infoInformation.name)
            commit('SET_MEMBER', data)
            commit('SET_MEMBER_TYPE', data)
            window.sessionStorage.setItem("id", data.infoInformation.userId, )
            window.sessionStorage.setItem("name", data.infoInformation.name)
            // console.log(user.state.id)
            // console.log(user.state.name)
            resolve()
          }
        }).catch(error => {
          Message({
            message: "登录超时，请重新登录",
            type: 'error',
            duration: 5 * 1000
          })
          // console.log("user.js")
          removeToken()
          window.sessionStorage.removeItem("id")
          window.sessionStorage.removeItem("name")
          router.push({ path: '/login' })
          reject(error);
        });
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
        /*doLogout().then(() => {
          removeToken()
          commit('SET_TOKEN', undefined)
          resolve()
        }).catch(error => {
          reject(error)
        })*/
        window.sessionStorage.removeItem("id")
        window.sessionStorage.removeItem("name")
        window.location.href = '/web/api/sso/logout'
      })
    },

    RemoveToken({commit}) {
      return new Promise((resolve, reject) => {
        removeToken()
        window.sessionStorage.removeItem("id")
        window.sessionStorage.removeItem("name")
        // commit('SET_TOKEN', undefined)
        resolve()
      })
    }
  }
}

export default user
