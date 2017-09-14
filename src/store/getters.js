const getters = {
  token: state => state.user.token,
  id: state => state.user.id,
  type: state => state.user.type,
  name: state => state.user.name,
  companyId: state => state.user.companyId
}

export default getters
