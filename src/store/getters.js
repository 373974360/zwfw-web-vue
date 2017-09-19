const getters = {
  token: state => state.user.token,
  user: state => state.user.user,
  id: state => state.user.id,
  type: state => state.user.type,
  name: state => state.user.name,
  companyId: state => state.user.companyId,
  resourceUrl: state => state.user.resourceUrl
}

export default getters
