import { getEnums, getDicts } from "../../api/common"

const app = {
  state: {
    page: 1,
    rows: 10,
    pageSize: [5, 10, 15, 20, 30, 50],
    memberType: { nature: 1, legal: 2 },
    gender: { male: 1, female: 0 },
    enums: [],
    dicts: [],
    deptCategoryId: 6988072072579072,
    resourceUrl: 'http://zwfw.itl.gov.cn:8080'
  },
  mutations: {
    SET_ENUMS: (state, enums) => {
      state.enums = enums
    },
    SET_DICTS: (state, dicts) => {
      state.dicts = dicts
    }
  },
  actions: {
    //获取枚举json数据
    SetEnums({commit}) {
      return new Promise((resolve, reject) => {
        getEnums().then(response => {
          if (response.httpCode !== 200) {
            reject(response.msg);
          } else {
            const enums = {};
            const result = response.data;
            for (const obj of result) {
              enums[obj.name] = obj.value;
            }
            commit('SET_ENUMS', enums);
          }
        }).catch(error => {
          reject(error);
        });
      });
    },
    //获取字典json数据
    SetDicts({commit}) {
      return new Promise((resolve, reject) => {
        getDicts().then(response => {
          if (response.httpCode !== 200) {
            reject(response.msg);
          } else {
            let dicts = {};
            let result = response.data;
            for (let obj of result) {
              dicts[obj.name] = obj.value;
            }
            commit('SET_DICTS', dicts);
          }
        }).catch(error => {
          reject(error);
        });
      });
    }
  }
}

export default app
