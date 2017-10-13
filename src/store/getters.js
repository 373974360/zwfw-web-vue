const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  id: state => state.user.id,
  type: state => state.user.type,
  name: state => state.user.name,
  personId: state => state.user.personId,
  /*companyId: state => state.user.companyId,*/
  memberType: state => state.app.memberType,
  enums: state => state.app.enums,
  dicts: state => state.app.dicts,
  deptCategoryId: state => state.app.deptCategoryId,
  resourceUrl: state => state.app.resourceUrl
}

export default getters
