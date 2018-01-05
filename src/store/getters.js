const getters = {
  token: state => state.user.token,
  id: state => state.user.id,
  type: state => state.user.type,
  name: state => state.user.name,
  personId: state => state.user.personId,
  memberType: state => state.app.memberType,
  enums: state => state.app.enums,
  dicts: state => state.app.dicts,
  deptCategoryId: state => state.app.deptCategoryId,
  resourceUrl: state => state.app.resourceUrl,
  keshiCategoryId: state => state.app.keshiCategoryId
}

export default getters
