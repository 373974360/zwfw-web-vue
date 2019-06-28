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
    deptCategoryId: 0,
    resourceUrl: 'http://zwfw.itl.gov.cn:8080',
    //uploadUrl: `${process.env.BASE_API}/api/common/upload`,
    uploadUrl: `/manage/common/upload`,
    imageAccepts: 'image/jpg, image/jpeg, image/png, image/bmp, image/gif',
    fileAccepts: 'image/jpg,image/jpeg,image/png,image/bmp,image/gif,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf,text/plain,application/zip,application/rar',
    tokenErrorMsg: [
      'Member token expired!', 'Member token signature error!', 'Member token is null or empty!'
    ]
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
          if (response.status !== 200) {
            reject(response.message);
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
          if (response.status !== 200) {
            reject(response.message);
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
